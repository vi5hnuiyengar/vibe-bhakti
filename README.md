# विभक्तिः · Vibhakti daily practice

A small website for practising Sanskrit vibhaktis for about five minutes a day.
It runs on any phone or computer, works without internet once opened, and needs no account.

It covers the four most common noun classes, all seven vibhaktis and सम्बोधनम्, in एकवचनम् and बहुवचनम्:

| Class | Pattern word |
|---|---|
| अकारान्तः पुंलिङ्गः | राम |
| आकारान्तः स्त्रीलिङ्गः | रमा |
| ईकारान्तः स्त्रीलिङ्गः | नदी |
| अकारान्तः नपुंसकलिङ्गः | फल |

That is 64 skills (4 classes × 8 vibhaktis × 2 numbers), drilled with 282 everyday words and 155 sentence patterns.

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

On the home screen, the learner taps **आरभताम्** (Start). A daily session is:

- **12 questions**, mixed from the exercise types below.
- **2 declension tables** to fill in. One comes after the fourth question and one near the end.
- **Up to 3 second chances.** Skills the learner got wrong come back at the end, as a different exercise with a different word.

This takes about five minutes.

Every question has a **सङ्केतः (Hint)** button:
- The **first tap** shows the English meaning of the sentence, or a pattern word to compare with.
- The **second tap** shows the grammar rule, such as "सह always takes तृतीया".
- A right answer after a hint earns half credit, so hints help without inflating progress.

After each answer, a panel shows:
- whether it was right,
- the correct form,
- the word, its class, and which vibhakti and number it is,
- a note on the specific mistake, if the learner made a known one,
- a button to see the word's full table, with the practised cell highlighted,
- for sentences, a button to see the English meaning.

The home screen also shows:
- seven small lamps (दीपाः) for the last seven days, lit on days with practice, and the streak count,
- a progress grid with the 4 classes (rows) × 8 vibhaktis (columns),
- three extra modes:
  - **सारणी-अभ्यासः** (Table practice): five declension tables in a row, from a few blanks up to the whole table from memory.
  - **वेग-अभ्यासः** (Speed round): 60 seconds of true or false, tapping as fast as possible. The best score is kept.
  - **रूपावलिः** (All forms): the full declension table of any word in the list, for reference.

The gear button at the top right opens settings:
- **Text size**, in three steps.
- **All vibhaktis**, which opens every vibhakti at once for learners who already know the basics.
- **Reset**, which erases progress on this device.

---

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

Progress is saved in the browser on that device (`localStorage`, key `vibhakti-abhyasa-v1`).

- Nothing is sent anywhere. There are no accounts, no tracking and no analytics.
- A different phone, or a different browser on the same phone, starts fresh.
- Clearing the browser's site data erases progress.
- Safari on iPhone may clear data for websites that have not been opened for several weeks. Using the site regularly, or adding it to the home screen, avoids this.

---

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

After editing words or sentences, run:

```
node tools/check.js
```

This needs Node.js, free from https://nodejs.org. The script changes nothing. It:

1. checks known declensions, including tricky ण cases like रामेण, कृष्णेन, कुमारीणाम् and भाषणेन,
2. checks every word's spelling matches its class, and that no word is listed twice,
3. checks every sentence pattern has words that fit it,
4. generates about 13,000 questions and 200 tables, and checks each for duplicate options, a single right answer, missing tiles and unfilled placeholders.

It ends with "All checks passed." or a list of what to fix.

---

## 12. Updating the live site

Upload the changed files as described in section 2.

The site always loads the newest files when a phone is online. It keeps a copy for offline use, which is refreshed each time. So learners get updates automatically the next time they open it with internet. There is no need to change anything in `sw.js`.

---

## 13. What each file does

```
index.html              the page itself; loads everything below
manifest.webmanifest    name, colours and icon for "Add to Home Screen"
sw.js                   offline support (network first, saved copy as fallback)
css/style.css           all colours, fonts and layout
fonts/                  Tiro Devanagari Sanskrit (Sanskrit text) and Mukta (English text), both open-licence
icons/                  app icons
js/grammar.js           the declension engine, the ण rule, the list of learner mistakes, forms of किम्
js/words.js             the 282 words
js/frames.js            the 155 sentence patterns, hint rules, and introductions to each vibhakti
js/store.js             progress, the memory model, choosing skills, opening new vibhaktis
js/questions.js         the 13 exercise generators
js/app.js               screens, buttons, feedback, tables, speed round, settings
tools/check.js          the self-check described in section 11
```

**How the grammar works.** The app does not store a list of forms. `grammar.js` builds every form from the stem using the standard endings for each class. It then applies the ण rule (णत्वम्) letter by letter: र, ष or ऋ earlier in the word turns the ending's न into ण, unless a blocking letter comes in between. This engine was checked against a separate Python implementation on all 2,416 forms of the first 151 words, with no differences.

**How wrong options are made.** Wrong options are the mistakes learners really make:
- the same ending from another gender or class,
- the right vibhakti with the wrong number,
- a neighbouring vibhakti,
- न instead of ण or the reverse,
- सु instead of षु,
- प्रथमा used for सम्बोधनम्,
- the known traps रामाः for रामान् and नदीः for नद्यः.

Each wrong option carries a tag, so the feedback can explain the exact slip.

---

## 14. Things to know

- **Grammar is guaranteed by rule; naturalness is not.** Every form is correct because it is generated by rule, and every sentence pattern was written by hand. But word-and-sentence combinations are made automatically, so now and then one may be grammatical but a little odd, such as a king being given a fruit. If a teacher spots one, tighten that pattern's categories or add the word to its `ex` list.
- **Scope.** द्विवचनम् and other noun classes (इकारान्त, उकारान्त, ऋकारान्त, consonant stems, pronouns) are not included yet. The engine and word format are built so these can be added later.
- **Verbs** in the sentences are simple लट् and लोट् forms, with a few ल्यप्/क्त्वा forms (गत्वा, कृत्वा, प्रज्वाल्य) and one तुमुन् (पठितुम्) in the literary sentences.
- **English** appears in the instruction line, hints, notes and settings. Everything a learner reads and answers is in Devanagari.
