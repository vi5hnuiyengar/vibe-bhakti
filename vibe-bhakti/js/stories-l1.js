/* stories-l1.js - level 1 reading corpus.
 * Marks are {tok, stem, cls, cell}. The app renders each marked word with
 * VB.decline(stem, cls)[cell]; tools/check.js asserts that equals the token
 * at tok. No surface form is stored, so a mislabelled word fails the build.
 */
var VB = window.VB = window.VB || {};

VB.STORIES_L1 = {
 "level": 1,
 "stories": [
  {
   "id": "pt-001",
   "title": "सिंहः मूषकः च",
   "source": "Pañcatantra, Mitrabheda",
   "provenance": "retelling",
   "difficulty": 1,
   "lines": [
    {
     "sa": "एकस्मिन् वने सिंहः वसति स्म।",
     "en": "In a certain forest there lived a lion.",
     "marks": [
      {
       "tok": 1,
       "stem": "वन",
       "cls": "n",
       "cell": "sap.eka"
      },
      {
       "tok": 2,
       "stem": "सिंह",
       "cls": "a",
       "cell": "pra.eka"
      }
     ]
    },
    {
     "sa": "सः दिवसे वृक्षस्य अधः शेते स्म।",
     "en": "By day he used to lie under a tree.",
     "marks": [
      {
       "tok": 1,
       "stem": "दिवस",
       "cls": "a",
       "cell": "sap.eka"
      },
      {
       "tok": 2,
       "stem": "वृक्ष",
       "cls": "a",
       "cell": "sha.eka"
      }
     ]
    },
    {
     "sa": "तदा एकः मूषकः तस्य शरीरे धावति स्म।",
     "en": "Then a mouse would run on his body.",
     "marks": [
      {
       "tok": 2,
       "stem": "मूषक",
       "cls": "a",
       "cell": "pra.eka"
      },
      {
       "tok": 4,
       "stem": "शरीर",
       "cls": "n",
       "cell": "sap.eka"
      }
     ]
    },
    {
     "sa": "सिंहः मूषकं गृह्णाति स्म।",
     "en": "The lion caught the mouse.",
     "marks": [
      {
       "tok": 0,
       "stem": "सिंह",
       "cls": "a",
       "cell": "pra.eka"
      },
      {
       "tok": 1,
       "stem": "मूषक",
       "cls": "a",
       "cell": "dvi.eka"
      }
     ]
    },
    {
     "sa": "मूषकः \"मां मुञ्च\" इति वदति स्म।",
     "en": "The mouse said, \"Let me go.\"",
     "marks": [
      {
       "tok": 0,
       "stem": "मूषक",
       "cls": "a",
       "cell": "pra.eka"
      }
     ]
    },
    {
     "sa": "सिंहः तं मुञ्चति स्म।",
     "en": "The lion released him.",
     "marks": [
      {
       "tok": 0,
       "stem": "सिंह",
       "cls": "a",
       "cell": "pra.eka"
      }
     ]
    },
    {
     "sa": "एकदा सैनिकाः सिंहं गृह्णन्ति स्म।",
     "en": "One day soldiers captured the lion.",
     "marks": [
      {
       "tok": 1,
       "stem": "सैनिक",
       "cls": "a",
       "cell": "pra.bahu"
      },
      {
       "tok": 2,
       "stem": "सिंह",
       "cls": "a",
       "cell": "dvi.eka"
      }
     ]
    },
    {
     "sa": "मूषकः आगच्छति स्म। सः सिंहं रक्षति स्म।",
     "en": "The mouse came. He saved the lion.",
     "marks": [
      {
       "tok": 0,
       "stem": "मूषक",
       "cls": "a",
       "cell": "pra.eka"
      },
      {
       "tok": 4,
       "stem": "सिंह",
       "cls": "a",
       "cell": "dvi.eka"
      }
     ]
    },
    {
     "sa": "एवं लघु अपि मित्रं महत् कार्यं करोति।",
     "en": "So even a small friend does a great deed.",
     "marks": [
      {
       "tok": 3,
       "stem": "मित्र",
       "cls": "n",
       "cell": "pra.eka"
      },
      {
       "tok": 5,
       "stem": "कार्य",
       "cls": "n",
       "cell": "dvi.eka"
      }
     ]
    }
   ]
  },
  {
   "id": "pt-002",
   "title": "काकः घटः च",
   "source": "Pañcatantra tradition",
   "provenance": "retelling",
   "difficulty": 1,
   "lines": [
    {
     "sa": "ग्रीष्मे काकः जलम् इच्छति स्म।",
     "en": "In summer a crow wanted water.",
     "marks": [
      {
       "tok": 0,
       "stem": "ग्रीष्म",
       "cls": "a",
       "cell": "sap.eka"
      },
      {
       "tok": 1,
       "stem": "काक",
       "cls": "a",
       "cell": "pra.eka"
      },
      {
       "tok": 2,
       "stem": "जल",
       "cls": "n",
       "cell": "dvi.eka"
      }
     ]
    },
    {
     "sa": "सः उद्याने घटं पश्यति स्म।",
     "en": "He saw a pot in the garden.",
     "marks": [
      {
       "tok": 1,
       "stem": "उद्यान",
       "cls": "n",
       "cell": "sap.eka"
      },
      {
       "tok": 2,
       "stem": "घट",
       "cls": "a",
       "cell": "dvi.eka"
      }
     ]
    },
    {
     "sa": "घटे अल्पं जलम् आसीत्।",
     "en": "There was a little water in the pot.",
     "marks": [
      {
       "tok": 0,
       "stem": "घट",
       "cls": "a",
       "cell": "sap.eka"
      },
      {
       "tok": 2,
       "stem": "जल",
       "cls": "n",
       "cell": "pra.eka"
      }
     ]
    },
    {
     "sa": "काकः शिलाः आनयति स्म।",
     "en": "The crow brought stones.",
     "marks": [
      {
       "tok": 0,
       "stem": "काक",
       "cls": "a",
       "cell": "pra.eka"
      },
      {
       "tok": 1,
       "stem": "शिला",
       "cls": "aa",
       "cell": "dvi.bahu"
      }
     ]
    },
    {
     "sa": "सः शिलाः घटे क्षिपति स्म।",
     "en": "He threw the stones into the pot.",
     "marks": [
      {
       "tok": 1,
       "stem": "शिला",
       "cls": "aa",
       "cell": "dvi.bahu"
      },
      {
       "tok": 2,
       "stem": "घट",
       "cls": "a",
       "cell": "sap.eka"
      }
     ]
    },
    {
     "sa": "जलम् उपरि आगच्छति स्म।",
     "en": "The water came up.",
     "marks": [
      {
       "tok": 0,
       "stem": "जल",
       "cls": "n",
       "cell": "pra.eka"
      }
     ]
    },
    {
     "sa": "काकः जलं पिबति स्म। बुद्ध्या कार्यं सिध्यति।",
     "en": "The crow drank the water. By intelligence a task succeeds.",
     "marks": [
      {
       "tok": 0,
       "stem": "काक",
       "cls": "a",
       "cell": "pra.eka"
      },
      {
       "tok": 1,
       "stem": "जल",
       "cls": "n",
       "cell": "dvi.eka"
      },
      {
       "tok": 5,
       "stem": "कार्य",
       "cls": "n",
       "cell": "pra.eka"
      }
     ]
    }
   ]
  },
  {
   "id": "pt-003",
   "title": "मूर्खः वानरः",
   "source": "Pañcatantra, Mitralābha",
   "provenance": "retelling",
   "difficulty": 2,
   "lines": [
    {
     "sa": "वने वानराः वसन्ति स्म।",
     "en": "Monkeys lived in the forest.",
     "marks": [
      {
       "tok": 0,
       "stem": "वन",
       "cls": "n",
       "cell": "sap.eka"
      },
      {
       "tok": 1,
       "stem": "वानर",
       "cls": "a",
       "cell": "pra.bahu"
      }
     ]
    },
    {
     "sa": "शीतकाले ते अग्निम् इच्छन्ति स्म।",
     "en": "In the cold season they wanted fire.",
     "marks": []
    },
    {
     "sa": "वृक्षे खगः तिष्ठति स्म।",
     "en": "A bird was sitting in the tree.",
     "marks": [
      {
       "tok": 0,
       "stem": "वृक्ष",
       "cls": "a",
       "cell": "sap.eka"
      },
      {
       "tok": 1,
       "stem": "खग",
       "cls": "a",
       "cell": "pra.eka"
      }
     ]
    },
    {
     "sa": "खगः वानरान् वदति स्म।",
     "en": "The bird spoke to the monkeys.",
     "marks": [
      {
       "tok": 0,
       "stem": "खग",
       "cls": "a",
       "cell": "pra.eka"
      },
      {
       "tok": 1,
       "stem": "वानर",
       "cls": "a",
       "cell": "dvi.bahu"
      }
     ]
    },
    {
     "sa": "\"मूर्खाणां पुरतः उपदेशः व्यर्थः\" इति।",
     "en": "\"Advice before fools is useless.\"",
     "marks": [
      {
       "tok": 0,
       "stem": "मूर्ख",
       "cls": "a",
       "cell": "sha.bahu"
      }
     ]
    },
    {
     "sa": "वानराः कुप्यन्ति स्म। ते खगस्य नीडं नाशयन्ति स्म।",
     "en": "The monkeys grew angry. They destroyed the bird's nest.",
     "marks": [
      {
       "tok": 0,
       "stem": "वानर",
       "cls": "a",
       "cell": "pra.bahu"
      },
      {
       "tok": 4,
       "stem": "खग",
       "cls": "a",
       "cell": "sha.eka"
      }
     ]
    },
    {
     "sa": "अतः मूर्खाय उपदेशः न देयः।",
     "en": "Therefore advice should not be given to a fool.",
     "marks": [
      {
       "tok": 1,
       "stem": "मूर्ख",
       "cls": "a",
       "cell": "cat.eka"
      }
     ]
    }
   ]
  },
  {
   "id": "pt-004",
   "title": "शृगालः द्राक्षा च",
   "source": "Aesopic tale in Sanskrit retelling",
   "provenance": "retelling",
   "difficulty": 1,
   "lines": [
    {
     "sa": "एकः शृगालः वने भ्रमति स्म।",
     "en": "A jackal was wandering in the forest.",
     "marks": [
      {
       "tok": 1,
       "stem": "शृगाल",
       "cls": "a",
       "cell": "pra.eka"
      },
      {
       "tok": 2,
       "stem": "वन",
       "cls": "n",
       "cell": "sap.eka"
      }
     ]
    },
    {
     "sa": "सः वल्ल्यां द्राक्षाः पश्यति स्म।",
     "en": "He saw grapes on a creeper.",
     "marks": [
      {
       "tok": 1,
       "stem": "वल्ली",
       "cls": "ii",
       "cell": "sap.eka"
      },
      {
       "tok": 2,
       "stem": "द्राक्षा",
       "cls": "aa",
       "cell": "dvi.bahu"
      }
     ]
    },
    {
     "sa": "द्राक्षाः उपरि आसन्। शृगालः उत्पतति स्म।",
     "en": "The grapes were above. The jackal leapt up.",
     "marks": [
      {
       "tok": 0,
       "stem": "द्राक्षा",
       "cls": "aa",
       "cell": "pra.bahu"
      },
      {
       "tok": 3,
       "stem": "शृगाल",
       "cls": "a",
       "cell": "pra.eka"
      }
     ]
    },
    {
     "sa": "सः द्राक्षाः न प्राप्नोति स्म।",
     "en": "He did not reach the grapes.",
     "marks": [
      {
       "tok": 1,
       "stem": "द्राक्षा",
       "cls": "aa",
       "cell": "dvi.bahu"
      }
     ]
    },
    {
     "sa": "तदा सः वदति स्म \"द्राक्षाः अम्लाः\" इति।",
     "en": "Then he said, \"The grapes are sour.\"",
     "marks": [
      {
       "tok": 4,
       "stem": "द्राक्षा",
       "cls": "aa",
       "cell": "pra.bahu"
      }
     ]
    }
   ]
  },
  {
   "id": "pt-005",
   "title": "ब्राह्मणः अजा च",
   "source": "Pañcatantra, Kākolūkīya",
   "provenance": "retelling",
   "difficulty": 2,
   "lines": [
    {
     "sa": "एकः ब्राह्मणः ग्रामात् अजाम् आनयति स्म।",
     "en": "A brahmin was bringing a goat from the village.",
     "marks": [
      {
       "tok": 1,
       "stem": "ब्राह्मण",
       "cls": "a",
       "cell": "pra.eka"
      },
      {
       "tok": 2,
       "stem": "ग्राम",
       "cls": "a",
       "cell": "pan.eka"
      },
      {
       "tok": 3,
       "stem": "अजा",
       "cls": "aa",
       "cell": "dvi.eka"
      }
     ]
    },
    {
     "sa": "मार्गे चोराः तिष्ठन्ति स्म।",
     "en": "Thieves were standing on the road.",
     "marks": [
      {
       "tok": 0,
       "stem": "मार्ग",
       "cls": "a",
       "cell": "sap.eka"
      },
      {
       "tok": 1,
       "stem": "चोर",
       "cls": "a",
       "cell": "pra.bahu"
      }
     ]
    },
    {
     "sa": "एकः चोरः वदति स्म \"एषः कुक्कुरः\" इति।",
     "en": "One thief said, \"This is a dog.\"",
     "marks": [
      {
       "tok": 1,
       "stem": "चोर",
       "cls": "a",
       "cell": "pra.eka"
      },
      {
       "tok": 5,
       "stem": "कुक्कुर",
       "cls": "a",
       "cell": "pra.eka"
      }
     ]
    },
    {
     "sa": "अन्यः चोरः तथा एव वदति स्म।",
     "en": "Another thief said the same.",
     "marks": [
      {
       "tok": 1,
       "stem": "चोर",
       "cls": "a",
       "cell": "pra.eka"
      }
     ]
    },
    {
     "sa": "ब्राह्मणः चिन्तयति स्म। सः अजां त्यजति स्म।",
     "en": "The brahmin thought. He abandoned the goat.",
     "marks": [
      {
       "tok": 0,
       "stem": "ब्राह्मण",
       "cls": "a",
       "cell": "pra.eka"
      },
      {
       "tok": 4,
       "stem": "अजा",
       "cls": "aa",
       "cell": "dvi.eka"
      }
     ]
    },
    {
     "sa": "चोराः अजां नयन्ति स्म।",
     "en": "The thieves took the goat away.",
     "marks": [
      {
       "tok": 0,
       "stem": "चोर",
       "cls": "a",
       "cell": "pra.bahu"
      },
      {
       "tok": 1,
       "stem": "अजा",
       "cls": "aa",
       "cell": "dvi.eka"
      }
     ]
    },
    {
     "sa": "पुनः पुनः कथितं वचनं सत्यम् इव भासते।",
     "en": "A word said again and again seems like truth.",
     "marks": [
      {
       "tok": 3,
       "stem": "वचन",
       "cls": "n",
       "cell": "pra.eka"
      }
     ]
    }
   ]
  },
  {
   "id": "pt-006",
   "title": "बकः मत्स्याः च",
   "source": "Pañcatantra, Mitrabheda",
   "provenance": "retelling",
   "difficulty": 2,
   "lines": [
    {
     "sa": "तडागे मत्स्याः वसन्ति स्म।",
     "en": "Fish lived in a pond.",
     "marks": [
      {
       "tok": 0,
       "stem": "तडाग",
       "cls": "a",
       "cell": "sap.eka"
      },
      {
       "tok": 1,
       "stem": "मत्स्य",
       "cls": "a",
       "cell": "pra.bahu"
      }
     ]
    },
    {
     "sa": "तीरे वृद्धः बकः तिष्ठति स्म।",
     "en": "On the bank stood an old crane.",
     "marks": [
      {
       "tok": 2,
       "stem": "बक",
       "cls": "a",
       "cell": "pra.eka"
      }
     ]
    },
    {
     "sa": "बकः मत्स्यान् वदति स्म।",
     "en": "The crane spoke to the fish.",
     "marks": [
      {
       "tok": 0,
       "stem": "बक",
       "cls": "a",
       "cell": "pra.eka"
      },
      {
       "tok": 1,
       "stem": "मत्स्य",
       "cls": "a",
       "cell": "dvi.bahu"
      }
     ]
    },
    {
     "sa": "\"अस्मिन् तडागे जलं क्षीयते\" इति।",
     "en": "\"The water in this pond is drying up.\"",
     "marks": [
      {
       "tok": 1,
       "stem": "तडाग",
       "cls": "a",
       "cell": "sap.eka"
      },
      {
       "tok": 2,
       "stem": "जल",
       "cls": "n",
       "cell": "pra.eka"
      }
     ]
    },
    {
     "sa": "मत्स्याः बकस्य वचनं श्रद्दधति स्म।",
     "en": "The fish trusted the crane's word.",
     "marks": [
      {
       "tok": 0,
       "stem": "मत्स्य",
       "cls": "a",
       "cell": "pra.bahu"
      },
      {
       "tok": 1,
       "stem": "बक",
       "cls": "a",
       "cell": "sha.eka"
      },
      {
       "tok": 2,
       "stem": "वचन",
       "cls": "n",
       "cell": "dvi.eka"
      }
     ]
    },
    {
     "sa": "बकः प्रतिदिनं मत्स्यं खादति स्म।",
     "en": "Every day the crane ate a fish.",
     "marks": [
      {
       "tok": 0,
       "stem": "बक",
       "cls": "a",
       "cell": "pra.eka"
      },
      {
       "tok": 2,
       "stem": "मत्स्य",
       "cls": "a",
       "cell": "dvi.eka"
      }
     ]
    },
    {
     "sa": "अन्ते कर्कटः बकं जानाति स्म। सः बकं नाशयति स्म।",
     "en": "At last a crab understood the crane. He destroyed him.",
     "marks": [
      {
       "tok": 2,
       "stem": "बक",
       "cls": "a",
       "cell": "dvi.eka"
      }
     ]
    },
    {
     "sa": "अतिलोभः विनाशाय भवति।",
     "en": "Excessive greed leads to ruin.",
     "marks": []
    }
   ]
  },
  {
   "id": "ht-001",
   "title": "कपोताः व्याधः च",
   "source": "Hitopadeśa, Mitralābha",
   "provenance": "retelling",
   "difficulty": 2,
   "lines": [
    {
     "sa": "वने बहवः कपोताः उड्डयन्ते स्म।",
     "en": "Many pigeons were flying in the forest.",
     "marks": [
      {
       "tok": 0,
       "stem": "वन",
       "cls": "n",
       "cell": "sap.eka"
      },
      {
       "tok": 2,
       "stem": "कपोत",
       "cls": "a",
       "cell": "pra.bahu"
      }
     ]
    },
    {
     "sa": "भूमौ तण्डुलाः आसन्। कपोताः अवतरन्ति स्म।",
     "en": "There were rice grains on the ground. The pigeons came down.",
     "marks": [
      {
       "tok": 1,
       "stem": "तण्डुल",
       "cls": "a",
       "cell": "pra.bahu"
      },
      {
       "tok": 3,
       "stem": "कपोत",
       "cls": "a",
       "cell": "pra.bahu"
      }
     ]
    },
    {
     "sa": "ते जाले बध्यन्ते स्म।",
     "en": "They were caught in a net.",
     "marks": []
    },
    {
     "sa": "राजा कपोतानां वदति स्म \"सर्वे सह उत्पतत\" इति।",
     "en": "The king of the pigeons said, \"Fly up all together.\"",
     "marks": [
      {
       "tok": 1,
       "stem": "कपोत",
       "cls": "a",
       "cell": "sha.bahu"
      }
     ]
    },
    {
     "sa": "कपोताः सह उत्पतन्ति स्म। जालं गच्छति स्म।",
     "en": "The pigeons flew up together. The net went along.",
     "marks": [
      {
       "tok": 0,
       "stem": "कपोत",
       "cls": "a",
       "cell": "pra.bahu"
      }
     ]
    },
    {
     "sa": "मूषकः जालं छिनत्ति स्म। कपोताः मुक्ताः भवन्ति स्म।",
     "en": "A mouse cut the net. The pigeons were freed.",
     "marks": [
      {
       "tok": 0,
       "stem": "मूषक",
       "cls": "a",
       "cell": "pra.eka"
      },
      {
       "tok": 4,
       "stem": "कपोत",
       "cls": "a",
       "cell": "pra.bahu"
      }
     ]
    },
    {
     "sa": "सङ्घे बलं वर्तते।",
     "en": "In union there is strength.",
     "marks": [
      {
       "tok": 0,
       "stem": "सङ्घ",
       "cls": "a",
       "cell": "sap.eka"
      },
      {
       "tok": 1,
       "stem": "बल",
       "cls": "n",
       "cell": "pra.eka"
      }
     ]
    }
   ]
  },
  {
   "id": "ht-002",
   "title": "वृद्धः व्याघ्रः च",
   "source": "Hitopadeśa, Mitralābha",
   "provenance": "retelling",
   "difficulty": 3,
   "lines": [
    {
     "sa": "तडागस्य तीरे व्याघ्रः तिष्ठति स्म।",
     "en": "A tiger stood on the bank of a pond.",
     "marks": [
      {
       "tok": 0,
       "stem": "तडाग",
       "cls": "a",
       "cell": "sha.eka"
      },
      {
       "tok": 2,
       "stem": "व्याघ्र",
       "cls": "a",
       "cell": "pra.eka"
      }
     ]
    },
    {
     "sa": "तस्य हस्ते सुवर्णं कङ्कणम् आसीत्।",
     "en": "In his paw was a golden bracelet.",
     "marks": [
      {
       "tok": 1,
       "stem": "हस्त",
       "cls": "a",
       "cell": "sap.eka"
      },
      {
       "tok": 3,
       "stem": "कङ्कण",
       "cls": "n",
       "cell": "pra.eka"
      }
     ]
    },
    {
     "sa": "सः पथिकं वदति स्म \"एतत् कङ्कणं गृहाण\" इति।",
     "en": "He told a traveller, \"Take this bracelet.\"",
     "marks": [
      {
       "tok": 5,
       "stem": "कङ्कण",
       "cls": "n",
       "cell": "dvi.eka"
      }
     ]
    },
    {
     "sa": "पथिकः लोभेन तडागं प्रविशति स्म।",
     "en": "Out of greed the traveller entered the pond.",
     "marks": [
      {
       "tok": 1,
       "stem": "लोभ",
       "cls": "a",
       "cell": "tri.eka"
      },
      {
       "tok": 2,
       "stem": "तडाग",
       "cls": "a",
       "cell": "dvi.eka"
      }
     ]
    },
    {
     "sa": "सः पङ्के मग्नः भवति स्म।",
     "en": "He sank in the mud.",
     "marks": []
    },
    {
     "sa": "व्याघ्रः तं खादति स्म।",
     "en": "The tiger ate him.",
     "marks": [
      {
       "tok": 0,
       "stem": "व्याघ्र",
       "cls": "a",
       "cell": "pra.eka"
      }
     ]
    },
    {
     "sa": "लोभात् बुद्धिः नश्यति।",
     "en": "From greed, judgement perishes.",
     "marks": [
      {
       "tok": 0,
       "stem": "लोभ",
       "cls": "a",
       "cell": "pan.eka"
      }
     ]
    }
   ]
  },
  {
   "id": "ht-003",
   "title": "मित्रस्य मूल्यम्",
   "source": "Hitopadeśa tradition",
   "provenance": "retelling",
   "difficulty": 2,
   "lines": [
    {
     "sa": "नगरे जनाः वसन्ति स्म।",
     "en": "People lived in a city.",
     "marks": [
      {
       "tok": 0,
       "stem": "नगर",
       "cls": "n",
       "cell": "sap.eka"
      },
      {
       "tok": 1,
       "stem": "जन",
       "cls": "a",
       "cell": "pra.bahu"
      }
     ]
    },
    {
     "sa": "एकस्य जनस्य बहु धनम् आसीत्।",
     "en": "One man had much wealth.",
     "marks": [
      {
       "tok": 1,
       "stem": "जन",
       "cls": "a",
       "cell": "sha.eka"
      },
      {
       "tok": 3,
       "stem": "धन",
       "cls": "n",
       "cell": "pra.eka"
      }
     ]
    },
    {
     "sa": "तस्य मित्राणि न आसन्।",
     "en": "He had no friends.",
     "marks": [
      {
       "tok": 1,
       "stem": "मित्र",
       "cls": "n",
       "cell": "pra.bahu"
      }
     ]
    },
    {
     "sa": "अन्यस्य जनस्य धनं न आसीत्। किन्तु तस्य मित्राणि बहूनि आसन्।",
     "en": "Another man had no wealth. But he had many friends.",
     "marks": [
      {
       "tok": 1,
       "stem": "जन",
       "cls": "a",
       "cell": "sha.eka"
      },
      {
       "tok": 2,
       "stem": "धन",
       "cls": "n",
       "cell": "pra.eka"
      },
      {
       "tok": 7,
       "stem": "मित्र",
       "cls": "n",
       "cell": "pra.bahu"
      }
     ]
    },
    {
     "sa": "दुःखे मित्राणि सहायकानि भवन्ति। धनं न रक्षति।",
     "en": "In sorrow friends help. Wealth does not protect.",
     "marks": [
      {
       "tok": 0,
       "stem": "दुःख",
       "cls": "n",
       "cell": "sap.eka"
      },
      {
       "tok": 1,
       "stem": "मित्र",
       "cls": "n",
       "cell": "pra.bahu"
      },
      {
       "tok": 4,
       "stem": "धन",
       "cls": "n",
       "cell": "pra.eka"
      }
     ]
    }
   ]
  },
  {
   "id": "pt-007",
   "title": "चतुरः शृगालः",
   "source": "Pañcatantra tradition",
   "provenance": "retelling",
   "difficulty": 2,
   "lines": [
    {
     "sa": "वने सिंहः राजा आसीत्।",
     "en": "In the forest the lion was king.",
     "marks": [
      {
       "tok": 0,
       "stem": "वन",
       "cls": "n",
       "cell": "sap.eka"
      },
      {
       "tok": 1,
       "stem": "सिंह",
       "cls": "a",
       "cell": "pra.eka"
      }
     ]
    },
    {
     "sa": "सः प्रतिदिनं मृगान् खादति स्म।",
     "en": "Every day he ate deer.",
     "marks": [
      {
       "tok": 2,
       "stem": "मृग",
       "cls": "a",
       "cell": "dvi.bahu"
      }
     ]
    },
    {
     "sa": "मृगाः भीताः आसन्। ते सिंहात् बिभ्यति स्म।",
     "en": "The deer were afraid. They feared the lion.",
     "marks": [
      {
       "tok": 0,
       "stem": "मृग",
       "cls": "a",
       "cell": "pra.bahu"
      },
      {
       "tok": 4,
       "stem": "सिंह",
       "cls": "a",
       "cell": "pan.eka"
      }
     ]
    },
    {
     "sa": "एकः शशकः उपायं चिन्तयति स्म।",
     "en": "A rabbit thought of a plan.",
     "marks": [
      {
       "tok": 1,
       "stem": "शशक",
       "cls": "a",
       "cell": "pra.eka"
      },
      {
       "tok": 2,
       "stem": "उपाय",
       "cls": "a",
       "cell": "dvi.eka"
      }
     ]
    },
    {
     "sa": "सः सिंहं कूपस्य समीपं नयति स्म।",
     "en": "He led the lion near a well.",
     "marks": [
      {
       "tok": 1,
       "stem": "सिंह",
       "cls": "a",
       "cell": "dvi.eka"
      },
      {
       "tok": 2,
       "stem": "कूप",
       "cls": "a",
       "cell": "sha.eka"
      }
     ]
    },
    {
     "sa": "सिंहः जले स्वस्य छायां पश्यति स्म।",
     "en": "The lion saw his own reflection in the water.",
     "marks": [
      {
       "tok": 1,
       "stem": "जल",
       "cls": "n",
       "cell": "sap.eka"
      },
      {
       "tok": 3,
       "stem": "छाया",
       "cls": "aa",
       "cell": "dvi.eka"
      }
     ]
    },
    {
     "sa": "सः कूपे पतति स्म।",
     "en": "He fell into the well.",
     "marks": [
      {
       "tok": 1,
       "stem": "कूप",
       "cls": "a",
       "cell": "sap.eka"
      }
     ]
    },
    {
     "sa": "बुद्धिः बलात् श्रेष्ठा।",
     "en": "Intelligence is better than strength.",
     "marks": [
      {
       "tok": 1,
       "stem": "बल",
       "cls": "n",
       "cell": "pan.eka"
      }
     ]
    }
   ]
  },
  {
   "id": "pt-008",
   "title": "कूर्मः हंसाः च",
   "source": "Pañcatantra, Aparīkṣitakāraka",
   "provenance": "retelling",
   "difficulty": 3,
   "lines": [
    {
     "sa": "तडागे कच्छपः वसति स्म। तस्य मित्राणि हंसाः आसन्।",
     "en": "A tortoise lived in a pond. Swans were his friends.",
     "marks": [
      {
       "tok": 0,
       "stem": "तडाग",
       "cls": "a",
       "cell": "sap.eka"
      },
      {
       "tok": 1,
       "stem": "कच्छप",
       "cls": "a",
       "cell": "pra.eka"
      },
      {
       "tok": 5,
       "stem": "मित्र",
       "cls": "n",
       "cell": "pra.bahu"
      },
      {
       "tok": 6,
       "stem": "हंस",
       "cls": "a",
       "cell": "pra.bahu"
      }
     ]
    },
    {
     "sa": "ग्रीष्मे तडागे जलं न आसीत्।",
     "en": "In summer there was no water in the pond.",
     "marks": [
      {
       "tok": 0,
       "stem": "ग्रीष्म",
       "cls": "a",
       "cell": "sap.eka"
      },
      {
       "tok": 1,
       "stem": "तडाग",
       "cls": "a",
       "cell": "sap.eka"
      },
      {
       "tok": 2,
       "stem": "जल",
       "cls": "n",
       "cell": "pra.eka"
      }
     ]
    },
    {
     "sa": "हंसाः दण्डम् आनयन्ति स्म।",
     "en": "The swans brought a stick.",
     "marks": [
      {
       "tok": 0,
       "stem": "हंस",
       "cls": "a",
       "cell": "pra.bahu"
      },
      {
       "tok": 1,
       "stem": "दण्ड",
       "cls": "a",
       "cell": "dvi.eka"
      }
     ]
    },
    {
     "sa": "कच्छपः दण्डं मुखेन गृह्णाति स्म।",
     "en": "The tortoise gripped the stick with his mouth.",
     "marks": [
      {
       "tok": 0,
       "stem": "कच्छप",
       "cls": "a",
       "cell": "pra.eka"
      },
      {
       "tok": 1,
       "stem": "दण्ड",
       "cls": "a",
       "cell": "dvi.eka"
      },
      {
       "tok": 2,
       "stem": "मुख",
       "cls": "n",
       "cell": "tri.eka"
      }
     ]
    },
    {
     "sa": "हंसाः गगने उड्डयन्ते स्म।",
     "en": "The swans flew in the sky.",
     "marks": [
      {
       "tok": 0,
       "stem": "हंस",
       "cls": "a",
       "cell": "pra.bahu"
      },
      {
       "tok": 1,
       "stem": "गगन",
       "cls": "n",
       "cell": "sap.eka"
      }
     ]
    },
    {
     "sa": "भूमौ जनाः हसन्ति स्म। कच्छपः वदितुम् इच्छति स्म।",
     "en": "On the ground people laughed. The tortoise wished to speak.",
     "marks": [
      {
       "tok": 1,
       "stem": "जन",
       "cls": "a",
       "cell": "pra.bahu"
      },
      {
       "tok": 4,
       "stem": "कच्छप",
       "cls": "a",
       "cell": "pra.eka"
      }
     ]
    },
    {
     "sa": "सः मुखं मुञ्चति स्म। सः पतति स्म।",
     "en": "He opened his mouth. He fell.",
     "marks": [
      {
       "tok": 1,
       "stem": "मुख",
       "cls": "n",
       "cell": "dvi.eka"
      }
     ]
    },
    {
     "sa": "मौनं कदाचित् जीवनं रक्षति।",
     "en": "Silence sometimes saves life.",
     "marks": [
      {
       "tok": 0,
       "stem": "मौन",
       "cls": "n",
       "cell": "pra.eka"
      }
     ]
    }
   ]
  },
  {
   "id": "rm-001",
   "title": "रामस्य जन्म",
   "source": "Rāmāyaṇa, Bālakāṇḍa",
   "provenance": "retelling",
   "difficulty": 1,
   "lines": [
    {
     "sa": "अयोध्यायां दशरथः राजा आसीत्।",
     "en": "In Ayodhya there was a king named Dasharatha.",
     "marks": [
      {
       "tok": 0,
       "stem": "अयोध्या",
       "cls": "aa",
       "cell": "sap.eka"
      },
      {
       "tok": 1,
       "stem": "दशरथ",
       "cls": "a",
       "cell": "pra.eka"
      }
     ]
    },
    {
     "sa": "तस्य पुत्राः न आसन्। सः दुःखी आसीत्।",
     "en": "He had no sons. He was sorrowful.",
     "marks": [
      {
       "tok": 1,
       "stem": "पुत्र",
       "cls": "a",
       "cell": "pra.bahu"
      }
     ]
    },
    {
     "sa": "सः यज्ञं करोति स्म। देवाः प्रसन्नाः भवन्ति स्म।",
     "en": "He performed a sacrifice. The gods were pleased.",
     "marks": [
      {
       "tok": 4,
       "stem": "देव",
       "cls": "a",
       "cell": "pra.bahu"
      }
     ]
    },
    {
     "sa": "अनन्तरं दशरथस्य चत्वारः पुत्राः भवन्ति स्म।",
     "en": "Afterwards Dasharatha had four sons.",
     "marks": [
      {
       "tok": 1,
       "stem": "दशरथ",
       "cls": "a",
       "cell": "sha.eka"
      },
      {
       "tok": 3,
       "stem": "पुत्र",
       "cls": "a",
       "cell": "pra.bahu"
      }
     ]
    },
    {
     "sa": "ज्येष्ठस्य नाम रामः आसीत्।",
     "en": "The eldest was named Rama.",
     "marks": [
      {
       "tok": 2,
       "stem": "राम",
       "cls": "a",
       "cell": "pra.eka"
      }
     ]
    },
    {
     "sa": "अयोध्यायां जनाः उत्सवं कुर्वन्ति स्म।",
     "en": "In Ayodhya the people held a festival.",
     "marks": [
      {
       "tok": 0,
       "stem": "अयोध्या",
       "cls": "aa",
       "cell": "sap.eka"
      },
      {
       "tok": 1,
       "stem": "जन",
       "cls": "a",
       "cell": "pra.bahu"
      },
      {
       "tok": 2,
       "stem": "उत्सव",
       "cls": "a",
       "cell": "dvi.eka"
      }
     ]
    }
   ]
  },
  {
   "id": "rm-002",
   "title": "सीतायाः विवाहः",
   "source": "Rāmāyaṇa, Bālakāṇḍa",
   "provenance": "retelling",
   "difficulty": 2,
   "lines": [
    {
     "sa": "मिथिलायां जनकः राजा आसीत्।",
     "en": "In Mithila there was a king named Janaka.",
     "marks": [
      {
       "tok": 1,
       "stem": "जनक",
       "cls": "a",
       "cell": "pra.eka"
      }
     ]
    },
    {
     "sa": "तस्य पुत्री सीता आसीत्।",
     "en": "His daughter was Sita.",
     "marks": [
      {
       "tok": 1,
       "stem": "पुत्री",
       "cls": "ii",
       "cell": "pra.eka"
      },
      {
       "tok": 2,
       "stem": "सीता",
       "cls": "aa",
       "cell": "pra.eka"
      }
     ]
    },
    {
     "sa": "जनकस्य सभायां महत् धनुः आसीत्।",
     "en": "In Janaka's assembly there was a great bow.",
     "marks": [
      {
       "tok": 0,
       "stem": "जनक",
       "cls": "a",
       "cell": "sha.eka"
      },
      {
       "tok": 1,
       "stem": "सभा",
       "cls": "aa",
       "cell": "sap.eka"
      }
     ]
    },
    {
     "sa": "बहवः नृपाः आगच्छन्ति स्म। ते धनुः न नमयन्ति स्म।",
     "en": "Many kings came. They could not bend the bow.",
     "marks": [
      {
       "tok": 1,
       "stem": "नृप",
       "cls": "a",
       "cell": "pra.bahu"
      }
     ]
    },
    {
     "sa": "रामः सभां प्रविशति स्म। सः धनुः नमयति स्म।",
     "en": "Rama entered the assembly. He bent the bow.",
     "marks": [
      {
       "tok": 0,
       "stem": "राम",
       "cls": "a",
       "cell": "pra.eka"
      },
      {
       "tok": 1,
       "stem": "सभा",
       "cls": "aa",
       "cell": "dvi.eka"
      }
     ]
    },
    {
     "sa": "जनकः रामाय सीतां ददाति स्म।",
     "en": "Janaka gave Sita to Rama.",
     "marks": [
      {
       "tok": 0,
       "stem": "जनक",
       "cls": "a",
       "cell": "pra.eka"
      },
      {
       "tok": 1,
       "stem": "राम",
       "cls": "a",
       "cell": "cat.eka"
      },
      {
       "tok": 2,
       "stem": "सीता",
       "cls": "aa",
       "cell": "dvi.eka"
      }
     ]
    },
    {
     "sa": "मिथिलायां जनाः आनन्देन नृत्यन्ति स्म।",
     "en": "In Mithila the people danced with joy.",
     "marks": [
      {
       "tok": 1,
       "stem": "जन",
       "cls": "a",
       "cell": "pra.bahu"
      },
      {
       "tok": 2,
       "stem": "आनन्द",
       "cls": "a",
       "cell": "tri.eka"
      }
     ]
    }
   ]
  },
  {
   "id": "rm-003",
   "title": "वनगमनम्",
   "source": "Rāmāyaṇa, Ayodhyākāṇḍa",
   "provenance": "retelling",
   "difficulty": 2,
   "lines": [
    {
     "sa": "दशरथः रामाय राज्यम् इच्छति स्म।",
     "en": "Dasharatha wished the kingdom for Rama.",
     "marks": [
      {
       "tok": 0,
       "stem": "दशरथ",
       "cls": "a",
       "cell": "pra.eka"
      },
      {
       "tok": 1,
       "stem": "राम",
       "cls": "a",
       "cell": "cat.eka"
      }
     ]
    },
    {
     "sa": "किन्तु कैकेयी अन्यत् इच्छति स्म।",
     "en": "But Kaikeyi wished otherwise.",
     "marks": []
    },
    {
     "sa": "रामः पितुः वचनं पालयति स्म।",
     "en": "Rama upheld his father's word.",
     "marks": [
      {
       "tok": 0,
       "stem": "राम",
       "cls": "a",
       "cell": "pra.eka"
      },
      {
       "tok": 2,
       "stem": "वचन",
       "cls": "n",
       "cell": "dvi.eka"
      }
     ]
    },
    {
     "sa": "सः सीतया सह वनं गच्छति स्म।",
     "en": "He went to the forest with Sita.",
     "marks": [
      {
       "tok": 1,
       "stem": "सीता",
       "cls": "aa",
       "cell": "tri.eka"
      },
      {
       "tok": 3,
       "stem": "वन",
       "cls": "n",
       "cell": "dvi.eka"
      }
     ]
    },
    {
     "sa": "लक्ष्मणः अपि तेन सह गच्छति स्म।",
     "en": "Lakshmana too went with him.",
     "marks": [
      {
       "tok": 0,
       "stem": "लक्ष्मण",
       "cls": "a",
       "cell": "pra.eka"
      }
     ]
    },
    {
     "sa": "अयोध्यायां जनाः रुदन्ति स्म।",
     "en": "In Ayodhya the people wept.",
     "marks": [
      {
       "tok": 0,
       "stem": "अयोध्या",
       "cls": "aa",
       "cell": "sap.eka"
      },
      {
       "tok": 1,
       "stem": "जन",
       "cls": "a",
       "cell": "pra.bahu"
      }
     ]
    },
    {
     "sa": "सत्यं धनात् श्रेष्ठम् इति रामः दर्शयति स्म।",
     "en": "Rama showed that truth is greater than wealth.",
     "marks": [
      {
       "tok": 0,
       "stem": "सत्य",
       "cls": "n",
       "cell": "pra.eka"
      },
      {
       "tok": 1,
       "stem": "धन",
       "cls": "n",
       "cell": "pan.eka"
      },
      {
       "tok": 4,
       "stem": "राम",
       "cls": "a",
       "cell": "pra.eka"
      }
     ]
    }
   ]
  },
  {
   "id": "rm-004",
   "title": "हनूमतः लङ्कागमनम्",
   "source": "Rāmāyaṇa, Sundarakāṇḍa",
   "provenance": "retelling",
   "difficulty": 3,
   "lines": [
    {
     "sa": "रावणः सीतां लङ्कां नयति स्म।",
     "en": "Ravana took Sita to Lanka.",
     "marks": [
      {
       "tok": 0,
       "stem": "रावण",
       "cls": "a",
       "cell": "pra.eka"
      },
      {
       "tok": 1,
       "stem": "सीता",
       "cls": "aa",
       "cell": "dvi.eka"
      },
      {
       "tok": 2,
       "stem": "लङ्का",
       "cls": "aa",
       "cell": "dvi.eka"
      }
     ]
    },
    {
     "sa": "रामः सीतायाः कृते शोकं करोति स्म।",
     "en": "Rama grieved for Sita.",
     "marks": [
      {
       "tok": 0,
       "stem": "राम",
       "cls": "a",
       "cell": "pra.eka"
      },
      {
       "tok": 1,
       "stem": "सीता",
       "cls": "aa",
       "cell": "sha.eka"
      },
      {
       "tok": 3,
       "stem": "शोक",
       "cls": "a",
       "cell": "dvi.eka"
      }
     ]
    },
    {
     "sa": "वानराः सर्वत्र सीतां पश्यन्ति स्म।",
     "en": "The monkeys searched everywhere for Sita.",
     "marks": [
      {
       "tok": 0,
       "stem": "वानर",
       "cls": "a",
       "cell": "pra.bahu"
      },
      {
       "tok": 2,
       "stem": "सीता",
       "cls": "aa",
       "cell": "dvi.eka"
      }
     ]
    },
    {
     "sa": "समुद्रस्य तीरे वानराः तिष्ठन्ति स्म।",
     "en": "The monkeys stood on the shore of the ocean.",
     "marks": [
      {
       "tok": 0,
       "stem": "समुद्र",
       "cls": "a",
       "cell": "sha.eka"
      },
      {
       "tok": 2,
       "stem": "वानर",
       "cls": "a",
       "cell": "pra.bahu"
      }
     ]
    },
    {
     "sa": "हनूमान् समुद्रम् उल्लङ्घयति स्म।",
     "en": "Hanuman leapt across the ocean.",
     "marks": [
      {
       "tok": 1,
       "stem": "समुद्र",
       "cls": "a",
       "cell": "dvi.eka"
      }
     ]
    },
    {
     "sa": "सः लङ्कायाम् उद्याने सीतां पश्यति स्म।",
     "en": "He saw Sita in a garden in Lanka.",
     "marks": [
      {
       "tok": 1,
       "stem": "लङ्का",
       "cls": "aa",
       "cell": "sap.eka"
      },
      {
       "tok": 2,
       "stem": "उद्यान",
       "cls": "n",
       "cell": "sap.eka"
      },
      {
       "tok": 3,
       "stem": "सीता",
       "cls": "aa",
       "cell": "dvi.eka"
      }
     ]
    },
    {
     "sa": "सः सीतायै रामस्य मुद्रां ददाति स्म।",
     "en": "He gave Sita Rama's ring.",
     "marks": [
      {
       "tok": 1,
       "stem": "सीता",
       "cls": "aa",
       "cell": "cat.eka"
      },
      {
       "tok": 2,
       "stem": "राम",
       "cls": "a",
       "cell": "sha.eka"
      },
      {
       "tok": 3,
       "stem": "मुद्रा",
       "cls": "aa",
       "cell": "dvi.eka"
      }
     ]
    },
    {
     "sa": "सीतायाः दुःखं क्षीयते स्म।",
     "en": "Sita's sorrow lessened.",
     "marks": [
      {
       "tok": 0,
       "stem": "सीता",
       "cls": "aa",
       "cell": "sha.eka"
      },
      {
       "tok": 1,
       "stem": "दुःख",
       "cls": "n",
       "cell": "pra.eka"
      }
     ]
    }
   ]
  },
  {
   "id": "rm-005",
   "title": "शबर्याः भक्तिः",
   "source": "Rāmāyaṇa, Araṇyakāṇḍa",
   "provenance": "retelling",
   "difficulty": 2,
   "lines": [
    {
     "sa": "वने एका वृद्धा वसति स्म।",
     "en": "An old woman lived in the forest.",
     "marks": [
      {
       "tok": 0,
       "stem": "वन",
       "cls": "n",
       "cell": "sap.eka"
      },
      {
       "tok": 2,
       "stem": "वृद्धा",
       "cls": "aa",
       "cell": "pra.eka"
      }
     ]
    },
    {
     "sa": "सा प्रतिदिनं रामं स्मरति स्म।",
     "en": "Every day she remembered Rama.",
     "marks": [
      {
       "tok": 2,
       "stem": "राम",
       "cls": "a",
       "cell": "dvi.eka"
      }
     ]
    },
    {
     "sa": "सा रामाय फलानि सञ्चिनोति स्म।",
     "en": "She gathered fruits for Rama.",
     "marks": [
      {
       "tok": 1,
       "stem": "राम",
       "cls": "a",
       "cell": "cat.eka"
      },
      {
       "tok": 2,
       "stem": "फल",
       "cls": "n",
       "cell": "dvi.bahu"
      }
     ]
    },
    {
     "sa": "एकदा रामः तस्याः कुटीम् आगच्छति स्म।",
     "en": "One day Rama came to her hut.",
     "marks": [
      {
       "tok": 1,
       "stem": "राम",
       "cls": "a",
       "cell": "pra.eka"
      },
      {
       "tok": 3,
       "stem": "कुटी",
       "cls": "ii",
       "cell": "dvi.eka"
      }
     ]
    },
    {
     "sa": "वृद्धा रामाय फलानि ददाति स्म।",
     "en": "The old woman gave the fruits to Rama.",
     "marks": [
      {
       "tok": 0,
       "stem": "वृद्धा",
       "cls": "aa",
       "cell": "pra.eka"
      },
      {
       "tok": 1,
       "stem": "राम",
       "cls": "a",
       "cell": "cat.eka"
      },
      {
       "tok": 2,
       "stem": "फल",
       "cls": "n",
       "cell": "dvi.bahu"
      }
     ]
    },
    {
     "sa": "रामः भक्त्या तुष्यति स्म। भक्तिः धनात् महती।",
     "en": "Rama was pleased by devotion. Devotion is greater than wealth.",
     "marks": [
      {
       "tok": 0,
       "stem": "राम",
       "cls": "a",
       "cell": "pra.eka"
      },
      {
       "tok": 5,
       "stem": "धन",
       "cls": "n",
       "cell": "pan.eka"
      }
     ]
    }
   ]
  },
  {
   "id": "mb-001",
   "title": "एकलव्यस्य गुरुभक्तिः",
   "source": "Mahābhārata, Ādiparvan",
   "provenance": "retelling",
   "difficulty": 3,
   "lines": [
    {
     "sa": "द्रोणः आचार्यः आसीत्। सः नृपाणां पुत्रान् पाठयति स्म।",
     "en": "Drona was a teacher. He taught the sons of kings.",
     "marks": [
      {
       "tok": 1,
       "stem": "आचार्य",
       "cls": "a",
       "cell": "pra.eka"
      },
      {
       "tok": 4,
       "stem": "नृप",
       "cls": "a",
       "cell": "sha.bahu"
      },
      {
       "tok": 5,
       "stem": "पुत्र",
       "cls": "a",
       "cell": "dvi.bahu"
      }
     ]
    },
    {
     "sa": "एकलव्यः वनात् आगच्छति स्म।",
     "en": "Ekalavya came from the forest.",
     "marks": [
      {
       "tok": 1,
       "stem": "वन",
       "cls": "n",
       "cell": "pan.eka"
      }
     ]
    },
    {
     "sa": "सः आचार्यम् इच्छति स्म। किन्तु द्रोणः तं न स्वीकरोति स्म।",
     "en": "He wanted a teacher. But Drona did not accept him.",
     "marks": [
      {
       "tok": 1,
       "stem": "आचार्य",
       "cls": "a",
       "cell": "dvi.eka"
      }
     ]
    },
    {
     "sa": "एकलव्यः वने द्रोणस्य प्रतिमां करोति स्म।",
     "en": "Ekalavya made an image of Drona in the forest.",
     "marks": [
      {
       "tok": 1,
       "stem": "वन",
       "cls": "n",
       "cell": "sap.eka"
      },
      {
       "tok": 3,
       "stem": "प्रतिमा",
       "cls": "aa",
       "cell": "dvi.eka"
      }
     ]
    },
    {
     "sa": "सः प्रतिमायाः पुरतः अभ्यासं करोति स्म।",
     "en": "He practised before the image.",
     "marks": [
      {
       "tok": 1,
       "stem": "प्रतिमा",
       "cls": "aa",
       "cell": "sha.eka"
      }
     ]
    },
    {
     "sa": "कालेन सः अर्जुनात् अपि निपुणः भवति स्म।",
     "en": "In time he became more skilled even than Arjuna.",
     "marks": [
      {
       "tok": 0,
       "stem": "काल",
       "cls": "a",
       "cell": "tri.eka"
      },
      {
       "tok": 2,
       "stem": "अर्जुन",
       "cls": "a",
       "cell": "pan.eka"
      }
     ]
    },
    {
     "sa": "श्रद्धया विद्या सिध्यति।",
     "en": "By faith, learning succeeds.",
     "marks": [
      {
       "tok": 0,
       "stem": "श्रद्धा",
       "cls": "aa",
       "cell": "tri.eka"
      },
      {
       "tok": 1,
       "stem": "विद्या",
       "cls": "aa",
       "cell": "pra.eka"
      }
     ]
    }
   ]
  },
  {
   "id": "mb-002",
   "title": "धर्मस्य जयः",
   "source": "Mahābhārata tradition",
   "provenance": "retelling",
   "difficulty": 2,
   "lines": [
    {
     "sa": "युधिष्ठिरः सत्यं वदति स्म।",
     "en": "Yudhishthira spoke the truth.",
     "marks": [
      {
       "tok": 0,
       "stem": "युधिष्ठिर",
       "cls": "a",
       "cell": "pra.eka"
      },
      {
       "tok": 1,
       "stem": "सत्य",
       "cls": "n",
       "cell": "dvi.eka"
      }
     ]
    },
    {
     "sa": "भीमस्य बलं महत् आसीत्।",
     "en": "Bhima's strength was great.",
     "marks": [
      {
       "tok": 0,
       "stem": "भीम",
       "cls": "a",
       "cell": "sha.eka"
      },
      {
       "tok": 1,
       "stem": "बल",
       "cls": "n",
       "cell": "pra.eka"
      }
     ]
    },
    {
     "sa": "अर्जुनः धनुषि निपुणः आसीत्।",
     "en": "Arjuna was skilled with the bow.",
     "marks": [
      {
       "tok": 0,
       "stem": "अर्जुन",
       "cls": "a",
       "cell": "pra.eka"
      }
     ]
    },
    {
     "sa": "ते वने बहूनि वर्षाणि वसन्ति स्म।",
     "en": "They lived many years in the forest.",
     "marks": [
      {
       "tok": 1,
       "stem": "वन",
       "cls": "n",
       "cell": "sap.eka"
      },
      {
       "tok": 3,
       "stem": "वर्ष",
       "cls": "n",
       "cell": "dvi.bahu"
      }
     ]
    },
    {
     "sa": "अन्ते धर्मः जयति। अधर्मः नश्यति।",
     "en": "In the end dharma wins. Adharma perishes.",
     "marks": [
      {
       "tok": 1,
       "stem": "धर्म",
       "cls": "a",
       "cell": "pra.eka"
      }
     ]
    }
   ]
  },
  {
   "id": "bh-001",
   "title": "बालकृष्णः नवनीतं च",
   "source": "Bhāgavata, Daśamaskandha",
   "provenance": "retelling",
   "difficulty": 1,
   "lines": [
    {
     "sa": "गोकुले कृष्णः बालकः आसीत्।",
     "en": "In Gokula Krishna was a boy.",
     "marks": [
      {
       "tok": 1,
       "stem": "कृष्ण",
       "cls": "a",
       "cell": "pra.eka"
      },
      {
       "tok": 2,
       "stem": "बालक",
       "cls": "a",
       "cell": "pra.eka"
      }
     ]
    },
    {
     "sa": "सः नवनीतम् इच्छति स्म।",
     "en": "He wanted butter.",
     "marks": [
      {
       "tok": 1,
       "stem": "नवनीत",
       "cls": "n",
       "cell": "dvi.eka"
      }
     ]
    },
    {
     "sa": "गृहे घटेषु नवनीतम् आसीत्।",
     "en": "There was butter in the pots in the house.",
     "marks": [
      {
       "tok": 0,
       "stem": "गृह",
       "cls": "n",
       "cell": "sap.eka"
      },
      {
       "tok": 1,
       "stem": "घट",
       "cls": "a",
       "cell": "sap.bahu"
      },
      {
       "tok": 2,
       "stem": "नवनीत",
       "cls": "n",
       "cell": "pra.eka"
      }
     ]
    },
    {
     "sa": "कृष्णः मित्रैः सह घटान् भिनत्ति स्म।",
     "en": "Krishna broke the pots with his friends.",
     "marks": [
      {
       "tok": 0,
       "stem": "कृष्ण",
       "cls": "a",
       "cell": "pra.eka"
      },
      {
       "tok": 1,
       "stem": "मित्र",
       "cls": "n",
       "cell": "tri.bahu"
      },
      {
       "tok": 3,
       "stem": "घट",
       "cls": "a",
       "cell": "dvi.bahu"
      }
     ]
    },
    {
     "sa": "यशोदा कुप्यति स्म। किन्तु कृष्णं पश्यति। सा हसति स्म।",
     "en": "Yashoda grew angry. But she looked at Krishna. She laughed.",
     "marks": [
      {
       "tok": 4,
       "stem": "कृष्ण",
       "cls": "a",
       "cell": "dvi.eka"
      }
     ]
    },
    {
     "sa": "बालकस्य हासः मातुः क्रोधं नाशयति।",
     "en": "A child's laughter destroys a mother's anger.",
     "marks": [
      {
       "tok": 0,
       "stem": "बालक",
       "cls": "a",
       "cell": "sha.eka"
      },
      {
       "tok": 3,
       "stem": "क्रोध",
       "cls": "a",
       "cell": "dvi.eka"
      }
     ]
    }
   ]
  },
  {
   "id": "bh-002",
   "title": "गोवर्धनधारणम्",
   "source": "Bhāgavata, Daśamaskandha",
   "provenance": "retelling",
   "difficulty": 3,
   "lines": [
    {
     "sa": "गोकुले जनाः इन्द्राय पूजां कुर्वन्ति स्म।",
     "en": "In Gokula the people worshipped Indra.",
     "marks": [
      {
       "tok": 1,
       "stem": "जन",
       "cls": "a",
       "cell": "pra.bahu"
      },
      {
       "tok": 2,
       "stem": "इन्द्र",
       "cls": "a",
       "cell": "cat.eka"
      },
      {
       "tok": 3,
       "stem": "पूजा",
       "cls": "aa",
       "cell": "dvi.eka"
      }
     ]
    },
    {
     "sa": "कृष्णः वदति स्म \"पर्वताय पूजा उचिता\" इति।",
     "en": "Krishna said, \"Worship is fitting for the mountain.\"",
     "marks": [
      {
       "tok": 0,
       "stem": "कृष्ण",
       "cls": "a",
       "cell": "pra.eka"
      },
      {
       "tok": 3,
       "stem": "पर्वत",
       "cls": "a",
       "cell": "cat.eka"
      },
      {
       "tok": 4,
       "stem": "पूजा",
       "cls": "aa",
       "cell": "pra.eka"
      }
     ]
    },
    {
     "sa": "जनाः पर्वताय पूजां कुर्वन्ति स्म।",
     "en": "The people worshipped the mountain.",
     "marks": [
      {
       "tok": 0,
       "stem": "जन",
       "cls": "a",
       "cell": "pra.bahu"
      },
      {
       "tok": 1,
       "stem": "पर्वत",
       "cls": "a",
       "cell": "cat.eka"
      },
      {
       "tok": 2,
       "stem": "पूजा",
       "cls": "aa",
       "cell": "dvi.eka"
      }
     ]
    },
    {
     "sa": "इन्द्रः कुप्यति स्म। मेघाः वर्षन्ति स्म।",
     "en": "Indra grew angry. The clouds rained.",
     "marks": [
      {
       "tok": 0,
       "stem": "इन्द्र",
       "cls": "a",
       "cell": "pra.eka"
      },
      {
       "tok": 3,
       "stem": "मेघ",
       "cls": "a",
       "cell": "pra.bahu"
      }
     ]
    },
    {
     "sa": "कृष्णः पर्वतं धारयति स्म।",
     "en": "Krishna held up the mountain.",
     "marks": [
      {
       "tok": 0,
       "stem": "कृष्ण",
       "cls": "a",
       "cell": "pra.eka"
      },
      {
       "tok": 1,
       "stem": "पर्वत",
       "cls": "a",
       "cell": "dvi.eka"
      }
     ]
    },
    {
     "sa": "जनाः पर्वतस्य अधः तिष्ठन्ति स्म।",
     "en": "The people stood beneath the mountain.",
     "marks": [
      {
       "tok": 0,
       "stem": "जन",
       "cls": "a",
       "cell": "pra.bahu"
      },
      {
       "tok": 1,
       "stem": "पर्वत",
       "cls": "a",
       "cell": "sha.eka"
      }
     ]
    },
    {
     "sa": "इन्द्रः कृष्णं नमति स्म।",
     "en": "Indra bowed to Krishna.",
     "marks": [
      {
       "tok": 0,
       "stem": "इन्द्र",
       "cls": "a",
       "cell": "pra.eka"
      },
      {
       "tok": 1,
       "stem": "कृष्ण",
       "cls": "a",
       "cell": "dvi.eka"
      }
     ]
    }
   ]
  },
  {
   "id": "pu-001",
   "title": "गणेशस्य बुद्धिः",
   "source": "Purāṇic tradition",
   "provenance": "retelling",
   "difficulty": 2,
   "lines": [
    {
     "sa": "शिवस्य पुत्रः गणेशः आसीत्।",
     "en": "Ganesha was the son of Shiva.",
     "marks": [
      {
       "tok": 0,
       "stem": "शिव",
       "cls": "a",
       "cell": "sha.eka"
      },
      {
       "tok": 1,
       "stem": "पुत्र",
       "cls": "a",
       "cell": "pra.eka"
      },
      {
       "tok": 2,
       "stem": "गणेश",
       "cls": "a",
       "cell": "pra.eka"
      }
     ]
    },
    {
     "sa": "एकदा नारदः एकं फलम् आनयति स्म।",
     "en": "Once Narada brought a fruit.",
     "marks": [
      {
       "tok": 1,
       "stem": "नारद",
       "cls": "a",
       "cell": "pra.eka"
      },
      {
       "tok": 3,
       "stem": "फल",
       "cls": "n",
       "cell": "dvi.eka"
      }
     ]
    },
    {
     "sa": "\"यः जगत् परितः धावति तस्मै फलम्\" इति।",
     "en": "\"The fruit goes to whoever runs around the world.\"",
     "marks": [
      {
       "tok": 5,
       "stem": "फल",
       "cls": "n",
       "cell": "pra.eka"
      }
     ]
    },
    {
     "sa": "गणेशः मातुः पितुः च परितः धावति स्म।",
     "en": "Ganesha ran around his mother and father.",
     "marks": [
      {
       "tok": 0,
       "stem": "गणेश",
       "cls": "a",
       "cell": "pra.eka"
      }
     ]
    },
    {
     "sa": "सः वदति स्म \"मम जगत् एतत् एव\" इति।",
     "en": "He said, \"This alone is my world.\"",
     "marks": []
    },
    {
     "sa": "शिवः तुष्यति स्म। सः गणेशाय फलं ददाति स्म।",
     "en": "Shiva was pleased. He gave the fruit to Ganesha.",
     "marks": [
      {
       "tok": 0,
       "stem": "शिव",
       "cls": "a",
       "cell": "pra.eka"
      },
      {
       "tok": 4,
       "stem": "गणेश",
       "cls": "a",
       "cell": "cat.eka"
      },
      {
       "tok": 5,
       "stem": "फल",
       "cls": "n",
       "cell": "dvi.eka"
      }
     ]
    },
    {
     "sa": "बुद्ध्या जयः भवति।",
     "en": "Victory comes through intelligence.",
     "marks": []
    }
   ]
  },
  {
   "id": "pu-002",
   "title": "ध्रुवस्य तपः",
   "source": "Viṣṇu Purāṇa",
   "provenance": "retelling",
   "difficulty": 3,
   "lines": [
    {
     "sa": "ध्रुवः बालकः आसीत्। सः दुःखी आसीत्।",
     "en": "Dhruva was a boy. He was sorrowful.",
     "marks": [
      {
       "tok": 1,
       "stem": "बालक",
       "cls": "a",
       "cell": "pra.eka"
      }
     ]
    },
    {
     "sa": "सः वनं गच्छति स्म।",
     "en": "He went to the forest.",
     "marks": [
      {
       "tok": 1,
       "stem": "वन",
       "cls": "n",
       "cell": "dvi.eka"
      }
     ]
    },
    {
     "sa": "वने सः नारदं पश्यति स्म।",
     "en": "In the forest he saw Narada.",
     "marks": [
      {
       "tok": 0,
       "stem": "वन",
       "cls": "n",
       "cell": "sap.eka"
      },
      {
       "tok": 2,
       "stem": "नारद",
       "cls": "a",
       "cell": "dvi.eka"
      }
     ]
    },
    {
     "sa": "नारदः बालकाय उपदेशं ददाति स्म।",
     "en": "Narada gave the boy instruction.",
     "marks": [
      {
       "tok": 0,
       "stem": "नारद",
       "cls": "a",
       "cell": "pra.eka"
      },
      {
       "tok": 1,
       "stem": "बालक",
       "cls": "a",
       "cell": "cat.eka"
      }
     ]
    },
    {
     "sa": "ध्रुवः वने बहूनि वर्षाणि तपः करोति स्म।",
     "en": "Dhruva performed austerity in the forest for many years.",
     "marks": [
      {
       "tok": 1,
       "stem": "वन",
       "cls": "n",
       "cell": "sap.eka"
      },
      {
       "tok": 3,
       "stem": "वर्ष",
       "cls": "n",
       "cell": "dvi.bahu"
      }
     ]
    },
    {
     "sa": "देवः प्रसन्नः भवति स्म।",
     "en": "The god was pleased.",
     "marks": [
      {
       "tok": 0,
       "stem": "देव",
       "cls": "a",
       "cell": "pra.eka"
      }
     ]
    },
    {
     "sa": "अद्य अपि गगने ध्रुवः नक्षत्रं भवति।",
     "en": "Even today Dhruva is a star in the sky.",
     "marks": [
      {
       "tok": 2,
       "stem": "गगन",
       "cls": "n",
       "cell": "sap.eka"
      },
      {
       "tok": 4,
       "stem": "नक्षत्र",
       "cls": "n",
       "cell": "pra.eka"
      }
     ]
    }
   ]
  },
  {
   "id": "sb-001",
   "title": "उद्यमः",
   "source": "Subhāṣita (traditional)",
   "provenance": "verbatim",
   "difficulty": 2,
   "lines": [
    {
     "sa": "उद्यमेन हि सिध्यन्ति कार्याणि न मनोरथैः।",
     "en": "Tasks succeed through effort, not through wishes.",
     "marks": [
      {
       "tok": 3,
       "stem": "कार्य",
       "cls": "n",
       "cell": "pra.bahu"
      }
     ]
    },
    {
     "sa": "न हि सुप्तस्य सिंहस्य प्रविशन्ति मुखे मृगाः॥",
     "en": "Deer do not walk into the mouth of a sleeping lion.",
     "marks": [
      {
       "tok": 3,
       "stem": "सिंह",
       "cls": "a",
       "cell": "sha.eka"
      },
      {
       "tok": 5,
       "stem": "मुख",
       "cls": "n",
       "cell": "sap.eka"
      },
      {
       "tok": 6,
       "stem": "मृग",
       "cls": "a",
       "cell": "pra.bahu"
      }
     ]
    }
   ]
  },
  {
   "id": "sb-002",
   "title": "जलबिन्दुः",
   "source": "Subhāṣita (traditional)",
   "provenance": "verbatim",
   "difficulty": 2,
   "lines": [
    {
     "sa": "जलबिन्दुनिपातेन क्रमशः पूर्यते घटः।",
     "en": "By the falling of drops of water, the pot gradually fills.",
     "marks": [
      {
       "tok": 3,
       "stem": "घट",
       "cls": "a",
       "cell": "pra.eka"
      }
     ]
    },
    {
     "sa": "स हेतुः सर्वविद्यानां धर्मस्य च धनस्य च॥",
     "en": "That is the cause of all learning, of dharma and of wealth.",
     "marks": [
      {
       "tok": 3,
       "stem": "धर्म",
       "cls": "a",
       "cell": "sha.eka"
      },
      {
       "tok": 5,
       "stem": "धन",
       "cls": "n",
       "cell": "sha.eka"
      }
     ]
    }
   ]
  },
  {
   "id": "sb-003",
   "title": "वृक्षाणां दानम्",
   "source": "Subhāṣita (traditional)",
   "provenance": "adapted",
   "difficulty": 2,
   "lines": [
    {
     "sa": "वृक्षाः फलानि ददति।",
     "en": "Trees give fruits.",
     "marks": [
      {
       "tok": 0,
       "stem": "वृक्ष",
       "cls": "a",
       "cell": "pra.bahu"
      },
      {
       "tok": 1,
       "stem": "फल",
       "cls": "n",
       "cell": "dvi.bahu"
      }
     ]
    },
    {
     "sa": "नद्यः जलं पिबन्ति न।",
     "en": "Rivers do not drink their own water.",
     "marks": [
      {
       "tok": 0,
       "stem": "नदी",
       "cls": "ii",
       "cell": "pra.bahu"
      },
      {
       "tok": 1,
       "stem": "जल",
       "cls": "n",
       "cell": "dvi.eka"
      }
     ]
    },
    {
     "sa": "मेघाः सस्याय वर्षन्ति।",
     "en": "Clouds rain for the crops.",
     "marks": [
      {
       "tok": 0,
       "stem": "मेघ",
       "cls": "a",
       "cell": "pra.bahu"
      },
      {
       "tok": 1,
       "stem": "सस्य",
       "cls": "n",
       "cell": "cat.eka"
      }
     ]
    },
    {
     "sa": "सज्जनाः परेषां कृते जीवन्ति।",
     "en": "Good people live for the sake of others.",
     "marks": []
    }
   ]
  },
  {
   "id": "sb-004",
   "title": "विद्यायाः महिमा",
   "source": "Subhāṣita (traditional)",
   "provenance": "adapted",
   "difficulty": 2,
   "lines": [
    {
     "sa": "विद्या धनं श्रेष्ठम् अस्ति।",
     "en": "Learning is the best wealth.",
     "marks": [
      {
       "tok": 0,
       "stem": "विद्या",
       "cls": "aa",
       "cell": "pra.eka"
      },
      {
       "tok": 1,
       "stem": "धन",
       "cls": "n",
       "cell": "pra.eka"
      }
     ]
    },
    {
     "sa": "चोराः विद्यां न हरन्ति।",
     "en": "Thieves do not steal learning.",
     "marks": [
      {
       "tok": 0,
       "stem": "चोर",
       "cls": "a",
       "cell": "pra.bahu"
      },
      {
       "tok": 1,
       "stem": "विद्या",
       "cls": "aa",
       "cell": "dvi.eka"
      }
     ]
    },
    {
     "sa": "दानेन विद्या वर्धते।",
     "en": "By giving, learning grows.",
     "marks": [
      {
       "tok": 0,
       "stem": "दान",
       "cls": "n",
       "cell": "tri.eka"
      },
      {
       "tok": 1,
       "stem": "विद्या",
       "cls": "aa",
       "cell": "pra.eka"
      }
     ]
    }
   ]
  },
  {
   "id": "sb-005",
   "title": "सत्यस्य बलम्",
   "source": "Subhāṣita (traditional)",
   "provenance": "adapted",
   "difficulty": 1,
   "lines": [
    {
     "sa": "सत्यं वदतु। धर्मं चरतु।",
     "en": "Speak the truth. Follow dharma.",
     "marks": [
      {
       "tok": 0,
       "stem": "सत्य",
       "cls": "n",
       "cell": "dvi.eka"
      },
      {
       "tok": 2,
       "stem": "धर्म",
       "cls": "a",
       "cell": "dvi.eka"
      }
     ]
    },
    {
     "sa": "सत्येन जनाः विश्वासं प्राप्नुवन्ति।",
     "en": "Through truth people gain trust.",
     "marks": [
      {
       "tok": 0,
       "stem": "सत्य",
       "cls": "n",
       "cell": "tri.eka"
      },
      {
       "tok": 1,
       "stem": "जन",
       "cls": "a",
       "cell": "pra.bahu"
      },
      {
       "tok": 2,
       "stem": "विश्वास",
       "cls": "a",
       "cell": "dvi.eka"
      }
     ]
    },
    {
     "sa": "असत्येन कीर्तिः नश्यति।",
     "en": "Through falsehood, fame perishes.",
     "marks": []
    }
   ]
  },
  {
   "id": "sb-006",
   "title": "मित्रस्य लक्षणम्",
   "source": "Hitopadeśa, Mitralābha",
   "provenance": "adapted",
   "difficulty": 2,
   "lines": [
    {
     "sa": "सुखे बहवः मित्राणि भवन्ति।",
     "en": "In happiness there are many friends.",
     "marks": [
      {
       "tok": 0,
       "stem": "सुख",
       "cls": "n",
       "cell": "sap.eka"
      },
      {
       "tok": 2,
       "stem": "मित्र",
       "cls": "n",
       "cell": "pra.bahu"
      }
     ]
    },
    {
     "sa": "दुःखे मित्रं दुर्लभम्।",
     "en": "In sorrow a friend is rare.",
     "marks": [
      {
       "tok": 0,
       "stem": "दुःख",
       "cls": "n",
       "cell": "sap.eka"
      },
      {
       "tok": 1,
       "stem": "मित्र",
       "cls": "n",
       "cell": "pra.eka"
      }
     ]
    },
    {
     "sa": "यः दुःखे सहायकः सः एव मित्रम्।",
     "en": "He who helps in sorrow, he alone is a friend.",
     "marks": [
      {
       "tok": 1,
       "stem": "दुःख",
       "cls": "n",
       "cell": "sap.eka"
      },
      {
       "tok": 5,
       "stem": "मित्र",
       "cls": "n",
       "cell": "pra.eka"
      }
     ]
    }
   ]
  },
  {
   "id": "sb-007",
   "title": "कालस्य गतिः",
   "source": "Subhāṣita (traditional)",
   "provenance": "adapted",
   "difficulty": 3,
   "lines": [
    {
     "sa": "नदी न तिष्ठति। मेघः न तिष्ठति।",
     "en": "The river does not stay. The cloud does not stay.",
     "marks": [
      {
       "tok": 0,
       "stem": "नदी",
       "cls": "ii",
       "cell": "pra.eka"
      },
      {
       "tok": 3,
       "stem": "मेघ",
       "cls": "a",
       "cell": "pra.eka"
      }
     ]
    },
    {
     "sa": "दिवसाः गच्छन्ति। वर्षाणि गच्छन्ति।",
     "en": "The days go. The years go.",
     "marks": [
      {
       "tok": 0,
       "stem": "दिवस",
       "cls": "a",
       "cell": "pra.bahu"
      },
      {
       "tok": 2,
       "stem": "वर्ष",
       "cls": "n",
       "cell": "pra.bahu"
      }
     ]
    },
    {
     "sa": "अद्य एव कार्यं करोतु। श्वः इति न चिन्तयतु।",
     "en": "Do the work today. Do not think of tomorrow.",
     "marks": [
      {
       "tok": 2,
       "stem": "कार्य",
       "cls": "n",
       "cell": "dvi.eka"
      }
     ]
    }
   ]
  },
  {
   "id": "sb-008",
   "title": "जननी जन्मभूमिः च",
   "source": "Subhāṣita (traditional)",
   "provenance": "adapted",
   "difficulty": 2,
   "lines": [
    {
     "sa": "जनन्याः स्थानं महत्।",
     "en": "The place of a mother is great.",
     "marks": [
      {
       "tok": 0,
       "stem": "जननी",
       "cls": "ii",
       "cell": "sha.eka"
      }
     ]
    },
    {
     "sa": "राष्ट्रं जनानां माता इव।",
     "en": "The nation is like a mother to the people.",
     "marks": [
      {
       "tok": 0,
       "stem": "राष्ट्र",
       "cls": "n",
       "cell": "pra.eka"
      },
      {
       "tok": 1,
       "stem": "जन",
       "cls": "a",
       "cell": "sha.bahu"
      }
     ]
    },
    {
     "sa": "जनाः राष्ट्राय कार्यं कुर्वन्तु।",
     "en": "Let the people work for the nation.",
     "marks": [
      {
       "tok": 0,
       "stem": "जन",
       "cls": "a",
       "cell": "pra.bahu"
      },
      {
       "tok": 1,
       "stem": "राष्ट्र",
       "cls": "n",
       "cell": "cat.eka"
      },
      {
       "tok": 2,
       "stem": "कार्य",
       "cls": "n",
       "cell": "dvi.eka"
      }
     ]
    }
   ]
  },
  {
   "id": "or-001",
   "title": "पाठशालायाम्",
   "source": "Original, Samskrita Bharati register",
   "provenance": "retelling",
   "difficulty": 1,
   "lines": [
    {
     "sa": "प्रभाते छात्राः पाठशालां गच्छन्ति।",
     "en": "In the morning the students go to school.",
     "marks": [
      {
       "tok": 0,
       "stem": "प्रभात",
       "cls": "n",
       "cell": "sap.eka"
      },
      {
       "tok": 1,
       "stem": "छात्र",
       "cls": "a",
       "cell": "pra.bahu"
      },
      {
       "tok": 2,
       "stem": "पाठशाला",
       "cls": "aa",
       "cell": "dvi.eka"
      }
     ]
    },
    {
     "sa": "शिक्षकः कक्षायाम् आगच्छति।",
     "en": "The teacher comes into the classroom.",
     "marks": [
      {
       "tok": 0,
       "stem": "शिक्षक",
       "cls": "a",
       "cell": "pra.eka"
      },
      {
       "tok": 1,
       "stem": "कक्षा",
       "cls": "aa",
       "cell": "sap.eka"
      }
     ]
    },
    {
     "sa": "छात्राः शिक्षकं नमन्ति।",
     "en": "The students bow to the teacher.",
     "marks": [
      {
       "tok": 0,
       "stem": "छात्र",
       "cls": "a",
       "cell": "pra.bahu"
      },
      {
       "tok": 1,
       "stem": "शिक्षक",
       "cls": "a",
       "cell": "dvi.eka"
      }
     ]
    },
    {
     "sa": "शिक्षकः छात्रेभ्यः पाठं पाठयति।",
     "en": "The teacher teaches the lesson to the students.",
     "marks": [
      {
       "tok": 0,
       "stem": "शिक्षक",
       "cls": "a",
       "cell": "pra.eka"
      },
      {
       "tok": 1,
       "stem": "छात्र",
       "cls": "a",
       "cell": "cat.bahu"
      },
      {
       "tok": 2,
       "stem": "पाठ",
       "cls": "a",
       "cell": "dvi.eka"
      }
     ]
    },
    {
     "sa": "छात्राः लेखन्या पुस्तिकायां लिखन्ति।",
     "en": "The students write in the notebook with a pen.",
     "marks": [
      {
       "tok": 0,
       "stem": "छात्र",
       "cls": "a",
       "cell": "pra.bahu"
      },
      {
       "tok": 1,
       "stem": "लेखनी",
       "cls": "ii",
       "cell": "tri.eka"
      },
      {
       "tok": 2,
       "stem": "पुस्तिका",
       "cls": "aa",
       "cell": "sap.eka"
      }
     ]
    }
   ]
  },
  {
   "id": "or-002",
   "title": "आपणे",
   "source": "Original, Samskrita Bharati register",
   "provenance": "retelling",
   "difficulty": 1,
   "lines": [
    {
     "sa": "माता आपणं गच्छति।",
     "en": "Mother goes to the shop.",
     "marks": [
      {
       "tok": 1,
       "stem": "आपण",
       "cls": "a",
       "cell": "dvi.eka"
      }
     ]
    },
    {
     "sa": "सा शाकं फलानि च क्रीणाति।",
     "en": "She buys vegetables and fruits.",
     "marks": [
      {
       "tok": 1,
       "stem": "शाक",
       "cls": "n",
       "cell": "dvi.eka"
      },
      {
       "tok": 2,
       "stem": "फल",
       "cls": "n",
       "cell": "dvi.bahu"
      }
     ]
    },
    {
     "sa": "पुत्री मात्रा सह गच्छति।",
     "en": "The daughter goes with her mother.",
     "marks": [
      {
       "tok": 0,
       "stem": "पुत्री",
       "cls": "ii",
       "cell": "pra.eka"
      }
     ]
    },
    {
     "sa": "सा स्यूते वस्तूनि स्थापयति।",
     "en": "She puts the things in the bag.",
     "marks": [
      {
       "tok": 1,
       "stem": "स्यूत",
       "cls": "a",
       "cell": "sap.eka"
      }
     ]
    },
    {
     "sa": "ते गृहम् आगच्छन्ति।",
     "en": "They come home.",
     "marks": [
      {
       "tok": 1,
       "stem": "गृह",
       "cls": "n",
       "cell": "dvi.eka"
      }
     ]
    }
   ]
  },
  {
   "id": "or-003",
   "title": "उद्याने",
   "source": "Original, Samskrita Bharati register",
   "provenance": "retelling",
   "difficulty": 1,
   "lines": [
    {
     "sa": "उद्याने बहूनि पुष्पाणि सन्ति।",
     "en": "There are many flowers in the garden.",
     "marks": [
      {
       "tok": 0,
       "stem": "उद्यान",
       "cls": "n",
       "cell": "sap.eka"
      },
      {
       "tok": 2,
       "stem": "पुष्प",
       "cls": "n",
       "cell": "pra.bahu"
      }
     ]
    },
    {
     "sa": "पुष्पेषु भ्रमराः भ्रमन्ति।",
     "en": "Bees hover among the flowers.",
     "marks": [
      {
       "tok": 0,
       "stem": "पुष्प",
       "cls": "n",
       "cell": "sap.bahu"
      },
      {
       "tok": 1,
       "stem": "भ्रमर",
       "cls": "a",
       "cell": "pra.bahu"
      }
     ]
    },
    {
     "sa": "वृक्षे मयूरः नृत्यति।",
     "en": "A peacock dances in the tree.",
     "marks": [
      {
       "tok": 0,
       "stem": "वृक्ष",
       "cls": "a",
       "cell": "sap.eka"
      },
      {
       "tok": 1,
       "stem": "मयूर",
       "cls": "a",
       "cell": "pra.eka"
      }
     ]
    },
    {
     "sa": "बालकाः उद्याने क्रीडन्ति।",
     "en": "The children play in the garden.",
     "marks": [
      {
       "tok": 0,
       "stem": "बालक",
       "cls": "a",
       "cell": "pra.bahu"
      },
      {
       "tok": 1,
       "stem": "उद्यान",
       "cls": "n",
       "cell": "sap.eka"
      }
     ]
    },
    {
     "sa": "वृद्धाः वृक्षस्य अधः उपविशन्ति।",
     "en": "The elders sit beneath the tree.",
     "marks": [
      {
       "tok": 0,
       "stem": "वृद्ध",
       "cls": "a",
       "cell": "pra.bahu"
      },
      {
       "tok": 1,
       "stem": "वृक्ष",
       "cls": "a",
       "cell": "sha.eka"
      }
     ]
    }
   ]
  },
  {
   "id": "or-004",
   "title": "नद्याः तीरे",
   "source": "Original",
   "provenance": "retelling",
   "difficulty": 2,
   "lines": [
    {
     "sa": "नद्याः तीरे मन्दिरम् अस्ति।",
     "en": "There is a temple on the bank of the river.",
     "marks": [
      {
       "tok": 0,
       "stem": "नदी",
       "cls": "ii",
       "cell": "sha.eka"
      },
      {
       "tok": 2,
       "stem": "मन्दिर",
       "cls": "n",
       "cell": "pra.eka"
      }
     ]
    },
    {
     "sa": "प्रभाते जनाः नद्यां स्नानं कुर्वन्ति।",
     "en": "In the morning people bathe in the river.",
     "marks": [
      {
       "tok": 0,
       "stem": "प्रभात",
       "cls": "n",
       "cell": "sap.eka"
      },
      {
       "tok": 1,
       "stem": "जन",
       "cls": "a",
       "cell": "pra.bahu"
      },
      {
       "tok": 2,
       "stem": "नदी",
       "cls": "ii",
       "cell": "sap.eka"
      }
     ]
    },
    {
     "sa": "ते मन्दिरं गच्छन्ति। ते देवाय पुष्पाणि अर्पयन्ति।",
     "en": "They go to the temple. They offer flowers to the god.",
     "marks": [
      {
       "tok": 1,
       "stem": "मन्दिर",
       "cls": "n",
       "cell": "dvi.eka"
      },
      {
       "tok": 4,
       "stem": "देव",
       "cls": "a",
       "cell": "cat.eka"
      },
      {
       "tok": 5,
       "stem": "पुष्प",
       "cls": "n",
       "cell": "dvi.bahu"
      }
     ]
    },
    {
     "sa": "नद्यां मत्स्याः तरन्ति। तीरे बकाः तिष्ठन्ति।",
     "en": "Fish swim in the river. Cranes stand on the bank.",
     "marks": [
      {
       "tok": 0,
       "stem": "नदी",
       "cls": "ii",
       "cell": "sap.eka"
      },
      {
       "tok": 1,
       "stem": "मत्स्य",
       "cls": "a",
       "cell": "pra.bahu"
      },
      {
       "tok": 4,
       "stem": "बक",
       "cls": "a",
       "cell": "pra.bahu"
      }
     ]
    },
    {
     "sa": "सन्ध्यायां जनाः दीपान् ज्वालयन्ति।",
     "en": "At evening the people light lamps.",
     "marks": [
      {
       "tok": 0,
       "stem": "सन्ध्या",
       "cls": "aa",
       "cell": "sap.eka"
      },
      {
       "tok": 1,
       "stem": "जन",
       "cls": "a",
       "cell": "pra.bahu"
      },
      {
       "tok": 2,
       "stem": "दीप",
       "cls": "a",
       "cell": "dvi.bahu"
      }
     ]
    }
   ]
  },
  {
   "id": "or-005",
   "title": "उत्सवः",
   "source": "Original",
   "provenance": "retelling",
   "difficulty": 2,
   "lines": [
    {
     "sa": "ग्रामे उत्सवः भवति।",
     "en": "There is a festival in the village.",
     "marks": [
      {
       "tok": 0,
       "stem": "ग्राम",
       "cls": "a",
       "cell": "sap.eka"
      },
      {
       "tok": 1,
       "stem": "उत्सव",
       "cls": "a",
       "cell": "pra.eka"
      }
     ]
    },
    {
     "sa": "जनाः नूतनानि वस्त्राणि धारयन्ति।",
     "en": "People wear new clothes.",
     "marks": [
      {
       "tok": 0,
       "stem": "जन",
       "cls": "a",
       "cell": "pra.bahu"
      },
      {
       "tok": 2,
       "stem": "वस्त्र",
       "cls": "n",
       "cell": "dvi.bahu"
      }
     ]
    },
    {
     "sa": "बालिकाः गृहस्य पुरतः रङ्गवल्लीं रचयन्ति।",
     "en": "The girls make a rangoli in front of the house.",
     "marks": [
      {
       "tok": 0,
       "stem": "बालिका",
       "cls": "aa",
       "cell": "pra.bahu"
      },
      {
       "tok": 1,
       "stem": "गृह",
       "cls": "n",
       "cell": "sha.eka"
      }
     ]
    },
    {
     "sa": "पाकशालायां माता मोदकान् पचति।",
     "en": "In the kitchen mother cooks sweets.",
     "marks": [
      {
       "tok": 0,
       "stem": "पाकशाला",
       "cls": "aa",
       "cell": "sap.eka"
      },
      {
       "tok": 2,
       "stem": "मोदक",
       "cls": "a",
       "cell": "dvi.bahu"
      }
     ]
    },
    {
     "sa": "सर्वे मित्रेभ्यः मोदकान् ददति।",
     "en": "Everyone gives sweets to their friends.",
     "marks": [
      {
       "tok": 1,
       "stem": "मित्र",
       "cls": "n",
       "cell": "cat.bahu"
      },
      {
       "tok": 2,
       "stem": "मोदक",
       "cls": "a",
       "cell": "dvi.bahu"
      }
     ]
    },
    {
     "sa": "उत्सवः जनानां हृदये आनन्दं जनयति।",
     "en": "The festival produces joy in the hearts of the people.",
     "marks": [
      {
       "tok": 0,
       "stem": "उत्सव",
       "cls": "a",
       "cell": "pra.eka"
      },
      {
       "tok": 1,
       "stem": "जन",
       "cls": "a",
       "cell": "sha.bahu"
      },
      {
       "tok": 2,
       "stem": "हृदय",
       "cls": "n",
       "cell": "sap.eka"
      },
      {
       "tok": 3,
       "stem": "आनन्द",
       "cls": "a",
       "cell": "dvi.eka"
      }
     ]
    }
   ]
  },
  {
   "id": "or-006",
   "title": "कृषकस्य दिनम्",
   "source": "Original",
   "provenance": "retelling",
   "difficulty": 2,
   "lines": [
    {
     "sa": "कृषकः प्रभाते उत्तिष्ठति।",
     "en": "The farmer rises at dawn.",
     "marks": [
      {
       "tok": 0,
       "stem": "कृषक",
       "cls": "a",
       "cell": "pra.eka"
      },
      {
       "tok": 1,
       "stem": "प्रभात",
       "cls": "n",
       "cell": "sap.eka"
      }
     ]
    },
    {
     "sa": "सः वृषभैः सह क्षेत्रं गच्छति।",
     "en": "He goes to the field with the oxen.",
     "marks": [
      {
       "tok": 1,
       "stem": "वृषभ",
       "cls": "a",
       "cell": "tri.bahu"
      },
      {
       "tok": 3,
       "stem": "क्षेत्र",
       "cls": "n",
       "cell": "dvi.eka"
      }
     ]
    },
    {
     "sa": "क्षेत्रे सः सस्यं वर्धयति।",
     "en": "In the field he grows the crop.",
     "marks": [
      {
       "tok": 0,
       "stem": "क्षेत्र",
       "cls": "n",
       "cell": "sap.eka"
      },
      {
       "tok": 2,
       "stem": "सस्य",
       "cls": "n",
       "cell": "dvi.eka"
      }
     ]
    },
    {
     "sa": "मध्याह्ने पत्नी भोजनम् आनयति।",
     "en": "At midday his wife brings food.",
     "marks": [
      {
       "tok": 1,
       "stem": "पत्नी",
       "cls": "ii",
       "cell": "pra.eka"
      },
      {
       "tok": 2,
       "stem": "भोजन",
       "cls": "n",
       "cell": "dvi.eka"
      }
     ]
    },
    {
     "sa": "सन्ध्यायां कृषकः गृहं गच्छति।",
     "en": "At evening the farmer goes home.",
     "marks": [
      {
       "tok": 0,
       "stem": "सन्ध्या",
       "cls": "aa",
       "cell": "sap.eka"
      },
      {
       "tok": 1,
       "stem": "कृषक",
       "cls": "a",
       "cell": "pra.eka"
      },
      {
       "tok": 2,
       "stem": "गृह",
       "cls": "n",
       "cell": "dvi.eka"
      }
     ]
    },
    {
     "sa": "कृषकस्य परिश्रमेण जनाः जीवन्ति।",
     "en": "By the farmer's labour the people live.",
     "marks": [
      {
       "tok": 0,
       "stem": "कृषक",
       "cls": "a",
       "cell": "sha.eka"
      },
      {
       "tok": 2,
       "stem": "जन",
       "cls": "a",
       "cell": "pra.bahu"
      }
     ]
    }
   ]
  },
  {
   "id": "or-007",
   "title": "वैद्यः रोगी च",
   "source": "Original",
   "provenance": "retelling",
   "difficulty": 2,
   "lines": [
    {
     "sa": "ग्रामे वैद्यः वसति।",
     "en": "A physician lives in the village.",
     "marks": [
      {
       "tok": 0,
       "stem": "ग्राम",
       "cls": "a",
       "cell": "sap.eka"
      },
      {
       "tok": 1,
       "stem": "वैद्य",
       "cls": "a",
       "cell": "pra.eka"
      }
     ]
    },
    {
     "sa": "जनाः वैद्यस्य गृहम् आगच्छन्ति।",
     "en": "People come to the physician's house.",
     "marks": [
      {
       "tok": 0,
       "stem": "जन",
       "cls": "a",
       "cell": "pra.bahu"
      },
      {
       "tok": 1,
       "stem": "वैद्य",
       "cls": "a",
       "cell": "sha.eka"
      },
      {
       "tok": 2,
       "stem": "गृह",
       "cls": "n",
       "cell": "dvi.eka"
      }
     ]
    },
    {
     "sa": "वैद्यः जनेभ्यः औषधानि ददाति।",
     "en": "The physician gives medicines to the people.",
     "marks": [
      {
       "tok": 0,
       "stem": "वैद्य",
       "cls": "a",
       "cell": "pra.eka"
      },
      {
       "tok": 1,
       "stem": "जन",
       "cls": "a",
       "cell": "cat.bahu"
      },
      {
       "tok": 2,
       "stem": "औषध",
       "cls": "n",
       "cell": "dvi.bahu"
      }
     ]
    },
    {
     "sa": "सः धनं न इच्छति।",
     "en": "He does not want money.",
     "marks": [
      {
       "tok": 1,
       "stem": "धन",
       "cls": "n",
       "cell": "dvi.eka"
      }
     ]
    },
    {
     "sa": "जनाः वैद्यं देवम् इव पश्यन्ति।",
     "en": "The people look upon the physician as a god.",
     "marks": [
      {
       "tok": 0,
       "stem": "जन",
       "cls": "a",
       "cell": "pra.bahu"
      },
      {
       "tok": 1,
       "stem": "वैद्य",
       "cls": "a",
       "cell": "dvi.eka"
      },
      {
       "tok": 2,
       "stem": "देव",
       "cls": "a",
       "cell": "dvi.eka"
      }
     ]
    }
   ]
  },
  {
   "id": "or-008",
   "title": "सिंहः गजः च",
   "source": "Original, Pañcatantra register",
   "provenance": "retelling",
   "difficulty": 2,
   "lines": [
    {
     "sa": "वने सिंहः वसति। तत्र गजाः अपि सन्ति।",
     "en": "A lion lives in the forest. Elephants are there too.",
     "marks": [
      {
       "tok": 0,
       "stem": "वन",
       "cls": "n",
       "cell": "sap.eka"
      },
      {
       "tok": 1,
       "stem": "सिंह",
       "cls": "a",
       "cell": "pra.eka"
      },
      {
       "tok": 4,
       "stem": "गज",
       "cls": "a",
       "cell": "pra.bahu"
      }
     ]
    },
    {
     "sa": "सिंहः गजेभ्यः बिभेति न।",
     "en": "The lion is not afraid of the elephants.",
     "marks": [
      {
       "tok": 0,
       "stem": "सिंह",
       "cls": "a",
       "cell": "pra.eka"
      },
      {
       "tok": 1,
       "stem": "गज",
       "cls": "a",
       "cell": "pan.bahu"
      }
     ]
    },
    {
     "sa": "किन्तु गजानां बलं महत्।",
     "en": "But the strength of the elephants is great.",
     "marks": [
      {
       "tok": 1,
       "stem": "गज",
       "cls": "a",
       "cell": "sha.bahu"
      },
      {
       "tok": 2,
       "stem": "बल",
       "cls": "n",
       "cell": "pra.eka"
      }
     ]
    },
    {
     "sa": "गजाः सह तिष्ठन्ति। सिंहः पलायते।",
     "en": "The elephants stand together. The lion flees.",
     "marks": [
      {
       "tok": 0,
       "stem": "गज",
       "cls": "a",
       "cell": "pra.bahu"
      },
      {
       "tok": 3,
       "stem": "सिंह",
       "cls": "a",
       "cell": "pra.eka"
      }
     ]
    },
    {
     "sa": "एकतया दुर्बलाः अपि बलवन्तः भवन्ति।",
     "en": "Through unity even the weak become strong.",
     "marks": []
    }
   ]
  },
  {
   "id": "or-009",
   "title": "पुस्तकालये",
   "source": "Original",
   "provenance": "retelling",
   "difficulty": 1,
   "lines": [
    {
     "sa": "नगरे ग्रन्थालयः अस्ति।",
     "en": "There is a library in the city.",
     "marks": [
      {
       "tok": 0,
       "stem": "नगर",
       "cls": "n",
       "cell": "sap.eka"
      },
      {
       "tok": 1,
       "stem": "ग्रन्थालय",
       "cls": "a",
       "cell": "pra.eka"
      }
     ]
    },
    {
     "sa": "ग्रन्थालये बहवः ग्रन्थाः सन्ति।",
     "en": "There are many books in the library.",
     "marks": [
      {
       "tok": 0,
       "stem": "ग्रन्थालय",
       "cls": "a",
       "cell": "sap.eka"
      },
      {
       "tok": 2,
       "stem": "ग्रन्थ",
       "cls": "a",
       "cell": "pra.bahu"
      }
     ]
    },
    {
     "sa": "छात्राः ग्रन्थान् पठन्ति।",
     "en": "The students read the books.",
     "marks": [
      {
       "tok": 0,
       "stem": "छात्र",
       "cls": "a",
       "cell": "pra.bahu"
      },
      {
       "tok": 1,
       "stem": "ग्रन्थ",
       "cls": "a",
       "cell": "dvi.bahu"
      }
     ]
    },
    {
     "sa": "ते मौनेन उपविशन्ति।",
     "en": "They sit in silence.",
     "marks": [
      {
       "tok": 1,
       "stem": "मौन",
       "cls": "n",
       "cell": "tri.eka"
      }
     ]
    },
    {
     "sa": "ग्रन्थाः मित्राणि इव भवन्ति।",
     "en": "Books are like friends.",
     "marks": [
      {
       "tok": 0,
       "stem": "ग्रन्थ",
       "cls": "a",
       "cell": "pra.bahu"
      },
      {
       "tok": 1,
       "stem": "मित्र",
       "cls": "n",
       "cell": "pra.bahu"
      }
     ]
    }
   ]
  },
  {
   "id": "or-010",
   "title": "वर्षाकालः",
   "source": "Original",
   "provenance": "retelling",
   "difficulty": 2,
   "lines": [
    {
     "sa": "वर्षाकाले मेघाः गगने भ्रमन्ति।",
     "en": "In the rainy season clouds move in the sky.",
     "marks": [
      {
       "tok": 1,
       "stem": "मेघ",
       "cls": "a",
       "cell": "pra.bahu"
      },
      {
       "tok": 2,
       "stem": "गगन",
       "cls": "n",
       "cell": "sap.eka"
      }
     ]
    },
    {
     "sa": "मेघेभ्यः जलं पतति।",
     "en": "Water falls from the clouds.",
     "marks": [
      {
       "tok": 0,
       "stem": "मेघ",
       "cls": "a",
       "cell": "pan.bahu"
      },
      {
       "tok": 1,
       "stem": "जल",
       "cls": "n",
       "cell": "pra.eka"
      }
     ]
    },
    {
     "sa": "नद्यः पूर्यन्ते। क्षेत्राणि हरितानि भवन्ति।",
     "en": "The rivers fill. The fields become green.",
     "marks": [
      {
       "tok": 0,
       "stem": "नदी",
       "cls": "ii",
       "cell": "pra.bahu"
      },
      {
       "tok": 2,
       "stem": "क्षेत्र",
       "cls": "n",
       "cell": "pra.bahu"
      }
     ]
    },
    {
     "sa": "बालकाः जले क्रीडन्ति।",
     "en": "The children play in the water.",
     "marks": [
      {
       "tok": 0,
       "stem": "बालक",
       "cls": "a",
       "cell": "pra.bahu"
      },
      {
       "tok": 1,
       "stem": "जल",
       "cls": "n",
       "cell": "sap.eka"
      }
     ]
    },
    {
     "sa": "मयूराः उद्याने नृत्यन्ति।",
     "en": "Peacocks dance in the garden.",
     "marks": [
      {
       "tok": 0,
       "stem": "मयूर",
       "cls": "a",
       "cell": "pra.bahu"
      },
      {
       "tok": 1,
       "stem": "उद्यान",
       "cls": "n",
       "cell": "sap.eka"
      }
     ]
    },
    {
     "sa": "कृषकाः मेघेभ्यः तुष्यन्ति।",
     "en": "The farmers are content with the clouds.",
     "marks": [
      {
       "tok": 0,
       "stem": "कृषक",
       "cls": "a",
       "cell": "pra.bahu"
      },
      {
       "tok": 1,
       "stem": "मेघ",
       "cls": "a",
       "cell": "pan.bahu"
      }
     ]
    }
   ]
  },
  {
   "id": "or-011",
   "title": "अश्वः अश्वपालः च",
   "source": "Original",
   "provenance": "retelling",
   "difficulty": 2,
   "lines": [
    {
     "sa": "नृपस्य गृहे अश्वः आसीत्।",
     "en": "There was a horse in the king's house.",
     "marks": [
      {
       "tok": 0,
       "stem": "नृप",
       "cls": "a",
       "cell": "sha.eka"
      },
      {
       "tok": 1,
       "stem": "गृह",
       "cls": "n",
       "cell": "sap.eka"
      },
      {
       "tok": 2,
       "stem": "अश्व",
       "cls": "a",
       "cell": "pra.eka"
      }
     ]
    },
    {
     "sa": "सेवकः अश्वाय तृणं ददाति स्म।",
     "en": "The servant gave grass to the horse.",
     "marks": [
      {
       "tok": 0,
       "stem": "सेवक",
       "cls": "a",
       "cell": "pra.eka"
      },
      {
       "tok": 1,
       "stem": "अश्व",
       "cls": "a",
       "cell": "cat.eka"
      },
      {
       "tok": 2,
       "stem": "तृण",
       "cls": "n",
       "cell": "dvi.eka"
      }
     ]
    },
    {
     "sa": "सेवकः अश्वं स्निह्यति स्म।",
     "en": "The servant loved the horse.",
     "marks": [
      {
       "tok": 0,
       "stem": "सेवक",
       "cls": "a",
       "cell": "pra.eka"
      },
      {
       "tok": 1,
       "stem": "अश्व",
       "cls": "a",
       "cell": "dvi.eka"
      }
     ]
    },
    {
     "sa": "एकदा चोराः अश्वं नयन्ति स्म।",
     "en": "One day thieves led the horse away.",
     "marks": [
      {
       "tok": 1,
       "stem": "चोर",
       "cls": "a",
       "cell": "pra.bahu"
      },
      {
       "tok": 2,
       "stem": "अश्व",
       "cls": "a",
       "cell": "dvi.eka"
      }
     ]
    },
    {
     "sa": "सेवकः मार्गे धावति स्म। सः चोरान् पश्यति स्म।",
     "en": "The servant ran along the road. He saw the thieves.",
     "marks": [
      {
       "tok": 0,
       "stem": "सेवक",
       "cls": "a",
       "cell": "pra.eka"
      },
      {
       "tok": 1,
       "stem": "मार्ग",
       "cls": "a",
       "cell": "sap.eka"
      },
      {
       "tok": 5,
       "stem": "चोर",
       "cls": "a",
       "cell": "dvi.bahu"
      }
     ]
    },
    {
     "sa": "सः नृपाय वदति स्म। नृपः सैनिकान् प्रेषयति स्म।",
     "en": "He told the king. The king sent soldiers.",
     "marks": [
      {
       "tok": 1,
       "stem": "नृप",
       "cls": "a",
       "cell": "cat.eka"
      },
      {
       "tok": 4,
       "stem": "नृप",
       "cls": "a",
       "cell": "pra.eka"
      },
      {
       "tok": 5,
       "stem": "सैनिक",
       "cls": "a",
       "cell": "dvi.bahu"
      }
     ]
    },
    {
     "sa": "अश्वः पुनः गृहम् आगच्छति स्म।",
     "en": "The horse came home again.",
     "marks": [
      {
       "tok": 0,
       "stem": "अश्व",
       "cls": "a",
       "cell": "pra.eka"
      },
      {
       "tok": 2,
       "stem": "गृह",
       "cls": "n",
       "cell": "dvi.eka"
      }
     ]
    }
   ]
  },
  {
   "id": "or-012",
   "title": "गायिकायाः स्वरः",
   "source": "Original",
   "provenance": "retelling",
   "difficulty": 3,
   "lines": [
    {
     "sa": "नगर्यां गायिका वसति स्म।",
     "en": "A singer lived in the city.",
     "marks": [
      {
       "tok": 0,
       "stem": "नगरी",
       "cls": "ii",
       "cell": "sap.eka"
      },
      {
       "tok": 1,
       "stem": "गायिका",
       "cls": "aa",
       "cell": "pra.eka"
      }
     ]
    },
    {
     "sa": "तस्याः स्वरः मधुरः आसीत्।",
     "en": "Her voice was sweet.",
     "marks": [
      {
       "tok": 1,
       "stem": "स्वर",
       "cls": "a",
       "cell": "pra.eka"
      }
     ]
    },
    {
     "sa": "सन्ध्यायां सा मन्दिरे गायति स्म।",
     "en": "In the evening she sang in the temple.",
     "marks": [
      {
       "tok": 0,
       "stem": "सन्ध्या",
       "cls": "aa",
       "cell": "sap.eka"
      },
      {
       "tok": 2,
       "stem": "मन्दिर",
       "cls": "n",
       "cell": "sap.eka"
      }
     ]
    },
    {
     "sa": "जनाः तस्याः गानं शृण्वन्ति स्म।",
     "en": "People listened to her singing.",
     "marks": [
      {
       "tok": 0,
       "stem": "जन",
       "cls": "a",
       "cell": "pra.bahu"
      },
      {
       "tok": 2,
       "stem": "गान",
       "cls": "n",
       "cell": "dvi.eka"
      }
     ]
    },
    {
     "sa": "खगाः अपि वृक्षेषु मौनेन तिष्ठन्ति स्म।",
     "en": "Even the birds stayed silent in the trees.",
     "marks": [
      {
       "tok": 0,
       "stem": "खग",
       "cls": "a",
       "cell": "pra.bahu"
      },
      {
       "tok": 2,
       "stem": "वृक्ष",
       "cls": "a",
       "cell": "sap.bahu"
      },
      {
       "tok": 3,
       "stem": "मौन",
       "cls": "n",
       "cell": "tri.eka"
      }
     ]
    },
    {
     "sa": "मधुरेण स्वरेण जनानां दुःखं क्षीयते।",
     "en": "By a sweet voice the sorrow of people lessens.",
     "marks": [
      {
       "tok": 1,
       "stem": "स्वर",
       "cls": "a",
       "cell": "tri.eka"
      },
      {
       "tok": 2,
       "stem": "जन",
       "cls": "a",
       "cell": "sha.bahu"
      },
      {
       "tok": 3,
       "stem": "दुःख",
       "cls": "n",
       "cell": "pra.eka"
      }
     ]
    }
   ]
  },
  {
   "id": "or-013",
   "title": "नदीनां देशः",
   "source": "Original",
   "provenance": "retelling",
   "difficulty": 2,
   "lines": [
    {
     "sa": "अस्मिन् देशे बह्व्यः नद्यः सन्ति।",
     "en": "In this country there are many rivers.",
     "marks": [
      {
       "tok": 1,
       "stem": "देश",
       "cls": "a",
       "cell": "sap.eka"
      },
      {
       "tok": 3,
       "stem": "नदी",
       "cls": "ii",
       "cell": "pra.bahu"
      }
     ]
    },
    {
     "sa": "नद्यः पर्वतेभ्यः आगच्छन्ति।",
     "en": "The rivers come from the mountains.",
     "marks": [
      {
       "tok": 0,
       "stem": "नदी",
       "cls": "ii",
       "cell": "pra.bahu"
      },
      {
       "tok": 1,
       "stem": "पर्वत",
       "cls": "a",
       "cell": "pan.bahu"
      }
     ]
    },
    {
     "sa": "नदीनां जलं शुद्धम् अस्ति।",
     "en": "The water of the rivers is pure.",
     "marks": [
      {
       "tok": 0,
       "stem": "नदी",
       "cls": "ii",
       "cell": "sha.bahu"
      },
      {
       "tok": 1,
       "stem": "जल",
       "cls": "n",
       "cell": "pra.eka"
      }
     ]
    },
    {
     "sa": "नदीषु मत्स्याः बकाः च सन्ति।",
     "en": "In the rivers there are fish and cranes.",
     "marks": [
      {
       "tok": 0,
       "stem": "नदी",
       "cls": "ii",
       "cell": "sap.bahu"
      },
      {
       "tok": 1,
       "stem": "मत्स्य",
       "cls": "a",
       "cell": "pra.bahu"
      },
      {
       "tok": 2,
       "stem": "बक",
       "cls": "a",
       "cell": "pra.bahu"
      }
     ]
    },
    {
     "sa": "कृषकाः नदीभ्यः जलं नयन्ति।",
     "en": "Farmers take water from the rivers.",
     "marks": [
      {
       "tok": 0,
       "stem": "कृषक",
       "cls": "a",
       "cell": "pra.bahu"
      },
      {
       "tok": 1,
       "stem": "नदी",
       "cls": "ii",
       "cell": "pan.bahu"
      },
      {
       "tok": 2,
       "stem": "जल",
       "cls": "n",
       "cell": "dvi.eka"
      }
     ]
    },
    {
     "sa": "नदीभिः क्षेत्राणि हरितानि भवन्ति।",
     "en": "By the rivers the fields become green.",
     "marks": [
      {
       "tok": 0,
       "stem": "नदी",
       "cls": "ii",
       "cell": "tri.bahu"
      },
      {
       "tok": 1,
       "stem": "क्षेत्र",
       "cls": "n",
       "cell": "pra.bahu"
      }
     ]
    },
    {
     "sa": "प्रभाते जनाः नदीः पश्यन्ति।",
     "en": "In the morning people look at the rivers.",
     "marks": [
      {
       "tok": 0,
       "stem": "प्रभात",
       "cls": "n",
       "cell": "sap.eka"
      },
      {
       "tok": 1,
       "stem": "जन",
       "cls": "a",
       "cell": "pra.bahu"
      },
      {
       "tok": 2,
       "stem": "नदी",
       "cls": "ii",
       "cell": "dvi.bahu"
      }
     ]
    },
    {
     "sa": "ते नदीभ्यः नमः वदन्ति।",
     "en": "They speak salutations to the rivers.",
     "marks": [
      {
       "tok": 1,
       "stem": "नदी",
       "cls": "ii",
       "cell": "cat.bahu"
      }
     ]
    },
    {
     "sa": "नद्याः जलम् अमृतम् इव।",
     "en": "Water from a river is like nectar.",
     "marks": [
      {
       "tok": 0,
       "stem": "नदी",
       "cls": "ii",
       "cell": "pan.eka"
      }
     ]
    }
   ]
  },
  {
   "id": "or-014",
   "title": "बालिकानां पाठशाला",
   "source": "Original",
   "provenance": "retelling",
   "difficulty": 2,
   "lines": [
    {
     "sa": "पाठशालायां बालिकाः पठन्ति।",
     "en": "The girls study in the school.",
     "marks": [
      {
       "tok": 0,
       "stem": "पाठशाला",
       "cls": "aa",
       "cell": "sap.eka"
      },
      {
       "tok": 1,
       "stem": "बालिका",
       "cls": "aa",
       "cell": "pra.bahu"
      }
     ]
    },
    {
     "sa": "शिक्षिका बालिकाभ्यः पाठं पाठयति।",
     "en": "The teacher teaches the lesson to the girls.",
     "marks": [
      {
       "tok": 0,
       "stem": "शिक्षिका",
       "cls": "aa",
       "cell": "pra.eka"
      },
      {
       "tok": 1,
       "stem": "बालिका",
       "cls": "aa",
       "cell": "cat.bahu"
      },
      {
       "tok": 2,
       "stem": "पाठ",
       "cls": "a",
       "cell": "dvi.eka"
      }
     ]
    },
    {
     "sa": "बालिकानां पुस्तकानि नूतनानि सन्ति।",
     "en": "The girls' books are new.",
     "marks": [
      {
       "tok": 0,
       "stem": "बालिका",
       "cls": "aa",
       "cell": "sha.bahu"
      },
      {
       "tok": 1,
       "stem": "पुस्तक",
       "cls": "n",
       "cell": "pra.bahu"
      }
     ]
    },
    {
     "sa": "बालिकाः कथाभिः आनन्दं प्राप्नुवन्ति।",
     "en": "The girls find joy through stories.",
     "marks": [
      {
       "tok": 0,
       "stem": "बालिका",
       "cls": "aa",
       "cell": "pra.bahu"
      },
      {
       "tok": 1,
       "stem": "कथा",
       "cls": "aa",
       "cell": "tri.bahu"
      },
      {
       "tok": 2,
       "stem": "आनन्द",
       "cls": "a",
       "cell": "dvi.eka"
      }
     ]
    },
    {
     "sa": "बालिकासु एका मधुरं गायति।",
     "en": "Among the girls, one sings sweetly.",
     "marks": [
      {
       "tok": 0,
       "stem": "बालिका",
       "cls": "aa",
       "cell": "sap.bahu"
      }
     ]
    },
    {
     "sa": "सा शिक्षिकायाः प्रशंसां प्राप्नोति।",
     "en": "She receives the teacher's praise.",
     "marks": [
      {
       "tok": 1,
       "stem": "शिक्षिका",
       "cls": "aa",
       "cell": "sha.eka"
      }
     ]
    },
    {
     "sa": "सन्ध्यायां बालिकाः पाठशालाभ्यः गृहं गच्छन्ति।",
     "en": "At evening the girls go home from the schools.",
     "marks": [
      {
       "tok": 0,
       "stem": "सन्ध्या",
       "cls": "aa",
       "cell": "sap.eka"
      },
      {
       "tok": 1,
       "stem": "बालिका",
       "cls": "aa",
       "cell": "pra.bahu"
      },
      {
       "tok": 2,
       "stem": "पाठशाला",
       "cls": "aa",
       "cell": "pan.bahu"
      },
      {
       "tok": 3,
       "stem": "गृह",
       "cls": "n",
       "cell": "dvi.eka"
      }
     ]
    },
    {
     "sa": "शालायाः बहिः वृक्षाः सन्ति।",
     "en": "There are trees outside the hall.",
     "marks": [
      {
       "tok": 0,
       "stem": "शाला",
       "cls": "aa",
       "cell": "pan.eka"
      },
      {
       "tok": 2,
       "stem": "वृक्ष",
       "cls": "a",
       "cell": "pra.bahu"
      }
     ]
    }
   ]
  },
  {
   "id": "or-015",
   "title": "वनानाम् उपकारः",
   "source": "Original",
   "provenance": "retelling",
   "difficulty": 2,
   "lines": [
    {
     "sa": "देशे बहूनि वनानि सन्ति।",
     "en": "There are many forests in the country.",
     "marks": [
      {
       "tok": 0,
       "stem": "देश",
       "cls": "a",
       "cell": "sap.eka"
      },
      {
       "tok": 2,
       "stem": "वन",
       "cls": "n",
       "cell": "pra.bahu"
      }
     ]
    },
    {
     "sa": "वनानां वृक्षाः जलं रक्षन्ति।",
     "en": "The trees of the forests protect the water.",
     "marks": [
      {
       "tok": 0,
       "stem": "वन",
       "cls": "n",
       "cell": "sha.bahu"
      },
      {
       "tok": 1,
       "stem": "वृक्ष",
       "cls": "a",
       "cell": "pra.bahu"
      },
      {
       "tok": 2,
       "stem": "जल",
       "cls": "n",
       "cell": "dvi.eka"
      }
     ]
    },
    {
     "sa": "वनेभ्यः शुद्धः वायुः आगच्छति।",
     "en": "Pure air comes from the forests.",
     "marks": [
      {
       "tok": 0,
       "stem": "वन",
       "cls": "n",
       "cell": "pan.bahu"
      }
     ]
    },
    {
     "sa": "वनेषु मृगाः मयूराः च वसन्ति।",
     "en": "Deer and peacocks live in the forests.",
     "marks": [
      {
       "tok": 0,
       "stem": "वन",
       "cls": "n",
       "cell": "sap.bahu"
      },
      {
       "tok": 1,
       "stem": "मृग",
       "cls": "a",
       "cell": "pra.bahu"
      },
      {
       "tok": 2,
       "stem": "मयूर",
       "cls": "a",
       "cell": "pra.bahu"
      }
     ]
    },
    {
     "sa": "वनानि जनेभ्यः फलानि ददति।",
     "en": "The forests give fruits to the people.",
     "marks": [
      {
       "tok": 0,
       "stem": "वन",
       "cls": "n",
       "cell": "pra.bahu"
      },
      {
       "tok": 1,
       "stem": "जन",
       "cls": "a",
       "cell": "cat.bahu"
      },
      {
       "tok": 2,
       "stem": "फल",
       "cls": "n",
       "cell": "dvi.bahu"
      }
     ]
    },
    {
     "sa": "वनैः देशः शोभते।",
     "en": "By its forests the country is beautiful.",
     "marks": [
      {
       "tok": 0,
       "stem": "वन",
       "cls": "n",
       "cell": "tri.bahu"
      },
      {
       "tok": 1,
       "stem": "देश",
       "cls": "a",
       "cell": "pra.eka"
      }
     ]
    },
    {
     "sa": "वनानां रक्षणं सर्वेषां कार्यम्।",
     "en": "The protection of forests is everyone's task.",
     "marks": [
      {
       "tok": 0,
       "stem": "वन",
       "cls": "n",
       "cell": "sha.bahu"
      },
      {
       "tok": 3,
       "stem": "कार्य",
       "cls": "n",
       "cell": "pra.eka"
      }
     ]
    }
   ]
  },
  {
   "id": "or-016",
   "title": "देव्याः पूजा",
   "source": "Original",
   "provenance": "retelling",
   "difficulty": 2,
   "lines": [
    {
     "sa": "नगर्यां देवी अस्ति।",
     "en": "In the city there is a goddess.",
     "marks": [
      {
       "tok": 0,
       "stem": "नगरी",
       "cls": "ii",
       "cell": "sap.eka"
      },
      {
       "tok": 1,
       "stem": "देवी",
       "cls": "ii",
       "cell": "pra.eka"
      }
     ]
    },
    {
     "sa": "प्रभाते जनाः देवीं पूजयन्ति।",
     "en": "In the morning people worship the goddess.",
     "marks": [
      {
       "tok": 0,
       "stem": "प्रभात",
       "cls": "n",
       "cell": "sap.eka"
      },
      {
       "tok": 1,
       "stem": "जन",
       "cls": "a",
       "cell": "pra.bahu"
      },
      {
       "tok": 2,
       "stem": "देवी",
       "cls": "ii",
       "cell": "dvi.eka"
      }
     ]
    },
    {
     "sa": "ते देव्यै पुष्पाणि अर्पयन्ति।",
     "en": "They offer flowers to the goddess.",
     "marks": [
      {
       "tok": 1,
       "stem": "देवी",
       "cls": "ii",
       "cell": "cat.eka"
      },
      {
       "tok": 2,
       "stem": "पुष्प",
       "cls": "n",
       "cell": "dvi.bahu"
      }
     ]
    },
    {
     "sa": "देव्याः कृपया जनाः सुखं प्राप्नुवन्ति।",
     "en": "By the goddess's grace people find happiness.",
     "marks": [
      {
       "tok": 0,
       "stem": "देवी",
       "cls": "ii",
       "cell": "sha.eka"
      },
      {
       "tok": 1,
       "stem": "कृपा",
       "cls": "aa",
       "cell": "tri.eka"
      },
      {
       "tok": 3,
       "stem": "सुख",
       "cls": "n",
       "cell": "dvi.eka"
      }
     ]
    },
    {
     "sa": "देव्या सह शिवः तिष्ठति।",
     "en": "Shiva stands with the goddess.",
     "marks": [
      {
       "tok": 0,
       "stem": "देवी",
       "cls": "ii",
       "cell": "tri.eka"
      },
      {
       "tok": 2,
       "stem": "शिव",
       "cls": "a",
       "cell": "pra.eka"
      }
     ]
    },
    {
     "sa": "देव्याः भयं न आगच्छति।",
     "en": "No fear comes from the goddess.",
     "marks": [
      {
       "tok": 0,
       "stem": "देवी",
       "cls": "ii",
       "cell": "pan.eka"
      },
      {
       "tok": 1,
       "stem": "भय",
       "cls": "n",
       "cell": "pra.eka"
      }
     ]
    },
    {
     "sa": "देवीनां मन्दिराणि सर्वत्र सन्ति।",
     "en": "Temples of goddesses are everywhere.",
     "marks": [
      {
       "tok": 0,
       "stem": "देवी",
       "cls": "ii",
       "cell": "sha.bahu"
      },
      {
       "tok": 1,
       "stem": "मन्दिर",
       "cls": "n",
       "cell": "pra.bahu"
      }
     ]
    }
   ]
  },
  {
   "id": "or-017",
   "title": "आचार्यः शिष्याः च",
   "source": "Original",
   "provenance": "retelling",
   "difficulty": 3,
   "lines": [
    {
     "sa": "आश्रमे आचार्यः शिष्यैः सह वसति।",
     "en": "In the hermitage the teacher lives with his disciples.",
     "marks": [
      {
       "tok": 0,
       "stem": "आश्रम",
       "cls": "a",
       "cell": "sap.eka"
      },
      {
       "tok": 1,
       "stem": "आचार्य",
       "cls": "a",
       "cell": "pra.eka"
      },
      {
       "tok": 2,
       "stem": "शिष्य",
       "cls": "a",
       "cell": "tri.bahu"
      }
     ]
    },
    {
     "sa": "आचार्यः शिष्येभ्यः शास्त्राणि पाठयति।",
     "en": "The teacher teaches the scriptures to the disciples.",
     "marks": [
      {
       "tok": 0,
       "stem": "आचार्य",
       "cls": "a",
       "cell": "pra.eka"
      },
      {
       "tok": 1,
       "stem": "शिष्य",
       "cls": "a",
       "cell": "cat.bahu"
      },
      {
       "tok": 2,
       "stem": "शास्त्र",
       "cls": "n",
       "cell": "dvi.bahu"
      }
     ]
    },
    {
     "sa": "शिष्याः ग्रन्थेषु ज्ञानं पश्यन्ति।",
     "en": "The disciples find knowledge in the books.",
     "marks": [
      {
       "tok": 0,
       "stem": "शिष्य",
       "cls": "a",
       "cell": "pra.bahu"
      },
      {
       "tok": 1,
       "stem": "ग्रन्थ",
       "cls": "a",
       "cell": "sap.bahu"
      },
      {
       "tok": 2,
       "stem": "ज्ञान",
       "cls": "n",
       "cell": "dvi.eka"
      }
     ]
    },
    {
     "sa": "ते पुष्पैः आचार्यं पूजयन्ति।",
     "en": "They honour the teacher with flowers.",
     "marks": [
      {
       "tok": 1,
       "stem": "पुष्प",
       "cls": "n",
       "cell": "tri.bahu"
      },
      {
       "tok": 2,
       "stem": "आचार्य",
       "cls": "a",
       "cell": "dvi.eka"
      }
     ]
    },
    {
     "sa": "आचार्यः ज्ञानाय जीवति।",
     "en": "The teacher lives for knowledge.",
     "marks": [
      {
       "tok": 0,
       "stem": "आचार्य",
       "cls": "a",
       "cell": "pra.eka"
      },
      {
       "tok": 1,
       "stem": "ज्ञान",
       "cls": "n",
       "cell": "cat.eka"
      }
     ]
    },
    {
     "sa": "ज्ञानस्य मूल्यं धनात् अधिकम्।",
     "en": "The value of knowledge is greater than wealth.",
     "marks": [
      {
       "tok": 0,
       "stem": "ज्ञान",
       "cls": "n",
       "cell": "sha.eka"
      },
      {
       "tok": 2,
       "stem": "धन",
       "cls": "n",
       "cell": "pan.eka"
      }
     ]
    },
    {
     "sa": "शिष्याः गृहेषु अपि अभ्यासं कुर्वन्ति।",
     "en": "The disciples practise even in their homes.",
     "marks": [
      {
       "tok": 0,
       "stem": "शिष्य",
       "cls": "a",
       "cell": "pra.bahu"
      },
      {
       "tok": 1,
       "stem": "गृह",
       "cls": "n",
       "cell": "sap.bahu"
      }
     ]
    }
   ]
  },
  {
   "id": "or-018",
   "title": "कवितायाः जन्म",
   "source": "Original",
   "provenance": "retelling",
   "difficulty": 3,
   "lines": [
    {
     "sa": "कविः नद्याः तीरे उपविशति।",
     "en": "A poet sits on the bank of a river.",
     "marks": [
      {
       "tok": 1,
       "stem": "नदी",
       "cls": "ii",
       "cell": "sha.eka"
      }
     ]
    },
    {
     "sa": "सः मेघान् पश्यति। सः खगानां स्वरं शृणोति।",
     "en": "He watches the clouds. He hears the voice of the birds.",
     "marks": [
      {
       "tok": 1,
       "stem": "मेघ",
       "cls": "a",
       "cell": "dvi.bahu"
      },
      {
       "tok": 4,
       "stem": "खग",
       "cls": "a",
       "cell": "sha.bahu"
      },
      {
       "tok": 5,
       "stem": "स्वर",
       "cls": "a",
       "cell": "dvi.eka"
      }
     ]
    },
    {
     "sa": "तस्य हृदये कविता जायते।",
     "en": "In his heart a poem is born.",
     "marks": [
      {
       "tok": 1,
       "stem": "हृदय",
       "cls": "n",
       "cell": "sap.eka"
      },
      {
       "tok": 2,
       "stem": "कविता",
       "cls": "aa",
       "cell": "pra.eka"
      }
     ]
    },
    {
     "sa": "सः पत्रे कवितां लिखति।",
     "en": "He writes the poem on a leaf.",
     "marks": [
      {
       "tok": 1,
       "stem": "पत्र",
       "cls": "n",
       "cell": "sap.eka"
      },
      {
       "tok": 2,
       "stem": "कविता",
       "cls": "aa",
       "cell": "dvi.eka"
      }
     ]
    },
    {
     "sa": "कवितायाः शब्दाः मधुराः सन्ति।",
     "en": "The words of the poem are sweet.",
     "marks": [
      {
       "tok": 0,
       "stem": "कविता",
       "cls": "aa",
       "cell": "sha.eka"
      }
     ]
    },
    {
     "sa": "जनाः कवितां पठन्ति। ते आनन्देन हसन्ति।",
     "en": "People read the poem. They laugh with joy.",
     "marks": [
      {
       "tok": 1,
       "stem": "कविता",
       "cls": "aa",
       "cell": "dvi.eka"
      },
      {
       "tok": 4,
       "stem": "आनन्द",
       "cls": "a",
       "cell": "tri.eka"
      }
     ]
    },
    {
     "sa": "कवितायै जनाः धन्यवादं वदन्ति।",
     "en": "People give thanks to the poem.",
     "marks": [
      {
       "tok": 0,
       "stem": "कविता",
       "cls": "aa",
       "cell": "cat.eka"
      }
     ]
    }
   ]
  }
 ]
};
