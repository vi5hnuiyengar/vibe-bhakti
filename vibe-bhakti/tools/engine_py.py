"""
Declension engine for the four target classes.
Works in SLP1, converts to Devanagari and IAST at the edges.
"""
from indic_transliteration import sanscript

VIBS = ["pra","dvi","tri","cat","pan","sha","sap","sam"]
VACS = ["eka","bahu"]
CLASSES = ["a_pum","aa_stri","ii_stri","a_napum"]

VIB_SA = {"pra":"प्रथमा","dvi":"द्वितीया","tri":"तृतीया","cat":"चतुर्थी",
          "pan":"पञ्चमी","sha":"षष्ठी","sap":"सप्तमी","sam":"सम्बोधनम्"}
VIB_EN = {"pra":"prathamā (1st)","dvi":"dvitīyā (2nd)","tri":"tṛtīyā (3rd)",
          "cat":"caturthī (4th)","pan":"pañcamī (5th)","sha":"ṣaṣṭhī (6th)",
          "sap":"saptamī (7th)","sam":"sambodhana (address)"}
VAC_SA = {"eka":"एकवचनम्","bahu":"बहुवचनम्"}
CLASS_SA = {"a_pum":"अकारान्तः पुंलिङ्गः","aa_stri":"आकारान्तः स्त्रीलिङ्गः",
            "ii_stri":"ईकारान्तः स्त्रीलिङ्गः","a_napum":"अकारान्तः नपुंसकलिङ्गः"}
CLASS_SHORT = {"a_pum":"पुं.","aa_stri":"स्त्री.","ii_stri":"स्त्री.","a_napum":"नपुं."}
CLASS_EN = {"a_pum":"a-ending masculine","aa_stri":"ā-ending feminine",
            "ii_stri":"ī-ending feminine","a_napum":"a-ending neuter"}
GENDER = {"a_pum":"m","aa_stri":"f","ii_stri":"f","a_napum":"n"}

def dev(s): return sanscript.transliterate(s, "slp1", "devanagari")
def iast(s): return sanscript.transliterate(s, "slp1", "iast")

# ---------- natva (n -> R) ----------
VOWELS = set("aAiIuUfFxXeEoO")
ALLOWED = VOWELS | set("hyvrkKgGNpPbBmM")   # at, ku, pu, aN, num
TRIGGERS = set("rfFz")

def natva(word, idx):
    """Return word with word[idx] ('n') changed to 'R' if the rule applies."""
    if word[idx] != "n" or idx == len(word) - 1:
        return word
    for j in range(idx - 1, -1, -1):
        c = word[j]
        if c in TRIGGERS:
            return word[:idx] + "R" + word[idx+1:]
        if c not in ALLOWED:
            return word
    return word

def with_suffix_n(stem_part, suffix):
    """Join and apply natva to the first 'n' of the suffix."""
    w = stem_part + suffix
    k = suffix.find("n")
    if k >= 0:
        w = natva(w, len(stem_part) + k)
    return w

def natva_applied(stem_part, suffix):
    return "R" in with_suffix_n(stem_part, suffix)[len(stem_part):]

# ---------- paradigms ----------
def decline(stem, cls):
    b = stem[:-1]
    P = {}
    if cls in ("a_pum", "a_napum"):
        P[("tri","eka")] = with_suffix_n(b, "ena")
        P[("tri","bahu")] = b + "EH"
        P[("cat","eka")] = b + "Aya"
        P[("cat","bahu")] = b + "eByaH"
        P[("pan","eka")] = b + "At"
        P[("pan","bahu")] = b + "eByaH"
        P[("sha","eka")] = stem + "sya"
        P[("sha","bahu")] = with_suffix_n(b, "AnAm")
        P[("sap","eka")] = b + "e"
        P[("sap","bahu")] = b + "ezu"
        P[("sam","eka")] = stem
        if cls == "a_pum":
            P[("pra","eka")] = stem + "H"
            P[("pra","bahu")] = b + "AH"
            P[("dvi","eka")] = stem + "m"
            P[("dvi","bahu")] = b + "An"
            P[("sam","bahu")] = b + "AH"
        else:
            P[("pra","eka")] = stem + "m"
            P[("pra","bahu")] = with_suffix_n(b, "Ani")
            P[("dvi","eka")] = stem + "m"
            P[("dvi","bahu")] = with_suffix_n(b, "Ani")
            P[("sam","bahu")] = with_suffix_n(b, "Ani")
    elif cls == "aa_stri":
        P[("pra","eka")] = stem
        P[("pra","bahu")] = stem + "H"
        P[("dvi","eka")] = stem + "m"
        P[("dvi","bahu")] = stem + "H"
        P[("tri","eka")] = b + "ayA"
        P[("tri","bahu")] = stem + "BiH"
        P[("cat","eka")] = stem + "yE"
        P[("cat","bahu")] = stem + "ByaH"
        P[("pan","eka")] = stem + "yAH"
        P[("pan","bahu")] = stem + "ByaH"
        P[("sha","eka")] = stem + "yAH"
        P[("sha","bahu")] = with_suffix_n(stem, "nAm")
        P[("sap","eka")] = stem + "yAm"
        P[("sap","bahu")] = stem + "su"
        P[("sam","eka")] = b + "e"
        P[("sam","bahu")] = stem + "H"
    elif cls == "ii_stri":
        P[("pra","eka")] = stem
        P[("pra","bahu")] = b + "yaH"
        P[("dvi","eka")] = stem + "m"
        P[("dvi","bahu")] = stem + "H"
        P[("tri","eka")] = b + "yA"
        P[("tri","bahu")] = stem + "BiH"
        P[("cat","eka")] = b + "yE"
        P[("cat","bahu")] = stem + "ByaH"
        P[("pan","eka")] = b + "yAH"
        P[("pan","bahu")] = stem + "ByaH"
        P[("sha","eka")] = b + "yAH"
        P[("sha","bahu")] = with_suffix_n(stem, "nAm")
        P[("sap","eka")] = b + "yAm"
        P[("sap","bahu")] = stem + "zu"
        P[("sam","eka")] = b + "i"
        P[("sam","bahu")] = b + "yaH"
    return P

def natva_cells(stem, cls):
    """Cells where the suffix carries an n that may turn into R."""
    b = stem[:-1]
    out = {}
    if cls in ("a_pum","a_napum"):
        out[("tri","eka")] = natva_applied(b, "ena")
        out[("sha","bahu")] = natva_applied(b, "AnAm")
        if cls == "a_napum":
            for c in [("pra","bahu"),("dvi","bahu"),("sam","bahu")]:
                out[c] = natva_applied(b, "Ani")
    else:
        out[("sha","bahu")] = natva_applied(stem, "nAm")
    return out

def root_of(stem): return stem[:-1]
def stem_for_class(root, cls):
    return root + ("a" if cls in ("a_pum","a_napum") else "A" if cls=="aa_stri" else "I")

# ---------- misconception distractors ----------
def flip_natva(form):
    if "R" in form:
        i = form.rfind("R")
        return form[:i] + "n" + form[i+1:]
    for suf in ("ena","AnAm","Ani","nAm"):
        if form.endswith(suf):
            k = len(form) - len(suf) + suf.find("n")
            return form[:k] + "R" + form[k+1:]
    return None

def misconceptions(stem, cls, cell):
    """Wrong forms for (stem, cls, cell), each tagged with the misconception it reveals."""
    P = decline(stem, cls)
    right = P[cell]
    vib, vac = cell
    out = []
    root = root_of(stem)
    # 6. well known traps
    if cls == "a_pum" and cell == ("dvi","bahu"): out.append((root + "AH", "M10_dvitiya_bahu_pum"))
    if cls == "ii_stri" and cell == ("pra","bahu"): out.append((stem + "H", "M11_ii_prathama"))
    if cls == "ii_stri" and cell == ("dvi","bahu"): out.append((root + "yaH", "M11_ii_prathama"))
    if cls == "ii_stri" and cell == ("pra","eka"): out.append((stem + "H", "M11_ii_prathama"))
    if cls == "a_napum" and vib in ("pra","dvi") and vac == "bahu": out.append((root + "AH", "M3_neuter_pum_mixup"))
    # 1. class transfer: same cell, wrong class endings on the same root
    for oc in CLASSES:
        if oc == cls: continue
        f = decline(stem_for_class(root, oc), oc)[cell]
        fem = ("aa_stri","ii_stri")
        if cls in fem and oc in fem: tag = "M2_aa_ii_mixup"
        elif (cls in fem) != (oc in fem): tag = "M1_gender_transfer"
        else: tag = "M3_neuter_pum_mixup"
        out.append((f, tag))
    # 2. wrong vacana
    ov = "bahu" if vac == "eka" else "eka"
    out.append((P[(vib, ov)], "M8_vacana_swap"))
    # 3. neighbour vibhakti, same vacana
    i = VIBS.index(vib)
    for j in (i-1, i+1):
        if 0 <= j < len(VIBS):
            out.append((P[(VIBS[j], vac)], "M9_neighbour_vibhakti"))
    # 4. natva / satva slips
    nf = flip_natva(right)
    if nf and nf != right: out.append((nf, "M4_natva"))
    if right.endswith("zu"): out.append((right[:-2] + "su", "M5_satva"))
    # 5. sambodhana-specific
    if vib == "sam":
        out.append((P[("pra", vac)], "M7_sambodhana_as_prathama"))
        if cls == "aa_stri" and vac == "eka": out.append((stem, "M7_sambodhana_length"))
        if cls == "ii_stri" and vac == "eka": out.append((stem, "M7_sambodhana_length"))
    # clean
    seen, clean = {right}, []
    for f, t in out:
        if f and f not in seen:
            seen.add(f); clean.append((f, t))
    return clean
