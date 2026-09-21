# Vibhakti Abhyāsa: Expansion Architecture

**Target repository:** `vi5hnuiyengar/vibe-bhakti`
**Status:** specification only, no code written yet
**Audience:** the model or developer implementing this
**Deployment assumption:** standalone static site (GitHub Pages or Netlify). Not folded into Akshara.

---

> **Status, September 2026.** Phases 1 to 6 and 3b are built, and so are word pictures and the recording pipeline. Sections 1 to 3 describe the starting point. The five fixes found while building the data are applied in 9, 10.3, 10.4.2, 10.7 and 11. Decisions made since are in 12, 15, 16, 17 and 18. `CHANGELOG.md` has the build history.

## 0. How to use this document

Sections 1 through 3 are context and constraints. Read them before writing anything.

Sections 4 through 9 are the build specification, one section per page or subsystem.

Section 10 defines the data contracts. Datasets are delivered separately and will arrive in these exact shapes.

Section 11 is the build order. Follow it. Each phase leaves the site working.

Section 12 lists what is deliberately out of scope.

A ready-to-paste handover prompt is at the end, in Section 14.

---

## 1. What exists today

The current site is complete and working. It is 3,329 lines across 19 files, with no dependencies, no build step, and no server.

| File | Lines | Role |
| --- | --- | --- |
| `index.html` | 32 | Loads six scripts in order, registers the service worker on https only |
| `js/grammar.js` | 216 | Declension engine, ṇatva rule, mistake taxonomy, किम् forms, akshara splitter |
| `js/words.js` | 309 | 282 words as pipe-delimited strings in four class blocks |
| `js/frames.js` | 231 | 155 sentence patterns, 21 rule explanations, per-vibhakti introductions |
| `js/store.js` | 148 | Spaced repetition model, session planning, unlock gate, streaks |
| `js/questions.js` | 494 | 13 question generators |
| `js/app.js` | 757 | Every screen, all DOM, all interaction |
| `css/style.css` | 270 | All styling, design tokens on `:root` |
| `sw.js` | 35 | Network-first service worker with cache fallback |
| `tools/check.js` | 87 | Headless self-test, runs under Node with a three-line shim |

`tools/check.js` currently passes clean: 282 words, 155 frames, 13,475 generated questions validated.

The ṇatva engine in `grammar.js` has been independently audited across all 282 words. Of 247 decisions (211 applications, 36 correct blocks where a trigger is present but blocked), all are correct. Verified cases include `पर्यङ्केण`, `हृदयेन`, `अरण्येन`, `रोटिकानाम्`, `पृथ्वीनाम्`, and `दूरदर्शनेन`.

---

## 2. Non-negotiable constraints

These carry forward unchanged. Violating any of them is a regression.

**2.1 No dependencies, no build step.** Plain scripts loaded by `<script>` tags. No npm, no bundler, no framework, no transpilation. The site must continue to work by opening `index.html` directly from disk (minus bundled fonts, which some browsers block on `file://`).

**2.2 Do not modify `js/grammar.js`.** The declension engine and ṇatva rule are verified correct. Adding new exports is allowed. Changing existing logic is not.

**2.3 Devanagari first.** Everything the learner reads as content and everything they answer is in Devanagari. English appears only in the one-line instruction, hints, mistake notes, settings labels, and story glosses.

**2.4 Every form is generated, never stored, with one declared exception.** No hardcoded declension tables for nouns anywhere in the new code. Call `VB.decline(stem, cls)[cell]`. This extends to the story corpus, see Section 10.4.

The one exception is **pronouns**. Sanskrit pronouns are genuinely irregular: there is no suffix rule to apply, which is why they are memorised rather than derived. They ship as literal paradigm tables in `js/pronouns.js` and are held to a stricter checker instead (Section 11). They sit behind the same interface, so callers never know the difference.

**2.5 Mobile first, five minutes a day.** Minimum tap target stays at `--tap: 60px`. The site must remain usable one-handed on a phone and legible to older learners at all three text sizes.

**2.6 Offline after first visit.** Every new file must be added to the `FILES` array in `sw.js`.

**2.7 Progress stays local.** `localStorage` only. No accounts, no network calls, no analytics.

**2.8 Simplicity over completeness.** When a feature could be built two ways, build the simpler one. This project is deliberately small.

---

## 3. Target file structure

`js/app.js` is 757 lines today and these additions would push it past 2,000. Split it. Do not split `index.html`.

```
index.html              one page, loads everything below
manifest.webmanifest    unchanged
sw.js                   add every new file to FILES
css/style.css           extend, do not restructure
fonts/                  unchanged
icons/                  unchanged

js/grammar.js           UNCHANGED
js/words.js             expanded lexicon (session 3)
js/frames.js            expanded sentence frames (session 4)
js/lipi.js              NEW: akshara, matra and conjunct tables (session 2)
js/pronouns.js          NEW: pronoun paradigm tables (session 2b)
js/pronoun-frames.js    NEW: pronoun sentence frames (session 4b)
js/stories-l1.js        NEW: level 1 story corpus (session 5)
js/store.js             extended: v2 schema, lipi and reading state
js/questions.js         extended: massed-mode generator filter
js/lipi-questions.js    NEW: the six script exercise generators
js/app-shell.js         NEW: router, tab bar, DOM helper, icons, shared widgets
js/app-drill.js         daily session, massed mode, focused mode, tables, speed
js/app-read.js          NEW: reading page
js/app-script.js        NEW: script page
js/app-settings.js      settings panel and progress page

tools/check.js          extended, see Section 11
```

**Script load order in `index.html`** (order matters, these are plain globals):

```
grammar.js
words.js
frames.js
pronouns.js
pronoun-frames.js
lipi.js
stories-l1.js
store.js
questions.js
lipi-questions.js
app-shell.js
app-drill.js
app-read.js
app-script.js
app-settings.js
```

**Extraction rule.** Move the existing `h()`, `add()`, `show()`, `bi()`, `icon()`, `ICON`, `dock()`, `sheet()`, `keepInView()`, `fullTable()`, `topBar()`, and `applyScale()` into `app-shell.js` and expose them on a single namespace object, `VB.UI`. Every other app file reads from `VB.UI`. Do not duplicate these helpers.

---

## 4. Navigation shell

### 4.1 Tab bar

Four tabs, fixed to the bottom of the viewport, above the safe-area inset.

| Tab | Label | Route | Purpose |
| --- | --- | --- | --- |
| 1 | अभ्यासः | `#/abhyasa` | Drill home. The default. |
| 2 | पठनम् | `#/pathana` | Reading page |
| 3 | लिपिः | `#/lipi` | Script practice |
| 4 | प्रगतिः | `#/pragati` | Progress dashboard |

Settings is not a tab. It stays as the gear button in the header, opening the existing overlay panel.

Each tab is a button with a small Devanagari glyph above a short label, matching the existing `.mode` button styling. Use `aria-pressed` on the active tab. Give the bar `padding-bottom: env(safe-area-inset-bottom, 0px)`.

### 4.2 Routing

Use hash routing. It needs no server configuration and works identically on GitHub Pages, Netlify, and `file://`.

```
#/abhyasa   #/pathana   #/lipi   #/pragati
```

**During an active session the tab bar is hidden.** A drill, a reading session, or a script round takes over the full screen with the existing `topBar()` close button. This is deliberate: the tab bar invites abandonment mid-session.

**Back button behaviour.** The existing scheme is `history.pushState({vb:1})` on entering a screen and `popstate` returning home. Preserve the shape but make it tab-aware:

1. Inside a session, back exits the session and returns to that tab's root.
2. At a tab root other than अभ्यासः, back returns to `#/abhyasa`.
3. At `#/abhyasa`, back exits the site.

### 4.3 What moves off the drill home

The current home screen carries the title, lamps, today's card, three mode buttons, the progress grid, the legend, and the lifetime total. That is too much once tabs exist.

**Stays on अभ्यासः:** title, lamps and streak, today's practice card, the three existing mode buttons, and the new practice-selection card (Section 5.3).

**Moves to प्रगतिः:** the 4 by 8 progress grid, the colour legend, the lifetime answer total, the speed-round best, and the new script and reading progress (Section 8).

---

## 5. Page 1: अभ्यासः (drill home)

### 5.1 Daily session

Unchanged. Twelve questions, two tables, up to three second chances, roughly five minutes. Do not alter `Store.planSkills`, `Store.record`, `Store.tryUnlock`, or the `TYPES` weighting tables.

### 5.2 सरल-अभ्यासः (massed practice) (new)

**The problem this solves.** The daily session is interleaved practice: mixed skills, spaced, adaptive. That is the right way to build durable retrieval but the wrong way to build a form the learner has not yet formed. Massed practice, meaning ten of the same thing in a row, sets the pattern before interference tests it.

**Specification.**

- Launched from a card on the drill home labelled सरल-अभ्यासः with the English subtitle "Ten of the same. Good before the daily practice."
- The learner picks one vibhakti. Class is optional; if left unset, questions rotate across all four classes.
- Ten questions. No tables, no retry pass, no intro screens.
- Exercise types restricted to four: `form` (choose the form), `tiles` (build the form), `identify` (which vibhakti), `flip` (change the number). Pass this as an allowlist into `makeQuestion` rather than forking it.
- The "never the same type twice in a row" rule still applies.
- Vacana alternates deterministically rather than being chosen by the scheduler: eka, bahu, eka, bahu. Words flagged `solo` are excluded from the bahu slots as usual.
- Finish screen shows the score and offers "practise again" with the same selection, plus a return to home.

**Two rules that matter.**

1. Answers **do** feed `Store.record()`, so the progress grid moves and the memory model updates.
2. Answers do **not** count toward `Store.tryUnlock()`. The unlock gate must require mixed retrieval, otherwise a learner can unlock everything by drilling one vibhakti. Implement this by having `record()` accept an options flag, for example `{massed: true}`, that suppresses the push onto `S.recent`.

### 5.3 Focused selection (new)

**Do not build this as a separate page, and do not put it in settings.** It is the same feature as 5.2 with a wider exercise pool, and settings holds global preferences, not per-session choices.

One card on the drill home, titled अभ्यासं वृणुत ("choose your practice"). Two rows of chips and a start button.

- **Row 1, vibhakti.** Eight chips plus a "सर्वाः" (all) chip. Multi-select. Locked vibhaktis are shown dimmed and are not selectable unless `settings.all` is on.
- **Row 2, class.** Four chips labelled with the pattern words राम, रमा, नदी, फल, plus a "सर्वे" chip. Multi-select.
- **Start button.** Runs a twelve-question session with the full exercise pool, restricted to the chosen cells.

Implementation is a filter on `Store.planSkills`. Add an optional argument:

```js
Store.planSkills(count, filter)
// filter: { vibs: ["dvi"], classes: ["a", "n"] } or null for the current behaviour
```

Selection persists in `S.settings.focus` so it is remembered between visits. Same unlock suppression as 5.2.

### 5.4 Existing modes

सारणी-अभ्यासः, वेग-अभ्यासः, and रूपावलिः stay exactly as they are. Keep them as the three small mode buttons.

### 5.5 सर्वनामाभ्यासः (pronouns) (new; it bends the engine)

This is a content module inside अभ्यासः, not a fifth tab. It reuses every screen, every generator, and every scheduler that already exists. What it does not reuse is the declension engine.

**5.5.1 Four ways pronouns break the current assumptions.**

1. **They are irregular.** `तद्` masculine runs सः, तौ, ते in प्रथमा and तम्, तौ, तान् in द्वितीया. No stem-plus-suffix rule produces that. This is why constraint 2.4 carries an exception.
2. **There is no सम्बोधनम्.** Pronouns have seven vibhaktis, not eight. `decline()` for a pronoun must be able to report a cell as absent, and every screen that iterates vibhaktis must handle a missing cell rather than render an empty box. The progress grid for pronouns is 7 rows, not 8.
3. **Gender is a property of the paradigm, not of the stem ending.** `VB.GENDER[cls]` works for nouns because ईकारान्त implies feminine. `तद्` has three complete and different tables. Treat `tad-m`, `tad-f`, `tad-n` as three separate paradigms sharing a display name.
4. **`अस्मद्` and `युष्मद्` have no gender at all.** अहम् is the same word whoever says it. They are their own sub-group with a single table each, and their enclitic forms (मा, नौ, नः, त्वा, वाम्, वः) are excluded from practice as a deliberate simplification.

**5.5.2 Which pronouns, in tiers.**

Tier 1, build now. These are the ones that carry the language.

| Paradigm | Tables | Note |
| --- | --- | --- |
| तद् | m, f, n | The one that matters most |
| एतद् | m, f, n | Proximal counterpart to तद् |
| किम् | m, f, n | Already partly present as `VB.KIM` in `grammar.js` |
| अस्मद् (अहम्) | one | No gender, no सम्बोधनम् |
| युष्मद् (त्वम्) | one | Same |

That is eleven paradigms.

Tier 2, recommended addition, not requested. Include these unless there is a reason not to.

| Paradigm | Tables | Why |
| --- | --- | --- |
| इदम् | m, f, n | Extremely common, and the एतद्/इदम् contrast is a real learner difficulty |
| यद् | m, f, n | The यः ... सः correlative is core Sanskrit syntax and cannot be read around |

That is six more, seventeen total.

Tier 3, deferred as instructed: कीदृश्, तादृश्, यावत्, तावत्, एतावत्. Worth noting these are not pronouns proper. They are pronominal **adjectives** and decline like ordinary nominals, so they belong with the noun module once consonant stems land, not here.

**5.5.3 Store all three vacanas now, show two.**

The pronoun tables are hand-written either way. Writing them with ekavacana and bahuvacana only means rewriting all seventeen when dvivacanam arrives, and dvivacana pronoun forms (तौ, ते, ताभ्याम्, तयोः, आवाम्, युवाम्) are among the most common words in the language.

So: the data carries all 21 cells (7 vibhaktis by 3 vacanas). The UI surfaces only eka and bahu until the dvivacana phase flips a flag. This costs nothing now and saves a full data rewrite later. It also gives the dvivacana UI work a small, self-contained test subject before it touches 155-plus sentence frames.

**5.5.4 A naming collision to fix before it spreads.**

`dvi` currently means द्वितीया in the vibhakti half of a cell key. द्विवचनम् also wants to abbreviate to `dvi`. The two are positionally unambiguous in `dvi.dvi` but nobody reading the code will believe that.

Use **`dva`** for द्विवचनम्. `VB.VACS` becomes `["eka", "dva", "bahu"]`. Fix this now, in the pronoun data, before any dvivacana work begins and before there are hundreds of keys to migrate.

**5.5.5 Exercise types.**

Of the thirteen existing generators, eleven work on pronouns with no change beyond swapping the form source: `form`, `tiles`, `identify`, `analogy`, `flip`, `odd`, `lemma`, `tf`, `error`, plus the table and speed modes.

Two do not. `kim` is excluded because the question word is itself a pronoun being practised. `sentence` needs its own frame set, see 10.7.

Two are new and pronoun-specific. Build both.

- **लिङ्गसामञ्जस्यम् (agreement).** Show a noun in a given cell, for example बालकाय. Learner picks the matching pronoun form from तस्मै, तस्यै, तेभ्यः, तम्. This is the single most important pronoun skill and the one that actually transfers to reading.
- **प्रतिस्थापनम् (substitution).** Show a short sentence, for example रामेण सह गच्छति, and ask the learner to replace the noun with the right pronoun, giving तेन सह गच्छति. Decoys come from the same paradigm in neighbouring cells.

**5.5.6 All three practice modes apply.**

- **Daily session.** Pronouns run as their own twelve-question session from a fourth mode button on the drill home, labelled सर्वनामाभ्यासः. They do not mix into the noun daily session until the learner has unlocked all eight noun vibhaktis, or `settings.all` is on.
- **सरल-अभ्यासः (massed).** Same as 5.2. Learner picks one paradigm and one vibhakti, gets ten of the same, restricted to `form`, `tiles`, `identify`, `flip`, and the new agreement type. Suppressed from the unlock gate as before.
- **Focused selection.** The card in 5.3 gains a third chip row, **paradigm**: तद्, एतद्, किम्, इदम्, यद्, अहम्, त्वम्, plus सर्वे. When any paradigm chip is active, the class row is replaced by a liṅga row (पुं, स्त्री, नपुं, सर्वे), since class does not apply.

**5.5.7 Unlock order.**

Pronouns are a separate track with their own counter, `S.pron.unlocked`. Do not gate them behind noun progress and do not gate noun progress behind them. Order within the track: तद् (all three liṅgas together), then एतद्, then किम्, then अहम् and त्वम्, then इदम्, then यद्. Same gate arithmetic as nouns.

---

## 6. Page 2: लिपिः (script practice) (new)

**Naming.** Do not call this page "Akshara." That is the name of the parent Next.js app and the collision will cause confusion later. Use लिपिः in the interface and `lipi` throughout the code.

**Goal.** A learner who cannot read Devanagari fluently does five minutes a day here and, over weeks, reads the vibhakti drills without decoding letter by letter.

### 6.1 Session shape

Mirrors the daily drill so the learner learns one interaction model, not two.

- Twelve questions.
- Mixed exercise types, weighted by how well each akshara is known.
- Same hint button, same feedback sheet, same "अग्रे" next button.
- Same lamps and streak, tracked separately under `S.lipi.days`.

### 6.2 The six exercise types

| # | Exercise | Shown | Learner does | Trains |
| --- | --- | --- | --- | --- |
| 1 | Letter to sound | भ | Picks "bha" from four | Recognition |
| 2 | Sound to letter | "bha" | Picks भ from four | Recall, harder, comes later |
| 3 | Mātrā attachment | क + ी | Picks की from four | Vowel signs |
| 4 | Conjunct decoding | क्ष | Picks क + ष from four pairs | Clusters |
| 5 | Word reading | मन्दिरम् | Picks "mandiram" from four | Fluency at word length |
| 6 | Find the letter | गजः, third position marked | Picks ज from four | Left-to-right scanning |

**The distractors are the whole design.** Never pick decoys randomly. Every akshara carries a confusion set, and decoys are drawn from it first. The ones that matter most: भ/म/स, ध/घ, प/ष, ब/व, त/न, र/ऋ, ङ/ड, थ/य, द/ट, ज्ञ/श्र.

This is the same philosophy as the existing mistake taxonomy in `grammar.js`: wrong answers should be the mistakes learners actually make, so that getting it wrong teaches something.

**Exercise 5 draws its words from `VB.WORDS`.** The script page and the vibhakti page share one vocabulary, so script practice doubles as vocabulary exposure and every word the learner decodes here is one they will meet in a drill.

### 6.3 Memory model

Reuse the existing half-life math exactly. Do not write a second scheduler.

- Skill key: `"lipi:" + character`, for example `"lipi:भ"`.
- Stored in `S.lipi.skills`, separate from `S.skills`.
- Same constants: half-life starts at 12 hours, right answer multiplies by 1.6 (or 2.0 for hard types, 1.2 with a hint), wrong answer halves it with a 4-hour floor.

Refactor `Store.record` and `Store.recall` to take the skill map as an argument rather than always using `S.skills`. That is a small change and avoids duplicating forty lines.

### 6.4 Speed round

Reuse the existing 60-second speed round pattern for letter recognition. Best score stored at `S.best.lipi`.

---

## 7. Page 3: पठनम् (reading) (new)

This is the largest new feature. Build it last.

### 7.1 The learner's experience

1. Opens the tab, sees a list of stories for the unlocked level, each with a title, a one-line source note, a difficulty marker, and a done or not-done state.
2. Taps a story. The title appears. The first line appears below it.
3. Reads the line. One or more words in it are visibly marked.
4. Taps a marked word. A sheet opens with three dropdowns: लिङ्गम्, विभक्तिः, वचनम्. Fills all three, submits.
5. Right: the word gets a quiet confirmation mark. Wrong: the correct answer is shown, plus the word's full declension table with the practised cell highlighted (reuse the existing `fullTable()`).
6. Once every marked word in the line is answered, the "next line" control unlocks.
7. Taps it. The line dims and scrolls up, the next line appears. Previous lines stay visible above, dimmed, so the story accumulates.
8. At the end, a completion card with the count of words answered correctly and a return to the story list.

### 7.2 Four rules that are easy to get wrong

**7.2.1 A wrong answer does not block.** Answering gates advancing. Being right does not. If correctness blocked progress, reading becomes a test and the learner stops reading. Show the answer, record it, move on.

**7.2.2 Reading answers feed the main skill store.** Call `Store.record(cls + ":" + cell, correct, {hard: true})` on the normal `S.skills` map, not a separate one. This is what makes reading part of the app rather than a side room, and it makes the progress grid on प्रगतिः honest about total practice.

**7.2.3 Ask for liṅga, not for class.** A reader looking at नद्याः should answer स्त्रीलिङ्गम्. They should not be asked to answer "ईकारान्तः स्त्रीलिङ्गः," which is a grammarian's category, not a reader's. But the skill you record is still the class. These are different values:

```js
// what the learner picks
linga  = "f"                       // from VB.GENDER[cls]
vibhakti = "sha"
vacana = "eka"

// what you record
skill  = mark.cls + ":" + mark.cell   // "ii:sha.eka"
```

An answer is correct only when all three dropdowns match. Liṅga is checked against `VB.GENDER[mark.cls]`.

**7.2.4 Unhighlighted words are never tested.** Stories need pronouns, verbs, and indeclinables that sit outside level 1. Policy: marked words are level-1 nouns only and are testable. Everything else is supporting vocabulary, covered by the per-line English gloss, never quizzed. State this in the corpus generation protocol or the data will drift.

### 7.3 Levels

Level 1 is the only unlocked level. Levels 2 and higher appear in the list, visibly locked, labelled "work in progress." Do not build the unlock logic yet, just the visual state.

| Level | Covers | Status |
| --- | --- | --- |
| 1 | अकारान्त पुं, आकारान्त स्त्री, ईकारान्त स्त्री, अकारान्त नपुं. All eight vibhaktis, eka and bahu. | Unlocked |
| 2 | इकारान्त and उकारान्त stems | Locked |
| 3 | ऋकारान्त and consonant stems | Locked |
| 4 | Pronouns and द्विवचनम् | Locked |

### 7.4 Line reveal

The visual quality of this matters and the existing palm-leaf aesthetic already supports it. Specifics:

- One line visible at full opacity at a time.
- Completed lines remain above at roughly 45 percent opacity, in the same typeface, so the story builds visually.
- The transition is a short scroll plus fade, 250ms, respecting `prefers-reduced-motion` as the existing `keepInView()` already does.
- Per-line English meaning is revealed by a small अर्थः button, matching the existing meaning button on the feedback sheet. Never shown by default.
- Do not paginate. A level-1 story is short enough to be one continuous column.

### 7.5 Progress

- `S.read.done[storyId] = { at: timestamp, right: n, total: m }`
- A story can be reread. Rereading updates the record and re-records the skills.
- Reading days count toward the streak, same as drill days.

---

## 8. Page 4: प्रगतिः (progress)

Mostly a relocation, plus two additions.

**Moved from the current home screen:** the 4 by 8 vibhakti grid, the colour legend, the lifetime answers total, and the note about what unlocks next.

**New on this page:**

- **Script progress.** A compact grid of all aksharas, coloured by the same four levels as the vibhakti grid, so the learner can see which letters are still weak.
- **Reading progress.** Stories completed out of stories available, at the current level.
- **Speed bests.** Both the vibhakti speed round and the script speed round.

Reuse the existing `.grid`, `.dot`, and `.legend` styles. Do not invent new visual language for this page.

---

## 9. Settings

Keep the existing overlay panel. Keep text size, "all vibhaktis," and reset.

**Add one row:**

- **Export and import progress.** Two buttons. Export serialises the whole state object to a JSON string and offers it as a download plus a copy-to-clipboard fallback. Import accepts a pasted string, validates it parses and has a recognisable shape, and replaces the state after a confirmation.

This is roughly twenty lines and it removes the single worst failure mode in the app. A learner who changes phones, or whose Safari evicts the site data, currently loses everything with no recourse.

**Change the reset row:** it must now clearly state that it erases vibhakti, script, and reading progress together.

**Added while building (fix 5).**

- **Persistent storage.** On start, the shell calls `navigator.storage.persist()`. Browsers that grant it (installed apps, sites used often) no longer evict the saved progress under storage pressure. One line, no user-visible change.
- **Add to home screen card.** Shown on the drill home, on touch devices only, after two days of practice, and never inside an installed app. On Android it offers Chrome's own install prompt; on iPhone it gives the two Safari steps. "Not now" hides it for good (`settings.a2hs = "no"`). Installing is the single best protection against Safari's eviction of unused sites.

---

## 10. Data contracts

Datasets arrive in these exact shapes in later sessions. Build against these contracts.

### 10.1 `js/words.js` (expanded, session 3)

Format is unchanged, so no code changes are needed. Only the content grows.

```
stem|English (one)|English (many)|categories|flags
```

Current: 282 words (a: 104, aa: 66, ii: 40, n: 72). Target: roughly 450 to 500, with ईकारान्त brought up to about 70 since it is the thinnest class.

New categories may appear. They require no code change, only new frames that reference them.

### 10.2 `js/frames.js` (expanded, session 4)

Format is unchanged.

```js
F(id, vib, d, kind, cats, sa, en, options)
```

Current: 155 frames. Target: roughly 255 to 275.

Weighted toward two gaps found by audit:

- **Thin cells.** `n:sam.eka` and `n:sam.bahu` currently have only 6 frame-and-word combinations each. `n:tri.bahu` and `n:cat.bahu` have 10. Everything else is 12 or more.
- **Thin difficulty.** The current split is 44 simple, 79 medium, 32 literary. Literary needs the most new material.

New `VB.RULES` keys may appear alongside new frames.

### 10.3 `js/lipi.js` (new, session 2)

```js
VB.AKSHARAS = [
  { ch: "क", tr: "ka", type: "cons", varga: "ka", conf: "फ ऋ" },
  { ch: "भ", tr: "bha", type: "cons", varga: "pa", conf: "म स" },
  { ch: "अ", tr: "a",  type: "vowel", varga: null,  conf: "आ ओ" }
  // ...
];

VB.MATRAS = [
  { ch: "ा", tr: "aa", vowel: "आ", conf: "ो ौ" }
  // ...
];

VB.CONJUNCTS = [
  { ch: "क्ष", parts: ["क", "ष"], tr: "kṣa", conf: "ज्ञ श्र" }
  // ...
];
```

`conf` is a space-separated confusion set, ordered most-confusable first. Decoy selection walks this list before falling back to random.

**Added while building (fix 2).**

- The delivered file also carries `VB.LIPI_STAGES`: ten unlock stages, each `{ n, label, add }`, where `add` is a space-separated list of characters, or `"*"` for everything that is not rare. The last stage is `"*"`.
- Stages open by the vibhakti gate arithmetic, so the store gains two fields: `lipi.unlocked` (the current stage, starting at 1) and `lipi.recent` (the last 40 script answers). See 10.5.
- There are 66 conjuncts, not 44. Each entry also carries `form`: one of `ligature`, `halfform`, `stacked`, `rakara`, `repha`. The hint text is built from it.
- One scheduler serves both pages: `Store.planSkills(count, { keys, map })` ranks a flat list of `"lipi:<char>"` keys in `S.lipi.skills` by the same need, weak and fresh score.

### 10.4 `js/stories-l1.js` (new, session 5)

This is the contract that makes the corpus verifiable. Read 10.4.2 carefully.

**10.4.1 Shape.**

```js
VB.STORIES_L1 = {
  level: 1,
  stories: [
    {
      id: "pt-001",
      title: "सिंहः मूषकः च",
      source: "Pañcatantra, Mitrabheda",
      provenance: "retelling",
      difficulty: 2,
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
  ]
};
```

**Field notes.**

- `id` is stable and unique. Prefix by source family: `pt-` Pañcatantra, `ht-` Hitopadeśa, `sb-` subhāṣita, `rm-` Rāmāyaṇa, `mb-` Mahābhārata, `pu-` Purāṇa, `or-` original.
- `provenance` is one of `verbatim`, `adapted`, `retelling`. A citation in `source` is required for the first two.
- `difficulty` is 1 to 3, matching the frame difficulty scale.
- `tok` is a zero-based index into `line.sa.split(" ")`.
- `marks` may be empty for a line that carries no testable word.

**10.4.2 The verification rule. This is the important part.**

A marked word is stored as `{stem, cls, cell}`, never as its surface form plus three labels. The app renders it by calling `VB.decline(stem, cls)[cell]`, and `tools/check.js` asserts that the regenerated string equals the token as written, after stripping `। ? , !` and any trailing `॥`.

This gives the story corpus the same guarantee the rest of the app has: forms are correct because they are generated by the verified engine, not because someone typed them carefully. A mislabeled word fails the build instead of quietly teaching the wrong thing.

Two consequences to accept:

1. Marked words must have their stem present in `VB.WORDS`, or the checker cannot resolve the class. Unlisted words can appear in a line, they simply cannot be marked.
2. Sandhi across a word boundary breaks the token match. Where a marked word would undergo external sandhi, either write the line without that sandhi or leave the word unmarked. Do not add sandhi handling to the checker.

**The one normalisation (fix 1).** A word-final म् written as anusvāra before a consonant (गृहं गच्छति) is treated as matching the engine's गृहम्. Both sides pass through the same function before comparison: `t.replace(/म्$/, "ं")`. This is not sandhi handling in the sense above. It is the spelling convention of running Sanskrit, and the app already applies it to every sentence it displays (`sbText()` in `grammar.js`). Without it the delivered corpus fails on every neuter accusative. No other normalisation is allowed.

### 10.6 `js/pronouns.js` (new, session 2b)

```js
VB.PRONOUNS = {
  "tad-m": {
    id: "tad-m",
    base: "तद्",
    linga: "m",
    label: "तद् (पुंलिङ्गम्)",
    group: "demonstrative",
    F: {
      "pra.eka": "सः",   "pra.dva": "तौ",       "pra.bahu": "ते",
      "dvi.eka": "तम्",  "dvi.dva": "तौ",       "dvi.bahu": "तान्",
      "tri.eka": "तेन",  "tri.dva": "ताभ्याम्", "tri.bahu": "तैः",
      "cat.eka": "तस्मै","cat.dva": "ताभ्याम्", "cat.bahu": "तेभ्यः",
      "pan.eka": "तस्मात्","pan.dva":"ताभ्याम्","pan.bahu": "तेभ्यः",
      "sha.eka": "तस्य", "sha.dva": "तयोः",     "sha.bahu": "तेषाम्",
      "sap.eka": "तस्मिन्","sap.dva":"तयोः",    "sap.bahu": "तेषु"
    }
  }
  // ...
};

VB.PRON_VIBS  = ["pra","dvi","tri","cat","pan","sha","sap"];  // no sam
VB.PRON_ORDER = ["tad-m","tad-f","tad-n","etad-m", /* ... */];
```

**Rules.** Every paradigm carries all 21 cells with no gaps. Syncretic cells (`ताभ्याम्` appearing three times, `तौ` twice) are written out in full, not cross-referenced, because the checker needs to see them and the learner needs to be taught that they collide. No `sam.*` key may appear.

Access goes through one function so callers do not branch:

```js
VB.forms(idOrStem, clsOrNull)  // returns the cell map for either a noun or a pronoun
```

### 10.7 `js/pronoun-frames.js` (new, session 4b)

Pronoun sentences need an antecedent, so the frame format differs from `F(...)`.

**As delivered (fix 3).** The format first sketched here gave each frame only a liṅga. A liṅga alone does not fix the answer: it leaves the vacana and the pronoun (तद् or एतद् or इदम्) open. So each frame names the exact paradigm and cell:

```js
PF(id, pron, cell, d, setup_sa, setup_en, sa, en)

PF("tad-f-04", "tad-f", "cat.eka", 2,
   "सीता वने अस्ति।", "Sita is in the forest.",
   "हनूमान् {P} मुद्रां ददाति।", "Hanuman gives her the ring.");
```

- `pron` is a paradigm id from `pronouns.js`, `cell` is `"vibhakti.vacana"`.
- The answer is fully determined: `VB.PRON_BY_ID[pron].F[cell]`. Nothing is stored as text.
- `setup` is the antecedent, shown dimmed above and never blanked. It is empty for frames that carry their own context (किम्, यद्, अहम्, त्वम्).
- `{P}` is the blank; exactly one per frame.
- **Fill the blank with the anusvāra rule.** A plain substitution gives इदम् फलं; written Sanskrit has इदं फलं. The app runs `sbText()` on every filled pronoun sentence, as it does for noun frames.
- **Load order.** `pronouns.js` and `pronoun-frames.js` load right after `frames.js`, and both are in `sw.js` `FILES`.

63 frames were delivered, across all seventeen paradigms.

**Wrong options must be wrong in every reading.** In pronoun sentences, another pronoun is never offered as a wrong answer (एषः वृक्षः उन्नतः is as correct as अयम् वृक्षः उन्नतः), and neither is the other number of अस्मद् or युष्मद् (माता अस्मान् आह्वयति is fine Sanskrit). The checker enforces this.

### 10.5 Store schema (v2)

**Added while building.** `lipi.unlocked` and `lipi.recent` (see 10.3), `settings.a2hs` (see 9), and `settings.focus.prons` and `settings.focus.lingas` for pronoun selection in the focus card. The merge that loads saved state now keeps fields the template does not list, so a field added later, or one saved by a newer version and imported into an older one, is never silently dropped. The checker proves this.


Bump the key to `vibhakti-abhyasa-v2` and migrate.

```js
{
  skills:   {},              // unchanged, vibhakti skills
  words:    {},              // unchanged, last-seen timestamps
  days:     {},              // unchanged, drill days
  unlocked: 1,               // unchanged
  introduced: 0,             // unchanged
  recent:   [],              // unchanged, feeds the unlock gate
  total:    { q: 0, c: 0 },  // unchanged
  best:     { speed: 0, lipi: 0 },        // lipi added
  settings: { scale: 1, all: false,
              tab: "abhyasa",
              focus: { vibs: [], classes: [] } },   // added
  lipi:     { skills: {}, days: {}, total: { q: 0, c: 0 } },   // NEW
  read:     { level: 1, done: {} },                            // NEW
  pron:     { unlocked: 1, introduced: 0, recent: [] }         // NEW, skills live in S.skills
}
```

**Migration.** On load, if no v2 key exists but a v1 key does, parse v1, copy every field it has into a fresh v2 blank, and write v2. Leave the v1 key in place. Do not delete it. If a learner rolls back, their progress is still there.

**10.5.1 Generalise the skill key now, not later.**

Skill keys today are `class:vibhakti.vacana`, for example `a:sap.eka`. Pronouns add `tad-m:sha.bahu`. Verbs will eventually add something shaped like `bhu-lat:pra.eka`. All three are the same thing: `module-member : cell`.

Declare a module registry in Phase 2, while the store is already open, so this is not rewritten a third time:

```js
VB.MODULES = {
  noun: { members: VB.CLASSES,    cells: VB.CELLS,      grid: [4, 8] },
  pron: { members: VB.PRON_ORDER, cells: PRON_CELLS,    grid: [17, 7] },
  verb: { /* later */ }
};
```

`Store.record`, `Store.recall`, `Store.planSkills`, and the progress grid all read from this registry rather than hardcoding four classes and eight vibhaktis. This is maybe thirty lines of change today and it is what makes the verb module a data drop rather than a scheduler rewrite.

---

## 11. Build order

Each phase ends with a working site and a passing `tools/check.js`. Do not start a phase before the previous one is green.

**Phase 1: shell.** Split `app.js` into `app-shell.js` and `app-drill.js`. Add the tab bar and hash router. Move the progress grid to प्रगतिः. Ship with three tabs live (अभ्यासः, प्रगतिः) and two showing an empty state. Store still on v1.

**Phase 2: store v2.** Bump the schema, write the migration, refactor `record` and `recall` to take a skill map argument. Add export and import to settings. No visible feature change beyond settings.

**Phase 3: massed and focused practice.** Section 5.2 and 5.3. These reuse everything that already exists and are the cheapest real feature in the plan. Add `planSkills` filtering and the `massed` flag on `record`.

**Phase 3b: pronouns.** `pronouns.js` data, the two new generators from 5.5.5, the fourth mode button, the pronoun progress grid. Depends on the module registry from Phase 2. Pronoun sentence frames land later with Phase 5.

**Phase 4: script page.** `lipi.js` data, `lipi-questions.js` generators, `app-script.js` screens. Add the script grid to प्रगतिः.

**Note on lipi audio.** Superseded by Section 16. Audio is still pre-recorded static clips, never text-to-speech or speech recognition, for the reasons first given here: the available Sanskrit TTS needs a verse and a GPU, and the available ASR drops the first words of an utterance. What changed is the scope. Clips are words, not letters alone, which is about 2,300 of them rather than 150. So they are MP3 (Opus does not play on older iPhones) and cached on first play, not listed in `sw.js`.

**Phase 5: lexicon and frames.** Drop the expanded datasets in. No code changes expected. Run the checker.

**Phase 6: reading page.** `stories-l1.js`, `app-read.js`. Extend the checker first, before writing the page, so the corpus is validated from day one.

### Checker extensions

Add to `tools/check.js` as each phase lands:

1. **Lipi tables.** Every `conf` entry resolves to a real akshara, matra, or conjunct. No duplicate `ch` values. Every `parts` entry of a conjunct exists in `VB.AKSHARAS`.
2. **Lipi generators.** Generate several thousand script questions and check each for duplicate options and exactly one correct answer, matching the existing loop for vibhakti questions.
3. **Stories.** For every story, every line, every mark: `VB.decline(stem, cls)[cell]` equals the token at `tok` with punctuation stripped. Also assert `tok` is in range, `cls` is one of the four classes, `cell` is in `VB.CELLS`, and `stem` exists in `VB.BY_STEM`.
4. **Story coverage.** Report a count of marks per `cls:cell` across the whole corpus, so gaps are visible. Warn rather than fail on cells with fewer than three marks.
5. **Store migration.** A small unit test that feeds a v1 blob through the migration and asserts every v1 field survives.
6. **Pronoun paradigms (fix 4, as measured).** Syncretism checks alone catch only about half of all single-cell typos, measured by mutation. So trust is chained outward from `VB.KIM`, which shipped independently in `grammar.js`: `VB.KIM` fixes किम्; तद् is किम् with त; यद् is तद् with य; एतद् is ए plus तद्; the इदम् obliques follow तद्; युष्मद् mirrors अस्मद्. The fifteen suppletive forms no rule reaches (अहम् वयम् मह्यम् मम, त्वम् यूयम् तुभ्यम् तव, अयम् इमे इमम् इमान्, इयम् इमाः इमाम् अनया) are pinned as golden values, written a second time in the checker. Measured result: every one of the 357 single-cell corruptions is caught. Also: all 21 cells present, no `sam.*`, every value Devanagari, a valid `linga`, and the known syncretisms.
7. **Pronoun frames.** Every frame has exactly one `{P}`, a real paradigm and cell, no dvivacana while it is switched off, and no duplicate id. Where the blank describes the next word (अनेन चषकेण), the next word must agree in gender, but only when it can be read one way. Neuter nominative and accusative share a form, so सत्यं after यः is an object, not an attribute.
8. **Pronoun questions.** Generate every pronoun question type for every open paradigm and cell, and check option integrity, tiles, tables, the anusvāra rule in filled sentences, and that no sentence offers a wrong answer that is good Sanskrit (10.7).
9. **Store fields.** Unknown settings survive a reload.
10. **Pictures and recordings.** Every entry in `js/images.js` and `js/audio.js` exists on disk and belongs to a real word or letter.
11. **Independent engine cross-check.** `tools/crosscheck.py` declines every word with a separate Python engine and compares all forms. It needs one package, so it lives beside `check.js` rather than inside it. At the time of writing: 587 words, 9,392 forms, no disagreement.

---

## 12. Out of scope now, planned next---

## 12. Out of scope now, planned next

Do not build these yet. They are listed because design decisions made today must not block them, and two of them impose constraints on the current phases.

### 12.1 द्विवचनम् (the next major phase)

The whole app moves from two vacanas to three. What this touches:

- `VB.VACS` gains `"dva"` (see 5.5.4 for why not `"dvi"`). Every loop that assumes two vacanas must already be iterating `VACS`. **Write new code that way now.**
- `genFlip` is currently a binary toggle and becomes a three-way "change to this vacana".
- Every `{v:A|B}` placeholder across 155-plus frames becomes `{v:A|B|C}`. This is the bulk of the work and it is data entry, not engineering.
- Declension tables go from 8 by 2 to 8 by 3. The existing `fullTable()` layout must tolerate a third column on a phone.
- `VB.decline()` gains dvivacana forms for all four current classes.

**Sequencing recommendation.** Ship pronouns with dvivacana already in the data (5.5.3) before touching noun frames. That gives the three-column table, the three-way flip, and the wider grid a small tested subject first.

**Decided (September 2026).**

- **Unlock.** Dvivacana is a sixth unlock group, after सम्बोधनम्. It opens only when every एकवचनम् and बहुवचनम् skill is open, so beginners never meet a third number early.
- **Its own practice first.** When it opens, the introduction shows the three dual forms of the four model words, and massed practice offers dvivacana on its own.
- **A vacana row in the focus card:** `एक-बहु | द्वि | सर्वाणि`. एकवचनम् and बहुवचनम् stay together, because learners already know them together and they share one set of confusions. Dvivacana is separate, because it is new and has only three distinct forms per word (प्र/द्वि/सं, तृ/च/प, ष/स). Those are best set by focused practice before being mixed in. सर्वाणि practises all three. Daily sessions then mix dvivacana in at a low rate that rises as its skills strengthen.
- **Syncretism.** Every dual form covers two or three cells, so "which vibhakti" questions on dual forms are always multi-select, and tables show the repeated form in each cell it fills.
- **Engine.** `grammar.js` gains the three dual endings per class. This is the first planned change to it since the freeze, and it comes with the matching change in `tools/engine_py.py` so the cross-check still covers every form.
- **Frames.** Each kartā and sambodhana frame gets a dual verb (`{v:पठति|पठतः|पठन्ति}`) and भवन्तौ/भवत्यौ. About 40 frames. A teacher skims them.
- **Ready now.** Pronoun tables already carry dvivacana behind `VB.PRON_SHOW_DVA`; the picture folder `img/drop/dva/` and the recording plan's Part D (dual tables for 96 words) already exist.

### 12.2 Additional noun classes

Planned: इकारान्त पुं, उकारान्त पुं, ऋकारान्त पुं, इकारान्त स्त्री, उकारान्त स्त्री, ऊकारान्त स्त्री, ऋकारान्त स्त्री, and eventually consonant stems.

Good news: the word file format and the `cls` block header already anticipate this, and the ṇatva engine scans the stem generically, so **it needs no change for any new class**. Adding a class is a new case in `VB.decline` plus a new word block.

**Scope for the year:** the अच्-ending stems, following the Māheśvara sūtras. Each liṅga gets its full 7 × 3 table plus सम्बोधनम्: इ, उ and ऋ in all three liṅgas where they occur, ई and ऊ स्त्रीलिङ्ग (नदी is built; वधू is next), and the few ऐ, ओ, औ stems (रै, गो, नौ) as written-out tables, since each is nearly its own paradigm. Consonant stems, including कीदृश् (कीदृक्/कीदृग्), come after.

**Words.** About 80 per class, in two batches of 40, so each class ships early and grows.

**Optional forms: accept both.** इकारान्त and उकारान्त स्त्रीलिङ्ग words have two correct forms in the चतुर्थी, पञ्चमी, षष्ठी and सप्तमी एकवचनम् (मतये/मत्यै, मतेः/मत्याः, मतौ/मत्याम्). A cell may therefore hold a list of forms. Every form in the list is right, and none is ever offered as a wrong option. Questions deliberately show only one of the pair at a time, sometimes one and sometimes the other, so learners come to recognise both. Tables accept either.

**Exceptions as written tables.** Common words that break their class (पति, सखि, स्त्री, श्री, लक्ष्मी, स्वसृ, नप्तृ, and whatever else the syllabus uses) ship as written-out tables, like pronouns, under the same strict checking. The syllabus owner supplies the list when the class is built.

One gotcha to record now: ऋकारान्त stems split into two sub-paradigms. Agent nouns in -तृ (कर्तृ, नेतृ, दातृ) and kinship terms (पितृ, मातृ, भ्रातृ) differ in several cells, notably प्रथमा बहुवचन and द्वितीया बहुवचन. They must be two classes, not one, or the engine will generate wrong forms confidently.

### 12.3 Verbs and लकाराः (the largest module)

Planned lakāras: लट्, लङ्, लिट्, लृट्, लोट्, विधिलिङ्. Each is a 3 by 3 matrix of puruṣa (प्रथम, मध्यम, उत्तम) by vacana.

Three scope multipliers worth pricing before this starts, because they are easy to miss when the shape looks like a tidy 3 by 3:

1. **Pada doubles everything.** परस्मैपद and आत्मनेपद are two full tables per lakāra per root.
2. **Gaṇa changes the stem.** The ten classes form their present stem differently, so भू gives भवति while तुद् gives तुदति. The endings are regular; the stem is not. Store the stem per root per lakāra and generate the endings.
3. **लिट् is not generable.** The perfect involves reduplication, इट् augment, and a pile of irregulars. It is memorised, not derived. Ship it as stored forms, like pronouns, with the same stricter checker.

**Recommended shape.** One data file per lakāra, a root registry carrying stems and pada, and endings generated for the five regular lakāras. Skill key `<root>-<lakara>:<purusha>.<vacana>`, which falls straight out of the module registry in 10.5.1.

This is its own project, comparable in size to everything above it combined. It should not start until the noun and pronoun modules are complete and stable.

**Decided (September 2026).**

- **Lakāras:** लट्, लङ्, लृट्, लिट्, लोट्, विधिलिङ्, each 3 × 3, परस्मैपद first. आत्मनेपद is anticipated in the data shape (a `pada` field on every root and table) but not drilled this year.
- **Roots:** at least 100, and ideally the 190 or so that the frequency studies of classical Sanskrit say cover most running text. The list is compiled from published frequency sources at the start of the verb phase, with its sources noted, and pruned by the syllabus owner. Each root carries its gaṇa, pada, the सेट्/अनिट् status that decides लृट् (पठिष्यति, but गमिष्यति and दास्यति), and its stems.
- **Irregular roots** (अस्, कृ, दा, and others) ship as written-out tables under the pronoun-grade checker.
- **Where it lives:** a fifth tab, धातवः, with the same drill screens, tables, hints, pictures and memory model. It ties into pronouns through agreement drills (अहं पठामि, त्वं पठसि, सः पठति).

### 12.4 Genuinely out of scope

- **Server sync or accounts.** Export and import in settings is the answer.
- **Reading levels 2 and above.** Visual locked state only.
- **Sandhi handling in the checker.** See 10.4.2.
- **Text-to-speech or speech recognition of any kind.** See the note under Phase 4.
- **Pronominal adjectives** (कीदृश्, तादृश्, यावत्, तावत्). These decline as nominals and belong with 12.2, not with pronouns.

### Known debt worth clearing while you are in there

All four are cleared: the root `style.css` is gone, `fonts/OFL.txt` ships, the live region is on the feedback panel, and the Python cross-check is `tools/crosscheck.py`. The repository LICENSE is left to the owner (MIT).


These are small and unrelated to the new features, but they are real.

1. **`style.css` exists twice.** The root copy is byte-identical to `css/style.css` and nothing references it. Its `@font-face` paths use `../fonts/`, which would break if anything ever loaded it. Delete the root copy.
2. **No LICENSE, and no font licenses.** Tiro Devanagari Sanskrit and Mukta are both OFL 1.1, which requires the copyright notice and license text to ship alongside the font files. Add `fonts/OFL.txt` and a repository LICENSE.
3. **`aria-live="polite"` sits on `#app`,** which is fully replaced by `innerHTML = ""` on every screen change, so a screen reader re-announces the whole page after every answer. Move the live region to the feedback sheet, which already carries `role="status"`.
4. **The Python cross-check is not committed.** The README claims the engine was validated against a separate Python implementation across 2,416 forms. That script should live in `tools/`.

---

## 13. Session roadmap

This document is the output of session 1. The remaining datasets arrive as follows.

| Session | Deliverable |
| --- | --- |
| 1 | This architecture document |
| 2 | `js/lipi.js` dataset: aksharas, matras, conjuncts, confusion sets |
| 2b | `js/pronouns.js`: 17 paradigms, all 21 cells each, dvivacana included |
| 3 | Expanded lexicon, roughly 450 to 500 words in pipe format |
| 4 | Roughly 100 to 120 new sentence frames in `F(...)` format |
| 4b | 60 to 80 pronoun frames in `PF(...)` format |
| 5 | Level 1 story corpus, compiled and verified |
| 6+ | Story corpus growth, weekly |

**Status:** sessions 1 to 5 and 2b and 4b are delivered and built.

Beyond this list, in order:

1. The लिपिः word levels from Section 17. They need no new data and get better as recordings arrive.
2. Dvivacana across nouns (12.1).
3. The अच् noun classes (12.2), 40 words per class per batch.
4. The verb module (12.3), after the root list is compiled.

Pictures and recordings arrive continuously alongside all of these (Sections 15 and 16).

The story corpus is explicitly iterative. It grows every week. The data contract in 10.4 and the checker rule in 10.4.2 are what make that growth safe: new stories either validate against the engine or fail the build.

---

## 14. Handover prompt

Paste this above the document when handing it to the implementing model.

> You are implementing an expansion to an existing Sanskrit vibhakti practice web app. The repository is `vi5hnuiyengar/vibe-bhakti`: a plain static site, no dependencies, no build step, 3,329 lines across 19 files, currently working and passing its own test suite.
>
> The full specification follows. Read Sections 1 through 3 before writing anything.
>
> Work in the phase order given in Section 11. After each phase, run `node tools/check.js` and confirm it passes before starting the next. Do not begin a phase until the previous one is green.
>
> Three constraints override everything else. First, do not modify `js/grammar.js`: the declension engine and ṇatva rule are independently verified correct across all 282 words and 247 ṇatva decisions. Second, no dependencies and no build step: plain scripts, plain globals, the site must still work by opening `index.html` from disk. Third, when a feature could be built two ways, build the simpler one. This project is deliberately small and its value comes from being finishable.
>
> Every new file must be added to the `FILES` array in `sw.js` or the site breaks offline.
>
> Two things are coming that you are not building yet but must not block: द्विवचनम् across everything, and a verb module of लकार paradigms. Section 12 says what that means in practice. The short version: never assume there are exactly two vacanas, never assume there are exactly four classes or eight vibhaktis, and read both from the module registry in Section 10.5.1.
>
> If any part of this specification is ambiguous, ask before implementing. Do not guess at a data contract.

---

## 15. Word pictures (built)

Optional pictures show a word's meaning without English.

- **Folders.** `img/drop/eka|dva|bahu/` is where the owner puts Gemini images, named from `img/checklist.csv` (`baalaka.png`, or the Devanagari stem). `tools/images.py` (Python, Pillow) squares, shrinks and converts them to 512 × 512 WebP in `img/words/<vacana>/`. It writes `js/images.js` (`stem: "name.version"` per vacana) and ticks the checklist. `img/STYLE.txt` holds the one style paragraph pasted into each Gemini chat.
- **Showing.** `VB.UI.picture(stem, vacana, strict)` returns nothing when no picture exists, so a word without a picture looks exactly as before. A listed file that fails to load removes itself.
- **Where.** On questions about one word's meaning (choose the form, build the form, sentences, pronoun agreement), the word's table, and रूपावलिः. Never on questions that test the number (which vibhakti, change the number, true or false, odd one out, match), and never on the reading page. A missing dva or bahu picture falls back to eka, since the number is written beside it.
- **Meaning in hints.** The first hint tap shows the word's English meaning on every word question, so there is a meaning available until the picture exists.

---

## 16. Recordings for लिपिः (pipeline built, page integration next)

Audio is for the script page only. The vibhakti and reading pages do not use it.

- **One clip per written form.** A clip is keyed by the Devanagari form it says, not by a table cell. रामेभ्यः is recorded once, and later serves pronoun or verb forms with the same spelling.
- **The plan.** `tools/audio-plan.js` (Node, using `grammar.js`, so the script always matches the engine) writes `audio/takes.csv` from `audio/words-to-record.txt`. A take is a short run of forms read in order. Part A is letters by varga. Part B is full tables of about 124 common words: one take per word per vacana, all eight in table order, grouped by vacana, then liṅga. Part C is the प्रथमा एकवचनम् of every other word, eight to a take. Part D is dual tables for the Part B words, recordable now and used once dvivacana is on.
- **Recording.** The owner records on an iPhone (Voice Memos, Lossless). A file holds either one take, named by id or name, or a run of takes named `B001-B030`, with a longer pause between takes.
- **Cutting.** `tools/audio.py` (Python and ffmpeg, no packages) finds the spoken forms by silence and tries a few thresholds on its own. It only cuts a take when the count matches the plan exactly, and marks any other take "redo" with the reason, while still using the rest of the file. It brings every take to −18 LUFS, trims with small pads and fades, and saves mono 64 kbps MP3s (about 7 KB a word) to `audio/clips/forms|letters/<readable>-<fingerprint>.mp3`. It then writes `js/audio.js` and a status column in the checklist.
- **Numbers.** 382 takes, 3,035 read forms, about 2,300 distinct clips, about 16 MB.
- **Page integration (next).** Once clips exist, transliteration leaves लिपिः: hear and pick the written form, read then tap to hear and mark yourself, and hear and pick between two real forms. There is no speech recognition and no automatic grading of speech.

---

## 17. लिपिः beyond letters (planned next)

Letters alone are too basic. The real difficulty is reading words and sentences: long vowels shortened (मालती read as malati), an extra vowel inserted before य (मालत्याः read as मालतीयाः), a visarga dropped, श/ष/स confused, and two real forms of one word mixed up (नद्यः, नद्याः, नदीः).

- **Two more levels on the page:** शब्दाः (words), then वाक्यानि (sentences). The current page becomes the first level, अक्षराणि.
- **Look-alikes are generated, not listed.** From any real form, apply one realistic misreading: lengthen or shorten a vowel, add or drop the visarga, split ्या into ीया, swap letters from the lipi confusion sets, or take the word's own neighbouring forms. Every word, and every future class, gets confusion drills with no curation.
- **Drills:**
  - pick the right written form among look-alikes;
  - same or different, against the clock;
  - tell apart one word's similar forms;
  - in a sentence, find the word that was misread;
  - once recordings exist, hear a form and pick it.
- **Sentences** come from the existing frames and stories, so no new data is needed.

---

## 18. Practising by vacana (with dvivacana)

The focus card gains a third row, वचनम्: `एक-बहु`, `द्वि`, `सर्वाणि`. Massed practice gains the same choice. See 12.1 for why एकवचनम् and बहुवचनम् stay together and dvivacana stands alone.
