
import { SugyaSection, Concept } from './types';
import { 
    RITVA_FULL, RASHBA_FULL, RAN_FULL, RAMBAM_FULL, RAMBAN_FULL,
    RAMBAM_NEZIRUT, RAMBAM_NEDARIM, RAMBAM_ISHUS, RAMBAM_OTHER,
    SHITA_MEKUBETZET, RAVED, TOSFOS_NEDARIM, TOSFOS_YESHANIM, RASHBA_KID5B, RAN_PESACHIM_FULL
} from './data/rishonim/Kiddushin5b';
import { 
    BIRCHAS_SHMUEL_FULL, PNEI_YEHOSHUA_FULL, CHASAM_SOFER_FULL, RA_EIGER_FULL
} from './data/achronim/Kiddushin5b_Part1';
import { 
    MAHARSHDAM_FULL, AVNEI_MILUIM_FULL, LECHEM_MISHNA, CHEMDAS_SHLOMO
} from './data/achronim/Kiddushin5b_Part2';
import { RELATED_SUGYAS } from './data/related/Kiddushin5b';
import { KIDDUSHIN_5B_SEGMENTS } from './data/gemara/Kiddushin5b';
import { KIDDUSHIN_GUIDE } from './data/guide/Kiddushin5b';
import { CHUMASH_DEVARIM_24_1, MISHNA_KIDDUSHIN_CONTEXT } from './data/primary/KiddushinSources';

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
// SUGYA: KIDDUSHIN 5B - MAASEH KIDDUSHIN
// ==========================================

const KID_6B_DEEP_DATA: SugyaSection = {
    id: 'kid-6b-deep',
    title: 'Kiddushin: Speech & Intent',
    sourceRef: 'Kiddushin 5b-6a',
    guide: KIDDUSHIN_GUIDE,
    resources: {
        videoUrl: "https://www2.kolhalashon.com/en/regularSite/playShiur/41836819/-1/0/false",
        pdfUrl: "https://www2.kolhalashon.com/regularSite/playShiur/41836825"
    },
    chumashText: CHUMASH_DEVARIM_24_1,
    mishnaContext: MISHNA_KIDDUSHIN_CONTEXT,
    baseText: {
        id: 'gemara-kid5b',
        type: 'STATEMENT' as any,
        era: 'AMORA' as any,
        speaker: 'Gemara Kiddushin 5b',
        hebrewText: 'ת"ר כיצד בכסף...',
        englishText: 'Our Rabbis taught...',
        concepts: ['c2', 'c3'],
        children: []
    },
    dafStructure: KIDDUSHIN_5B_SEGMENTS, 
    relatedSources: RELATED_SUGYAS,
    perspectives: [
        RITVA_FULL,
        RASHBA_FULL,
        RAN_FULL,
        RAN_PESACHIM_FULL,
        RAMBAM_FULL,
        RAMBAM_NEZIRUT,
        RAMBAM_NEDARIM,
        RAMBAM_ISHUS,
        RAMBAM_OTHER,
        RAMBAN_FULL,
        SHITA_MEKUBETZET,
        RAVED,
        TOSFOS_NEDARIM,
        TOSFOS_YESHANIM,
        RASHBA_KID5B
    ],
    achronimPerspectives: [
        BIRCHAS_SHMUEL_FULL,
        RA_EIGER_FULL,
        PNEI_YEHOSHUA_FULL,
        CHASAM_SOFER_FULL,
        MAHARSHDAM_FULL,
        AVNEI_MILUIM_FULL,
        LECHEM_MISHNA,
        CHEMDAS_SHLOMO
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

export const SIMANIM_MOCK: Record<string, {id: string, label: string, desc: string, linkedSugyaId?: string}[]> = {
    'eh': [
        { id: '27', label: 'Siman 27', desc: 'Laws of Kiddushin Acts & Intent', linkedSugyaId: 'kid-6b-deep' }
    ]
};
