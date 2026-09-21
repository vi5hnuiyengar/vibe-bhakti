/* pronoun-frames.js — sentences for सर्वनामाभ्यासः.
 *
 * PF(id, pron, cell, d, setup_sa, setup_en, sa, en)
 *
 *   pron   paradigm id from pronouns.js, e.g. "tad-f"
 *   cell   "vibhakti.vacana", e.g. "cat.eka"
 *   d      difficulty, 1 simple to 3 literary
 *   setup  the antecedent sentence, shown dimmed above and never blanked.
 *          Empty for frames that carry their own context (किम्, यद्, अहम्, त्वम्).
 *   {P}    the blank. Exactly one per frame.
 *
 * The answer is fully determined: VB.PRON_BY_ID[pron].F[cell]. Nothing is
 * stored as text, so tools/check.js can verify every frame.
 *
 * This deliberately differs from the shape sketched in the architecture doc,
 * which gave only a liṅga. A liṅga alone does not fix the answer: it leaves
 * the vacana and the pronoun (तद् or एतद् or इदम्) open.
 */
var VB = window.VB = window.VB || {};

VB.PFRAMES = [];
(function () {
  function PF(id, pron, cell, d, ssa, sen, sa, en) {
    VB.PFRAMES.push({ id: id, pron: pron, cell: cell, d: d,
      setup: ssa ? { sa: ssa, en: sen } : null, sa: sa, en: en });
  }

  // ---------------- तद् पुंलिङ्गम् ----------------
  PF("tad-m-01","tad-m","pra.eka",1,"बालकः उद्याने अस्ति।","The boy is in the garden.","{P} क्रीडति।","He plays.");
  PF("tad-m-02","tad-m","dvi.eka",1,"रामः वने अस्ति।","Rama is in the forest.","सीता {P} पश्यति।","Sita sees him.");
  PF("tad-m-03","tad-m","tri.eka",2,"मम भ्राता आगच्छति।","My brother is coming.","अहं {P} सह गच्छामि।","I go with him.");
  PF("tad-m-04","tad-m","cat.bahu",2,"छात्राः कक्षायां सन्ति।","The students are in the classroom.","शिक्षकः {P} पाठं पाठयति।","The teacher teaches them the lesson.");
  PF("tad-m-05","tad-m","pan.eka",2,"सिंहः वने गर्जति।","The lion roars in the forest.","मृगाः {P} बिभ्यति।","The deer are afraid of him.");
  PF("tad-m-06","tad-m","sha.eka",2,"कृषकः क्षेत्रे कार्यं करोति।","The farmer works in the field.","{P} पुत्रः अपि तत्र अस्ति।","His son is also there.");
  PF("tad-m-07","tad-m","sap.bahu",3,"उद्याने वृक्षाः सन्ति।","There are trees in the garden.","{P} खगाः वसन्ति।","Birds live in them.");

  // ---------------- तद् स्त्रीलिङ्गम् ----------------
  PF("tad-f-01","tad-f","pra.bahu",1,"बालिकाः पाठशालां गच्छन्ति।","The girls go to school.","{P} प्रतिदिनं पठन्ति।","They study every day.");
  PF("tad-f-02","tad-f","dvi.eka",1,"आपणे माला अस्ति।","There is a garland in the shop.","माता {P} क्रीणाति।","Mother buys it.");
  PF("tad-f-03","tad-f","tri.eka",2,"मम भगिनी आगच्छति।","My sister is coming.","अहं {P} सह क्रीडामि।","I play with her.");
  PF("tad-f-04","tad-f","cat.eka",2,"सीता वने अस्ति।","Sita is in the forest.","हनूमान् {P} मुद्रां ददाति।","Hanuman gives her the ring.");
  PF("tad-f-05","tad-f","pan.eka",2,"नदी पर्वतात् आगच्छति।","The river comes from the mountain.","जनाः {P} जलं नयन्ति।","People take water from it.");
  PF("tad-f-06","tad-f","sha.bahu",2,"बालिकाः गायन्ति।","The girls are singing.","{P} स्वरः मधुरः।","Their voice is sweet.");
  PF("tad-f-07","tad-f","sap.eka",3,"पुरतः एका नगरी अस्ति।","Ahead there is a city.","{P} बहवः जनाः वसन्ति।","Many people live in it.");

  // ---------------- तद् नपुंसकलिङ्गम् ----------------
  PF("tad-n-01","tad-n","pra.eka",1,"उद्याने एकं पुष्पम् अस्ति।","There is a flower in the garden.","{P} रक्तम् अस्ति।","It is red.");
  PF("tad-n-02","tad-n","dvi.bahu",1,"वृक्षे फलानि सन्ति।","There are fruits on the tree.","बालकः {P} खादति।","The boy eats them.");
  PF("tad-n-03","tad-n","tri.eka",2,"गृहे एकं यानम् अस्ति।","There is a vehicle at home.","पिता {P} कार्यालयं गच्छति।","Father goes to the office by it.");
  PF("tad-n-04","tad-n","cat.eka",3,"एतत् मम मित्रम्।","This is my friend.","अहं {P} पुस्तकं ददामि।","I give a book to my friend.");
  PF("tad-n-05","tad-n","pan.bahu",2,"ग्रामे बहूनि गृहाणि सन्ति।","There are many houses in the village.","जनाः {P} बहिः आगच्छन्ति।","People come out of them.");
  PF("tad-n-06","tad-n","sha.eka",2,"नगरे एकं मन्दिरम् अस्ति।","There is a temple in the city.","{P} द्वारं विशालम्।","Its door is large.");
  PF("tad-n-07","tad-n","sap.eka",2,"ग्रामस्य समीपे सरोवरम् अस्ति।","There is a lake near the village.","{P} मत्स्याः तरन्ति।","Fish swim in it.");

  // ---------------- एतद् ----------------
  PF("etad-01","etad-m","pra.eka",1,"पश्य, अत्र बालकः अस्ति।","Look, a boy is here.","{P} मम पुत्रः।","This is my son.");
  PF("etad-02","etad-f","pra.eka",1,"पश्य, अत्र बालिका अस्ति।","Look, a girl is here.","{P} मम पुत्री।","This is my daughter.");
  PF("etad-03","etad-n","pra.eka",1,"पश्य, अत्र पुस्तकम् अस्ति।","Look, a book is here.","{P} मम पुस्तकम्।","This is my book.");
  PF("etad-04","etad-m","dvi.eka",2,"अत्र एकः ग्रन्थः अस्ति।","Here is a book.","अहं {P} पठामि।","I read this one.");
  PF("etad-05","etad-f","sha.eka",2,"अत्र एका नदी अस्ति।","Here is a river.","{P} जलं शुद्धम्।","The water of this one is pure.");
  PF("etad-06","etad-n","sap.eka",2,"अत्र एकं गृहम् अस्ति।","Here is a house.","{P} मम मातामही वसति।","My grandmother lives in this one.");
  PF("etad-07","etad-m","cat.bahu",3,"अत्र छात्राः सन्ति।","The students are here.","शिक्षकः {P} पुस्तकानि ददाति।","The teacher gives books to these.");

  // ---------------- इदम् ----------------
  PF("idam-01","idam-m","pra.eka",1,"","","{P} वृक्षः उन्नतः।","This tree is tall.");
  PF("idam-02","idam-f","pra.eka",1,"","","{P} बालिका चतुरा।","This girl is clever.");
  PF("idam-03","idam-n","pra.eka",1,"","","{P} फलं मधुरम्।","This fruit is sweet.");
  PF("idam-04","idam-m","tri.eka",2,"","","अहं {P} चषकेण जलं पिबामि।","I drink water with this cup.");
  PF("idam-05","idam-f","sap.eka",2,"","","{P} नगर्यां बहूनि मन्दिराणि सन्ति।","In this city there are many temples.");
  PF("idam-06","idam-m","sha.bahu",3,"","","{P} छात्राणां शिक्षकः अहम्।","I am the teacher of these students.");
  PF("idam-07","idam-n","sap.bahu",3,"","","{P} गृहेषु जनाः वसन्ति।","People live in these houses.");

  // ---------------- यद् (with its correlative तद्) ----------------
  PF("yad-01","yad-m","pra.eka",2,"","","{P} सत्यं वदति, सः सुखी भवति।","He who speaks the truth is happy.");
  PF("yad-02","yad-f","pra.eka",2,"","","{P} बालिका गायति, सा मम भगिनी।","The girl who sings is my sister.");
  PF("yad-03","yad-n","pra.eka",2,"","","{P} फलं मधुरं, तत् अहं खादामि।","The fruit that is sweet, that I eat.");
  PF("yad-04","yad-m","dvi.eka",3,"","","{P} त्वं पश्यसि, सः मम भ्राता।","The one you see is my brother.");
  PF("yad-05","yad-m","tri.eka",3,"","","{P} सह त्वं गच्छसि, सः कः?","Who is the one you go with?");
  PF("yad-06","yad-m","sha.eka",3,"","","{P} गृहं विशालं, सः धनिकः।","He whose house is large is rich.");
  PF("yad-07","yad-f","sap.eka",3,"","","{P} नगर्यां त्वं वससि, सा सुन्दरी।","The city you live in is beautiful.");

  // ---------------- किम् (used as "which", agreeing with its noun) ----------------
  PF("kim-01","kim-m","pra.eka",1,"","","{P} बालकः आगच्छति?","Which boy is coming?");
  PF("kim-02","kim-f","pra.eka",1,"","","{P} बालिका गायति?","Which girl is singing?");
  PF("kim-03","kim-n","pra.eka",1,"","","{P} फलं मधुरम्?","Which fruit is sweet?");
  PF("kim-04","kim-m","dvi.eka",2,"","","त्वं {P} ग्रामं गच्छसि?","Which village are you going to?");
  PF("kim-05","kim-n","tri.eka",2,"","","त्वं {P} यानेन गच्छसि?","By which vehicle do you travel?");
  PF("kim-06","kim-f","sap.eka",2,"","","त्वं {P} नगर्यां वससि?","In which city do you live?");
  PF("kim-07","kim-m","sha.eka",2,"","","एतत् {P} बालकस्य पुस्तकम्?","Which boy's book is this?");

  // ---------------- अस्मद् (अहम्) ----------------
  PF("asmad-01","asmad","pra.eka",1,"","","{P} पुस्तकं पठामि।","I read a book.");
  PF("asmad-02","asmad","pra.bahu",1,"","","{P} उद्याने क्रीडामः।","We play in the garden.");
  PF("asmad-03","asmad","dvi.eka",1,"","","माता {P} आह्वयति।","Mother calls me.");
  PF("asmad-04","asmad","tri.eka",2,"","","{P} सह आगच्छ।","Come with me.");
  PF("asmad-05","asmad","cat.eka",2,"","","पिता {P} फलं ददाति।","Father gives me a fruit.");
  PF("asmad-06","asmad","sha.eka",1,"","","एतत् {P} गृहम्।","This is my house.");
  PF("asmad-07","asmad","sha.bahu",2,"","","एषः {P} ग्रामः।","This is our village.");

  // ---------------- युष्मद् (त्वम्) ----------------
  PF("yushmad-01","yushmad","pra.eka",1,"","","{P} कुत्र गच्छसि?","Where are you going?");
  PF("yushmad-02","yushmad","pra.bahu",2,"","","{P} किं पठथ?","What are you all reading?");
  PF("yushmad-03","yushmad","dvi.eka",1,"","","अहं {P} पश्यामि।","I see you.");
  PF("yushmad-04","yushmad","tri.eka",2,"","","अहं {P} सह गच्छामि।","I go with you.");
  PF("yushmad-05","yushmad","cat.eka",2,"","","अहं {P} पुस्तकं ददामि।","I give you a book.");
  PF("yushmad-06","yushmad","sha.eka",1,"","","{P} नाम किम्?","What is your name?");
  PF("yushmad-07","yushmad","sap.eka",3,"","","अहं {P} विश्वसिमि।","I trust you.");
})();
