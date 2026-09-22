# विभक्तिः · Vibhakti daily practice

A small website for practising Sanskrit for a few minutes a day.
It runs on any phone or computer, works without internet once opened, and needs no account.

It has four pages, one tab each:

| Tab | What it is for |
|---|---|
| **अभ्यासः** | Vibhakti drills: the daily session, focused and massed practice, tables, a speed round, pronouns, and every form of every word |
| **पठनम्** | Reading real stories line by line and naming the vibhakti of marked words |
| **लिपिः** | Learning to read Devanagari: letters, vowel signs and conjuncts |
| **प्रगतिः** | Progress for all of the above, in one place |

The vibhakti drills cover the four most common noun classes, all seven vibhaktis and सम्बोधनम्, in एकवचनम् and बहुवचनम्:

| Class | Pattern word |
|---|---|
| अकारान्तः पुंलिङ्गः | राम |
| आकारान्तः स्त्रीलिङ्गः | रमा |
| ईकारान्तः स्त्रीलिङ्गः | नदी |
| अकारान्तः नपुंसकलिङ्गः | फल |

That is 64 skills (4 classes × 8 vibhaktis × 2 numbers), drilled with 587 everyday words and 276 sentence patterns. The reading page has 48 level 1 stories. The script page covers 50 letters, 11 vowel signs and 66 conjuncts in 10 stages.

---

## Contents

1. [Try it on your computer](#1-try-it-on-your-computer)
2. [Put it online](#2-put-it-online)
3. [Add it to a phone's home screen](#3-add-it-to-a-phones-home-screen)
4. [What a learner does each day](#4-what-a-learner-does-each-day)
5. [The 13 kinds of exercise](#5-the-13-kinds-of-exercise)
6. [How it decides what to ask](#6-how-it-decides-what-to-ask)
7. [The order vibhaktis open in](#7-the-order-vibhaktis-open-in)
8. [Where progress is kept](#8-where-progress-is-kept)
9. [Adding or changing words](#9-adding-or-changing-words)
10. [Adding or changing sentences](#10-adding-or-changing-sentences)
11. [Checking your changes](#11-checking-your-changes)
12. [Updating the live site](#12-updating-the-live-site)
13. [What each file does](#13-what-each-file-does)
14. [Things to know](#14-things-to-know)
15. [The script page](#15-the-script-page)
16. [The reading page and adding stories](#16-the-reading-page-and-adding-stories)
17. [Pronouns](#17-pronouns)
18. [Word pictures](#18-word-pictures)
19. [Recordings for the script page](#19-recordings-for-the-script-page)

---

## 1. Try it on your computer

The simple way:

1. Unzip the folder.
2. Double-click `index.html`. It opens in your browser and works.

When opened this way, some browsers will not load the bundled fonts. The site then uses your computer's own Devanagari font. Everything still works, it just looks plainer. Once the site is online (section 2), the proper fonts always load.

To see it exactly as it will look online, open a terminal in the folder and run:

```
python3 -m http.server 8000
```

Then visit `http://localhost:8000` in your browser. Press `Ctrl + C` in the terminal to stop.

---

## 2. Put it online

This is a plain static website. There is no build step, no server code and no database, so any free static host will do. Two good choices follow. Pick one.

### Option A: Netlify Drop (fastest, about 2 minutes)

1. Unzip the folder on your computer.
2. Open **https://app.netlify.com/drop** in your browser.
3. Sign up or log in. You can use your GitHub account.
4. Drag the whole unzipped folder (the one that contains `index.html`) onto the page.
5. Wait a few seconds. Netlify shows a link like `https://jolly-kheer-12345.netlify.app`. The site is live.
6. To give it a nicer name, go to **Site configuration > Change site name** and type something like `vibhakti-abhyasa`. The link becomes `https://vibhakti-abhyasa.netlify.app`.

**To update later:** open the site in Netlify, go to the **Deploys** tab, and drag the updated folder onto the box that says "Drag and drop your project folder here".

### Option B: GitHub Pages (free, permanent, keeps a history of every change)

This option uses only the GitHub website. No command line is needed.

**Create the repository**

1. Log in to **https://github.com**.
2. Click the **+** at the top right, then **New repository**.
3. Repository name: `vibhakti` (any name works; it becomes part of the link).
4. Choose **Public**. GitHub Pages is free for public repositories.
5. Leave everything else as it is and click **Create repository**.

**Upload the files**

6. On the new, empty repository page, click the link **uploading an existing file**.
7. Open the unzipped folder on your computer and select everything **inside** it: `index.html`, `README.md`, `manifest.webmanifest`, `sw.js`, and the folders `css`, `fonts`, `icons`, `js`, `tools`. Drag them onto the GitHub page. Chrome, Edge and Firefox keep the folders intact when you drag them.
8. Important: `index.html` must be at the top level of the repository, not inside another folder.
9. Scroll down and click **Commit changes**.

**Turn on the website**

10. In the repository, click **Settings** (top menu, far right).
11. In the left sidebar, click **Pages**.
12. Under **Build and deployment**, set **Source** to **Deploy from a branch**.
13. Under **Branch**, choose `main` and `/ (root)`, then click **Save**.
14. Wait one or two minutes and refresh the page. A box appears saying **Your site is live at** `https://YOUR-USERNAME.github.io/vibhakti/`.

**To update later:** open the repository, click **Add file > Upload files**, drag in the changed files (with the same names and in the same folders), and click **Commit changes**. The site updates within a minute or two.

**Optional custom domain:** if you own a domain, enter it in **Settings > Pages > Custom domain** and follow GitHub's DNS instructions.

### Option C: inside the Akshara app later

Copy this whole folder into the Next.js project as `public/vibhakti/`. It will then be served at `https://your-akshara-domain/vibhakti/`. Nothing in the app needs to change, because every path inside it is relative.

### Sharing it

Send the link on WhatsApp or email. Nobody needs to install anything or make an account.

---

## 3. Add it to a phone's home screen

This makes it open like an app, full screen, with its own icon (a palm leaf with वि).

**iPhone or iPad (Safari)**
1. Open the site in **Safari**.
2. Tap the **Share** button (a square with an arrow pointing up).
3. Scroll down and tap **Add to Home Screen**, then tap **Add**.

**Android (Chrome)**
1. Open the site in **Chrome**.
2. Tap the **⋮** menu at the top right.
3. Tap **Add to Home screen** or **Install app**, then confirm.

After the first visit, the site works without internet.

---

## 4. What a learner does each day

The app opens on the **अभ्यासः** tab. Four tabs sit at the bottom of the screen. They disappear while a practice or a story is running, so a session has the whole screen. The phone's back button leaves a session. On any tab other than अभ्यासः, back returns to अभ्यासः. On अभ्यासः, back leaves the site.

### The daily practice

The learner taps **आरभताम्** (Start). A daily session is:

- **12 questions**, mixed from the exercise types in section 5.
- **2 declension tables** to fill in. One comes after the fourth question and one near the end.
- **Up to 3 second chances.** Skills the learner got wrong come back at the end, as a different exercise with a different word.

This takes about five minutes.

### Two ways to choose your own practice

Both are cards on the अभ्यासः tab.

- **सरल-अभ्यासः (ten of the same).** Pick one vibhakti, and optionally one word class. You get ten questions in a row on it, alternating एकवचनम् and बहुवचनम्, using only four exercise types: choose the form, build the form, which vibhakti, change the number. Use it to set a new pattern before the mixed daily practice tests it.
- **अभ्यासं वृणुत (choose your practice).** Pick any vibhaktis and any classes with the chips, then start twelve questions from that selection, with every exercise type. The selection is remembered.

Both feed the memory model and the progress grid. **Neither counts toward opening the next vibhakti**, because that gate exists to require mixed practice. Drilling one vibhakti over and over cannot unlock everything.

### Other modes on the same tab

- **सारणी-अभ्यासः** (Table practice): five declension tables in a row, from a few blanks up to the whole table from memory.
- **वेग-अभ्यासः** (Speed round): 60 seconds of true or false, tapping as fast as possible. Once a learner has started pronouns, about one item in four is a pronoun.
- **रूपावलिः** (All forms): the full declension table of any word in the list.
- **सर्वनामाभ्यासः** (Pronouns): twelve questions and one table on सः, सा, तत्, अहम्, त्वम् and the rest (section 17).

### Hints and feedback

Every question has a **सङ्केतः (Hint)** button:
- The **first tap** shows the English meaning: of the sentence, or of the word itself on word questions.
- The **next tap** shows a pattern word to compare with, where there is one.
- The **second tap** shows the grammar rule, such as "सह always takes तृतीया".
- A right answer after a hint earns half credit.

After each answer, a panel shows:
- whether it was right,
- the correct form,
- the word, its class, and which vibhakti and number it is,
- a note on the specific mistake, if the learner made a known one,
- a button to see the word's full table,
- for sentences, a button to see the English meaning.

### Lamps and streaks

Seven small lamps show the last seven days. Vibhakti practice and reading light the same lamps. The script page keeps its own lamps, since some learners will use only one of the two.

### Settings

The gear button opens settings:
- **Text size**, in three steps.
- **All vibhaktis**, which opens every vibhakti at once.
- **Export and import** progress (section 8).
- **Reset**, which erases vibhakti, script and reading progress together.

## 5. The 13 kinds of exercise

Everything is shown in Devanagari. Only the one-line instruction, the hints and a few short notes are in English.

| # | Exercise | What the learner does | What it trains |
|---|---|---|---|
| 1 | Choose the form | Given a word, vibhakti and number, picks the right form from four | Recall of endings |
| 2 | Build the form | Taps akshara tiles in order to spell the form. Extra decoy tiles are mixed in | Recall without options to lean on. No Devanagari keyboard needed |
| 3 | Fill in the blank | Completes a sentence, choosing from options | Knowing *when* each vibhakti is used |
| 4 | Fill in the blank with tiles | Same, but builds the answer from tiles | The hardest form of sentence recall |
| 5 | Follow the pattern | e.g. भ्रमरे → भ्रमरेण, so आपणे → ? | Transfer between words. Often sets a न/ण trap on purpose |
| 6 | Which vibhakti? | Names the vibhakti and number of a form. If a form has several (e.g. फलम्), picks all of them | Recognition for reading |
| 7 | Change the number | Turns एकवचनम् into बहुवचनम् or back, keeping the vibhakti | Number endings |
| 8 | Odd one out | Four words from different classes; three share a vibhakti, one does not | Seeing the ending, not the word |
| 9 | Find the mistake | Taps the wrong word in a sentence, or chooses "all correct" | Proofreading, subject and verb agreement |
| 10 | Which question word | Picks the form of किम् (कः, कस्मै, कस्याः ...) that asks about the marked word | Analysing sentences, as in reading |
| 11 | Which base word | Given रमायाः, picks the base word and class | Looking words up while reading |
| 12 | Match pairs | Matches four forms to four vibhakti labels | Quick recognition |
| 13 | **Complete the table** | Fills blanks in a declension table from a bank of forms with decoys | Memorising full paradigms |

The table exercise comes in five sizes, and the app picks larger ones as the learner improves:

| Size | What is blank |
|---|---|
| small | 3 or 4 scattered boxes |
| rows | two whole vibhakti rows plus one more box |
| column | the whole एकवचनम् or बहुवचनम् column |
| large | about 60% of the table |
| full | everything except प्रथमा एकवचनम् |

The decoys in the bank are real learner mistakes, such as the ending of the other gender, न instead of ण, or सु instead of षु, so the table cannot be solved by elimination alone.

**Sentence difficulty.** Sentences come in three levels:
- **Simple:** बालकः पाठं पठति।
- **Medium:** भ्रमराः पुष्पे उपविशन्ति।
- **Literary:** यदा वर्षा भवति तदा पुत्र्यः गृहे एव तिष्ठन्ति।

Beginners see mostly simple sentences. Learners who know a skill well see mostly medium and literary ones.

---

## 6. How it decides what to ask

Each of the 64 skills (for example, "ईकारान्त स्त्रीलिङ्ग, षष्ठी बहुवचनम्") has its own memory record.

**The memory model**
- Each skill has a half-life in hours. The chance the learner still remembers it is 2 ^ (−hours since last practice ÷ half-life).
- A right answer makes the half-life longer: × 1.6 normally, × 2.0 for harder exercises (tiles, finding the mistake, किम्, tables), and × 1.2 if a hint was used.
- A wrong answer halves it, but never below 4 hours.
- So skills the learner knows well come back after days or weeks, and weak ones come back the same day or the next.

**Choosing skills for a session.** Each skill gets a score, and the highest scores are practised:
- **Fading:** how much it has probably been forgotten (half the score).
- **Weak:** how many of its last 8 answers were wrong (a third of the score).
- **New:** a bonus if it has hardly been practised.
- A little randomness, so sessions do not repeat.
- Two questions in a row never share both the class and the vibhakti.

**Choosing the exercise type** depends on how well that skill is known:

| Stage | Mostly |
|---|---|
| New | choose the form, which vibhakti, follow the pattern, simple sentences |
| Practising | sentences, tiles, change the number, किम्, some mistake-finding |
| Strong | literary sentences, tiles, finding the mistake, किम्, odd one out |

The same type is never used twice in a row.

**Choosing words.** From the words that fit, the app prefers the ones the learner has not seen for the longest time. It never repeats any of the last 8 words. For sentences, it picks the sentence pattern first and then the word, and avoids the last 12 patterns. This keeps sessions fresh even after weeks of daily use.

**Progress grid colours**

| Colour | Meaning |
|---|---|
| dark | started |
| brown | practising |
| gold | strong: 5 or more right, 70% or better recently |
| palm-leaf | mastered: half-life of at least 3 days |

Each box shows the weaker of that vibhakti's two numbers.

---

## 7. The order vibhaktis open in

New learners start with two vibhaktis, and the rest open in groups:

1. प्रथमा, द्वितीया
2. तृतीया
3. चतुर्थी, पञ्चमी
4. षष्ठी, सप्तमी
5. सम्बोधनम्

**When the next group opens.** It opens after a session in which both of these are true:
- every open skill in every class has been answered right at least once, and
- about 3 of the last 4 answers (75% of the last 30) were right.

A daily learner typically opens everything in about two weeks. The final two weeks of the month are then spent on mixed review, harder sentences and full tables.

Each time a group opens, the next session starts with a short introduction. It covers what the vibhakti is used for (in one English line), two example sentences, and the forms of राम, रमा, नदी and फल.

Learners who already know the basics can open everything at once in settings.

---

## 8. Where progress is kept

Progress is saved in the browser on that device (`localStorage`, key `vibhakti-abhyasa-v2`).

- Nothing is sent anywhere. There are no accounts, no tracking and no analytics.
- A different phone, or a different browser on the same phone, starts fresh.
- Clearing the browser's site data erases progress.
- Safari on iPhone may clear data for websites that have not been opened for several weeks.

**Moving progress to another phone, or keeping a backup.**
1. Open settings (the gear) and tap **निर्यातः (Export)**. A small file downloads, and the same text is copied to the clipboard.
2. On the other phone, open settings, tap **आयातः (Import)** and paste the text.

The import checks that the text really is progress from this app before replacing anything, and asks first.

**Upgrading from the first version.** The first version saved under `vibhakti-abhyasa-v1`. On first opening, the new version copies everything from that key into the new one, and leaves the old key untouched. If you ever go back to the old version, its progress is still there.

**What is stored:**

| Field | What it holds |
|---|---|
| `skills` | the memory record of every vibhakti skill, from drills and reading alike |
| `words` | when each word was last seen, so words rotate |
| `days` | days with vibhakti or reading practice (the lamps) |
| `unlocked`, `introduced` | how many vibhakti groups are open and have been introduced |
| `recent` | the last 40 answers, used to decide when the next vibhaktis open |
| `total`, `best` | lifetime answers, and the best speed-round scores |
| `settings` | text size, "all vibhaktis", the current tab, and the saved focus selection |
| `lipi` | the script page's own skills, days, totals, stage and recent answers |
| `read` | which stories have been read, with the score for each |
| `pron` | reserved for pronouns (not built yet) |

## 9. Adding or changing words

Words live in `js/words.js`, one per line, in four blocks (one per class). The format is:

```
stem|English (one)|English (many)|categories|flags
```

Examples:

```
छात्र|student|students|person
नदी|river|rivers|water dest
जल|water||drink|mass
गणेश|Ganesha||deity|proper
```

**Rules for the stem**
- अकारान्त words (masculine and neuter) are written without any ending: `छात्र`, not `छात्रः`.
- आकारान्त words end in ा: `लता`.
- ईकारान्त words end in ी: `नदी`.
- Only put regular words in these classes. Words like लक्ष्मीः, स्त्री or श्री decline differently and must not be added here.

**English** is only used in hints. Leave the plural empty for names and uncountable words.

**Flags** (optional):
- `proper` for names,
- `mass` for uncountable things,
- `sg` for words that should only appear in the singular.

A word with any of these flags is never drilled in बहुवचनम्.

**Categories** decide which sentences a word can appear in. A word can have several, separated by spaces:

| Category | Meaning | Used in sentences like |
|---|---|---|
| person | a human being | doer, recipient, सह, सम्बोधनम् |
| elder | teachers, parents, kings | नमति, नमः, विद्यां प्राप्नोति |
| child | children | कथां कथयति, स्निह्यति |
| deity | gods and goddesses | पूजयति, पुष्पाणि अर्पयति |
| animal, bird, creature | animals, birds, insects | पश्यति, पुच्छम्, कूजति |
| pet | animals kept at home | पालयति, दुग्धं ददाति |
| fearsome | things people fear | बिभेति |
| plant | trees and creepers | फलं पतति, सिञ्चति |
| fruit, flower | things that fall or are picked | वृक्षात् पतति, चिनोति |
| dwell | places people live | वसति, मध्ये |
| dest | places people go to | गच्छति, आगच्छति |
| study | places of study | पठति, पुस्तकानि सन्ति |
| temple, garden, forest | kinds of place | परितः, वानराः सन्ति |
| water | rivers, lakes, the sea | तरति, मत्स्याः सन्ति |
| mountain | mountains | अवतरति |
| reading, writable, hearable | books, letters, songs | पठति, लिखति, शृणोति |
| tool, eye, ear | instruments | लिखति, पश्यति, शृणोति (तृतीया) |
| container | pots, cups, bottles | जलम् अस्ति, जलम् आनयति |
| seat | chairs, beds, swings | उपविशति, उत्तिष्ठति |
| vehicle | chariots, bicycles, boats | गच्छति (तृतीया), अवतरति |
| wear, washable, openable, cookable, buyable | everyday objects | धारयति, प्रक्षालयति, उद्घाटयति, पचति, क्रीणाति |
| food, drink | things eaten or drunk | खादति, पिबति |
| time, festival | times and occasions | व्यायामं करोति, प्रसन्नाः भवन्ति |
| skill | arts and knowledge | कुशलः अस्ति |
| purpose | activities one goes for | स्नानाय गच्छति, पूर्वम्, अनन्तरम् |
| sound | things with a sound | ध्वनिः मधुरः |
| celestial | sun, moon, stars, clouds | आकाशे दृश्यते |
| abstract, object | general | tables and word exercises |

A word does not need any sentence category. It will still appear in all the word, form and table exercises.

---

## 10. Adding or changing sentences

Sentence patterns live in `js/frames.js`. Each is one line:

```js
F("tri05","tri",1,"saha","person pet","{S} {X} सह गच्छति।","{S} goes with {X}.",{strict:true});
```

The parts, in order:

| Part | Example | Meaning |
|---|---|---|
| id | `"tri05"` | any unique name |
| vibhakti | `"tri"` | `pra dvi tri cat pan sha sap sam` |
| difficulty | `1` | 1 simple, 2 medium, 3 literary |
| kind | `"saha"` | which rule the hint shows (see `VB.RULES` at the top of the file) |
| categories | `"person pet"` | words with any of these categories can fill `{X}` |
| Sanskrit | `"{S} {X} सह गच्छति।"` | the sentence |
| English | `"{S} goes with {X}."` | its meaning, shown only in the hint |
| options | `{strict:true}` | see below |

**Placeholders**

| Placeholder | Becomes |
|---|---|
| `{X}` | the word being practised, in the right form |
| `{S}` | a person doing the action, always प्रथमा एकवचनम् |
| `{v:A\|B}` | A when `{X}` is singular, B when plural. For verb agreement: `{v:पठति\|पठन्ति}` |
| `{g:A\|B}` | A when `{S}` is masculine, B when feminine: `{g:कुशलः\|कुशला}` |
| `{B}` | भवान्, भवती, भवन्तः or भवत्यः, matching `{X}` |
| `{X's}` | in the English only: the possessive, "the boy's" |
| `{Xv}` | in the English only: the form of address, "O boy" |

**Options**

| Option | Meaning |
|---|---|
| `strict:true` | the sentence forces one vibhakti (सह, नमः, परितः, verb agreement), so near-miss vibhaktis can be used as wrong options |
| `cue:true` | the verb already shows singular or plural, so the number is not printed under the sentence |
| `nums:["eka"]` | singular only, for sentences that sound odd in the plural |
| `only:"लेखनी हस्त"` | only these words may fill `{X}` |
| `ex:"कूप"` | these words may not fill `{X}` |

---

## 11. Checking your changes

After editing words, sentences, script data or stories, run:

```
node tools/check.js
```

This needs Node.js, free from https://nodejs.org. It changes nothing. It checks:

1. known declensions, including the tricky ण cases,
2. every word's spelling matches its class, and no word is listed twice,
3. every sentence pattern has words that fit it,
4. about 13,000 generated vibhakti questions and 200 tables, for duplicate options, a single right answer, missing tiles and unfilled placeholders,
5. that progress saved by the first version survives the upgrade with every field intact,
6. the script tables: every confusion entry is a real character, every conjunct is its two parts joined by ्, and every listed transliteration matches how the app reads the character,
7. about 5,000 generated script questions at every stage,
8. every marked word in every story, regenerated from the grammar engine and compared with the word as written (section 16),
9. the pronoun tables (section 17): all 21 cells in every paradigm, the known syncretisms, agreement with the separate किम् table in `grammar.js`, the regular patterns that link तद्, एतद्, यद्, किम्, इदम्, अहम् and त्वम् to each other, and a second hand-written copy of the fifteen forms no pattern reaches,
10. every pronoun sentence: one blank, an answer that exists, and gender agreement wherever the blank describes the next noun,
11. about 6,800 generated pronoun questions, including a check that no sentence ever offers a wrong answer that is actually good Sanskrit,
12. every picture listed in `js/images.js` exists and belongs to a word in the list,
13. every recording listed in `js/audio.js` exists,
14. saved settings the app does not know about survive a reload (so nothing added later is ever silently lost).

It ends with "All checks passed." or a list of what to fix. It also prints which story cells have few or no marked words yet, as a warning, not a failure.

**The independent cross-check.** `tools/crosscheck.py` declines every word with a second declension engine written separately in Python, and compares all 16 forms of every word with the site's own engine. At the time of writing, both agree on all 9,392 forms of the 587 words. It needs Python and one package:

```
pip install indic_transliteration
python3 tools/crosscheck.py
```

The site itself never uses this script or its package.

## 12. Updating the live site

Upload the changed files as described in section 2.

The site always loads the newest files when a phone is online. It keeps a copy for offline use, which is refreshed each time. So learners get updates automatically the next time they open it with internet. If you add a new file (a new script, a new story file), add its path to the `FILES` list in `sw.js`, or the site will not work offline. Changing existing files needs nothing.

---

## 13. What each file does

```
index.html              the page itself; loads the scripts below, in this order
manifest.webmanifest    name, colours and icon for "Add to Home Screen"
sw.js                   offline support. Every file the site uses is listed in FILES here
css/style.css           all colours, fonts and layout
fonts/                  Tiro Devanagari Sanskrit and Mukta, with their licence (OFL.txt)
icons/                  app icons

js/grammar.js           the declension engine and ण rule. Verified; do not change its logic
js/words.js             the 587 words
js/images.js            which word pictures exist (written by tools/images.py)
js/audio.js             which recordings exist (written by tools/audio.py)
js/pronouns.js          the seventeen pronoun tables, written out in full
js/pronoun-frames.js    the 63 pronoun sentences
js/frames.js            the 276 sentence patterns, hint rules, and introductions to each vibhakti
js/lipi.js              letters, vowel signs, conjuncts, confusion sets and script stages
js/stories-l1.js        the level 1 story corpus
js/store.js             progress (schema v2), the memory model, session planning, unlock gates
js/questions.js         the 13 vibhakti exercise generators
js/lipi-questions.js    the 6 script exercise generators, and transliteration
js/pron-questions.js    the pronoun exercise generators

js/app-shell.js         shared pieces on VB.UI: DOM helper, icons, panels, tables, tab bar, router
js/app-drill.js         अभ्यासः: daily, massed and focused practice, tables, speed round, all forms
js/app-read.js          पठनम्: story list and the line-by-line reader
js/app-script.js        लिपिः: script sessions and the letter speed round
js/app-settings.js      प्रगतिः page and the settings panel, including export and import

tools/check.js          the self-check (section 11)
tools/crosscheck.py     the independent Python cross-check (section 11)
tools/engine_py.py      the Python declension engine it uses
tools/images.py         the picture tool (section 18)
tools/audio-plan.js     builds the recording checklist from the word list (section 19)
tools/audio.py          cuts recordings into clips (section 19)

docs/ARCHITECTURE.md    the design document: what is built, and the plan for what comes next

audio/README.md         how to record, step by step
audio/takes.csv         every recording to make, what to read, and what is done
audio/words-to-record.txt  the words that get full recorded tables (edit freely)
audio/drop/             where you put new recordings (not uploaded)
audio/clips/            the clips the site plays

img/README.md           how to make and add word pictures
img/STYLE.txt           the style paragraph to give Gemini
img/checklist.csv       every word, its picture file name, what to ask for, and what is done
img/drop/               where you put new pictures (not uploaded)
img/words/              the pictures the site shows
```

**How the pieces fit.** Page files never call each other. Each one registers itself with `VB.UI.page(name, render)`, and the router in `app-shell.js` renders the page for the current tab. Shared widgets (the feedback panel, the top bar, the declension table) live only in `app-shell.js`.

**The module registry.** `store.js` defines `VB.MODULES`. Each module is a list of members (for nouns, the four classes) and a list of cells (vibhakti and vacana pairs). Skill keys are always `member:cell`, for example `a:sap.eka`. The planner and the progress grid read the registry instead of assuming four classes, eight vibhaktis or two vacanas. This is what lets pronouns and verbs be added as data later.

**How the grammar works.** The app does not store a list of forms. `grammar.js` builds every form from the stem using the standard endings for each class, then applies the ण rule letter by letter. The reading corpus follows the same rule: marked words are stored as stem, class and cell, never as typed forms.

## 14. Things to know

- **Grammar is guaranteed by rule; naturalness is not.** Every form is generated, and every sentence pattern was written by hand. But word-and-sentence combinations are made automatically, so now and then one may be grammatical but a little odd. If a teacher spots one, tighten that pattern's categories or add the word to its `ex` list.
- **Scope.** द्विवचनम् and other noun classes are not included yet. The pronoun tables already carry द्विवचनम्, switched off. The code is written so that both arrive as data: nothing assumes two vacanas or four classes.
- **Verbs** in the sentences are simple लट् and लोट् forms, with a few ल्यप्/क्त्वा forms and one तुमुन् in the literary sentences.
- **English** appears in the instruction line, hints, notes, settings, story glosses and transliteration on the script page. Everything a learner reads as Sanskrit and answers is in Devanagari.

---

## 15. The script page

**लिपिः** teaches reading Devanagari, so that the vibhakti drills can be read without decoding letter by letter.

A session is twelve questions with the same hint button, feedback panel and "अग्रे" as the drills. There are six exercises:

| # | Exercise | Shown | The learner picks |
|---|---|---|---|
| 1 | Letter to sound | भ | bha |
| 2 | Sound to letter | bha | भ |
| 3 | Vowel sign | क + ◌ी | की |
| 4 | Conjunct | क्ष | क + ष |
| 5 | Word reading | मन्दिरम् | mandiram |
| 6 | Find the letter | a word with one syllable marked | its first letter |

**Wrong options are real confusions.** Every character in `lipi.js` has a confusion set, and wrong options come from it first: ध/घ, भ/म/स, प/ष, ब/व, and for conjuncts the reversed reading order (र्म offers म + र, the classic रेफ mistake). Word-reading options swap one letter for a confusable one, so "dharmaḥ" is offered beside "gharmaḥ" and "dharbhaḥ".

**Words come from the vibhakti word list**, so every word decoded here is one the learner will meet in a drill. Only words made entirely of characters the learner has already opened are shown.

**Stages.** Characters open in the ten stages set out in `lipi.js`. It starts with eight vowels, then common consonants, then vowel signs, and ends with conjuncts and the रेफ/रकार forms. The next stage opens by the same rule as vibhaktis: everything open has been answered right at least once, and about 3 in 4 recent answers are right.

Letters have their own memory map, lamps and speed round. The script grid on प्रगतिः shows how well each letter is known.

---

## 16. The reading page and adding stories

**How reading works.** A story comes in short passages of three or four lines, shown as plain text. Nothing is underlined or marked while you read, so the story reads like a story.

1. Read the passage. The **अर्थः** button shows its English meaning, only if asked for.
2. Tap **प्रश्नाः** (Name the words). The app walks through that passage's marked words one at a time. Only the current word is highlighted, and the page keeps it in view.
3. A small panel at the bottom asks for three things with chips: liṅga (पुं. स्त्री. नपुं.), vacana (एक. बहु.) and vibhakti. Tap one of each, then **परीक्षताम्**.
   - **Right:** a quiet "साधु", and the next word comes up by itself.
   - **Wrong:** the correct answer, with the word's full table one tap away, then **अग्रे**.
   - **न जानामि** (I don't know) shows the answer without guessing. It counts as not yet known.
4. After the last word, the passage's score shows, and **अग्रिमः भागः** brings the next passage. Finished passages stay above, slightly dimmed, so the story builds on the screen with no leftover marks.

An answer is right only when all three match. Every answer goes into the same memory store as the drills, so the progress grid counts reading too. A finished story is recorded with its score and can be read again.

The learner is asked for **liṅga, not class**. A reader looking at नद्याः should think "feminine", not "ईकारान्त स्त्रीलिङ्ग". The class is still what gets recorded.

**Levels.** Level 1 is open. Levels 2 to 4 are shown as "work in progress".

**Adding a story.** Stories live in `js/stories-l1.js`:

```js
{
  id: "pt-001",                         // unique; prefix pt- ht- sb- rm- mb- pu- or-
  title: "सिंहः मूषकः च",
  source: "Pañcatantra, Mitrabheda",   // required for verbatim and adapted
  provenance: "retelling",             // verbatim | adapted | retelling
  difficulty: 1,                        // 1 to 3
  lines: [
    {
      sa: "एकस्मिन् वने सिंहः वसति स्म।",
      en: "In a certain forest there lived a lion.",
      marks: [
        { tok: 1, stem: "वन",  cls: "n", cell: "sap.eka" },
        { tok: 2, stem: "सिंह", cls: "a", cell: "pra.eka" }
      ]
    }
  ]
}
```

- `tok` counts words in `sa`, from 0, split on spaces.
- **A mark is never a typed form.** It is a stem, a class and a cell. The checker regenerates the form with the grammar engine and fails if it does not equal the word in the line. A mislabelled word fails the check instead of quietly teaching the wrong thing.
- **A marked word must be in `js/words.js`.** Other words can appear in a line; they simply cannot be marked.
- **Only level 1 nouns are marked.** Pronouns, verbs and indeclinables are supporting vocabulary, covered by the line's English gloss, and are never quizzed.
- **Sandhi.** If a marked word would change through sandhi with its neighbour, write the line without that sandhi, or leave the word unmarked. The one exception the checker allows is a final म् written as anusvara before a consonant (गृहं गच्छति), which is how the app spells running Sanskrit anyway.

Run `node tools/check.js` after adding stories. It verifies every mark and prints which cells still have few examples, so gaps are easy to fill.

---

## 17. Pronouns

**सर्वनामाभ्यासः** on the अभ्यासः tab is a separate twelve-question session with one pronoun table.

**Order.** Pronouns open in six groups, each with a short introduction showing the new tables:
1. तद् (सः, सा, तत्)
2. एतद्
3. किम्
4. अस्मद् and युष्मद् (अहम्, त्वम्)
5. इदम्
6. यद्

The next group opens by the same rule as vibhaktis. This track has its own counter, so pronoun practice never holds back vibhaktis, and vibhakti practice never opens pronouns.

**Exercises.** Choose the form, build it from tiles, which vibhakti, change the number, true or false, which pronoun, odd one out, follow the pattern, find the mistake, fill in the blank, and the table. Two are new:
- **Agreement:** बालकाय is shown, and the learner picks तस्मै.
- **Substitution:** a vibhakti sentence with one noun marked (रामेण सह गच्छति), and the learner replaces it with the right form of तद् (तेन).

**In the daily practice.** Once every vibhakti is open, two of the twelve daily questions are pronoun questions.

**In the selection cards.** सरल-अभ्यासः takes a pronoun instead of a word class. अभ्यासं वृणुत takes pronouns too; choosing one swaps the word-class row for a liṅga row. सम्बोधनम् is locked while a pronoun is chosen, since pronouns have none.

**Why the tables are written out.** Nouns are generated by rule. Pronouns are irregular, so `js/pronouns.js` is the one place forms are typed by hand. That is why the checker holds them to the strictest test in the project (section 11). `VB.PRON_SHOW_DVA` switches on the द्विवचनम् column when that phase arrives.

**Wrong options in pronoun sentences** are chosen so they are wrong in every reading, not just unexpected. Another pronoun is never offered as a wrong answer there (एषः वृक्षः उन्नतः is as correct as अयम् वृक्षः उन्नतः). Nor is the other number of अहम् or त्वम् (माता अस्मान् आह्वयति is fine Sanskrit).

---

## 18. Word pictures

Pictures show what a word means without English. They are entirely optional: a word without a picture looks exactly as it did before, with no empty box.

The full guide is in **`img/README.md`**. In short:
1. Paste `img/STYLE.txt` into a Gemini chat once.
2. For each word, ask for the text in the checklist (`img/checklist.csv`), such as `Draw: one boy.`
3. Save it as the checklist's file name (`baalaka.png`) in `img/drop/eka/`, `img/drop/dva/` or `img/drop/bahu/`.
4. Run `python3 tools/images.py`. It makes 512 × 512 WebP files, updates `js/images.js`, and ticks the checklist.
5. Upload `img/words/`, `js/images.js` and `img/checklist.csv`.

Pictures appear on the questions about one word's meaning, in the question's number, and never on questions that test the number. Section "Where pictures appear" in `img/README.md` has the full list.

---

## 19. Recordings for the script page

Recordings are for the **लिपिः** page only: learners will hear a word and pick how it is written, with no English letters. The page starts using them in the next build. The pipeline to make them is ready now.

The full guide is **`audio/README.md`**. In short:
1. Open `audio/takes.csv`. Each row is one take: a short list of forms to read in order.
2. Record on the iPhone, naming each recording by its id (`B001`), or record a run of takes and name it by the range (`B001-B030`).
3. Drag the recordings from Voice Memos on the Mac into `audio/drop/`.
4. Run `python3 tools/audio.py`. It cuts every take into one clip per form, evens out the volume, marks anything that needs redoing, and updates `js/audio.js`.
5. Upload `audio/clips/`, `js/audio.js` and `audio/takes.csv`.

To change which words get full tables, edit `audio/words-to-record.txt` and run `node tools/audio-plan.js`.

---

## Add to home screen

After two days of practice, phones show a small card on the अभ्यासः tab suggesting the site be added to the home screen, with the right steps for iPhone or Android. It never shows inside the installed app, and "Not now" hides it for good. The site also asks the browser to keep its data even when the phone runs short of space.
