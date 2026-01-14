
import { GuideStep, StudyStage } from '../../types';

export const KIDDUSHIN_GUIDE: GuideStep[] = [
    // --- INTRO & SOURCES ---
    {
        id: 'step-0',
        title: 'Introduction',
        description: 'The Sugya of Maaseh Kiddushin',
        stage: StudyStage.INTRO,
        deepDive: 'This Sugya explores the mechanics of how a Jewish marriage is effected. Unlike a purchase of an object, Kiddushin creates a change in personal status (Ishus). The core tension we will explore is: Does the status change happen via the "Exchange of Value" (Maaseh Kinyan) or the "Expression of Intent" (Dibur)? This distinction will ripple through every opinion we study.',
        keyTerms: ['Kiddushin', 'Kinyan', 'Dibur', 'Maaseh']
    },
    {
        id: 'step-chumash',
        title: 'Biblical Source',
        description: 'Devarim 24:1 - "Ki Yikach"',
        stage: StudyStage.SOURCE_TEXT,
        targetId: 'CHUMASH', 
        deepDive: 'The Torah establishes marriage with the phrase "Ki Yikach" (When a man takes). The Sages derive via a "Gezeirah Shavah" (Verbal Analogy) from the field of Ephron that "Taking" implies "Money". Crucially, the verse positions the man as the active "Taker". This creates a fundamental rule: The man must generate the acquisition.',
        keyTerms: ['Ki Yikach', 'Gezeirah Shavah', 'Keseph']
    },
    {
        id: 'step-mishna',
        title: 'Mishna Context',
        description: 'Kiddushin 2a - Nikneit',
        stage: StudyStage.SOURCE_TEXT,
        targetId: 'MISHNA',
        deepDive: 'The Mishna opens with "A woman is Acquired (Nikneit)". Note the financial language. It does not say "Mekudeshes" (Sanctified). This frames our Sugya: We are dealing with a legal acquisition. The means are Money, Deed, or Relations. Our focus today is solely on Money (Keseph).',
        keyTerms: ['Nikneit', 'Peruta', 'Dinar']
    },
    
    // --- GEMARA: THE CORE DEBATE ---
    {
        id: 'step-gemara-1',
        title: 'The Basic Case',
        description: 'He Gave, He Spoke',
        stage: StudyStage.SOURCE_TEXT,
        targetId: 'kid-5b-seg1',
        deepDive: 'Gemara 5b presents the classic valid case: The man gives the money (Action) and the man says the words "Harei At..." (Intent). This aligns perfectly with "Ki Yikach" - he is the active party in both deed and word.',
        nuance: 'Both components (Speech and Act) come from the man.'
    },
    {
        id: 'step-gemara-2',
        title: 'Reversing Roles',
        description: 'She Gave, She Spoke',
        stage: StudyStage.SOURCE_TEXT,
        targetId: 'kid-5b-seg1',
        deepDive: 'What if we reverse it? She gives the money and she proposes. The Gemara immediately invalidates this. Why? Because the Torah said "When a man takes", not "When a woman takes". She cannot be the acquirer of the husband.',
        keyTerms: ['Ki Yikach', 'Ki Tikach']
    },
    {
        id: 'step-gemara-3',
        title: 'The Hybrid Case',
        description: 'He Gave, She Spoke',
        stage: StudyStage.SOURCE_TEXT,
        targetId: 'kid-5b-seg3',
        deepDive: 'Here is the complex case: He gives the money (so he is the "Taker" in action), but She says the words (so she defines the intent). Is this valid? The Gemara concludes it is a "Safek" (Doubt). We are unsure if her speech is enough to define his action, or if his silence implies he is being "Taken" by her.',
        keyTerms: ['Safek Kiddushin', 'Chumra d\'Rabanan']
    },

    // --- GEMARA: SHMUEL & RAV PAPA ---
    {
        id: 'step-gemara-4',
        title: 'Shmuel\'s Ruling',
        description: 'Valid Formulas',
        stage: StudyStage.SOURCE_TEXT,
        targetId: 'kid-5b-seg4',
        deepDive: 'Shmuel lists valid phrases: "Harei At Mekudeshes" (Behold you are sanctified). He omits the word "Li" (to me) in some examples. This implies that even a partial sentence might work.',
        keyTerms: ['Harei At', 'Li']
    },
    {
        id: 'step-gemara-5',
        title: 'Rav Papa\'s Challenge',
        description: 'Yadayim (Handles)',
        stage: StudyStage.SOURCE_TEXT,
        targetId: 'kid-5b-seg5',
        deepDive: 'Rav Papa attacks Shmuel\'s omission. If he didn\'t say "To Me", the sentence is ambiguous! Does Shmuel hold that "Ambiguous Handles" (Yadayim She\'einan Mochiachot) are valid? He brings a contradiction from Nazir, where Shmuel seems to require context.',
        keyTerms: ['Yadayim', 'Yad Mochiach', 'Yad She\'eino Mochiach']
    },
    {
        id: 'step-gemara-6',
        title: 'The Nazir Comparison',
        description: '"Aha" (I will be)',
        stage: StudyStage.SOURCE_TEXT,
        targetId: 'kid-5b-seg5',
        deepDive: 'In Nazir, simply saying "I will be" (Aha) is meaningless unless a Nazir is passing by. This proves that for a partial sentence to work, the Context must "Prove" the intent. Rav Papa argues Kiddushin should be the same.',
        keyTerms: ['Nazir Over Lefanav', 'Aha']
    },
    {
        id: 'step-gemara-7',
        title: 'Shmuel\'s Defense',
        description: 'Context vs. Words',
        stage: StudyStage.SOURCE_TEXT,
        targetId: 'kid-5b-seg6',
        deepDive: 'The Gemara defends Shmuel: In our case, he actually said "Li" (To Me). Or, alternatively, the context makes it clear. This leaves us with a major question: Does Kiddushin need explicit speech, or does context (Asukin) suffice?',
        keyTerms: ['Asukin B\'oto Inyan']
    },

    // --- RISHONIM: DEFINING THE MECHANISM ---
    {
        id: 'step-rish-1',
        title: 'Ritva: Context',
        description: 'Asukin B\'Oto Inyan',
        stage: StudyStage.DEPTH_RISHONIM,
        targetId: 'seg-ritva',
        deepDive: 'The Ritva deepens the concept of Context. If they were discussing marriage ("Asukin") immediately prior, he doesn\'t even need to speak! The act of giving money is interpreted by the previous conversation. Silence is valid here.',
        keyTerms: ['Asukin', 'Shtika']
    },
    {
        id: 'step-rish-2',
        title: 'Rambam: The Law',
        description: 'Silence is Golden?',
        stage: StudyStage.DEPTH_RISHONIM,
        targetId: 'seg-rambam-main',
        deepDive: 'Rambam codifies this: If they were busy with the topic, and he gave money silently, she is betrothed. This implies that Speech is merely a tool to reveal intent (Gilui Daas). If intent is revealed by context, speech is superfluous.',
        nuance: 'This aligns with Kiddushin being a Kinyan (Action) based mechanism.'
    },
    {
        id: 'step-rish-3',
        title: 'Rashba: Hidden Intent',
        description: 'Dvarim Shebalev',
        stage: StudyStage.DEPTH_RISHONIM,
        targetId: 'seg-rashba',
        deepDive: 'Rashba asks a fundamental question: What if he said the words, but in his heart he meant something else? He establishes the rule: "Words in the Heart are nothing." We follow the external expression. In social transactions, we cannot judge thoughts, only actions.',
        keyTerms: ['Dvarim Shebalev', 'Einan Devarim']
    },
    {
        id: 'step-rish-4',
        title: 'Ramban: Interpretation',
        description: 'Clarifying vs. Contradicting',
        stage: StudyStage.DEPTH_RISHONIM,
        targetId: 'seg-ramban',
        deepDive: 'Ramban distinguishes: You can\'t use hidden thought to *cancel* an explicit act (like Rashba said), but you CAN use hidden thought to *interpret* an ambiguous one (like the Nazir case). If the words are vague ("Aha"), the heart can define them.',
        nuance: 'Heart as Interpreter vs Heart as Destroyer.'
    },
    {
        id: 'step-rish-5',
        title: 'Ran: Nedarim vs Kiddushin',
        description: 'Speech vs. Action',
        stage: StudyStage.DEPTH_RISHONIM,
        targetId: 'seg-ran',
        deepDive: 'The Ran (on Nedarim) argues there is a fundamental difference between Vows and Marriage. Nedarim is a creation of Speech ("Chalot Dibur"). Kiddushin is a creation of Action ("Chalot Maaseh"). Therefore, the laws of "Yad" (extending speech) might not even apply to Kiddushin!',
        keyTerms: ['Chalot Dibur', 'Chalot Maaseh']
    },
    {
        id: 'step-rish-6',
        title: 'Tosfos: The "Li" Problem',
        description: 'Is "Li" Critical?',
        stage: StudyStage.DEPTH_RISHONIM,
        targetId: 'seg-tosfos-nedarim',
        deepDive: 'Tosfos argues that omitting "To Me" (Li) is a "Bad Handle" (Yad Garua). Why? Because a man can betroth a woman for his friend! Therefore, saying "You are betrothed" is too ambiguous without the word "Li". It shouldn\'t work without context.',
        keyTerms: ['Yad Garua']
    },
    {
        id: 'step-rish-7',
        title: 'Rashba: Her Role',
        description: 'He Gave, She Spoke',
        stage: StudyStage.DEPTH_RISHONIM,
        targetId: 'seg-rashba-kid5b',
        deepDive: 'Back to the Gemara\'s doubt of "He gave, She spoke". Why is it only a doubt? Rashba explains: We need his intent to marry *via this specific money*. If she proposes, maybe he is just giving the money as a gift to silence her! We lack proof of his specific intent.',
        keyTerms: ['Retzuy', 'Shtika']
    },

    // --- ACHRONIM: DEEP ANALYSIS ---
    {
        id: 'step-ach-1',
        title: 'Birchas Shmuel',
        description: 'Mechanism of Kiddushin',
        stage: StudyStage.DEPTH_ACHRONIM,
        targetId: 'seg-birchas-shmuel',
        deepDive: 'Birchas Shmuel (Siman 1) revolutionizes the understanding. In Nedarim, speech creates reality. In Kiddushin, the Act creates reality, and speech just *defines* it. Therefore, "Yad" (extending speech) isn\'t the right mechanic for Kiddushin. We rely on "Daas" (Intent), not formal "Dibur" (Speech).',
        keyTerms: ['Daas vs Dibur']
    },
    {
        id: 'step-ach-2',
        title: 'Pnei Yehoshua',
        description: 'Rav Papa\'s Consistency',
        stage: StudyStage.DEPTH_ACHRONIM,
        targetId: 'seg-pnei-yehoshua',
        deepDive: 'He reconciles Rav Papa\'s questions in Kiddushin vs Nedarim. Rav Papa isn\'t unsure if Handles exist, but whether Kiddushin behaves like Hekdesh (Sanctified Property) or a mere Transaction. If it\'s like Hekdesh, speech has more power.',
        keyTerms: ['Hekdesh']
    },
    {
        id: 'step-ach-3',
        title: 'Chasam Sofer',
        description: 'Context is King',
        stage: StudyStage.DEPTH_ACHRONIM,
        targetId: 'seg-chasam-sofer',
        deepDive: 'Chasam Sofer argues that ultimately, intent (Daas) is what matters. If the context ("Aha" or Asukin) makes the intent clear, technical flaws in speech ("Yad") are irrelevant. He pushes for a Daas-centric model.',
        nuance: 'Validates the Ritva.'
    },
    {
        id: 'step-ach-4',
        title: 'R. Akiva Eiger',
        description: 'Defining the Doubt',
        stage: StudyStage.DEPTH_ACHRONIM,
        targetId: 'seg-ra-eiger',
        deepDive: 'Why is "He Gave, She Spoke" a doubt? R. Akiva Eiger suggests it\'s not about missing intent, but a scriptural decree: "Ki Yikach" - He must be the active taker. If she proposes, she looks like the "Taker". The doubt is formal, not mental.',
        keyTerms: ['Ki Yikach']
    },
    {
        id: 'step-ach-5',
        title: 'Avnei Miluim',
        description: 'Does She Need Witnesses?',
        stage: StudyStage.DEPTH_ACHRONIM,
        targetId: 'seg-avnei-miluim',
        deepDive: 'A novel point: The husband needs witnesses for his act because he creates the prohibition (Ervah). The woman just needs to consent. Her consent doesn\'t create the legal bond, it just *allows* it. Therefore, her silence or internal intent is treated differently than his.',
        keyTerms: ['Edim', 'Heskem']
    },
    {
        id: 'step-ach-6',
        title: 'Maharshdam',
        description: 'The Lemon Case',
        stage: StudyStage.DEPTH_ACHRONIM,
        targetId: 'seg-maharshdam',
        deepDive: 'A famous practical application: A man gave lemons saying "For Kiddushin" but didn\'t say "To Me". Maharshdam rules it valid because the context (they were engaged/Meshudachim) fills the gap. This proves "Li" is not an absolute requirement if Daas is present.',
        keyTerms: ['Meshudachim', 'Umdana']
    },
    {
        id: 'step-ach-7',
        title: 'Chemdas Shlomo',
        description: 'Disgraceful Kiddushin',
        stage: StudyStage.DEPTH_ACHRONIM,
        targetId: 'seg-chemdas-shlomo',
        deepDive: 'A case where a woman threw the money down. Even though normally silence/action works, here her action proved she rejected it. Context works both ways - it can validate a partial act, or invalidate a seemingly good one.',
        keyTerms: ['Shtika', 'Mecha\'ah']
    },

    // --- HALACHA ---
    {
        id: 'step-psak-1',
        title: 'Shulchan Aruch',
        description: 'Siman 27:1',
        stage: StudyStage.PSAK,
        targetId: 'psak-kid6b-1',
        deepDive: 'The final ruling in Shulchan Aruch (EH 27:1): One must say "Harei At...". If he gave silently but they were "Asukin" (discussing it), it is valid. However, if she proposed ("He gave, She spoke"), it remains a Safek (Doubtful), requiring a Get out of doubt.',
        keyTerms: ['Safek Mekudeshes']
    },
    {
        id: 'step-psak-2',
        title: 'Rema\'s Note',
        description: 'Strictness',
        stage: StudyStage.PSAK,
        targetId: 'psak-kid6b-2',
        deepDive: 'The Rema adds that we are strict regarding "Dvarim Shebalev" (Internal Intent). We follow the external action. This solidifies the "Objective" nature of Jewish commercial and personal law.',
        keyTerms: ['Chumra']
    },

    // --- SUMMARY ---
    {
        id: 'step-summary',
        title: 'Conclusion',
        description: 'Synthesis',
        stage: StudyStage.ANALYSIS,
        targetId: 'summary',
        deepDive: 'We have traveled from the Chumash\'s "Taking", through the Gemara\'s linguistic analysis, to the Rishonim\'s debate on Speech vs. Act, and the practical rulings of the Achronim. The core tension remains: Is Kiddushin a ritual of speech (like Vows) or a transaction of intent (like Sales)? The consensus leans towards Transaction, where Context guides the definition of the Act.',
        keyTerms: ['Synthesis']
    }
];
