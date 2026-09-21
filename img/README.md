# Word pictures

Pictures let a learner see what a word means without reading English. They are optional, one word at a time. A word with no picture shows exactly as it always has: no empty box, no caption, no gap.

## Where pictures appear

| Screen | Picture |
|---|---|
| Choose the form, build the form | the word, in the question's number |
| Fill in the blank (sentences) | the blank word, smaller, in the question's number |
| Pronoun agreement (बालकाय > तस्मै) | the noun |
| Complete the table | the word, one of it |
| रूपावलिः (every form of a word) | the word, one of it |

They never appear on questions that test the number itself (which vibhakti and vacana, change the number, true or false, odd one out, match pairs), because a picture of one or many would give the answer away. Pictures never appear on the reading page.

**If a picture for two or many is not made yet,** the one-of-it picture is used instead, since the number is written right beside it. Once you make the plural picture, it takes over automatically.

## The three folders

```
img/drop/eka/     pictures of ONE     (बालकः, a boy)
img/drop/dva/     pictures of TWO     (बालकौ, two boys)
img/drop/bahu/    pictures of MANY    (बालकाः, three to five boys)
```

You only ever put files into `img/drop/`. The tool makes everything else.

## Step by step

**Once:**
1. Install Python (python.org) if you do not have it.
2. In a terminal, in the project folder, run: `pip install pillow`

**Each batch of pictures:**
1. Open `img/checklist.csv` in Google Sheets or Excel. Every word is a row, with the file name to use and what to ask Gemini for, in one, two and many. The "done" columns fill in as you go. Sort or filter by "eka done" to see what is left.
2. Start a new Gemini chat. Paste the whole of `img/STYLE.txt` as the first message. This keeps every picture in the same style.
3. For each word, send the text from the "ask for" column, for example `Draw: one boy.` Download the picture.
4. Rename the file to the word's **file name** from the checklist (`baalaka.png`), and put it in the right folder: `img/drop/eka/`, `img/drop/dva/` or `img/drop/bahu/`. The Devanagari word works as a name too (`बालक.png`), if that is easier to copy.
5. When you have a batch, run: `python3 tools/images.py`
6. It prints each picture it made, and names any file it could not match to a word, so a typo is caught at once.
7. Upload to GitHub: the `img/words/` folder, `js/images.js` and `img/checklist.csv`. Do not upload `img/drop/`; the originals are moved to `img/drop/done/` in case you want them again.

**To replace a picture:** put the new file in `img/drop/` with the same name and run the tool again. Phones pick up the new one on their next visit.

**To remove a picture:** delete it from `img/words/<folder>/` and run the tool again.

## What to ask Gemini for

| Setting | Value | Why |
|---|---|---|
| Shape | square, 1:1 | the tool crops to a square from the centre; anything outside the centre square is lost |
| Size | 1024 × 1024 or larger | the tool shrinks it to 512 × 512; larger gives cleaner edges |
| Subject | centred, about two thirds of the frame | leaves margin so nothing is cut when squared or rounded |
| Background | plain cream, #F7EDD3 | matches the palm-leaf cards; the rounded corners then look intended |
| Text | none at all | no English, and no misspelt Devanagari from the image model |
| File type | PNG, JPEG or WebP, whatever Gemini gives | the tool converts it |

The style paragraph in `img/STYLE.txt` already asks for all of this. Keep using it, so a picture made in March matches one made in September.

**Tips for good results:**
- Keep a batch to one kind of word (people, animals, objects). Gemini stays more consistent.
- For **dva**, check there really are two. Image models often draw three. If it keeps happening, add "count them: exactly two" to the request.
- For people, say what makes the word distinct: a teacher at a board, a doctor with a stethoscope, a farmer in a field.
- Words marked "hard to picture: optional" in the checklist (ज्ञान, धर्म, दया) are fine to skip. Names (राम, सीता) are optional too, and one picture only.
- Uncountable words (जल, दुग्ध) need one picture only; their two and many columns say n/a.

## What the tool makes

For every picture: a 512 × 512 WebP at quality 82, usually 30 to 60 KB, in `img/words/<eka|dva|bahu>/<file name>.webp`. On screen it is drawn at about 120 pixels (up to 175 with the largest text setting), so 512 stays sharp on high-density phone screens.

Transparent areas in a PNG are filled with the cream background, and photos taken sideways are turned upright. `js/images.js` lists every picture with a short version stamp, so a replaced picture is never hidden by an old saved copy. `tools/check.js` confirms every listed picture exists.

With every word pictured in all three numbers, that is about 1,500 files and roughly 60 MB. That fits easily in a GitHub Pages site. Phones download each picture only when it is first shown, and keep it for offline use after that.
