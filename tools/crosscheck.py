"""
Cross-check the JavaScript declension engine against an independent Python one.

    pip install indic_transliteration
    python3 tools/crosscheck.py

The Python engine (tools/engine_py.py) was written separately, in SLP1, with
its own ṇatva implementation. This script declines every word in js/words.js
with both engines and reports any form where they disagree.
The site does not use this file or its dependency. It is a development check.
"""
import json, os, re, subprocess, sys
from indic_transliteration import sanscript

HERE = os.path.dirname(os.path.abspath(__file__))
sys.path.insert(0, HERE)
from engine_py import decline, dev, VIBS, VACS   # noqa: E402

CLS = {"a": "a_pum", "aa": "aa_stri", "ii": "ii_stri", "n": "a_napum"}

# the JavaScript side: every word and its 16 forms, straight from the site's own code
js = r"""
global.window = {}; global.localStorage = { getItem: () => null, setItem: () => {} };
["grammar", "words"].forEach(f => require(process.argv[1] + "/js/" + f + ".js"));
const VB = window.VB, out = [];
for (const cls of VB.CLASSES) VB.RAW_WORDS[cls].trim().split("\n").forEach(l => {
  const stem = l.split("|")[0].trim(); if (!stem) return;
  out.push({ stem, cls, forms: VB.decline(stem, cls) });
});
console.log(JSON.stringify(out));
"""
root = os.path.dirname(HERE)
words = json.loads(subprocess.check_output(["node", "-e", js, root]).decode("utf-8"))

checked, bad = 0, []
for w in words:
    slp = sanscript.transliterate(w["stem"], "devanagari", "slp1")
    P = decline(slp, CLS[w["cls"]])
    for v in VIBS:
        for n in VACS:
            key = f"{v}.{n}"
            py = dev(P[(v, n)])
            checked += 1
            if py != w["forms"][key]:
                bad.append(f'{w["stem"]} {key}: js={w["forms"][key]} py={py}')

print(f"Words: {len(words)}   Forms compared: {checked}   Disagreements: {len(bad)}")
for b in bad[:40]:
    print("  " + b)
sys.exit(1 if bad else 0)
