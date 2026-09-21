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
ब्राह्मण|brahmin|brahmins|person elder
यजमान|patron|patrons|person elder
पण्डित|scholar|scholars|person elder
तापस|ascetic|ascetics|person elder
वृद्ध|old man|old men|person elder
श्वशुर|father-in-law|fathers-in-law|person elder
नायक|leader|leaders|person elder
न्यायाधीश|judge|judges|person elder
कुमार|boy|boys|person child
दारक|child|children|person child
सुत|son|sons|person
तनय|son|sons|person
मानव|human|humans|person
नागरिक|citizen|citizens|person
ग्रामीण|villager|villagers|person
सहायक|helper|helpers|person
रक्षक|guard|guards|person
वादक|player|players|person
धावक|runner|runners|person
याचक|beggar|beggars|person
भिक्षुक|mendicant|mendicants|person
दूत|messenger|messengers|person
सूत|charioteer|charioteers|person
भृत्य|servant|servants|person
वीर|hero|heroes|person
मूर्ख|fool|fools|person
इन्द्र|Indra||deity|proper
यम|Yama||deity|proper
वरुण|Varuna||deity|proper
कुबेर|Kubera||deity|proper
सुब्रह्मण्य|Subrahmanya||deity|proper
अर्जुन|Arjuna||person elder|proper
भीम|Bhima||person elder|proper
युधिष्ठिर|Yudhishthira||person elder|proper
लक्ष्मण|Lakshmana||person elder|proper
भरत|Bharata||person elder|proper
दशरथ|Dasharatha||person elder|proper
सुग्रीव|Sugriva||person elder|proper
नारद|Narada||person elder|proper
रावण|Ravana||person fearsome|proper
गर्दभ|donkey|donkeys|animal
उष्ट्र|camel|camels|animal
मेष|ram|rams|animal
अज|goat|goats|animal
शशक|rabbit|rabbits|animal
नकुल|mongoose|mongooses|animal
वराह|boar|boars|animal fearsome
ऋक्ष|bear|bears|animal fearsome
वृक|wolf|wolves|animal fearsome
कच्छप|tortoise|tortoises|animal waterlife
मकर|crocodile|crocodiles|animal waterlife fearsome
गृध्र|vulture|vultures|bird
उलूक|owl|owls|bird
बक|crane|cranes|bird waterlife
चक्रवाक|ruddy goose|ruddy geese|bird waterlife
मशक|mosquito|mosquitoes|creature
वृश्चिक|scorpion|scorpions|creature fearsome
कीट|insect|insects|creature
आम्र|mango tree|mango trees|plant treeanimal
अशोक|ashoka tree|ashoka trees|plant treeanimal
वट|banyan|banyans|plant treeanimal
अश्वत्थ|peepal tree|peepal trees|plant treeanimal
अङ्कुर|sprout|sprouts|plant
शैल|mountain|mountains|dest mountain
राजमार्ग|highway|highways|dest road
हट्ट|market|markets|dest shop buyable
आश्रम|hermitage|hermitages|dest dwell
मठ|monastery|monasteries|dest dwell temple
छात्रावास|hostel|hostels|dwell dest
विहार|vihara|viharas|dest temple
आराम|pleasure garden|pleasure gardens|dest garden
कक्ष|room|rooms|dwell
प्रकोष्ठ|chamber|chambers|dwell
स्तम्भ|pillar|pillars|object
प्राकार|wall|walls|object
कोण|corner|corners|object
लड्डुक|laddu|laddus|food cookable buyable
अपूप|cake|cakes|food cookable buyable
कन्द|tuber|tubers|food
तण्डुल|rice grain|rice grains|food
यव|barley||food|mass
गुड|jaggery||food|mass
आहार|food||food|mass
पनस|jackfruit|jackfruits|fruit food buyable
खर्जूर|date|dates|fruit food buyable
रस|juice|juices|drink food buyable
कषाय|decoction|decoctions|drink
स्नेह|affection||abstract|mass
शोक|grief||abstract|mass
हर्ष|joy||abstract|mass
लोभ|greed||abstract|mass
मोह|delusion||abstract|mass
गर्व|pride||abstract|mass
उत्साह|enthusiasm||abstract|mass
विश्वास|trust||abstract|mass
संशय|doubt|doubts|abstract
प्रश्न|question|questions|abstract hearable
उपाय|means|means|abstract
आरम्भ|beginning|beginnings|abstract
समय|time|times|time
काल|time||time|mass
मास|month|months|time
पक्ष|fortnight|fortnights|time
ग्रीष्म|summer||time|sg
हेमन्त|winter||time|sg
समारोह|ceremony|ceremonies|festival
जन्मदिवस|birthday|birthdays|festival time
केश|hair|hairs|body
स्कन्ध|shoulder|shoulders|body
कण्ठ|throat|throats|body
ओष्ठ|lip|lips|body
अङ्गुष्ठ|thumb|thumbs|body
कुम्भ|pot|pots|container washable object
पिटक|basket|baskets|container object
खड्ग|sword|swords|object
बाण|arrow|arrows|object
मुद्गर|club|clubs|object
कोश|treasury|treasuries|object
हार|necklace|necklaces|object wear buyable
कटक|bracelet|bracelets|object wear buyable
शकट|cart|carts|vehicle
प्लव|boat|boats|vehicle
मृदङ्ग|drum|drums|object sound
स्वर|note|notes|sound hearable
नाद|sound|sounds|sound hearable
राग|raga|ragas|sound hearable skill
समूह|group|groups|group
गण|troop|troops|group
सङ्घ|assembly|assemblies|group
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
जाया|wife|wives|person
भार्या|wife|wives|person
स्नुषा|daughter-in-law|daughters-in-law|person
वृद्धा|old woman|old women|person elder
पण्डिता|woman scholar|women scholars|person elder
प्रजा|subject|subjects|person group
कोकिला|female cuckoo|female cuckoos|bird
सारिका|myna|mynas|bird pet
द्राक्षा|grape|grapes|fruit food buyable
शर्करा|sugar||food|mass
हरिद्रा|turmeric||food|mass
सुधा|nectar||drink food|mass
वेदिका|platform|platforms|object seat
मञ्जूषा|box|boxes|container object
कुण्डिका|small pot|small pots|container washable object
थालिका|plate|plates|container washable object
शलाका|rod|rods|object
सूचिका|needle|needles|object tool
तूलिका|brush|brushes|object tool writable
पञ्जिका|register|registers|writablein object reading
प्रतिमा|image|images|object
पताका|flag|flags|object
मृत्तिका|clay||object|mass
शिबिका|palanquin|palanquins|vehicle
शाला|hall|halls|dwell dest
गोशाला|cowshed|cowsheds|dwell dest
नाट्यशाला|theatre|theatres|dest
कन्दरा|cave|caves|dest
कुल्या|canal|canals|water dest
वसुधा|earth||dest|sg
उषा|dawn||time|sg
निशा|night|nights|time
सीमा|boundary|boundaries|abstract
दिशा|direction|directions|abstract
शोभा|beauty||abstract|mass
निद्रा|sleep||abstract|mass
चिन्ता|worry||abstract|mass
इच्छा|wish|wishes|abstract
आशा|hope|hopes|abstract
श्रद्धा|faith||abstract|mass
कृपा|grace||abstract|mass
व्यथा|pain||abstract|mass
कल्पना|imagination||abstract|mass
सूचना|information||abstract|mass
शिक्षा|education||abstract skill|mass
कला|art|arts|abstract skill
सेवा|service||purpose abstract|mass
रचना|composition|compositions|abstract reading
घोषणा|announcement|announcements|hearable
गाथा|ballad|ballads|reading hearable
ऋचा|verse|verses|reading hearable
टीका|commentary|commentaries|reading
संहिता|collection|collections|reading
घटना|event|events|abstract
जटा|matted hair||body|mass
शिखा|crest|crests|body
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
युवती|young woman|young women|person
स्वामिनी|mistress|mistresses|person elder
छात्री|woman student|women students|person
लक्ष्मी|Lakshmi||deity|proper
गायत्री|Gayatri||deity reading|proper
शुकी|female parrot|female parrots|bird pet
हंसी|female swan|female swans|bird waterlife
कुक्कुटी|hen|hens|bird animal
मृगी|doe|does|animal
वानरी|female monkey|female monkeys|animal treeanimal
मार्जारी|female cat|female cats|animal pet
व्याघ्री|tigress|tigresses|animal fearsome
अटवी|forest|forests|dest forest
वाटी|garden|gardens|dest garden
वीथी|lane|lanes|dest road
पुरी|city|cities|dest dwell
वापी|step-well|step-wells|water dest
तटिनी|river|rivers|water dest
नलिनी|lotus pond|lotus ponds|water
तटी|bank|banks|water dest
मेदिनी|earth||dest|sg
गोष्ठी|assembly|assemblies|group
मण्डली|circle|circles|group
श्रेणी|row|rows|group
मञ्जरी|blossom cluster|blossom clusters|flower plant
कुमुदिनी|lily plant|lily plants|flower plant water
पद्मिनी|lotus plant|lotus plants|flower plant water
यूथी|jasmine|jasmines|flower
मालती|jasmine creeper|jasmine creepers|flower plant
केतकी|screwpine|screwpines|flower plant
तुलसी|tulasi|tulasi plants|plant flower
पेटी|box|boxes|container object
चुल्ली|stove|stoves|object
देहली|threshold|thresholds|object
वेणी|braid|braids|body
शर्वरी|night|nights|time
पौर्णमी|full moon day|full moon days|time celestial
एकादशी|ekadashi||festival time|proper
आरती|arati||festival purpose|sg
सामग्री|material||object|mass
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
उपवन|grove|groves|dest garden forest
कानन|forest|forests|dest forest
विपिन|thicket|thickets|dest forest
द्वीप|island|islands|dest
शिखर|peak|peaks|dest mountain
शृङ्ग|summit|summits|dest mountain
सोपान|staircase|staircases|object
प्राङ्गण|courtyard|courtyards|dwell dest
आयतन|shrine|shrines|temple dest
तट|bank|banks|water dest
कूल|shore|shores|water dest
सलिल|water||water|mass
उदक|water||water|mass
पानीय|drinking water||water drink|mass
लवण|salt||food|mass
मरिच|pepper||food|mass
नवनीत|butter||food|mass
धान्य|grain||food|mass
मिष्टान्न|sweet|sweets|food cookable buyable
व्यञ्जन|curry|curries|food cookable
सस्य|crop|crops|plant food
नारिकेल|coconut|coconuts|fruit food buyable
बदर|jujube|jujubes|fruit food
दाडिम|pomegranate|pomegranates|fruit food buyable
पङ्कज|lotus|lotuses|flower water
उत्पल|water lily|water lilies|flower water
मूल|root|roots|plant
तृण|grass||plant|mass
काष्ठ|wood||object|mass
नख|nail|nails|body
उदर|belly|bellies|body
श्रोत्र|ear|ears|body ear
लोचन|eye|eyes|body eye
वदन|face|faces|body
ललाट|forehead|foreheads|body
अङ्ग|limb|limbs|body
रुधिर|blood||body|mass
उत्तरीय|upper cloth|upper cloths|wear object
आभरण|ornament|ornaments|object wear buyable
कुण्डल|earring|earrings|object wear buyable
वलय|bangle|bangles|object wear buyable
कवच|armour|armours|object wear
दर्पण|mirror|mirrors|object buyable
शयन|bed|beds|object seat
भाण्ड|vessel|vessels|container washable object
यन्त्र|machine|machines|object tool buyable
शस्त्र|weapon|weapons|object
सूत्र|thread|threads|object
औषध|medicine|medicines|object buyable
मौक्तिक|pearl|pearls|object buyable
सुवर्ण|gold||object|mass
रजत|silver||object|mass
चूर्ण|powder||object|mass
नाटक|play|plays|reading hearable
काव्य|poem|poems|reading
पुराण|purana|puranas|reading
सूक्त|hymn|hymns|reading hearable
स्तोत्र|hymn|hymns|reading hearable
वाद्य|instrument|instruments|object sound
मङ्गल|auspicious rite|auspicious rites|festival
आमन्त्रण|invitation|invitations|festival hearable
कुल|family|families|group
दिन|day|days|time
गगन|sky||celestial|mass
अन्तरिक्ष|sky||celestial|mass
तिमिर|darkness||abstract|mass
उत्तर|answer|answers|abstract hearable
भय|fear||abstract|mass
बल|strength||abstract|mass
धैर्य|courage||abstract|mass
साहस|daring||abstract|mass
मौन|silence||abstract|mass
स्मरण|memory||abstract|mass
चिन्तन|thinking||abstract purpose|mass
दर्शन|sight||abstract purpose|mass
श्रवण|listening||abstract purpose skill|mass
लेखन|writing||abstract purpose skill|mass
पठन|reading||abstract purpose skill|mass
गायन|singing||abstract purpose skill|mass
भ्रमण|wandering||purpose|mass
`
};
