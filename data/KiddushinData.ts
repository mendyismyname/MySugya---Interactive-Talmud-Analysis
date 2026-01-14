
import { LogicNode, LogicType, Era, Perspective } from '../types';

// --- RELATED GEMARA SUGYAS (Context Sources) ---

export const NAZIR_2A_SOURCE: LogicNode = {
    id: 'source-nazir2a',
    type: LogicType.SOURCE,
    era: Era.AMORA,
    speaker: 'Nazir 2a-2b',
    hebrewText: 'מתני\': הריני נזיר... האומר אהא הרי זה נזיר.\nגמ\': ודילמא אהא בתענית קאמר? אמר שמואל: כגון שהיה נזיר עובר לפניו.\nלימא קסבר שמואל ידים שאינן מוכיחות הויין ידים? ... ודלמא לפוטרו מן קרבנותיו קאמר? אלא דקאמר בלבו.\nאי הכי מאי למימרא? מהו דתימא בעינן פיו ולבו שוין קמ"ל.',
    englishText: 'Mishna: "I am a Nazir"... One who says "Ah\'a" (I will be) is a Nazir. \nGemara: Perhaps he meant "I will be fasting"? Shmuel says: It refers to a case where a Nazir was passing in front of him. \nChallenge: Does Shmuel hold that ambiguous handles (Yadayim She\'einan Mochiachot) are valid?... Perhaps he meant "I will be paying for his sacrifices"? \nConclusion: Rather, he also resolved in his heart. \nNovelty: You might have thought "Mouth and Heart must match" explicitly (like Shevuot), so it teaches us this context suffices.',
    concepts: ['c1', 'c3'],
    children: []
};

export const SHEVUOT_26B_SOURCE: LogicNode = {
    id: 'source-shevuot26b',
    type: LogicType.SOURCE,
    era: Era.AMORA,
    speaker: 'Shevuot 26b',
    hebrewText: 'אמר שמואל: גמר בלבו צריך שיוציא בשפתיו, שנאמר "לבטא בשפתים".\nמיתיבי: "בשפתים" ולא בלב? גמר בלבו מנין? ת"ל "לכל אשר יבטא"... הא לא קשיא: הכי קאמר, בשפתים - ולא שגמר בלבו להוציא בשפתיו ולא הוציא.',
    englishText: 'Shmuel says: If he resolved in his heart, he must express it with his lips, as it says "To express with lips". \nQuestion: But verses imply heart suffices? \nAnswer: The verse excludes one who planned to speak but didn\'t. Internal resolution alone is not binding for Oaths (unlike Kodshim).',
    concepts: ['c3'],
    children: []
};

export const NEDARIM_6B_SOURCE: LogicNode = {
    id: 'source-nedarim6b',
    type: LogicType.SOURCE,
    era: Era.AMORA,
    speaker: 'Nedarim 6b',
    hebrewText: 'בעי רב פפא: יש יד לקידושין או לא? היכי דמי? אילימא דאמר לה לאשה הרי את מקודשת לי ואמר לחבירתה ואת נמי פשיטא היינו קידושין עצמן.\nאלא כגון דאמר לה לאשה הרי את מקודשת לי ואמר לה לחבירתה "ואת". מי אמרינן ואת נמי אמר לה לחבירתה ותפסי בה קידושין... או דלמא "ואת חזאי" אמר לה לחבירתה.\nומי מיבעי ליה לרב פפא? והא מדאמר ליה רב פפא לאביי מי סבר שמואל ידים שאין מוכיחות הויין ידים? מכלל דסבירא ליה לרב פפא דיש יד לקידושין.',
    englishText: 'Rav Papa asks: Is there "Yad" (Handle) for Kiddushin? \nCase: He betrothed one woman and said to her friend "And you". Did he mean "And you also" (Valid), or "And you watch" (Invalid)? \nContradiction: But didn\'t Rav Papa ask Shmuel (in Kiddushin 5b) about "Ambiguous Hands"? That implies he assumes Handles DO exist for Kiddushin!',
    concepts: ['c2', 'c1'],
    children: []
};

// --- RISHONIM (Full Texts) ---

export const RASHBA_FULL: Perspective = {
    id: 'seg-rashba',
    scholarName: 'Rashba',
    scholarNameHebrew: 'חידושי הרשב״א',
    description: 'Kiddushin 50a - Dvarim Shebalev',
    rootNode: {
        id: 'rashba-root',
        type: LogicType.REBUTTAL,
        era: Era.RISHON,
        speaker: 'Rashba (Kid 50a)',
        hebrewText: `והקשה ר"ת ז"ל מהא דתנן במס' תרומות פ"ג נתכוון לומר עולה ואמר שלמים שלמים ואמר עולה לא אמר ולא כלום... משום דבעינן פיו ולבו שוין, וכדאמרי' במס' שבועות (כ"ו ב') נתכוון להוציא פת חטין ואמר פת שעורין פת שעורין ואמר פת חטין פטור עד שיהיו פיו ולבו שוין.
ותירץ דשאני התם דטעות הוא ואין דבורו דבור דלישניה הוא דאתקיל ליה, ודומה לזה נדרי שגגות (נדרים כ"ה ב') קונם אם אכלתי ואם שתיתי ונזכר שאכל שלא הי' סבור לידור ונדר.
אבל הכא שאומר מה שבלבו לומר אף על פי שאין לבו רוצה במה שגמר בלבו להוציא בפיו דברים שבלב הן ואינן דברים. וכן במכר שדעתו למכור סתם ואמר סתם אף על פי שהיה בדעתו שאם לא יעלה לא יהא ממכרו ממכר הרי אלו דברים שבלב ואינם דברים.`,
        englishText: `Rabbeinu Tam asked from Terumot: If one meant "Olah" and said "Shelamim", it is void because "Mouth and Heart must match". How does that fit with "Words in the heart are nothing"? 
He answers: There (Terumot/Nedarim), it was a slip of the tongue (mistake). But here (Kiddushin/Sales), he said what he planned to say, but had an internal reservation ("I only sell if I move to Israel"). Since he did not express the condition, the unspoken reservation is "Dvarim Shebalev" and is void.`,
        concepts: ['c1', 'c3'],
        children: []
    },
    analysis: {
        focus: "Internal vs External Will",
        chiddush: "Transactions require objective intent (manifested), not subjective desire. A 'mistake' (slip of tongue) invalidates speech, but a 'reservation' (hidden condition) does not invalidate an act.",
        reasoning: "Social stability requires relying on actions/words, not hidden thoughts."
    }
};

export const RITVA_FULL: Perspective = {
    id: 'seg-ritva',
    scholarName: 'Ritva',
    scholarNameHebrew: 'חידושי הריטב״א',
    description: 'Kiddushin 6a - Context vs Speech',
    rootNode: {
        id: 'ritva-root',
        type: LogicType.STATEMENT,
        era: Era.RISHON,
        speaker: 'Ritva (Kiddushin 6a)',
        hebrewText: `עיקר הפירוש בזה דלא קיימינן אלא אהנהו לישני במאי עסקינן אילימא בשאין מדבר עמה וכו'. ופשיטא מילתא דכל שהיה מדבר עמה על עסקי קידושיה ונתן לה ולא פירש, התם ודאי קידושין אינון, דלדידהו לישני דמוכחי נינהו...
אבל השתא לדידן דלא בקיאין נשי... ואינם יודעות לספר בלשון הקודש... כל היכא שאין מדבר עמה על עסקי קידושיה ואמר לה אפילו מהנהו לישני דתניא בהו מקודשת לא חיישינן לה דאיהי לא ידעה מאי קאמר.
אבל במדבר עמה על עסקי קידושיה הא ידעה דלקידושין קאמר לה וכיון דהוו לישנא דקידושין הרי זו מקודשת גמורה.`,
        englishText: `The main explanation is that we are analyzing specific partial phrases. It is obvious that if he was discussing Kiddushin with her and gave her money silently, it is valid Kiddushin, for context makes it explicit ("Yadayim Mochiachot")...
But nowadays, when women are not expert in Lashon Hakodesh, we rely on the context ("Asukin") to prove she knew it was for Kiddushin. Since the context clarifies the intent, she is definitely betrothed.`,
        concepts: ['c2', 'c5'],
        children: []
    },
    analysis: {
        focus: "Role of Speech vs Context",
        chiddush: "Speech is not constitutive; it is clarificatory. If context clears it up, speech is unnecessary.",
        reasoning: "Transactions (Mamon) depend on 'Daas' (Intent). Context proves Daas."
    }
};

export const RAN_FULL: Perspective = {
    id: 'seg-ran',
    scholarName: 'Ran',
    scholarNameHebrew: 'הר״ן',
    description: 'Nedarim 6b - Chalot Dibur vs Maaseh',
    rootNode: {
        id: 'ran-root',
        type: LogicType.STATEMENT,
        era: Era.RISHON,
        speaker: 'Ran (Nedarim 6b)',
        hebrewText: `בעי רב פפא יש יד לקדושין וכו' אפי' ביד מוכיח קמיבעיא ליה מי אמרינן נהי דלא אתרבו להו ידות במה מצינו מנדרים או אין יד ואפי' מוכיח דנדרים שאני דחמירי דאפי' בדבורא בהדיא גמרינן בעלמא חיילי משא"כ בקדושין שהן צריכין איזה מעשה כסף או שטר או ביאה.
...אבל ליכא לפרושי בנותן פרוטה לזו ופרוטה לזו דודאי משמע דכה"ג ליכא לספוקי כלל בואת חזאי ואפילו תמצא לומר אין יד לקידושין [קדושין] עצמן הן.`,
        englishText: `Rav Papa asks about Yad in Kiddushin. Even "Yad Mochiach" (Clear Handle) is in doubt. Perhaps we don't derive from Nedarim? Nedarim are stricter because they take effect via Speech alone ("Dibur"). Kiddushin requires an Act (Maaseh: Money/Document). Thus, rules of speech-extension (Yad) might not apply to an Act-based legal status.`,
        concepts: ['c2', 'c3'],
        children: []
    },
    analysis: {
        focus: "Mechanism of Chalot (Status)",
        chiddush: "Nedarim = Chalot Dibur. Kiddushin = Chalot Maaseh.",
        reasoning: "If the mechanism differs, the rules of speech (Yad) may not transfer."
    }
};

// --- ACHRONIM (Full Texts) ---

export const BIRCHAS_SHMUEL_FULL: Perspective = {
    id: 'seg-birchas-shmuel',
    scholarName: 'Birchas Shmuel',
    scholarNameHebrew: 'ברכת שמואל',
    description: 'Siman 1 - Daas vs Dibur',
    rootNode: {
        id: 'bs-root',
        type: LogicType.PROOF,
        era: Era.ACHRON,
        speaker: 'Birchas Shmuel (Kiddushin Siman 1)',
        hebrewText: `והנה עיקר מה שצריך להשמיענו דאע"ג דבכל התורה כולה בעינן שיהא משמעות לשון הפה במו שבלבו... אף על פי שאין בזה משמעות אצל כל העם... אלא דקאמר בלבו... מ"מ ידות נדרים הוי כמו דיבור...
ונראה לבוא אל ביאור דברי הגמ'... דהנה אם נאמר כס"ד דהרשב"א דהך דין דברים שבלב לאו דוקא היכא דהוי נגד הדיבור אלא אפי' היכא דלא הוי לשון משמעות אצל כל העם... א"כ בנזיר עובר לפניו ואמר אהא דהוי יד לנזירות... למה לא הוי חסרון בהקנין?
ונראה דביאור הך דין דדברים שבלב... הוא דהמה מופקעים מדין דיבור לגמרי ע"י דדברים שבלב אינן דברים... לפיכך הוי המכר קיים בכל גווני אפילו לא סליק לארעא דישראל... מה שאין כן באומדנת דעת של המכר שפיר איכא דין דיבור.
ואולם בביאור דברים שבלב דקיי"ל גבי חלות הקידושין וגיטין... דהוא חסרון בהקנין, לא נעשה חלות קנין בלא דעת... מ"מ גבי קידושין ושאר קנינים אין דברים שבלב חסרון בדין דיבור... דא"כ אין זה דברים שבלב דמופקע מכלל דברים... אבל הכא הוי חסרון רק היכא דלא הוי משמעות לשון הדיבור.`,
        englishText: `The main point of the Gemara (Nazir 2a) is that even though usually speech must have universal meaning matching the heart... here, even if the public doesn't understand "Ah'a", it works because "Yad" (Handles) are considered full speech. 
Analysis: According to Rashba, "Words in the Heart" usually fails because it lacks "Meaning". So in the "Ah'a" case, why does it work? It must be that "Yad" (Torah extension) upgrades the thought to be considered "Speech". 
Conclusion: In Kiddushin, we don't need "Speech" (Chalot Dibur), we just need "Daas" (Intent) revealed by the Act. Therefore, "Yad" might not work or be necessary in the same way.`,
        concepts: ['c3', 'c1', 'c2'],
        children: []
    },
    analysis: {
        focus: "Categorization of Halachic Acts",
        chiddush: "Kiddushin is a Mamon (Monetary) act, not an Issur (Prohibition) act like Nedarim.",
        reasoning: "Proof from 'Dvarim Shebalev': In Kiddushin, hidden thoughts are ignored (Act dominates). In Nedarim, hidden thoughts can invalidate (Heart dominates)."
    }
};

export const PNEI_YEHOSHUA_FULL: Perspective = {
    id: 'seg-pnei-yehoshua',
    scholarName: 'Pnei Yehoshua',
    scholarNameHebrew: 'פני יהושע',
    description: 'Kiddushin 5a - Rav Papa\'s Consistency',
    rootNode: {
        id: 'py-root',
        type: LogicType.QUESTION,
        era: Era.ACHRON,
        speaker: 'Pnei Yehoshua (Kid 5a)',
        hebrewText: `שם אמר ליה רב פפא לאביי למימרא דסבר שמואל ידים שאין מוכיחות כו'. וקשיא לי מאי קס"ד דרב פפא דשמואל בדלא אמר לי איירי, הא רב פפא גופא איבעיא ליה בפ"ק דנדרים אי יש יד לקידושין? ... על כרחך היינו משום דאמר לה הרי את מקודשת דמי להקדש ויש יד להקדש...
ומתוך מה שכתבתי נתיישבה לי קושייא אחרת דמאי מקשה רב פפא מקידושין אנזירות דלמא דוקא בנזירות סבר שמואל דידים שאין מוכיחות לא הוו ידים.
וליכא למימר דבפשיטות ילפינן כולהו ידות מנדרים ונזירות, הא ליתא, דהא רב פפא גופא מיבעיא ליה אפילו בעיקר ידות אי ילפינן קידושין מנדרים או לא...`,
        englishText: `Challenge: Rav Papa here (Kid 5a) asks if Shmuel holds "Ambiguous Handles" are valid. But in Nedarim (6b), Rav Papa asks if Handles exist *at all* for Kiddushin! How can he ask about the *type* of Handle if he doubts the *existence* of Handles? 
Resolution: He must distinguish between using the word "Mekudeshes" (which is like Hekdesh/Sanctified, where Hands surely work) versus other terms. Or, Rav Papa is challenging Shmuel based on Shmuel's own logic, not his own.`,
        concepts: ['c2', 'c5'],
        children: []
    },
    analysis: {
        focus: "Consistency of Talmudic Sages",
        chiddush: "Distinction between types of Yad (Hekdesh vs Kinyan).",
        reasoning: "Rav Papa's doubt in Nedarim is fundamental, while here he analyzes Shmuel's specific case."
    }
};

export const CHASAM_SOFER_FULL: Perspective = {
    id: 'seg-chasam-sofer',
    scholarName: 'Chasam Sofer',
    scholarNameHebrew: 'חתם סופר',
    description: 'Nedarim 4b - Missing "Li"',
    rootNode: {
        id: 'cs-root',
        type: LogicType.STATEMENT,
        era: Era.ACHRON,
        speaker: 'Chasam Sofer (Ned 4b)',
        hebrewText: `והנה האומר הרי את מקודשת ואינו אומר לי מבואר בש"ע סי' כ"ז דמעיקר הדין אין כאן בית מיחוש אלא שרמ"א הגיה שיש מחמירים, והנה שורש זה הדין בקידושין ה' ע"ב והעלו שם תוס' ד"ה הכא במאי עסקינן וכו' דבלא לי אפי' יד לא הוה דאדם עשוי לקדש אשה לחברו כמו לעצמו.
...ולהנ"ל קשה הא בלא לי נמי לא הוה אפילו יד ואפ"ה הוה בעי למימר דמקודשת וא"כ שפיר מקשה מאהא...
י"ל בפשיטות דהתוס' בהס"ד הוה קשיא להו דהש"ס הו"ל לתרץ דאת מקודשת בלא לי בתענית וכו' משמע טפי יד לקדושי עצמו מלומר שנעשה שליח לאחרים...`,
        englishText: `Discusses the Shulchan Aruch regarding saying "Mekudeshes" without "Li" (to me). Primarily it should be valid, but Rema is strict. Chasam Sofer questions this based on the Gemara: if "Li" is missing, is it even a "Yad" (Handle)? It should be valid based on context.`,
        concepts: ['c2'],
        children: []
    },
    analysis: {
        focus: "Minimal Speech Requirements",
        chiddush: "Even omitting 'Li' might be valid if context exists, contradicting the need for a 'Yad'.",
        reasoning: "The essence is the intent (Daas), not the formula."
    }
};
