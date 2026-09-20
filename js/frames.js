/*
  Sentence frames (prayoga).
  {X} = the word being practised.  {S} = a person doing the action (always प्रथमा एकवचनम्).
  {v:A|B}  -> A when {X} is ekavacana, B when bahuvacana (verb agreement)
  {g:A|B}  -> A when {S} is masculine, B when feminine
  {B}      -> भवान् / भवती / भवन्तः / भवत्यः, matching {X}
  English:  {X} = "the boy(s)", {X's} = possessive, {Xv} = form of address, {S} = subject
  d = difficulty 1 (simple) to 3 (literary)
  strict = the sentence itself forces one vibhakti (upapada or agreement)
  cue = the verb already tells the number, so the number is not given as a hint
*/
var VB = window.VB = window.VB || {};

VB.RULES = {
  karta: "Who is doing it? The doer (कर्ता) takes प्रथमा. The verb shows whether it is one or many.",
  karma: "What is being acted on? The object (कर्म) takes द्वितीया.",
  gati: "Going to a place: the place you go to takes द्वितीया.",
  paritah: "परितः (around), उभयतः (on both sides) and प्रति (towards) take द्वितीया.",
  karana: "With what, by what means? The instrument (करणम्) takes तृतीया.",
  saha: "सह (together with) always takes तृतीया.",
  prayojanam: "किं प्रयोजनम् (what use is ...) takes तृतीया.",
  sampradana: "To whom is it given, or for whom? The receiver (सम्प्रदानम्) takes चतुर्थी.",
  namah: "नमः and स्वस्ति always take चतुर्थी.",
  ruc: "With रोचते (is pleasing to), the person who likes it takes चतुर्थी.",
  kup: "With कुप्यति (is angry), the person you are angry with takes चतुर्थी.",
  sprh: "With स्पृहयति (longs for), the thing longed for takes चतुर्थी.",
  tadarthya: "Going for a purpose: the purpose takes चतुर्थी.",
  apadana: "Away from what? The starting point (अपादानम्) takes पञ्चमी.",
  bhi: "Afraid of what? With बिभेति, the cause of fear takes पञ्चमी.",
  bahih: "बहिः (outside), पूर्वम् (before) and अनन्तरम् (after) take पञ्चमी.",
  sambandha: "Whose? Relation and possession (सम्बन्धः) take षष्ठी.",
  samipa: "Place words like समीपे, उपरि, अधः, मध्ये, पुरतः, पृष्ठतः, and कृते (for the sake of) take षष्ठी.",
  adhikarana: "Where or when? The place or time (अधिकरणम्) takes सप्तमी.",
  vishaya: "In what? A skill, or the person you love or trust, takes सप्तमी.",
  sambodhana: "Calling someone directly uses सम्बोधनम्."
};

VB.FRAMES = [];
(function () {
  function F(id, vib, d, kind, cats, sa, en, o) {
    o = o || {};
    VB.FRAMES.push({ id: id, vib: vib, d: d, kind: kind, cats: cats ? cats.split(" ") : [],
      sa: sa, en: en, strict: !!o.strict, cue: !!o.cue, nums: o.nums || ["eka", "bahu"],
      ex: o.ex ? o.ex.split(" ") : [], only: o.only ? o.only.split(" ") : null });
  }
  var K = { strict: true, cue: true };
  function k(extra) { var o = { strict: true, cue: true }; for (var x in extra) o[x] = extra[x]; return o; }

  // ---------------- प्रथमा ----------------
  F("pra01","pra",1,"karta","person","{X} पाठं {v:पठति|पठन्ति}।","{X} {v:reads|read} the lesson.",K);
  F("pra02","pra",1,"karta","person animal","{X} ग्रामं {v:गच्छति|गच्छन्ति}।","{X} {v:goes|go} to the village.",K);
  F("pra03","pra",1,"karta","person animal","{X} उद्याने {v:धावति|धावन्ति}।","{X} {v:runs|run} in the garden.",k({ex:"मत्स्य मण्डूक"}));
  F("pra04","pra",1,"karta","person","{X} {v:हसति|हसन्ति}।","{X} {v:laughs|laugh}.",K);
  F("pra05","pra",1,"karta","person","{X} गीतं {v:गायति|गायन्ति}।","{X} {v:sings|sing} a song.",K);
  F("pra06","pra",1,"karta","bird treeanimal","{X} वृक्षे {v:उपविशति|उपविशन्ति}।","{X} {v:sits|sit} on the tree.",k({ex:"हंस"}));
  F("pra07","pra",1,"karta","celestial","आकाशे {X} {v:दृश्यते|दृश्यन्ते}।","{X} {v:is|are} seen in the sky.",K);
  F("pra08","pra",1,"karta","flower","उद्याने {X} {v:विकसति|विकसन्ति}।","{X} {v:blooms|bloom} in the garden.",k({ex:"कमल"}));
  F("pra09","pra",1,"karta","object food buyable pet","अत्र {X} {v:अस्ति|सन्ति}।","{X} {v:is|are} here.",K);
  F("pra10","pra",1,"karta","water","{X} {v:वहति|वहन्ति}।","{X} {v:flows|flow}.",k({ex:"समुद्र सागर तडाग कूप सरोवर"}));
  F("pra11","pra",2,"karta","person","{X} मन्दिरे पूजां {v:करोति|कुर्वन्ति}।","{X} {v:worships|worship} in the temple.",K);
  F("pra12","pra",1,"karta","person animal","{X} जलं {v:पिबति|पिबन्ति}।","{X} {v:drinks|drink} water.",k({ex:"मत्स्य"}));
  F("pra13","pra",2,"karta","person","प्रातःकाले {X} सूर्यं {v:नमति|नमन्ति}।","In the morning {X} {v:bows|bow} to the sun.",K);
  F("pra14","pra",2,"karta","animal","{X} वने सुखेन {v:वसति|वसन्ति}।","{X} {v:lives|live} happily in the forest.",k({ex:"मत्स्य मार्जार कुक्कुर अजा अश्व"}));
  F("pra15","pra",3,"karta","person","यदा वर्षा भवति तदा {X} गृहे एव {v:तिष्ठति|तिष्ठन्ति}।","When it rains, {X} {v:stays|stay} at home.",K);
  F("pra16","pra",3,"karta","person","{X} विद्यालयं गत्वा पाठं {v:पठति|पठन्ति}।","{X} {v:goes|go} to school and {v:studies|study} the lesson.",K);
  F("pra17","pra",2,"karta","fruit flower","वृक्षात् {X} {v:पतति|पतन्ति}।","{X} {v:falls|fall} from the tree.",k({ex:"कमल"}));
  F("pra18","pra",2,"karta","vehicle","मार्गे {X} शीघ्रं {v:गच्छति|गच्छन्ति}।","{X} {v:moves|move} fast on the road.",k({ex:"नौका विमान"}));
  F("pra19","pra",2,"karta","bird","{X} मधुरं {v:कूजति|कूजन्ति}।","{X} {v:sings|sing} sweetly.",k({ex:"काक हंस"}));
  F("pra20","pra",3,"karta","person","सायङ्काले {X} दीपं प्रज्वाल्य प्रार्थनां {v:करोति|कुर्वन्ति}।","In the evening {X} {v:lights|light} a lamp and {v:prays|pray}.",K);
  F("pra21","pra",2,"karta","creature","{X} पुष्पे {v:उपविशति|उपविशन्ति}।","{X} {v:sits|sit} on the flower.",k({ex:"मूषक"}));
  F("pra22","pra",1,"karta","person","{X} कथां {v:शृणोति|शृण्वन्ति}।","{X} {v:listens|listen} to a story.",K);
  F("pra23","pra",2,"karta","person","{X} भोजनं {v:पचति|पचन्ति}।","{X} {v:cooks|cook} a meal.",K);
  F("pra24","pra",3,"karta","person","{X} प्रतिदिनं योगाभ्यासं {v:करोति|कुर्वन्ति}।","{X} {v:practises|practise} yoga every day.",K);
  F("pra25","pra",2,"karta","celestial","रात्रौ {X} {v:प्रकाशते|प्रकाशन्ते}।","{X} {v:shines|shine} at night.",k({ex:"सूर्य मेघ"}));

  // ---------------- द्वितीया ----------------
  F("dvi01","dvi",1,"karma","reading","{S} {X} पठति।","{S} reads {X}.");
  F("dvi02","dvi",1,"karma","food","{S} {X} खादति।","{S} eats {X}.",{ex:"घृत तैल"});
  F("dvi03","dvi",1,"karma","drink","{S} {X} पिबति।","{S} drinks {X}.");
  F("dvi04","dvi",1,"karma","animal bird dest flower plant celestial","{S} {X} पश्यति।","{S} sees {X}.");
  F("dvi05","dvi",1,"gati","dest","{S} {X} गच्छति।","{S} goes to {X}.");
  F("dvi06","dvi",1,"karma","writable","{S} {X} लिखति।","{S} writes {X}.");
  F("dvi07","dvi",2,"karma","elder deity","{S} {X} नमति।","{S} bows to {X}.");
  F("dvi08","dvi",1,"karma","object food flower buyable","{S} {X} आनयति।","{S} brings {X}.",{ex:"शिला दूरदर्शन"});
  F("dvi09","dvi",2,"karma","pet","{S} {X} पालयति।","{S} looks after {X}.");
  F("dvi10","dvi",2,"karma","person elder","{S} {X} पृच्छति।","{S} asks {X}.");
  F("dvi11","dvi",2,"karma","person deity dwell","{S} {X} स्मरति।","{S} remembers {X}.");
  F("dvi12","dvi",1,"karma","hearable","{S} {X} शृणोति।","{S} listens to {X}.");
  F("dvi13","dvi",2,"karma","flower","{S} उद्यानात् {X} आनयति।","{S} brings {X} from the garden.");
  F("dvi14","dvi",2,"karma","buyable","{S} {X} क्रीणाति।","{S} buys {X}.");
  F("dvi15","dvi",2,"karma","person","{S} {X} आह्वयति।","{S} calls {X}.");
  F("dvi16","dvi",3,"karma","buyable","{S} आपणं गत्वा {X} क्रीणाति।","{S} goes to the shop and buys {X}.");
  F("dvi17","dvi",3,"gati","dest","{S} प्रातः उत्थाय {X} गच्छति।","{S} gets up early and goes to {X}.");
  F("dvi18","dvi",3,"karma","animal bird","{S} मार्गे {X} दृष्ट्वा हसति।","{S} sees {X} on the road and laughs.",{ex:"मत्स्य हंस"});
  F("dvi19","dvi",3,"karma","food","{S} स्नानं कृत्वा {X} खादति।","After bathing, {S} eats {X}.",{ex:"घृत तैल"});
  F("dvi20","dvi",3,"paritah","dwell temple garden","{X} परितः वृक्षाः सन्ति।","There are trees around {X}.",{strict:true,ex:"देश राष्ट्र"});
  F("dvi21","dvi",2,"paritah","person dest","{S} {X} प्रति गच्छति।","{S} walks towards {X}.",{strict:true});
  F("dvi22","dvi",3,"paritah","","{X} उभयतः वृक्षाः सन्ति।","There are trees on both sides of {X}.",{strict:true,only:"मार्ग नदी गङ्गा यमुना गोदावरी कावेरी"});
  F("dvi23","dvi",2,"karma","plant garden","{S} {X} सिञ्चति।","{S} waters {X}.");
  F("dvi24","dvi",2,"karma","wear","{S} {X} धारयति।","{S} wears {X}.");
  F("dvi25","dvi",2,"karma","washable","{S} {X} प्रक्षालयति।","{S} washes {X}.");
  F("dvi26","dvi",2,"karma","cookable","{S} {X} पचति।","{S} cooks {X}.");
  F("dvi27","dvi",2,"karma","openable","{S} {X} उद्घाटयति।","{S} opens {X}.");
  F("dvi28","dvi",2,"karma","flower fruit","{S} {X} चिनोति।","{S} picks {X}.");
  F("dvi29","dvi",2,"karma","deity","{S} {X} पूजयति।","{S} worships {X}.");
  F("dvi30","dvi",3,"karma","reading","{S} प्रतिदिनं {X} पठितुं ग्रन्थालयं गच्छति।","Every day {S} goes to the library to read {X}.");
  F("dvi31","dvi",2,"karma","person","{S} {X} पाठयति।","{S} teaches {X}.",{ex:"आचार्य नृप पितामह"});

  // ---------------- तृतीया ----------------
  F("tri01","tri",1,"karana","","{S} {X} लिखति।","{S} writes with {X}.",{nums:["eka"],only:"लेखनी हस्त"});
  F("tri02","tri",2,"karana","","{S} {X} चित्रं रचयति।","{S} draws a picture with {X}.",{nums:["eka"],only:"लेखनी हस्त"});
  F("tri03","tri",1,"karana","vehicle","{S} {X} ग्रामं गच्छति।","{S} goes to the village by {X}.",{nums:["eka"]});
  F("tri04","tri",2,"karana","container","{S} {X} जलम् आनयति।","{S} brings water in {X}.",{nums:["eka"],ex:"कूप"});
  F("tri05","tri",1,"saha","person pet","{S} {X} सह गच्छति।","{S} goes with {X}.",{strict:true});
  F("tri06","tri",1,"saha","person pet","{S} {X} सह क्रीडति।","{S} plays with {X}.",{strict:true});
  F("tri07","tri",1,"saha","person","{S} {X} सह वदति।","{S} talks with {X}.",{strict:true});
  F("tri08","tri",2,"karana","eye","{S} {X} पश्यति।","{S} sees with {X}.",{nums:["eka"]});
  F("tri09","tri",2,"karana","ear","{S} {X} शृणोति।","{S} hears with {X}.",{nums:["eka"]});
  F("tri10","tri",2,"karana","","{S} {X} ओदनं खादति।","{S} eats rice with {X}.",{nums:["eka"],only:"चमस हस्त"});
  F("tri11","tri",2,"karana","","{S} {X} वस्त्रं कृन्तति।","{S} cuts the cloth with {X}.",{nums:["eka"],only:"कर्तरी"});
  F("tri12","tri",2,"karana","","{S} {X} जलं पिबति।","{S} drinks water from {X}.",{nums:["eka"],only:"चषक पात्र कूपी"});
  F("tri13","tri",2,"saha","person","{S} {X} सह भोजनं करोति।","{S} eats together with {X}.",{strict:true});
  F("tri14","tri",3,"saha","person","{S} {X} सह मन्दिरं गत्वा देवं नमति।","{S} goes to the temple with {X} and bows to God.",{strict:true});
  F("tri15","tri",3,"saha","person","{S} {X} सह आपणं गत्वा फलानि क्रीणाति।","{S} goes to the shop with {X} and buys fruits.",{strict:true});
  F("tri16","tri",3,"prayojanam","","{X} किं प्रयोजनम्?","What is the use of {X}?",{strict:true,only:"धन क्रोध रत्न सङ्गणक दूरवाणी छत्र"});
  F("tri17","tri",2,"saha","person","{S} {X} सह नृत्यति।","{S} dances with {X}.",{strict:true});
  F("tri18","tri",2,"karana","","{S} {X} गृहं प्रकाशयति।","{S} lights up the house with {X}.",{only:"दीप"});
  F("tri19","tri",2,"karana","vehicle","{S} {X} यात्रां करोति।","{S} travels by {X}.",{nums:["eka"]});

  // ---------------- चतुर्थी ----------------
  F("cat01","cat",1,"sampradana","person deity pet","{S} {X} फलं ददाति।","{S} gives a fruit to {X}.");
  F("cat02","cat",1,"namah","elder deity","{X} नमः।","Salutations to {X}.",{strict:true});
  F("cat03","cat",2,"sampradana","person","{S} {X} पत्रं लिखति।","{S} writes a letter to {X}.");
  F("cat04","cat",2,"ruc","person","{X} मोदकः रोचते।","{X} {v:likes|like} the modaka.",{strict:true});
  F("cat05","cat",1,"sampradana","plant pet","{S} {X} जलं यच्छति।","{S} gives water to {X}.");
  F("cat06","cat",1,"sampradana","person","{S} {X} पुस्तकं यच्छति।","{S} gives a book to {X}.");
  F("cat07","cat",3,"kup","person","{S} {X} कुप्यति।","{S} is angry with {X}.",{strict:true});
  F("cat08","cat",2,"sampradana","child","{S} {X} कथां कथयति।","{S} tells a story to {X}.");
  F("cat09","cat",2,"sampradana","person","{S} {X} धनं ददाति।","{S} gives money to {X}.");
  F("cat10","cat",3,"namah","person","{X} स्वस्ति।","May all be well with {X}.",{strict:true});
  F("cat11","cat",3,"tadarthya","purpose","{S} {X} गच्छति।","{S} goes for {X}.",{nums:["eka"]});
  F("cat12","cat",3,"sprh","","{S} {X} स्पृहयति।","{S} longs for {X}.",{strict:true,only:"पुष्प कुसुम धन ज्ञान सुख"});
  F("cat13","cat",2,"sampradana","person","{S} {X} उपहारं यच्छति।","{S} gives a gift to {X}.");
  F("cat14","cat",2,"sampradana","","{S} {X} दुग्धं ददाति।","{S} gives milk to {X}.",{only:"मार्जार कुक्कुर अजा शुक"});
  F("cat15","cat",2,"sampradana","deity","{S} {X} पुष्पाणि अर्पयति।","{S} offers flowers to {X}.");
  F("cat16","cat",2,"sampradana","child","पिता {X} मोदकान् आनयति।","Father brings sweets for {X}.");

  // ---------------- पञ्चमी ----------------
  F("pan01","pan",1,"apadana","plant","{X} फलं पतति।","A fruit falls from {X}.");
  F("pan02","pan",2,"apadana","plant","{X} पर्णानि पतन्ति।","Leaves fall from {X}.");
  F("pan03","pan",1,"apadana","dest","{S} {X} आगच्छति।","{S} comes from {X}.");
  F("pan04","pan",2,"bhi","fearsome","{S} {X} बिभेति।","{S} is afraid of {X}.",{strict:true});
  F("pan05","pan",2,"apadana","water","{S} {X} जलम् आनयति।","{S} brings water from {X}.",{ex:"समुद्र सागर"});
  F("pan06","pan",2,"apadana","elder","{S} {X} पुस्तकं स्वीकरोति।","{S} receives a book from {X}.");
  F("pan07","pan",3,"bahih","dwell study temple","{X} बहिः उद्यानम् अस्ति।","There is a garden outside {X}.",{strict:true,ex:"देश राष्ट्र उद्यान वाटिका"});
  F("pan08","pan",2,"apadana","vehicle mountain","{S} {X} अवतरति।","{S} gets down from {X}.",{nums:["eka"]});
  F("pan09","pan",3,"apadana","elder","{S} {X} विद्यां प्राप्नोति।","{S} gains knowledge from {X}.");
  F("pan10","pan",3,"bahih","","{S} {X} पूर्वं स्नानं करोति।","{S} bathes before {X}.",{strict:true,nums:["eka"],only:"भोजन पूजा अध्ययन क्रीडा यात्रा"});
  F("pan11","pan",3,"bahih","","{S} {X} अनन्तरं विश्रामं करोति।","{S} rests after {X}.",{strict:true,nums:["eka"],only:"भोजन स्नान पूजा अध्ययन क्रीडा परीक्षा यात्रा"});
  F("pan12","pan",2,"apadana","dwell study temple","{S} {X} निर्गच्छति।","{S} goes out of {X}.",{nums:["eka"],ex:"राष्ट्र"});
  F("pan13","pan",2,"apadana","seat","{S} {X} उत्तिष्ठति।","{S} gets up from {X}.",{nums:["eka"]});
  F("pan14","pan",3,"apadana","elder","{S} {X} आशीर्वादं प्राप्नोति।","{S} receives blessings from {X}.");

  // ---------------- षष्ठी ----------------
  F("sha01","sha",1,"sambandha","person","एतत् {X} पुस्तकम्।","This is {X's} book.");
  F("sha02","sha",1,"sambandha","person","एतत् {X} गृहम्।","This is {X's} house.");
  F("sha03","sha",2,"samipa","dest plant","{X} समीपे बालकः तिष्ठति।","A boy stands near {X}.",{strict:true,ex:"देश राष्ट्र"});
  F("sha04","sha",2,"samipa","plant seat","{X} अधः बालिका उपविशति।","A girl sits under {X}.",{strict:true,ex:"दोला नौका रथ शय्या पर्यङ्क"});
  F("sha05","sha",2,"samipa","dwell mountain plant temple","{X} उपरि खगः अस्ति।","A bird is above {X}.",{strict:true,ex:"देश राष्ट्र"});
  F("sha06","sha",1,"sambandha","animal","एतत् {X} पुच्छम्।","This is {X's} tail.",{nums:["eka"],ex:"मण्डूक"});
  F("sha07","sha",2,"sambandha","water","{X} जलं शीतलम् अस्ति।","The water of {X} is cold.");
  F("sha08","sha",2,"samipa","dwell","{X} मध्ये मन्दिरम् अस्ति।","There is a temple in the middle of {X}.",{strict:true,ex:"गृह भवन प्रासाद कुटी"});
  F("sha09","sha",1,"sambandha","person animal dwell","{X} नाम किम्?","What is {X's} name?",{nums:["eka"]});
  F("sha10","sha",2,"samipa","dwell temple study","{X} पुरतः कूपः अस्ति।","There is a well in front of {X}.",{strict:true,ex:"देश राष्ट्र"});
  F("sha11","sha",2,"samipa","dwell temple study","{X} पृष्ठतः उद्यानम् अस्ति।","There is a garden behind {X}.",{strict:true,ex:"देश राष्ट्र"});
  F("sha12","sha",2,"sambandha","plant","{X} शाखासु खगाः सन्ति।","There are birds on the branches of {X}.",{ex:"शाखा लता वल्ली"});
  F("sha13","sha",2,"sambandha","person","{X} पुत्रः वैद्यः अस्ति।","{X's} son is a doctor.",{ex:"वैद्य बालक पौत्र कन्या कुमारी पुत्री किशोरी बालिका पुत्र"});
  F("sha14","sha",3,"sambandha","elder","{X} सेवा परमः धर्मः।","Serving {X} is the highest dharma.");
  F("sha15","sha",2,"samipa","person","{S} {X} कृते भोजनं पचति।","{S} cooks food for {X}.",{strict:true});
  F("sha16","sha",2,"sambandha","sound","{X} ध्वनिः मधुरः अस्ति।","The sound of {X} is sweet.");
  F("sha17","sha",2,"sambandha","animal bird mountain flower deity","{S} {X} चित्रं पश्यति।","{S} looks at a picture of {X}.");
  F("sha18","sha",3,"sambandha","dwell garden mountain water forest temple","{X} सौन्दर्यं मनोहरम् अस्ति।","The beauty of {X} is charming.",{ex:"राष्ट्र"});
  F("sha19","sha",2,"sambandha","person","{X} गृहं ग्रामे अस्ति।","{X's} house is in the village.");
  F("sha20","sha",3,"sambandha","elder","{X} आज्ञां सर्वे पालयन्ति।","Everyone obeys {X's} command.");

  // ---------------- सप्तमी ----------------
  F("sap01","sap",1,"adhikarana","dwell","{S} {X} वसति।","{S} lives in {X}.",{nums:["eka"]});
  F("sap02","sap",1,"adhikarana","water","{X} मत्स्याः सन्ति।","There are fish in {X}.",{ex:"कूप"});
  F("sap03","sap",1,"adhikarana","plant garden","{X} पुष्पाणि सन्ति।","There are flowers in {X}.");
  F("sap04","sap",1,"adhikarana","container","{X} जलम् अस्ति।","There is water in {X}.");
  F("sap05","sap",1,"adhikarana","seat","{S} {X} उपविशति।","{S} sits on {X}.",{nums:["eka"]});
  F("sap06","sap",2,"adhikarana","study openable","{X} पुस्तकानि सन्ति।","There are books in {X}.",{ex:"द्वार वातायन पुस्तक"});
  F("sap07","sap",2,"adhikarana","study","{S} {X} पठति।","{S} studies in {X}.",{nums:["eka"]});
  F("sap08","sap",2,"adhikarana","water","{S} {X} तरति।","{S} swims in {X}.",{ex:"कूप"});
  F("sap09","sap",2,"adhikarana","seat openable","{S} {X} पुस्तकं स्थापयति।","{S} puts the book on {X}.",{nums:["eka"],ex:"द्वार वातायन पुस्तक नौका रथ"});
  F("sap10","sap",2,"adhikarana","dest","{X} बहवः जनाः सन्ति।","There are many people in {X}.",{ex:"कूप"});
  F("sap11","sap",3,"adhikarana","festival","{X} सर्वे प्रसन्नाः भवन्ति।","Everyone is happy at {X}.");
  F("sap12","sap",2,"adhikarana","","{S} {X} व्यायामं करोति।","{S} exercises in {X}.",{nums:["eka"],only:"प्रभात सन्ध्या"});
  F("sap13","sap",2,"adhikarana","","{X} कोकिलाः कूजन्ति।","Cuckoos sing in {X}.",{only:"वसन्त"});
  F("sap14","sap",3,"vishaya","skill","{S} {X} {g:कुशलः|कुशला} अस्ति।","{S} is skilled in {X}.");
  F("sap15","sap",2,"adhikarana","water","{S} {X} स्नानं करोति।","{S} bathes in {X}.",{ex:"कूप"});
  F("sap16","sap",2,"adhikarana","forest","{X} वानराः सन्ति।","There are monkeys in {X}.");
  F("sap17","sap",2,"adhikarana","","{S} {X} भोजनं करोति।","{S} eats in {X}.",{only:"पाकशाला गृह कुटी भवन"});
  F("sap18","sap",3,"vishaya","person","{S} {X} विश्वसिति।","{S} trusts {X}.");
  F("sap19","sap",3,"vishaya","child","जननी {X} स्निह्यति।","The mother loves {X}.");
  F("sap20","sap",1,"adhikarana","container openable","{X} किम् अस्ति?","What is in {X}?",{ex:"द्वार वातायन पुस्तक"});
  F("sap21","sap",2,"adhikarana","plant","{X} खगाः वसन्ति।","Birds live in {X}.",{only:"वृक्ष"});

  // ---------------- सम्बोधनम् ----------------
  F("sam01","sam",1,"sambodhana","person","हे {X}, {B} कुत्र {v:गच्छति|गच्छन्ति}?","{Xv}, where are you going?",{strict:true,cue:true});
  F("sam02","sam",1,"sambodhana","person","हे {X}, {B} किं {v:पठति|पठन्ति}?","{Xv}, what are you reading?",{strict:true,cue:true});
  F("sam03","sam",1,"sambodhana","elder deity","हे {X}, नमः।","{Xv}, salutations.",{strict:true});
  F("sam04","sam",2,"sambodhana","person","हे {X}, {B} अत्र {v:आगच्छतु|आगच्छन्तु}।","{Xv}, please come here.",{strict:true,cue:true});
  F("sam05","sam",2,"sambodhana","person","हे {X}, {B} कथम् {v:अस्ति|सन्ति}?","{Xv}, how are you?",{strict:true,cue:true});
  F("sam06","sam",2,"sambodhana","child","हे {X}, {B} किमर्थं {v:रोदिति|रुदन्ति}?","{Xv}, why are you crying?",{strict:true,cue:true});
  F("sam07","sam",3,"sambodhana","deity","हे {X}, मां रक्ष।","{Xv}, protect me.",{strict:true,nums:["eka"]});
  F("sam08","sam",2,"sambodhana","person","हे {X}, {B} जलं {v:पिबतु|पिबन्तु}।","{Xv}, please drink some water.",{strict:true,cue:true});
  F("sam09","sam",3,"sambodhana","person","हे {X}, {B} मम गृहम् {v:आगच्छतु|आगच्छन्तु}।","{Xv}, please come to my house.",{strict:true,cue:true});
})();

// A short introduction shown when a vibhakti is unlocked
VB.INTRO = {
  pra: { use: "कर्ता, the one who does the action.", ex: "रामः पठति।  बालिकाः हसन्ति।" },
  dvi: { use: "कर्म, what the action is done to. Also the place you go to.", ex: "रामः पुस्तकं पठति।  सीता ग्रामं गच्छति।" },
  tri: { use: "करणम्, by what means. Also used with सह (together with).", ex: "बालकः लेखन्या लिखति।  सीता रामेण सह गच्छति।" },
  cat: { use: "सम्प्रदानम्, to whom something is given. Also with नमः.", ex: "रामः बालकाय फलं ददाति।  गणेशाय नमः।" },
  pan: { use: "अपादानम्, away from what. Also with बिभेति (is afraid of).", ex: "वृक्षात् फलं पतति।  बालकः सिंहात् बिभेति।" },
  sha: { use: "सम्बन्धः, whose. Also with समीपे, उपरि, अधः.", ex: "एतत् रामस्य पुस्तकम्।  वृक्षस्य अधः छाया अस्ति।" },
  sap: { use: "अधिकरणम्, where or when something happens.", ex: "रामः ग्रामे वसति।  नद्यां मत्स्याः सन्ति।" },
  sam: { use: "सम्बोधनम्, calling someone directly.", ex: "हे राम!  हे बालिके, भवती कुत्र गच्छति?" }
};
