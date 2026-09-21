"""
tools/images.py  -  turns your picture files into what the site uses.

    pip install pillow            (once)
    python3 tools/images.py       (every time you add or replace pictures)

What it does, in order:
  1. Looks in img/drop/eka, img/drop/dva and img/drop/bahu for pictures.
     A file must be named after the word, using the name in the checklist
     (baalaka.png) or the word itself (बालक.png). Any image type works.
  2. Squares each one from the centre, shrinks it to 512 x 512, and saves it
     as img/words/<vacana>/<name>.webp. Transparent areas are filled with the
     card colour. The original is moved to img/drop/done/<vacana>/.
  3. Rewrites js/images.js, the list the site reads to know which pictures
     exist. A word with no picture simply shows no picture.
  4. Rewrites img/checklist.csv: every word, its name, a ready-made Gemini
     prompt for each vacana, and whether that picture is done.

Nothing here is used by the site itself. The site only reads img/words and
js/images.js.
"""
import csv, hashlib, os, re, shutil, sys, unicodedata

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
DROP = os.path.join(ROOT, "img", "drop")
DONE = os.path.join(DROP, "done")
OUT = os.path.join(ROOT, "img", "words")
VACANAS = ["eka", "dva", "bahu"]
SIZE = 512                    # final width and height in pixels
QUALITY = 82                  # WebP quality: 82 keeps edges clean at about 30 to 60 KB
BACKGROUND = (247, 237, 211)  # #F7EDD3, a lighter palm-leaf cream; fills transparency
EXTS = (".png", ".jpg", ".jpeg", ".webp", ".avif", ".bmp", ".gif", ".heic")

CLASS_SA = {"a": "अकारान्त पुं", "aa": "आकारान्त स्त्री", "ii": "ईकारान्त स्त्री", "n": "अकारान्त नपुं"}

# Categories that are hard to picture. The checklist marks them optional.
ABSTRACT = {"abstract", "skill", "purpose", "time", "festival", "group"}

STYLE = ("Simple, warm illustration in the style of an Indian children's picture book. "
         "Soft flat colours with gentle shading, earthy palette of turmeric, indigo, leaf green and terracotta. "
         "One clear subject, centred, filling about two thirds of the frame, with even space around it. "
         "Plain warm cream background, colour #F7EDD3, no scenery unless the word is a place. "
         "No text, no letters, no numbers, no border, no frame, no watermark. Square image, 1:1.")


# ---------- word list ----------
def read_words():
    src = open(os.path.join(ROOT, "js", "words.js"), encoding="utf-8").read()
    words = []
    for cls, block in re.findall(r'\n\s*(a|aa|ii|n):\s*`([^`]*)`', src):
        for line in block.strip().split("\n"):
            line = line.strip()
            if not line:
                continue
            p = [x.strip() for x in line.split("|")] + ["", "", "", ""]
            flags = set(p[4].split())
            words.append({"stem": p[0], "cls": cls, "en1": p[1], "en2": p[2] or p[1],
                          "cats": set(p[3].split()), "flags": flags,
                          "solo": bool(flags & {"proper", "mass", "sg"})})
    return words


# ---------- readable ASCII names ----------
VOW = {'अ': 'a', 'आ': 'aa', 'इ': 'i', 'ई': 'ii', 'उ': 'u', 'ऊ': 'uu', 'ऋ': 'ri', 'ॠ': 'rii', 'ए': 'e', 'ऐ': 'ai', 'ओ': 'o', 'औ': 'au'}
MAT = {'ा': 'aa', 'ि': 'i', 'ी': 'ii', 'ु': 'u', 'ू': 'uu', 'ृ': 'ri', 'ॄ': 'rii', 'े': 'e', 'ै': 'ai', 'ो': 'o', 'ौ': 'au'}
CON = {'क': 'k', 'ख': 'kh', 'ग': 'g', 'घ': 'gh', 'ङ': 'ng', 'च': 'c', 'छ': 'ch', 'ज': 'j', 'झ': 'jh', 'ञ': 'ny',
       'ट': 't', 'ठ': 'th', 'ड': 'd', 'ढ': 'dh', 'ण': 'n', 'त': 't', 'थ': 'th', 'द': 'd', 'ध': 'dh', 'न': 'n',
       'प': 'p', 'फ': 'ph', 'ब': 'b', 'भ': 'bh', 'म': 'm', 'य': 'y', 'र': 'r', 'ल': 'l', 'व': 'v',
       'श': 'sh', 'ष': 'sh', 'स': 's', 'ह': 'h'}


def slug(word):
    out, i = "", 0
    while i < len(word):
        ch, nx = word[i], word[i + 1] if i + 1 < len(word) else ""
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


def names_for(words):
    """stem -> file name, unique. A clash gets the class added (rare)."""
    first, names = {}, {}
    for w in words:
        s = slug(w["stem"])
        if s in first:
            s = s + "-" + w["cls"]
        first[s] = w["stem"]
        names[w["stem"]] = s
    return names


# ---------- prompts ----------
def subject(w, vac):
    one, many = w["en1"], w["en2"]
    if "proper" in w["flags"]:
        return one if not one.startswith("the ") else one[4:]
    if vac == "eka":
        if w["cats"] & ABSTRACT:
            return "a simple picture that suggests " + one
        return ("some " if "mass" in w["flags"] else "one ") + one
    if vac == "dva":
        return "exactly two " + many + ", side by side"
    return "a group of three to five " + many


def prompt(w, vac):
    """What to ask Gemini for, after the style in img/STYLE.txt has been given once."""
    if w["solo"] and vac != "eka":
        return ""
    return "Draw: " + subject(w, vac) + "."


def note(w):
    bits = []
    if "proper" in w["flags"]:
        bits.append("a name: optional, one picture only")
    elif "mass" in w["flags"]:
        bits.append("uncountable: one picture only")
    elif "sg" in w["flags"]:
        bits.append("singular only")
    if w["cats"] & ABSTRACT:
        bits.append("hard to picture: optional")
    return "; ".join(bits)


# ---------- processing ----------
def process(words, names):
    try:
        from PIL import Image, ImageOps
    except ImportError:
        sys.exit("Pillow is not installed. Run:  pip install pillow")
    try:
        import pillow_heif  # optional, only for iPhone .heic files
        pillow_heif.register_heif_opener()
    except ImportError:
        pass

    by_name = {}
    for w in words:
        by_name[names[w["stem"]]] = w
        by_name[unicodedata.normalize("NFC", w["stem"])] = w
    made, unknown = [], []
    for vac in VACANAS:
        src_dir = os.path.join(DROP, vac)
        os.makedirs(src_dir, exist_ok=True)
        for fn in sorted(os.listdir(src_dir)):
            path = os.path.join(src_dir, fn)
            base, ext = os.path.splitext(fn)
            if not os.path.isfile(path) or ext.lower() not in EXTS:
                continue
            key = unicodedata.normalize("NFC", base.strip())
            w = by_name.get(key) or by_name.get(key.lower())
            if not w:
                unknown.append(vac + "/" + fn)
                continue
            img = ImageOps.exif_transpose(Image.open(path))
            if img.mode in ("RGBA", "LA", "P"):
                img = img.convert("RGBA")
                bg = Image.new("RGB", img.size, BACKGROUND)
                bg.paste(img, mask=img.split()[-1])
                img = bg
            else:
                img = img.convert("RGB")
            img = ImageOps.fit(img, (SIZE, SIZE), method=Image.LANCZOS, centering=(0.5, 0.5))
            out_dir = os.path.join(OUT, vac)
            os.makedirs(out_dir, exist_ok=True)
            dest = os.path.join(out_dir, names[w["stem"]] + ".webp")
            img.save(dest, "WEBP", quality=QUALITY, method=6)
            done_dir = os.path.join(DONE, vac)
            os.makedirs(done_dir, exist_ok=True)
            shutil.move(path, os.path.join(done_dir, fn))
            made.append((vac, w["stem"], os.path.getsize(dest)))
    return made, unknown


# ---------- manifest and checklist ----------
def manifest(words, names):
    stem_of = {v: k for k, v in names.items()}
    have = {v: {} for v in VACANAS}
    orphans = []
    for vac in VACANAS:
        d = os.path.join(OUT, vac)
        if not os.path.isdir(d):
            continue
        for fn in sorted(os.listdir(d)):
            if not fn.endswith(".webp"):
                continue
            name = fn[:-5]
            stem = stem_of.get(name)
            if not stem:
                orphans.append(vac + "/" + fn)
                continue
            digest = hashlib.md5(open(os.path.join(d, fn), "rb").read()).hexdigest()[:8]
            have[vac][stem] = name + "." + digest
    lines = ["/* images.js - made by tools/images.py. Do not edit by hand; run the tool instead.",
             " * Which word pictures exist. Each entry is  stem: \"file-name.version\".",
             " * The site loads img/words/<vacana>/<file-name>.webp?v=<version>.",
             " */",
             "var VB = window.VB = window.VB || {};",
             "VB.IMAGES = {"]
    for i, vac in enumerate(VACANAS):
        body = ", ".join('"%s": "%s"' % (k, have[vac][k]) for k in sorted(have[vac]))
        lines.append('  %s: { %s }%s' % (vac, body, "," if i < len(VACANAS) - 1 else ""))
    lines.append("};")
    open(os.path.join(ROOT, "js", "images.js"), "w", encoding="utf-8").write("\n".join(lines) + "\n")
    return have, orphans


def checklist(words, names, have):
    path = os.path.join(ROOT, "img", "checklist.csv")
    with open(path, "w", encoding="utf-8-sig", newline="") as f:   # utf-8-sig so Excel shows Devanagari
        wr = csv.writer(f)
        wr.writerow(["#", "word", "class", "english", "file name",
                     "eka done", "dva done", "bahu done", "notes",
                     "ask for (eka)", "ask for (dva)", "ask for (bahu)"])
        for i, w in enumerate(words, 1):
            s = w["stem"]
            done = lambda v: ("yes" if s in have[v] else ("n/a" if (w["solo"] and v != "eka") else ""))
            wr.writerow([i, s, CLASS_SA[w["cls"]], w["en1"] if w["solo"] else w["en1"] + " / " + w["en2"],
                         names[s], done("eka"), done("dva"), done("bahu"), note(w),
                         prompt(w, "eka"), prompt(w, "dva"), prompt(w, "bahu")])
    return path


def write_style():
    path = os.path.join(ROOT, "img", "STYLE.txt")
    open(path, "w", encoding="utf-8").write(
        "Paste this once at the start of each Gemini chat, then ask for pictures one at a time\n"
        "using the 'ask for' columns in checklist.csv.\n\n"
        "For every picture I ask for in this chat, use exactly this style:\n" + STYLE + "\n")


def main():
    write_style()
    words = read_words()
    names = names_for(words)
    made, unknown = process(words, names)
    have, orphans = manifest(words, names)
    checklist(words, names, have)

    for vac, stem, size in made:
        print("  made  %-5s %-14s %3d KB" % (vac, stem, size // 1024))
    for u in unknown:
        print("  SKIPPED  img/drop/%s  (no word has this name; see the 'file name' column in img/checklist.csv)" % u)
    for o in orphans:
        print("  NOTE  img/words/%s  matches no word any more; delete it if the word was removed" % o)
    need = sum(1 for w in words if not w["solo"]) * 3 + sum(1 for w in words if w["solo"])
    count = sum(len(have[v]) for v in VACANAS)
    print("Pictures: eka %d, dva %d, bahu %d   (%d of %d possible)" % (len(have["eka"]), len(have["dva"]), len(have["bahu"]), count, need))
    print("Updated js/images.js and img/checklist.csv")


if __name__ == "__main__":
    main()
