"""
tools/audio.py  -  turns your recordings into one small clip per form.

    brew install ffmpeg          (once, on the Mac)
    python3 tools/audio.py       (after every recording session)
    python3 tools/audio.py --check    (look at new recordings without saving anything)

Put recordings in audio/drop/. A file can hold:
  * one take, named by its id or its name in audio/takes.csv
        B001.m4a      jana-eka.m4a
  * a run of takes read one after another, named by the first and last id
        B001-B030.m4a
    Leave a long pause (count to three) between takes, and a short one
    (about a second) between the forms inside a take.

For every take the tool finds the spoken forms, checks there are exactly as
many as the checklist says, and only then cuts them. A take that does not
match is left alone and marked "redo" in audio/takes.csv, with the reason.
Everything else in the same file is still used.

Each clip is trimmed, brought to the same loudness as every other clip, and
saved as audio/clips/forms/<name>.mp3 (letters go to audio/clips/letters/).
A clip is named after the form it says, so a form recorded twice (रामेभ्यः is
both चतुर्थी and पञ्चमी) is stored once. js/audio.js lists every clip for the
site. Processed recordings move to audio/drop/done/.

Needs only Python 3 and ffmpeg. No Python packages.
"""
import csv, hashlib, json, os, re, shutil, subprocess, sys, tempfile

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
AUD = os.path.join(ROOT, "audio")
DROP = os.path.join(AUD, "drop")
DONE = os.path.join(DROP, "done")
CLIPS = {"forms": os.path.join(AUD, "clips", "forms"), "letters": os.path.join(AUD, "clips", "letters")}
TAKES = os.path.join(AUD, "takes.csv")
EXTS = (".m4a", ".wav", ".mp3", ".aac", ".caf", ".aiff", ".aif", ".mp4", ".ogg", ".flac", ".qta")

TARGET_LUFS = -18.0      # every clip ends up this loud
LONG_PAUSE = 2.0         # seconds of silence that separate takes in a run
MIN_SPEECH = 0.12        # anything shorter is a click, not a word
PAD_BEFORE, PAD_AFTER = 0.06, 0.12


# ---------- ffmpeg helpers ----------
def ff(args):
    return subprocess.run(["ffmpeg", "-hide_banner", "-nostats"] + args, capture_output=True, text=True)


def need_ffmpeg():
    if shutil.which("ffmpeg") is None:
        sys.exit("ffmpeg is not installed. On a Mac run:  brew install ffmpeg   (Homebrew: https://brew.sh)")


def to_wav(src, dst, start=None, end=None):
    a = ["-y"]
    if start is not None:
        a += ["-ss", "%.3f" % start]
    a += ["-i", src]
    if end is not None:
        a += ["-t", "%.3f" % (end - (start or 0))]
    ff(a + ["-ac", "1", "-ar", "44100", "-sample_fmt", "s16", dst])


def duration(path):
    out = subprocess.run(["ffprobe", "-v", "error", "-show_entries", "format=duration", "-of", "csv=p=0", path],
                         capture_output=True, text=True).stdout.strip()
    return float(out or 0)


def speech(path, noise, pause, total):
    """Stretches of sound separated by at least `pause` seconds of quiet."""
    err = ff(["-i", path, "-af", "silencedetect=noise=%ddB:d=%.2f" % (noise, pause), "-f", "null", "-"]).stderr
    starts = [float(x) for x in re.findall(r"silence_start: ([\d.]+)", err)]
    ends = [float(x) for x in re.findall(r"silence_end: ([\d.]+)", err)]
    segs, cur = [], 0.0
    for i, s in enumerate(starts):
        if s - cur > MIN_SPEECH:
            segs.append((cur, s))
        cur = ends[i] if i < len(ends) else total
    if total - cur > MIN_SPEECH:
        segs.append((cur, total))
    return segs


def find(path, want, total, pauses):
    """Try a few quiet thresholds until exactly `want` stretches are found."""
    best = None
    for noise in (-40, -36, -44, -32, -48, -28, -52):
        for pause in pauses:
            segs = speech(path, noise, pause, total)
            if len(segs) == want:
                return segs, None
            if best is None or abs(len(segs) - want) < abs(len(best) - want):
                best = segs
    return None, len(best or [])


def loudness(path):
    err = ff(["-i", path, "-af", "loudnorm=print_format=json", "-f", "null", "-"]).stderr
    m = re.search(r'"input_i"\s*:\s*"(-?[\d.]+|-inf)"', err)
    return float(m.group(1)) if m and m.group(1) != "-inf" else None


def cut(src, start, end, gain, dst):
    length = end - start
    fade_out = max(0.0, length - 0.04)
    ff(["-y", "-ss", "%.3f" % start, "-i", src, "-t", "%.3f" % length,
        "-af", "volume=%.2fdB,alimiter=limit=0.95,afade=t=in:d=0.01,afade=t=out:st=%.3f:d=0.04" % (gain, fade_out),
        "-ac", "1", "-ar", "44100", "-c:a", "libmp3lame", "-b:a", "64k", dst])


# ---------- names ----------
VOW = {'अ': 'a', 'आ': 'aa', 'इ': 'i', 'ई': 'ii', 'उ': 'u', 'ऊ': 'uu', 'ऋ': 'ri', 'ॠ': 'rii', 'ए': 'e', 'ऐ': 'ai', 'ओ': 'o', 'औ': 'au'}
MAT = {'ा': 'aa', 'ि': 'i', 'ी': 'ii', 'ु': 'u', 'ू': 'uu', 'ृ': 'ri', 'ॄ': 'rii', 'े': 'e', 'ै': 'ai', 'ो': 'o', 'ौ': 'au'}
CON = {'क': 'k', 'ख': 'kh', 'ग': 'g', 'घ': 'gh', 'ङ': 'ng', 'च': 'c', 'छ': 'ch', 'ज': 'j', 'झ': 'jh', 'ञ': 'ny',
       'ट': 't', 'ठ': 'th', 'ड': 'd', 'ढ': 'dh', 'ण': 'n', 'त': 't', 'थ': 'th', 'द': 'd', 'ध': 'dh', 'न': 'n',
       'प': 'p', 'फ': 'ph', 'ब': 'b', 'भ': 'bh', 'म': 'm', 'य': 'y', 'र': 'r', 'ल': 'l', 'व': 'v',
       'श': 'sh', 'ष': 'sh', 'स': 's', 'ह': 'h'}


def slug(w):
    out, i = "", 0
    while i < len(w):
        ch, nx = w[i], w[i + 1] if i + 1 < len(w) else ""
        if ch in CON:
            out += CON[ch]
            if nx == "्":
                i += 1
            elif nx in MAT:
                out += MAT[nx]; i += 1
            else:
                out += "a"
        elif ch in VOW:
            out += VOW[ch]
        elif ch == "ं":
            out += "m"
        elif ch == "ः":
            out += "h"
        i += 1
    return out


def clip_name(form):
    # readable, plus a short fingerprint so श/ष or ट/त never collide
    return slug(form) + "-" + hashlib.md5(form.encode("utf-8")).hexdigest()[:6]


# ---------- the checklist ----------
def read_takes():
    with open(TAKES, encoding="utf-8-sig", newline="") as f:
        rows = list(csv.reader(f))
    head, body = rows[0], rows[1:]
    takes = []
    for r in body:
        d = dict(zip(head, r))
        d["forms"] = d["read these in order"].split()
        d["kind"] = "letters" if d["id"].startswith("A") else "forms"
        takes.append(d)
    return head, takes


def write_takes(head, takes):
    with open(TAKES, "w", encoding="utf-8-sig", newline="") as f:
        w = csv.writer(f, lineterminator="\r\n")
        w.writerow(head)
        for t in takes:
            w.writerow([t.get(h, "") for h in head])


# ---------- one file ----------
def match_file(base, takes):
    """Which takes a file holds: 'B001', 'jana-eka', or a run 'B001-B030'."""
    ids = {t["id"].lower(): i for i, t in enumerate(takes)}
    alts = {t["or name it"].lower(): i for i, t in enumerate(takes)}
    b = base.strip().lower().replace(" ", "")
    if b in ids:
        return [takes[ids[b]]]
    if b in alts:
        return [takes[alts[b]]]
    m = re.match(r"^([a-d]\d+)\s*[-_to]+\s*([a-d]\d+)$", b)
    if m and m.group(1) in ids and m.group(2) in ids and ids[m.group(1)] <= ids[m.group(2)]:
        return takes[ids[m.group(1)]:ids[m.group(2)] + 1]
    return None


def process_file(path, group, have, check_only, report):
    tmp = tempfile.mkdtemp()
    try:
        wav = os.path.join(tmp, "all.wav")
        to_wav(path, wav)
        total = duration(wav)
        if len(group) == 1:
            blocks = [(0.0, total)]
        else:
            blocks, found = find(wav, len(group), total, (LONG_PAUSE, 1.6, 2.5, 3.0))
            if blocks is None:
                for t in group:
                    t["status"] = "redo: the run had %d takes, the file seemed to have %d. Leave a longer pause between takes" % (len(group), found)
                report.append("  %s: expected %d takes, heard %d. Nothing used from this file." % (os.path.basename(path), len(group), found))
                return False
        used_any = False
        for t, (b0, b1) in zip(group, blocks):
            bw = os.path.join(tmp, t["id"] + ".wav")
            to_wav(wav, bw, max(0.0, b0 - 0.3), min(total, b1 + 0.3))
            btotal = duration(bw)
            want = len(t["forms"])
            segs, found = find(bw, want, btotal, (0.45, 0.35, 0.6, 0.28, 0.8, 1.0))
            if segs is None:
                t["status"] = "redo: heard %d forms, expected %d" % (found, want)
                report.append("  %s %s: heard %d forms, expected %d. Redo this take." % (t["id"], t.get("word", ""), found, want))
                continue
            if check_only:
                report.append("  %s %s: %d forms found, looks good" % (t["id"], t.get("word", ""), want))
                continue
            lufs = loudness(bw)
            gain = 0.0 if lufs is None else max(-12.0, min(24.0, TARGET_LUFS - lufs))
            seen = set()
            for form, (s0, s1) in zip(t["forms"], segs):
                if form in seen:
                    continue
                seen.add(form)
                name = clip_name(form)
                out = os.path.join(CLIPS[t["kind"]], name + ".mp3")
                cut(bw, max(0.0, s0 - PAD_BEFORE), min(btotal, s1 + PAD_AFTER), gain, out)
                have[t["kind"]][form] = name
            t["status"] = "done"
            used_any = True
            report.append("  %s %s: %d clips" % (t["id"], t.get("word", "") or t["group"], len(seen)))
        return used_any
    finally:
        shutil.rmtree(tmp, ignore_errors=True)


# ---------- manifest ----------
def scan_clips():
    """form -> clip name, read back from the existing manifest so nothing is lost."""
    have = {"forms": {}, "letters": {}}
    path = os.path.join(ROOT, "js", "audio.js")
    if os.path.exists(path):
        m = re.search(r"VB\.AUDIO\s*=\s*(\{.*\});", open(path, encoding="utf-8").read(), re.S)
        if m:
            data = json.loads(m.group(1))
            for kind in ("forms", "letters"):
                for form, entry in data.get(kind, {}).items():
                    name = entry.rsplit(".", 1)[0]
                    if os.path.exists(os.path.join(CLIPS[kind], name + ".mp3")):
                        have[kind][form] = name
    return have


def write_manifest(have):
    data = {}
    for kind in ("letters", "forms"):
        data[kind] = {}
        for form in sorted(have[kind]):
            name = have[kind][form]
            f = os.path.join(CLIPS[kind], name + ".mp3")
            ver = hashlib.md5(open(f, "rb").read()).hexdigest()[:6]
            data[kind][form] = name + "." + ver
    body = json.dumps(data, ensure_ascii=False, indent=1)
    open(os.path.join(ROOT, "js", "audio.js"), "w", encoding="utf-8").write(
        "/* audio.js - made by tools/audio.py. Do not edit by hand; run the tool instead.\n"
        " * Which recordings exist, keyed by the written form they say.\n"
        " * The site plays audio/clips/<letters|forms>/<name>.mp3?v=<version>.\n"
        " */\nvar VB = window.VB = window.VB || {};\nVB.AUDIO = " + body + ";\n")


def main():
    check_only = "--check" in sys.argv
    need_ffmpeg()
    if not os.path.exists(TAKES):
        sys.exit("audio/takes.csv is missing. Run:  node tools/audio-plan.js")
    head, takes = read_takes()
    if "status" not in head:
        head.append("status")
    for t in takes:
        t.setdefault("status", t.get("status", ""))
    for d in CLIPS.values():
        os.makedirs(d, exist_ok=True)
    os.makedirs(DROP, exist_ok=True)
    have = scan_clips()

    report, files = [], sorted(f for f in os.listdir(DROP) if f.lower().endswith(EXTS))
    for fn in files:
        base = os.path.splitext(fn)[0]
        group = match_file(base, takes)
        if not group:
            report.append("SKIPPED %s: no take has this name. Use an id (B001), a name (jana-eka) or a run (B001-B030)." % fn)
            continue
        report.append("%s  (%d take%s)" % (fn, len(group), "" if len(group) == 1 else "s"))
        used = process_file(os.path.join(DROP, fn), group, have, check_only, report)
        if used and not check_only:
            os.makedirs(DONE, exist_ok=True)
            shutil.move(os.path.join(DROP, fn), os.path.join(DONE, fn))

    if not check_only:
        # a take is done when every form it reads has a clip, whichever recording made it
        for t in takes:
            if all(f in have[t["kind"]] for f in t["forms"]):
                t["status"] = "done"
            elif t.get("status") == "done":
                t["status"] = ""
        write_manifest(have)
        write_takes(head, takes)

    print("\n".join(report) if report else "No recordings in audio/drop/.")
    done = sum(1 for t in takes if t.get("status") == "done")
    redo = sum(1 for t in takes if str(t.get("status", "")).startswith("redo"))
    print("Takes done: %d of %d%s" % (done, len(takes), ("   to redo: %d (see the status column)" % redo) if redo else ""))
    if not check_only:
        print("Clips: %d forms, %d letters. Updated js/audio.js and audio/takes.csv" % (len(have["forms"]), len(have["letters"])))


if __name__ == "__main__":
    main()
