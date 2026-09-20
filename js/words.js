/*
  Word list for Vibhakti Abhyasa.
  One line per word:  stem | English (one) | English (many) | categories | flags
  flags: proper = a name, mass = uncountable, sg = keep to ekavacana in sentences.
  Categories decide which sentence frames a word may appear in (see frames.js).
  To add a word, add a line to the right class. Everything else is automatic.
*/
var VB = window.VB = window.VB || {};

VB.RAW_WORDS = {

// ---------------- अकारान्तः पुंलिङ्गः ----------------
a: `
बालक|boy|boys|person child
छात्र|student|students|person
शिष्य|disciple|disciples|person
शिक्षक|teacher|teachers|person elder
अध्यापक|teacher|teachers|person elder
आचार्य|master|masters|person elder
वैद्य|doctor|doctors|person
कृषक|farmer|farmers|person
सैनिक|soldier|soldiers|person
नृप|king|kings|person elder
जनक|father|fathers|person elder
पितामह|grandfather|grandfathers|person elder
पुत्र|son|sons|person
पौत्र|grandson|grandsons|person child
अनुज|younger brother|younger brothers|person
अग्रज|elder brother|elder brothers|person elder
मातुल|uncle|uncles|person elder
पुरुष|man|men|person
जन|person|people|person
भक्त|devotee|devotees|person
गायक|singer|singers|person
लेखक|writer|writers|person
नर्तक|dancer|dancers|person
पाचक|cook|cooks|person
चालक|driver|drivers|person
आरक्षक|policeman|policemen|person
सेवक|servant|servants|person
चोर|thief|thieves|person fearsome
राम|Rama||person elder|proper
कृष्ण|Krishna||person elder|proper
गणेश|Ganesha||deity|proper
शिव|Shiva||deity|proper
देव|god|gods|deity
वृक्ष|tree|trees|plant
अश्व|horse|horses|animal vehicle pet
गज|elephant|elephants|animal vehicle fearsome
सिंह|lion|lions|animal fearsome
व्याघ्र|tiger|tigers|animal fearsome
मृग|deer|deer|animal
वृषभ|bull|bulls|animal
सर्प|snake|snakes|animal fearsome
मूषक|mouse|mice|animal creature
मार्जार|cat|cats|animal pet
कुक्कुर|dog|dogs|animal pet fearsome
वानर|monkey|monkeys|animal treeanimal
शृगाल|jackal|jackals|animal
मण्डूक|frog|frogs|animal waterlife
मत्स्य|fish|fish|animal waterlife
मयूर|peacock|peacocks|bird animal
काक|crow|crows|bird animal
शुक|parrot|parrots|bird animal pet
हंस|swan|swans|bird animal waterlife
कपोत|pigeon|pigeons|bird animal
कोकिल|cuckoo|cuckoos|bird animal sound
खग|bird|birds|bird animal
भ्रमर|bee|bees|creature
सूर्य|sun||celestial|proper
चन्द्र|moon||celestial|proper
मेघ|cloud|clouds|celestial
पर्वत|mountain|mountains|mountain dest
समुद्र|ocean|oceans|water dest
सागर|sea|seas|water dest
तडाग|pond|ponds|water dest
कूप|well|wells|water
ग्राम|village|villages|dwell dest
देश|country|countries|dwell dest
मार्ग|road|roads|road dest
आपण|shop|shops|dest shop
विद्यालय|school|schools|dest study
ग्रन्थालय|library|libraries|dest study
चिकित्सालय|hospital|hospitals|dest
देवालय|temple|temples|dest temple
प्रासाद|palace|palaces|dwell dest
घट|pot|pots|container object buyable
कलश|water-pot|water-pots|container object
चषक|cup|cups|container object washable buyable
दीप|lamp|lamps|object buyable
दण्ड|stick|sticks|object tool
हस्त|hand|hands|body tool
पाद|foot|feet|body
कर्ण|ear|ears|body ear
दन्त|tooth|teeth|body
रथ|chariot|chariots|vehicle seat
मोदक|modaka sweet|modaka sweets|food buyable
ओदन|rice||food cookable|mass
सूप|dal||food cookable|mass
स्यूत|bag|bags|object openable buyable
पर्यङ्क|cot|cots|seat
ग्रन्थ|book|books|reading buyable
श्लोक|verse|verses|reading writable hearable
पाठ|lesson|lessons|reading writable
उत्सव|festival|festivals|festival time
विवाह|wedding|weddings|festival
दिवस|day|days|time
वसन्त|spring||time|proper
धर्म|dharma||abstract|mass
आनन्द|joy||abstract|mass
क्रोध|anger||abstract fearsome|mass
विचार|thought|thoughts|abstract
गुण|virtue|virtues|abstract
चमस|spoon|spoons|tool object washable
शङ्ख|conch|conches|object sound
ध्वज|flag|flags|object
कन्दुक|ball|balls|object buyable
`,

// ---------------- आकारान्तः स्त्रीलिङ्गः ----------------
aa: `
बालिका|girl|girls|person child
छात्रा|student|students|person
शिष्या|disciple|disciples|person
शिक्षिका|teacher|teachers|person elder
अध्यापिका|teacher|teachers|person elder
गायिका|singer|singers|person
लेखिका|writer|writers|person
सेविका|helper|helpers|person
कन्या|young girl|young girls|person child
सीता|Sita||person elder|proper
राधा|Radha||person|proper
रमा|Ramā||person|proper
उमा|Uma||deity|proper
दुर्गा|Durga||deity|proper
गङ्गा|the Ganga||water dest|proper
यमुना|the Yamuna||water dest|proper
अयोध्या|Ayodhya||dwell dest|proper
मथुरा|Mathura||dwell dest|proper
लङ्का|Lanka||dest|proper
लता|creeper|creepers|plant
शाखा|branch|branches|plant
माला|garland|garlands|wear object buyable
पाठशाला|school|schools|dest study
पाकशाला|kitchen|kitchens|dest
कक्षा|classroom|classrooms|dest study
वाटिका|garden|gardens|dest garden
गुहा|cave|caves|dest
नासिका|nose|noses|body
जिह्वा|tongue|tongues|body
ग्रीवा|neck|necks|body
पुस्तिका|notebook|notebooks|reading object buyable writablein
पत्रिका|magazine|magazines|reading object buyable
पेटिका|box|boxes|object openable container
कुञ्चिका|key|keys|object
घटिका|clock|clocks|object buyable
घण्टा|bell|bells|object sound
नौका|boat|boats|vehicle seat
शय्या|bed|beds|seat
दोला|swing|swings|seat
द्विचक्रिका|bicycle|bicycles|vehicle buyable
रोटिका|roti|rotis|food cookable
कथा|story|stories|reading writable hearable
कविता|poem|poems|reading writable hearable
भाषा|language|languages|skill abstract
वार्ता|news||hearable|mass
विद्या|learning||skill abstract|mass
दया|compassion||abstract|mass
क्षमा|forgiveness||abstract|mass
पूजा|worship|worships|purpose
प्रार्थना|prayer|prayers|hearable
परीक्षा|exam|exams|abstract
यात्रा|journey|journeys|abstract
क्रीडा|game|games|purpose
सभा|assembly|assemblies|dest
सेना|army|armies|group
शिला|rock|rocks|object
छाया|shade|shades|abstract
अजा|goat|goats|animal pet
चटका|sparrow|sparrows|bird animal
मक्षिका|fly|flies|creature
पिपीलिका|ant|ants|creature
वीणा|veena|veenas|object sound
सन्ध्या|evening|evenings|time
वर्षा|rainy season||time|proper
तारा|star|stars|celestial
मुद्रा|coin|coins|object
`,

// ---------------- ईकारान्तः स्त्रीलिङ्गः ----------------
ii: `
नदी|river|rivers|water dest
नगरी|city|cities|dwell dest
पृथ्वी|the earth||abstract|proper
देवी|goddess|goddesses|deity
गौरी|Gauri||deity|proper
पार्वती|Parvati||deity|proper
सरस्वती|Sarasvati||deity|proper
जानकी|Janaki||person elder|proper
काशी|Kashi||dwell dest|proper
गोदावरी|the Godavari||water dest|proper
कावेरी|the Kaveri||water dest|proper
नारी|woman|women|person
कुमारी|girl|girls|person child
पुत्री|daughter|daughters|person child
भगिनी|sister|sisters|person
जननी|mother|mothers|person elder
सखी|friend|friends|person
राज्ञी|queen|queens|person elder
पत्नी|wife|wives|person|sg
तरुणी|young woman|young women|person
किशोरी|teenage girl|teenage girls|person child
नर्तकी|dancer|dancers|person
गृहिणी|homemaker|homemakers|person
दासी|maid|maids|person
लेखनी|pen|pens|tool object buyable
आसन्दी|chair|chairs|seat
कर्तरी|scissors|scissors|tool object
कूपी|bottle|bottles|container object buyable
दूरवाणी|phone|phones|object buyable
वाणी|speech||abstract hearable|mass
महिषी|buffalo|buffaloes|animal fearsome
सिंही|lioness|lionesses|animal fearsome
मयूरी|peahen|peahens|bird animal
हरिणी|doe|does|animal
कदली|banana plant|banana plants|plant
वल्ली|vine|vines|plant
कुटी|hut|huts|dwell dest
अङ्गुली|finger|fingers|body
रजनी|night|nights|time
मैत्री|friendship||abstract|mass
`,

// ---------------- अकारान्तः नपुंसकलिङ्गः ----------------
n: `
फल|fruit|fruits|food fruit buyable
पुष्प|flower|flowers|flower
कुसुम|blossom|blossoms|flower
कमल|lotus|lotuses|flower
पर्ण|leaf|leaves|fruit
बीज|seed|seeds|object
वन|forest|forests|dest forest
अरण्य|jungle|jungles|dest forest
जल|water||drink|mass
दुग्ध|milk||drink|mass
क्षीर|milk||drink|mass
अन्न|food||food|mass
भोजन|meal||food purpose|sg
पायस|payasam||food cookable|mass
शाक|vegetable|vegetables|food cookable buyable
घृत|ghee||food|mass
तैल|oil||food|mass
पुस्तक|book|books|reading object buyable openable
पत्र|letter|letters|reading writable
वाक्य|sentence|sentences|writable
पद|word|words|writable
गीत|song|songs|hearable writable
नृत्य|dance|dances|skill
गान|singing||skill|mass
चित्र|picture|pictures|object skill writablein
गृह|house|houses|dwell dest study
नगर|city|cities|dwell dest
मन्दिर|temple|temples|dest temple
भवन|building|buildings|dwell dest
उद्यान|garden|gardens|dest garden
क्षेत्र|field|fields|dest
सरोवर|lake|lakes|water dest
तीर्थ|pilgrimage place|pilgrimage places|dest
मित्र|friend|friends|person
नेत्र|eye|eyes|body eye
नयन|eye|eyes|body eye
मुख|face|faces|body washable
हृदय|heart|hearts|body
शरीर|body|bodies|body
वस्त्र|cloth|clothes|wear washable buyable
कङ्कण|bangle|bangles|wear buyable
उपनेत्र|spectacles|spectacles|wear object
छत्र|umbrella|umbrellas|object buyable
व्यजन|fan|fans|object
आसन|seat|seats|seat
वाहन|vehicle|vehicles|vehicle
विमान|aeroplane|aeroplanes|vehicle
यान|carriage|carriages|vehicle
चक्र|wheel|wheels|object
पात्र|vessel|vessels|container washable object
द्वार|door|doors|openable
वातायन|window|windows|openable
सङ्गणक|computer|computers|object buyable
दूरदर्शन|television|televisions|object
धन|wealth||abstract|mass
सुख|happiness||abstract|mass
दुःख|sorrow||abstract|mass
ज्ञान|knowledge||abstract|mass
सत्य|truth||abstract|mass
कार्य|work|works|abstract skill
शास्त्र|scripture|scriptures|reading skill
पुच्छ|tail|tails|body
रत्न|gem|gems|object buyable
नक्षत्र|star|stars|celestial
प्रभात|morning||time|proper
वर्ष|year|years|time
स्नान|bath||purpose|sg
अध्ययन|study||purpose skill|mass
दान|gift|gifts|abstract
वचन|word|words|hearable
भाषण|speech|speeches|hearable
राष्ट्र|nation|nations|dwell
`
};
