# Recording guide

These recordings are for the **लिपिः** page only. They let learners hear a word and pick how it is written, without any English letters. Nothing on the vibhakti or reading pages uses them.

You record. A tool cuts each recording into one small clip per form, evens out the volume, and tells you if anything needs redoing. You never cut or name individual clips yourself.

---

## What you will record

Everything is listed in **`audio/takes.csv`**. Open it in Numbers, Excel or Google Sheets. Each row is one **take**: a short list of forms you read aloud in order.

| Part | What | Takes | Forms |
|---|---|---|---|
| **A** | The letters, one varga per take | 8 | 44 |
| **B** | Full tables of 124 common words: all eight forms of one vacana per take (प्रथमा to सप्तमी, then सम्बोधनम्) | 220 | 1,760 |
| **C** | The प्रथमा एकवचनम् of every other word, eight words per take | 58 | 463 |
| **D** | द्विवचनम् tables for the Part B words | 96 | 768 |

Record in the order A, B, C, D. Part B is sorted the way you asked: all एकवचनम् पुंलिङ्ग words first, then एकवचनम् स्त्रीलिङ्ग, then एकवचनम् नपुंसकलिङ्ग, then the same three for बहुवचनम्. Part D can be recorded any time. The app starts using it once dvivacana is switched on.

**Time.** A take is about 15 seconds of speaking. A sitting of 30 takes is about 20 to 25 minutes. All of Part B is roughly seven or eight sittings.

**Which words.** Part B's words are in `audio/words-to-record.txt`. They were chosen by how often they appear in the stories, plus everyday drill words, with every class represented. Change the list whenever you like (one word per line), then run `node tools/audio-plan.js` to rebuild the checklist.

---

## How to read

- **Read exactly what the "read these in order" column says, left to right.** For Part B that is always eight forms in table order.
- **Read every form, even when it repeats.** In बहुवचनम् the चतुर्थी and पञ्चमी are the same (जनेभ्यः जनेभ्यः), and प्रथमा and सम्बोधनम् are the same. Say it both times. It keeps your rhythm steady, and the tool keeps one copy.
- **सम्बोधनम् without हे.** Say राम, not हे राम.
- **A short pause between forms,** about one second. Take a breath if you like.
- **One second of quiet before the first form and after the last.**
- **Letters (Part A):** vowels alone (अ, आ, इ ...). Consonants with their a (क = ka, ख = kha).
- **Speak as you would when teaching**: clear, unhurried, the same pace throughout. Every clip should sound like it came from the same class.
- **A mistake?** Stop, and start that take again from its first form in a new recording. Don't correct yourself mid-take, or the count will be off.

---

## Setting up once

**iPhone**
1. Open **Settings > Apps > Voice Memos**.
2. Set **Audio Quality** to **Lossless**.
3. Turn **Location-based Naming** off, so new recordings are called "New Recording".

**Where you record**
- A quiet room with soft things around (curtains, a sofa, a bed). Avoid a bare kitchen or bathroom.
- Turn off fans and air conditioning while recording.
- Hold or prop the phone about a hand's length (20 cm) from your mouth, bottom edge towards you, a little below your chin so breath doesn't hit it directly.
- Keep the same spot and distance every sitting.

**Mac**
1. Install Homebrew if you don't have it: see https://brew.sh (one command in Terminal).
2. In Terminal: `brew install ffmpeg`
3. Python 3 is already on the Mac. Check with `python3 --version`.

---

## A recording sitting

There are two ways. Use whichever suits you; you can mix them.

### Way 1: one recording per take

1. Look at the next row in `takes.csv`, say **B001** (जन, एकवचनम्).
2. Record: one second of quiet, the eight forms with short pauses, one second of quiet. Stop.
3. Tap the recording's name and rename it to the **id**, `B001`. The word name also works (`jana-eka`, in the "or name it" column).
4. Next row.

### Way 2: one recording for a run of takes (faster)

1. Start one recording.
2. Read B001's eight forms, then **count to three silently**, then B002's eight forms, count to three, and so on, up to say B030.
3. Stop, and rename the recording to the range: **`B001-B030`**.

The long pause is how the tool knows where one take ends and the next begins. If one take inside a run goes wrong, only that take is marked for redoing; the rest of the run is still used. To redo it, record just that take on its own and name it by its id.

**Keep runs to about 30 takes.** A shorter file means less to redo if something goes badly wrong.

---

## Getting recordings onto the Mac

Voice Memos syncs through iCloud. On the Mac:
1. Open the **Voice Memos** app. Your recordings appear with the names you gave them.
2. Select the ones to process and **drag them into the `audio/drop/` folder** of the project in Finder.

AirDrop from the iPhone works too (Share > AirDrop to your Mac, then move the files into `audio/drop/`).

---

## Processing

In Terminal, in the project folder:

```
python3 tools/audio.py
```

It prints what it did for each recording:

```
B001-B030.m4a  (30 takes)
  B001 जन: 8 clips
  B002 सिंह: 8 clips
  B017 कार्य: heard 7 forms, expected 8. Redo this take.
  ...
Takes done: 29 of 382   to redo: 1 (see the status column)
```

- Clips go to `audio/clips/`, and `js/audio.js` is updated.
- `audio/takes.csv` gets a **status** column: `done`, or `redo:` with the reason. Sort by it to see what is left.
- Processed recordings move to `audio/drop/done/`. A recording where nothing could be used stays in `audio/drop/` so you can listen to it.

**Just checking.** `python3 tools/audio.py --check` looks at new recordings and reports, without saving anything. Use it after your first take to make sure your pauses and room work.

**Redoing a take.** Record it again, name it by its id, drop it in, and run the tool. The new clips replace the old ones.

---

## Uploading to GitHub

Upload `audio/clips/`, `js/audio.js` and `audio/takes.csv`. **Not** `audio/drop/`, which holds the original recordings and is only your working folder. Keep the originals somewhere safe on the Mac or in iCloud, in case you ever want to re-cut them.

---

## Why it is organised this way

- **One clip per written form, not per table cell.** रामेभ्यः sounds the same as चतुर्थी or पञ्चमी, so it is stored once. The same clip will serve the pronoun and verb forms later, whenever a form is spelled the same.
- **The forms come from the site's own grammar engine.** What you read is exactly what the app teaches, so a recording can never disagree with a question.
- **Later additions use the same flow.** New classes (हरि, मति, गुरु, धेनु, वधू, पितृ, मातृ), dvivacana, and lakāra tables are just more rows in `takes.csv`. Record, drop, run.

## Technical details, for reference

| | |
|---|---|
| What you record | anything Voice Memos makes (.m4a); .wav, .mp3, .aiff and others also work |
| Finding forms | quiet of about 0.5 seconds between forms, 2 seconds between takes. The tool tries a few thresholds on its own before giving up |
| Loudness | every take is brought to about −18 LUFS, with a limiter so nothing clips |
| Clip | mono MP3, 64 kbps, 44.1 kHz, with 60 ms before the word and 120 ms after, and soft fades. About 7 KB for a one-second word |
| Names | `audio/clips/forms/<readable name>-<fingerprint>.mp3`, for example `raamah-3f9a1c.mp3`. The fingerprint keeps श/ष and ट/त apart |
| Whole set | Parts A to D come to about 2,300 clips and roughly 16 MB |
