
import { SugyaSection, LogicType, Era, Concept, AnalysisComponent, PsakEntry, LogicSystemData, ModernApplication, VisualFlowStep, ShulchanAruchData } from './types';

// --- CONCEPTS (ENRICHED) ---
export const INITIAL_CONCEPTS: Concept[] = [
  { 
    id: 'c1', 
    nameHebrew: 'דברים שבלב', 
    nameEnglish: 'Dvarim Shebalev', 
    description: 'Unspoken thoughts or intentions that contradict a spoken agreement or action.', 
    category: 'Logic',
    subComponents: ['Gilui Daas (Revealed Intent)', 'Umdana (Assumed Intent)', 'Devarim Shebalev Einan Devarim'],
    relatedLaws: ['Sale under duress', 'Kiddushin conditions', 'Nedarim'],
    attributes: [
        { label: 'General Rule', value: 'Einan Devarim (They are nothing) - Actions follow speech/act, not hidden thought.' },
        { label: 'Exception', value: 'Umdana D\'Muchach (Proven Assumption) - If circumstances make the intent obvious to all.' }
    ],
    opinions: [
        { authority: 'Rava (Kid 49b)', text: 'Even in a sale under duress, we follow the act unless explicit declaration (Modaa) exists.' },
        { authority: 'Ramban', text: 'In Kiddushin/Sales, hidden intent is void. In Nedarim, it might differ if "Piv V\'Libo Shavin" is required.' },
        { authority: 'Rashba', text: 'Thoughts only invalidate if they contradict the act. If they support it (like "I meant to be a Nazir like Samson"), they might be valid.' },
        { authority: 'Birchas Shmuel', text: 'In Kiddushin, the Act (Maaseh) is primary. In Kodshim, the Speech (Dibur) is primary.' }
    ]
  },
  { 
    id: 'c2', 
    nameHebrew: 'יד', 
    nameEnglish: 'Yad (Extension)', 
    description: 'A partial or incomplete statement that "extends" to become a full legal statement based on context.', 
    category: 'Kinyan',
    subComponents: ['Yad Mochiach (Clear Handle)', 'Yad She\'eino Mochiach (Ambiguous Handle)'],
    relatedLaws: ['Nedarim (Vows)', 'Kiddushin', 'Peah', 'Tzedaka'],
    attributes: [
        { label: 'Origin', value: 'Nedarim (Vows)' },
        { label: 'Mechanism', value: 'Contextual completion of speech.' }
    ],
    opinions: [
        { authority: 'Shmuel', text: 'Requires "Yad Mochiach" (Unambiguous context) to work in Kiddushin.' },
        { authority: 'Rav Papa', text: 'Questions if "Yad" works at all in Kiddushin, as it is derived from Nedarim.' },
        { authority: 'Ran', text: 'Nedarim uses Speech to create status. Kiddushin uses Speech to clarify an Act. Yad might not apply to Acts.' },
        { authority: 'Pnei Yehoshua', text: 'Maybe Rav Papa doubts if we learn Kiddushin from Nedarim regarding the definition of "Speech".' }
    ]
  },
  { 
    id: 'c3', 
    nameHebrew: 'פיו ולבו שוין', 
    nameEnglish: 'Piv V\'Libo Shavin', 
    description: 'The requirement that one\'s spoken words must match their internal intent.', 
    category: 'Kodshim',
    subComponents: ['Gamar Belibo (Resolved in heart)', 'Hotzaat Sfatayim (Speech)'],
    relatedLaws: ['Nedarim', 'Kodshim', 'Shevuot'],
    attributes: [
        { label: 'Source', value: 'Shevuot 26b ("Livta bisfatayim")' },
        { label: 'Application', value: 'Critical for Vows/Holy Objects. Less critical for Transactional Kinyanim.' }
    ],
    opinions: [
        { authority: 'Rambam', text: 'Required for Nedarim. If one meant bread and said wheat, it is invalid.' },
        { authority: 'Birchas Shmuel', text: 'This rule is specific to "Chalot Dibur" (Speech-created status). Kiddushin is "Chalot Maaseh" (Act-created status), so it follows Dvarim Shebalev rules instead.' }
    ]
  },
  {
      id: 'c4',
      nameHebrew: 'ערב',
      nameEnglish: 'Arev (Guarantor)',
      description: 'A mechanism where a person obligates themselves based on the benefit (Hana\'ah) of being trusted, without receiving money.',
      category: 'Kinyan',
      subComponents: ['Arev Kablan', 'Shibud HaGuf'],
      relatedLaws: ['Kiddushin M\'Din Arev', 'Loans'],
      attributes: [
          { label: 'Mechanism', value: 'Hana\'ah (Benefit) replaces Kesef (Money).' }
      ],
      opinions: [
          { authority: 'Rashi', text: 'Binding works due to the psychological benefit of trust.' },
          { authority: 'Rashba', text: 'Binding is automatic upon the lender\'s act of giving.' }
      ]
  },
  {
      id: 'c5',
      nameHebrew: 'אומדנא',
      nameEnglish: 'Umdana',
      description: 'A legal assessment of intent based on circumstantial evidence.',
      category: 'Logic',
      subComponents: ['Umdana D\'Muchach', 'Gilui Daas'],
      attributes: [
          { label: 'Function', value: 'Overrides "Dvarim Shebalev Einan Dvarim".' }
      ],
      opinions: [
          { authority: 'Tosafot', text: 'If a man sells everything to move to Israel, the sale is conditional on the move, even if unspoken.' }
      ]
  }
];

// ==========================================
// SUGYA: BIRCHAS SHMUEL SIMAN 1 (MAASEH KIDDUSHIN)
// ==========================================

const KID_6B_DEEP_DATA: SugyaSection = {
    id: 'kid-6b-deep',
    title: 'Birchas Shmuel: Speech vs. Intent',
    sourceRef: 'Kiddushin 5b-6a, Nedarim 6b',
    resources: {
        videoUrl: "https://www2.kolhalashon.com/en/regularSite/playShiur/41836819/-1/0/false",
        pdfUrl: "https://www2.kolhalashon.com/regularSite/playShiur/41836825"
    },
    chumashText: {
        sourceRef: "דברים כד:א",
        text: "כִּי יִקַּח אִישׁ אִשָּׁה וּבְעָלָהּ וְהָיָה אִם לֹא תִמְצָא חֵן בְּעֵינָיו כִּי מָצָא בָהּ עֶרְוַת דָּבָר וְכָתַב לָהּ סֵפֶר כְּרִיתֻת וְנָתַן בְּיָדָהּ וְשִׁלְּחָהּ מִבֵּיתוֹ:",
        translation: "When a man takes a wife and marries her, and it happens that she finds no favor in his eyes because he has found some indecency in her, and he writes her a bill of divorce and puts it in her hand and sends her out of his house...",
        targum: "אֲרֵי יִסַּב גְּבַר אִתְּתָא וְיִבְעֲלִינַּהּ וִיהֵי אִם לָא תַשְׁכַּח רַחֲמִין בְּעֵינוֹהִי אֲרֵי אַשְׁכַּח בַּהּ עֲבֵידַת פִּתְגָם וְיִכְתּוֹב לַהּ סְפַר תֵּרוּכִין וְיִתֵּין בִּידַהּ וְיִפְטְרִינַּהּ מִבֵּיתֵיהּ:",
        rashi: [
            { 
                id: "ch-r1", 
                text: "כי יקח - אין קיחה אלא בכסף, שנאמר (בראשית כג) נתתי כסף השדה קח ממני",
                translation: "'When a man takes' - Taking implies money, as it says (Genesis 23) 'I have given the money for the field, take it from me'."
            },
            {
                id: "ch-r2",
                text: "ובעלה - קנה בביאה. מלמד שהאשה נקנית בכסף ובביאה",
                translation: "'And marries her' - He acquires her through Relations. This teaches that a woman is acquired by Money and by Relations."
            },
            {
                id: "ch-r3",
                text: "ויצאה... והיתה - מקיש יציאה להויה, מה יציאה בשטר אף הויה בשטר",
                translation: "Juxtaposes leaving (Divorce) to becoming (Marriage). Just as divorce requires a document, so does marriage."
            },
            {
                id: "ch-r4", 
                text: "וכתב לה - לשמה",
                translation: "'And he writes for her' - Meaning, for her sake (Lishma). The document must be written specifically for the woman."
            },
            {
                id: "ch-r5", 
                text: "ספר כריתת - ספר הכורת בינו לבינה, שלא יהא לה שייכות עמו עוד",
                translation: "A Scroll of Cutting - A document that severs the tie between them completely."
            }
        ]
    },
    mishnaContext: {
        previous: {
            ref: 'נדרים ב:א',
            hebrew: 'כָּל כִּנּוּיֵי נְדָרִים כִּנְדָרִים, וַחֲרָמִים כַּחֲרָמִים, וּשְׁבוּעוֹת כִּשְׁבוּעוֹת, וּנְזִירוּת כִּנְזִירוּת. הָאוֹמֵר לַחֲבֵרוֹ, מֻדָּר אֲנִי מִמָּךְ, מֻפְרָשׁ אֲנִי מִמָּךְ, מְרֻחָק אֲנִי מִמָּךְ, שֶׁאֵינִי אוֹכֵל לָךְ, שֶׁאֵינִי טוֹעֵם לָךְ, אָסוּר',
            english: 'All substitutes for vows are like vows... One who says to his friend "I am vow-bound from you", "I am separated from you"... is prohibited.'
        },
        next: {
            ref: 'קידושין ב:א',
            hebrew: 'הָאִישׁ מְקַדֵּשׁ בּוֹ וּבִשְׁלוּחוֹ. הָאִשָּׁה מִתְקַדֶּשֶׁת בָּהּ וּבִשְׁלוּחָהּ. הָאִישׁ מְקַדֵּשׁ אֶת בִּתּוֹ כְּשֶׁהִיא נַעֲרָה בּוֹ וּבִשְׁלוּחוֹ.',
            english: 'A man can betroth in person or via an agent. A woman can be betrothed in person or via an agent...'
        },
        bartenura: [
            {
                id: 'bart-1',
                scholar: 'Bartenura',
                hebrewText: 'כל כינויי נדרים - לשונות שבדו להם בני אדם ולשון העמים נכרים והם דומים ללשון נדר, הרי הן כנדרים.',
                englishText: 'Substitutes for vows - Expressions invented by people or foreign languages that resemble the language of vows, have the legal status of vows.'
            },
            {
                id: 'bart-2',
                scholar: 'Bartenura',
                hebrewText: 'האומר אהא הרי זה נזיר - בגמרא מוקי לה כשעובר לפניו נזיר, דהוי כאילו אמר אהא כזה.',
                englishText: 'One who says "Ah\'a" is a Nazir - The Gemara establishes this case where a Nazir passes before him, so it implies "I will be like this one".'
            },
            {
                id: 'bart-3',
                scholar: 'Bartenura',
                hebrewText: 'מודר אני ממך - הרי אני אסור בהנאתך כקרבן.',
                englishText: 'I am vow-bound from you - Meaning, I am prohibited from deriving benefit from you just as I am prohibited from a sacrifice.'
            }
        ]
    },
    baseText: {
        id: 'gemara-kid5b',
        type: LogicType.STATEMENT,
        era: Era.AMORA,
        speaker: 'Gemara Kiddushin 5b',
        hebrewText: 'אמר שמואל: בקידושין, נתן לה כסף ושוה כסף ואמר לה "הרי את מקודשת" "הרי את מאורסת"... הרי זו מקודשת. אבל אם נתנה היא ואמרה היא... אינה מקודשת. ואבעיא להו: "הריני אישך" "הריני בעליך"... מהו?',
        englishText: 'Shmuel says: If he gives money and says "You are Mekudeshes", she is betrothed. If she gives and speaks, she is not. Question: What if he says "I am your husband"? Is this a valid "Yad" (Handle/Extension) for Kiddushin?',
        concepts: ['c2', 'c3'],
        children: []
    },
    gemaraText: {
        id: 'gemara-nedarim6b',
        type: LogicType.SOURCE,
        era: Era.AMORA,
        speaker: 'Gemara Nedarim 6b',
        hebrewText: 'בעי רב פפא: יש יד לקידושין או אין יד לקידושין? היכי דמי? אילימא... אלא כגון דאמר לה "הרי את" ולא אמר "מקודשת לי". מי אמרינן גבי נדרים הוא דכתיב "לנדור נדר" - דדמי לנדרים מהני, אבל גבי קידושין לא? או דלמא ילפינן קיחה קיחה משדה עפרון?',
        englishText: 'Rav Papa asks: Is there "Yad" (Partial Speech) for Kiddushin? Case: He said "Behold you are..." but didn\'t finish "betrothed to me". Do we say "Yad" works only in Nedarim (derived from verse), or do we derive Kiddushin from transactions (Field of Ephron) where context helps?',
        concepts: ['c2', 'c1'],
        children: []
    },
    secondaryGemaraText: {
        id: 'gemara-kid49b',
        type: LogicType.CASE,
        era: Era.AMORA,
        speaker: 'Kiddushin 49b',
        hebrewText: 'ההוא גברא דזבין לנכסיה אדעתא למיסק לארץ ישראל. ובעידנא דזבין לא אמר ולא מידי. אמר רבא: הוי דברים שבלב, ודברים שבלב אינם דברים.',
        englishText: 'A man sold his property intending to move to Israel. At the time of sale, he said nothing. Rava said: This is "Words in the Heart", and Words in the Heart are nothing (void). The sale stands even if he cannot move.',
        concepts: ['c1', 'c5'],
        children: []
    },
    // PART 1: RISHONIM (Detailed based on PDF)
    perspectives: [
        {
            id: 'seg-rashi',
            scholarName: 'Rashi',
            scholarNameHebrew: 'רש״י',
            description: 'The primary commentary',
            rootNode: {
                id: 'rashi-root',
                type: LogicType.STATEMENT,
                era: Era.RISHON,
                speaker: 'Rashi',
                hebrewText: 'פירוש רש"י על הסוגיא',
                englishText: 'Rashi explains the basic terms and flow.',
                concepts: [],
                children: [
                    {
                        id: 'rashi-1',
                        type: LogicType.STATEMENT,
                        era: Era.RISHON,
                        hebrewText: 'הרי את מקודשת לי - במתניתין תני האי לישנא, ובברייתא תני לישנא אחרינא דהוי נמי קידושין: הרי את מאורסת, הרי את אשתי.',
                        englishText: '"Behold you are betrothed to me" - The Mishna teaches this phrasing. The Baraita lists other valid phrases like "Behold you are betrothed" or "Behold you are my wife".',
                        concepts: [],
                        children: []
                    },
                    {
                        id: 'rashi-2',
                        type: LogicType.STATEMENT,
                        era: Era.RISHON,
                        hebrewText: 'אינה מקודשת - דהוא נתן והיא אמרה, לאו כלום הוא, דכתיב כי יקח ולא כי תקח.',
                        englishText: '"She is not betrothed" - Since he gave the money but she spoke the words, it is void. The verse says "When a man takes", implying he must be the active initiator of the bond.',
                        concepts: [],
                        children: []
                    },
                    {
                        id: 'rashi-3',
                        type: LogicType.STATEMENT,
                        era: Era.RISHON,
                        hebrewText: 'ספיקא היא - שמא נתרצה לה ויהיב לה על מנת כן, או שמא שחוק עשה בה.',
                        englishText: '"It is a doubt" - If he gave and she spoke, and then he also spoke, maybe he consented to her condition, or maybe he was just mocking her. Thus, she is doubtfully betrothed.',
                        concepts: [],
                        children: []
                    }
                ]
            }
        },
        {
            id: 'seg-tosfos',
            scholarName: 'Tosfos',
            scholarNameHebrew: 'תוספות',
            description: 'Critical analysis',
            rootNode: {
                id: 'tosfos-root',
                type: LogicType.STATEMENT,
                era: Era.RISHON,
                speaker: 'Tosfos',
                hebrewText: 'קושיות ותירוצים של בעלי התוספות',
                englishText: 'Tosfos analyzes deeper legal implications.',
                concepts: [],
                children: [
                    {
                        id: 'tosfos-1',
                        type: LogicType.QUESTION,
                        era: Era.RISHON,
                        hebrewText: 'ואמר לה הרי את מקודשת - תימה, למה לי אמירה? והלא באדם חשוב עסקינן!',
                        englishText: 'Question: "And he said to her..." - It is a wonder: Why is speech needed at all? Are we not dealing with a scenario where he is an important man (Adam Chashuv), where the benefit of her receiving money from him should create the bond automatically even without speech?',
                        concepts: [],
                        children: []
                    },
                    {
                        id: 'tosfos-2',
                        type: LogicType.ANSWER,
                        era: Era.RISHON,
                        hebrewText: 'וי"ל - דאפילו באדם חשוב, אי לא אמר מידי, הוי דברים שבלב.',
                        englishText: 'Answer: One can answer - Even for an important man, if he says nothing, his intent remains "Words in the heart" (hidden intent), which are legally void. Speech is required to reveal the intent.',
                        concepts: [],
                        children: []
                    }
                ]
            }
        },
        {
            id: 'seg-ritva',
            scholarName: 'Ritva',
            scholarNameHebrew: 'ריטב״א',
            description: 'Context is Everything',
            rootNode: {
                id: 'ritva-root',
                type: LogicType.STATEMENT,
                era: Era.RISHON,
                speaker: 'Ritva (Kid 6a)',
                hebrewText: 'במאי עסקינן? אילימא בשאין מדבר עמה על עסקי גיטה וקידושיה... אלא כגון שהיה מדבר עמה על עסקי קידושיה, ונתן לה ולא פירש. התם ודאי קידושין אינון, דלדידהו לישני דמוכחי נינהו... וכיון דהוו לישנא דקידושין הרי זו מקודשת גמורה. ואפילו בשאין מדבר עמה... חזקה הוא דידע.',
                englishText: 'Ritva explains: If they were discussing Kiddushin, and he gave money silently, it is valid. Why? Because the context makes the act explicit ("Yad Mochiach"). Even without speech, the "Chazaka" (Assumption) is that everyone knows the intent. "Harei At" is a clear idiom.',
                concepts: ['c2', 'c5'],
                children: []
            },
            analysis: {
                focus: "Role of Speech vs Context",
                chiddush: "Speech is not constitutive; it is clarificatory. If context clears it up, speech is unnecessary.",
                reasoning: "Transactions (Mamon) depend on 'Daas' (Intent). Context proves Daas."
            }
        },
        {
            id: 'seg-ran',
            scholarName: 'Ran',
            scholarNameHebrew: 'ר״ן',
            description: 'Distinction: Nedarim vs Kiddushin',
            rootNode: {
                id: 'ran-root',
                type: LogicType.REBUTTAL,
                era: Era.RISHON,
                speaker: 'Ran (Nedarim 6b)',
                hebrewText: 'שאני נדרים דאפילו בדיבור בעלמא חיילי, משא"כ בקידושין שהן צריכין איזה מעשה כסף או שטר... הלכך בקידושין איכא למימר דלא מהני יד. והא מדאמר ליה רב פפא לאביי... מכלל דס"ל לרב פפא דיש יד לקידושין.',
                englishText: 'The Ran argues: Nedarim are created solely by speech ("Dibur"), so the Torah expanded what counts as speech (Yad). Kiddushin requires an Act (Maaseh). Speech there is secondary. Therefore, partial speech ("Yad") might NOT work in Kiddushin. However, Rav Papa seems to assume there IS Yad.',
                concepts: ['c2', 'c3'],
                children: []
            },
            analysis: {
                focus: "Mechanism of Chalot (Status)",
                chiddush: "Nedarim = Chalot Dibur. Kiddushin = Chalot Maaseh.",
                reasoning: "If the mechanism differs, the rules of speech (Yad) may not transfer."
            }
        },
        {
            id: 'seg-ramban',
            scholarName: 'Ramban',
            scholarNameHebrew: 'רמב״ן',
            description: 'Dvarim Shebalev Exception',
            rootNode: {
                id: 'ramban-root',
                type: LogicType.STATEMENT,
                era: Era.RISHON,
                speaker: 'Ramban (Kid 50a)',
                hebrewText: 'אבל כל שהדברים שבלבו אינן מבטלין מעשיו אלא מקיימין כנזיר שאמר בלבי היה להיות כזה... הוו דברים. והא נמי דאמר רבא גלויי מלתא בגיטא מלתא היא... קסבר כיון שגלה דעתו אף על פי שאמר בדברים סתומים מ"מ לא הוו כדברים שבלב.',
                englishText: 'Ramban qualifies "Dvarim Shebalev": Thoughts only fail if they *cancel* an act. But if they confirm it (like Nazir), they work. Also, if there is "Gilui Daas" (Revealed Intent) even if not explicit, it is not considered "Heart words" but valid words.',
                concepts: ['c1', 'c5'],
                children: []
            },
            analysis: {
                focus: "Validating Intent",
                chiddush: "Intent that aligns with the act or is partially revealed is valid.",
                reasoning: "The rule 'Einan Dvarim' applies only when totally hidden and contradictory."
            }
        },
        {
            id: 'seg-rashba',
            scholarName: 'Rashba',
            scholarNameHebrew: 'רשב״א',
            description: 'Defining Dvarim Shebalev',
            rootNode: {
                id: 'rashba-root',
                type: LogicType.STATEMENT,
                era: Era.RISHON,
                speaker: 'Rashba (Kid 50a)',
                hebrewText: 'ואסיקנא דדברים שבלב אינן דברים. ר"ת ז"ל הקשה מהא דתנן במס\' תרומות... ותירץ דשאני התם משום דבעינן פיו ולבו שוין. אבל הכא שאומר מה שבלבו לומר אף על פי שאין לבו רוצה במה שגמר בלבו... דברים שבלב הן ואינן דברים.',
                englishText: 'Rashba addresses Rabbeinu Tam\'s question from Terumot (where intent matters). He distinguishes: In Kodshim/Nedarim, "Mouth and Heart must match". But in transactions (Kiddushin), internal reluctance ("I didn\'t really want to") is void if the external speech/act was standard. This defines "Dvarim Shebalev" as unexpressed reservations.',
                concepts: ['c1', 'c3'],
                children: []
            },
            analysis: {
                focus: "Internal vs External Will",
                chiddush: "Transactions require objective intent (manifested), not subjective desire.",
                reasoning: "Social stability requires relying on actions/words, not hidden thoughts."
            }
        }
    ],
    // PART 2: ACHRONIM (Birchas Shmuel Deep Dive)
    achronimPerspectives: [
        {
            id: 'seg-birchas-shmuel',
            scholarName: 'Birchas Shmuel',
            scholarNameHebrew: 'ברכת שמואל',
            description: 'Siman 1: Daas vs Dibur',
            rootNode: {
                id: 'bs-root',
                type: LogicType.PROOF,
                era: Era.ACHRON,
                speaker: 'Birchas Shmuel',
                hebrewText: 'יש לחקור בקידושין, אי הוי חלות דיבור כמו תרומה וקדשים ונדרים, או דנימא דבקידושין הדיבור אינו אלא לגלות על הכוונה והרצון... \nונראה דחלוק יסוד דין קידושין מדין קדשים. דבקדשים בעינן "פיו ולבו שוין" מדין דיבור, אבל בקידושין הדיבור הוא רק גילוי דעת על המעשה.',
                englishText: 'Chakira: Is Kiddushin a "Speech-Created Status" (like Vows/Offerings) or an "Act-Created Status" where speech just reveals intent? \nConclusion: They are fundamental opposites. In Kodshim, speech creates reality, so "Mouth and Heart must match". In Kiddushin, the Act creates reality, speech just clarifies "Daas". Therefore, "Yad" (Partial Speech) is harder to apply to Kiddushin because the verse creating "Yad" discusses Speech-Acts (Nedarim).',
                concepts: ['c3', 'c1', 'c2'],
                children: []
            },
            analysis: {
                focus: "Categorization of Halachic Acts",
                chiddush: "Kiddushin is a Mamon (Monetary) act, not an Issur (Prohibition) act like Nedarim.",
                reasoning: "Proof from 'Dvarim Shebalev': In Kiddushin, hidden thoughts are ignored (Act dominates). In Nedarim, hidden thoughts can invalidate (Heart dominates)."
            }
        },
        {
            id: 'seg-ra-eiger',
            scholarName: 'R. Akiva Eiger',
            scholarNameHebrew: 'רע״א',
            description: 'Sfek Sfeika in Ten Manah',
            rootNode: {
                id: 'rae-root',
                type: LogicType.QUESTION,
                era: Era.ACHRON,
                speaker: 'R\' Akiva Eiger',
                hebrewText: 'והנה הטור כתב בשם הרמ"ה בנתן הוא ואמרה היא דהוי ספק קידושין... ובמשנה למלך העלה דזהו רק אם נפרש דספיקא הוי היינו אם נתן הבעל לשם קידושין או לשם מתנה... אבל אם נפרש דהספק הוא כיון שנגמר בדיבורה הוי כי תלקח, גם עניית הבעל הן לא מהני.',
                englishText: 'R\' Akiva Eiger analyzes the doubt in "Ten Manah". Is the doubt factual (Did he mean Kiddushin?) or legal (Does her speech work?). If legal, maybe his answering "Yes" doesn\'t help! He connects this to a Double Doubt (Sfek Sfeika) regarding intent vs. formal speech.',
                concepts: ['c2', 'c1'],
                children: []
            },
            analysis: {
                focus: "Analyzing the Safek",
                chiddush: "The definition of the doubt determines if we can be lenient or strict.",
                reasoning: "Legal doubts regarding mechanism (Kicha) are harder to resolve than factual doubts regarding intent."
            }
        },
        {
            id: 'seg-chasam-sofer',
            scholarName: 'Chasam Sofer',
            scholarNameHebrew: 'חתם סופר',
            description: 'Ambiguity of "Li"',
            rootNode: {
                id: 'cs-root',
                type: LogicType.STATEMENT,
                era: Era.ACHRON,
                speaker: 'Chasam Sofer (Ned 4b)',
                hebrewText: 'והנה האומר הרי את מקודשת ואינו אומר לי מבואר בש"ע סי\' כ"ז דמעיקר הדין אין כאן בית מיחוש אלא שרמ"א הגיה שיש מחמירים... ולהנ"ל קשה הא בלא לי נמי לא הוה אפילו יד ואפ"ה הוה בעי למימר דמקודשת.',
                englishText: 'Discusses the Shulchan Aruch regarding saying "Mekudeshes" without "Li" (to me). Primarily it should be valid, but Rema is strict. Chasam Sofer questions this based on the Gemara: if "Li" is missing, is it even a "Yad" (Handle)? It should be valid based on context.',
                concepts: ['c2'],
                children: []
            },
            analysis: {
                focus: "Minimal Speech Requirements",
                chiddush: "Even omitting 'Li' might be valid if context exists, contradicting the need for a 'Yad'.",
                reasoning: "The essence is the intent (Daas), not the formula."
            }
        },
        {
            id: 'seg-pnei-yehoshua',
            scholarName: 'Pnei Yehoshua',
            scholarNameHebrew: 'פני יהושע',
            description: 'Rav Papa\'s Question on Yad',
            rootNode: {
                id: 'py-root',
                type: LogicType.QUESTION,
                era: Era.ACHRON,
                speaker: 'Pnei Yehoshua (Kid 5a)',
                hebrewText: 'שם אמר ליה רב פפא לאביי למימרא דסבר שמואל ידים שאין מוכיחות כו\'. וקשיא לי מאי קס"ד דרב פפא דשמואל בדלא אמר לי איירי הא רב פפא גופא איבעיא ליה בפ"ק דנדרים אי יש יד לקידושין.',
                englishText: 'Pnei Yehoshua asks a contradiction: Rav Papa here assumes Shmuel holds "Yad" works (or doesn\'t). But in Nedarim, Rav Papa himself asks if "Yad" even exists for Kiddushin! He resolves it by distinguishing between "Yad" for the object (Hekdesh) vs. the act.',
                concepts: ['c2'],
                children: []
            },
            analysis: {
                focus: "Consistency of Talmudic Sages",
                chiddush: "Distinction between types of Yad.",
                reasoning: "Rav Papa's doubt in Nedarim is fundamental, while here he analyzes Shmuel's specific case."
            }
        },
        {
            id: 'seg-avnei-miluim',
            scholarName: 'Avnei Miluim',
            scholarNameHebrew: 'אבני מילואים',
            description: 'Role of Witnesses',
            rootNode: {
                id: 'am-root',
                type: LogicType.STATEMENT,
                era: Era.ACHRON,
                speaker: 'Avnei Miluim (27:6)',
                hebrewText: 'אם הבינה דבריו... ומשמע דאפי\' אין העדים יודעין אם הבינה הוי קידושי ודאי... ואפשר כיון דעיקר הקידושין מצד המקדש... אבל רצון האשה לא בעי עדים וסגי בהודאתה.',
                englishText: 'Avnei Miluim asserts that witnesses are required for the Act of the husband, but not necessarily for the Consent of the wife. If she admits she understood, it is valid even if witnesses didn\'t know her mind. This relies on the idea that "Kicha" (Taking) is the primary act.',
                concepts: ['c1'],
                children: []
            },
            analysis: {
                focus: "Witness Requirement Scope",
                chiddush: "Edim (Witnesses) are for the Maaseh (Act), not the Daas (Intent) of the recipient.",
                reasoning: "Kiddushin is a unilateral act of acquisition by the man, requiring only consent (not active acquisition) from the woman."
            }
        }
    ],
    analysis: [
        { id: 'kid6b-ana-1', category: 'CASE', title: 'Ten Manah Ambiguity', description: 'Ambiguous speech during money transfer.', refId: 'gemara-kid5b' },
        { id: 'kid6b-ana-2', category: 'LAW', title: 'Yad (Handle)', description: 'Can partial speech create a valid Kiddushin?', refId: 'gemara-nedarim6b' },
        { id: 'kid6b-ana-3', category: 'FACTOR', title: 'Dvarim Shebalev', description: 'Conflict between external act and internal intent.', refId: 'gemara-kid49b' },
        { id: 'kid6b-ana-4', category: 'SOURCE', title: 'Nedarim vs Kiddushin', description: 'Comparison of legal mechanisms (Speech vs Act).', refId: 'bs-root' },
    ],
    psakChain: [
        { 
            id: 'psak-kid6b-1', 
            authority: 'Shulchan Aruch', 
            citation: 'Even HaEzer 27', 
            text: 'המקדש בלא דיבור, או בדיבור שאינו מפורש - הרי זו ספק מקודשת.', 
            ruling: 'Kiddushin without explicit speech or with ambiguous speech results in "Safek Mekudeshes" (Doubtful Betrothal).', 
            basedOn: ['gemara-nedarim6b'] 
        },
        { 
            id: 'psak-kid6b-2', 
            authority: 'Rema', 
            citation: 'Even HaEzer 42', 
            text: 'דברים שבלב אינם דברים, ואפילו ידענו שבלבו לא היה כן, בטלה מחשבתו אצל מעשהו.', 
            ruling: 'Thoughts in the heart are nothing. Even if we know his heart meant otherwise, his thought is nullified by his deed.', 
            basedOn: ['gemara-kid49b'] 
        }
    ],
    shulchanAruch: {
        siman: "כז",
        seif: "א",
        mainText: [
            { type: 'MECHABER', text: "המקדש, צריך שיאמר לה בשעת מתן כסף או שטר: הרי את מקודשת לי... אבל אם נתן לה ולא אמר כלום, אף על פי שהיו עסוקים באותו ענין - הרי זו ספק מקודשת.", translation: "One who betroths must say at the time of giving: 'Behold you are betrothed to me'. But if he gave and said nothing, even if they were discussing the topic - she is doubtfully betrothed." },
            { type: 'REMA', text: "ויש אומרים דהוי קידושין ודאי (רמב'ם). והכי נהוג להחמיר.", translation: "Some say it is definite Kiddushin (Rambam). And such is the custom to be strict." }
        ],
        mishnaBrura: [
            { id: 'mb-1', noteChar: 'א', text: "ספק מקודשת - משום דמספקא לן בגמרא אי הוי ידים או לא.", translation: "Doubtfully betrothed - Because the Gemara is in doubt whether 'Yad' (Partial Speech) works." },
            { id: 'mb-2', noteChar: 'ב', text: "עסוקים באותו ענין - זהו רק כשהוכיח סופו על תחילתו.", translation: "Discussing the topic - This helps only if the end proves the beginning." }
        ],
        shulchanAruchHarav: [
            { id: 'sh-1', text: "ביאור הגר\"א: דברי הרמב\"ם עיקר, שכיון שעסוקים בעניין, הרי זה כפירוש דמי.", translation: "Biur HaGra: The Rambam is primary, since they are discussing the matter, it is considered as if explicitly stated." }
        ]
    },
    logicSystem: {
        statements: [
            { text: 'אומר אהא הרי זה נזיר', type: 'Premise 1', color: 'blue', analysis: { subject: 'Nazir', predicate: 'Valid via Yad', statementType: 'Source Case', reason: 'Torah amplifies speech in Nedarim' } },
            { text: 'יש יד לקידושין', type: 'Hypothesis', color: 'amber', analysis: { subject: 'Kiddushin', predicate: 'Valid via Yad?', statementType: 'Inquiry', reason: 'Compare to Nedarim or Transactions?' } },
            { text: 'דברים שבלב אינם דברים', type: 'Principle', color: 'green', analysis: { subject: 'Intent', predicate: 'Void vs Act', statementType: 'Rule', reason: 'Maaseh (Act) is stronger than Daas (Thought)' } }
        ],
        syllogism: {
            premise1: 'In Nedarim, speech creates the status, so implied speech (Yad) is sufficient (Piv V\'Libo Shavin).',
            premise2: 'In Kiddushin, the Act creates the status, and speech merely reveals intent (Gilui Daas).',
            conclusion: 'Therefore, strict laws of Speech (Yad) from Nedarim might not apply to Kiddushin; Context/Act might be enough (or insufficient depending on the Safek).'
        }
    },
    modernAnalysis: [
        { 
            id: 'ma-1', 
            title: 'Click-Wrap Agreements', 
            scenario: 'Clicking "I Agree" without reading terms. Is the "Act" of clicking binding even if the "Heart" (Intent) didn\'t know the terms?', 
            parallels: 'Dvarim Shebalev. The external act creates the legal bond, ignoring internal lack of intent.', 
            ruling: 'Binding.',
            deepAnalysis: {
                yesod: 'Does the Act define the legal reality (Maaseh) or does the Intent (Daas)?',
                perspectives: [
                    { 
                        authority: 'Rava (Dvarim Shebalev)', 
                        logic: 'The act of clicking is an objective acceptance. "Words in the heart" (I didn\'t mean it) are void.', 
                        outcome: 'Valid Contract.' 
                    },
                    { 
                        authority: 'Ramban (Umdana)', 
                        logic: 'If it is an Umdana (Universal Assumption) that nobody reads these, perhaps there is no Daas.', 
                        outcome: 'Possible invalidation if proven lack of Daas is universal.' 
                    }
                ]
            }
        },
        { 
            id: 'ma-2', 
            title: 'Venmo "Pizza" Memo', 
            scenario: 'Sending money with a vague emoji or memo. Does the context (previous text messages) define the transfer as a Loan or Gift?', 
            parallels: 'Yad & Asukin B\'Oto Inyan (Discussing the topic).', 
            ruling: 'Context determines validity.',
            deepAnalysis: {
                yesod: 'Is explicit speech required for transaction definition, or does context suffice?',
                perspectives: [
                    { 
                        authority: 'Ritva (Context)', 
                        logic: 'If they were discussing the loan previously, the transfer is defined by that context ("Muchach").', 
                        outcome: 'Defined as Loan.' 
                    },
                    { 
                        authority: 'Shmuel (Strict Yad)', 
                        logic: 'If the memo is ambiguous ("Pizza emoji"), maybe it fails to define the money as a loan repayment.', 
                        outcome: 'Ambiguous.' 
                    }
                ]
            }
        }
    ],
    visualFlow: [
        { id: 'vf-1', label: 'Man gives Money', type: 'ACTION', status: 'NEUTRAL', description: 'Maaseh Netina occurs.' },
        { 
            id: 'vf-2', 
            label: 'Did he Speak?', 
            type: 'QUESTION', 
            status: 'NEUTRAL', 
            branches: [
                { id: 'vf-3a', label: 'Yes: "Mekudeshes"', type: 'RESULT', status: 'VALID', description: 'Valid Kiddushin.' },
                { 
                    id: 'vf-3b', 
                    label: 'No (Silence)', 
                    type: 'QUESTION', 
                    status: 'DISPUTED',
                    description: 'Were they discussing Kiddushin?',
                    branches: [
                        { id: 'vf-4a', label: 'Yes (Asukin)', type: 'RESULT', status: 'VALID', description: 'Valid acc to Ritva/Rambam (Context).' },
                        { id: 'vf-4b', label: 'No', type: 'RESULT', status: 'INVALID', description: 'Invalid (Ambiguous).' }
                    ]
                },
                {
                    id: 'vf-3c',
                    label: 'Partial ("Yad")',
                    type: 'QUESTION',
                    status: 'DISPUTED',
                    description: 'Said "Harei At..." (unfinished).',
                    branches: [
                        { id: 'vf-5a', label: 'Like Nedarim?', type: 'DECISION', status: 'INVALID', description: 'Safek (Rav Papa). Comparison to Vows is unclear.' }
                    ]
                }
            ]
        }
    ]
};

// Fallback & Mock Assignments
export const MOCK_SUGYA = KID_6B_DEEP_DATA;

export const AVAILABLE_SUGYAS = [
    {
        id: 'kid-6b-deep',
        title: 'Kiddushin: Speech & Intent',
        masechta: 'Kiddushin',
        masechtaHebrew: 'קידושין',
        daf: '5b',
        description: 'Analysis of Yad, Dvarim Shebalev, and the definition of Maaseh Kiddushin vs Nedarim.',
        color: 'bg-slate-900',
        hasContent: true,
        data: KID_6B_DEEP_DATA
    }
];

// Navigation Data Structures
export const SEDARIM = [
    { id: 'zeraim', hebrew: 'זרעים', english: 'Zeraim', description: 'Agricultural Laws' },
    { id: 'moed', hebrew: 'מועד', english: 'Moed', description: 'Festivals & Shabbat' },
    { id: 'nashim', hebrew: 'נשים', english: 'Nashim', description: 'Family Law' },
    { id: 'nezikin', hebrew: 'נזיקין', english: 'Nezikin', description: 'Civil & Criminal Law' },
    { id: 'kodshim', hebrew: 'קדשים', english: 'Kodshim', description: 'Sacrificial Service' },
    { id: 'tahorot', hebrew: 'טהרות', english: 'Tahorot', description: 'Ritual Purity' },
];

export const MESECHTOS: Record<string, string[]> = {
    'nashim': ['Kiddushin', 'Gittin', 'Ketubot', 'Yevamot', 'Nedarim', 'Nazir', 'Sota'],
    'nezikin': ['Bava Kamma', 'Bava Metzia', 'Bava Basra', 'Sanhedrin', 'Makkot', 'Shevuot'],
    // Mock data for others
    'zeraim': ['Berakhot'], 
    'moed': ['Shabbat'],
    'kodshim': ['Zevachim'],
    'tahorot': ['Niddah']
};

export const TURIM = [
    { id: 'oc', hebrew: 'אורח חיים', english: 'Orach Chaim', description: 'Daily Life, Prayer', color: 'bg-blue-800' },
    { id: 'yd', hebrew: 'יורה דעה', english: 'Yoreh Deah', description: 'Dietary Laws', color: 'bg-red-800' },
    { id: 'eh', hebrew: 'אבן העזר', english: 'Even HaEzer', description: 'Marriage, Divorce', color: 'bg-purple-800' },
    { id: 'cm', hebrew: 'חושן משפט', english: 'Choshen Mishpat', description: 'Civil Law', color: 'bg-amber-800' },
];

// Mock Simanim for Halacha Mode
export const SIMANIM_MOCK: Record<string, {id: string, label: string, desc: string, linkedSugyaId?: string}[]> = {
    'eh': [
        { id: '27', label: 'Siman 27', desc: 'Laws of Kiddushin Acts & Intent', linkedSugyaId: 'kid-6b-deep' }
    ]
};
