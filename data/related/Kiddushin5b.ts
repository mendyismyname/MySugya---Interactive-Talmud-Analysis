
import { LogicNode, LogicType, Era } from '../../types';

export const RELATED_SUGYAS: LogicNode[] = [
    {
        id: 'source-nazir2a',
        type: LogicType.SOURCE,
        era: Era.AMORA,
        speaker: 'Nazir 2a-2b',
        hebrewText: `מתני' כל כינויי נזירות בנזירות האומר אהא הרי זה נזיר וכו'
גמ' האומר אהא הרי זה נזיר:
דלמא אהא בתענית קאמר
אמר שמואל כגון שהיה נזיר עובר לפניו
לימא קסבר שמואל ידים שאינן מוכיחות לא הוויין ירים
אמרי בזמן שנזיר עובר לפניו ליכא לספוקא במילתא אחרינא אבל ודאי אין הנזיר עובר לפניו אמרינן דלמא אהא
בתענית קאמר
ודלמא לפוטרו מן קרבנותיו קאמר
דקאמר בלבו
אי הכי מאי למימרא
מהו דתימא בעינן פיו ולבו שוין קמ"ל:`,
        englishText: 'Mishna: All substitutes for Nezirus are like Nezirus. One who says "Ah\'a" is a Nazir...\nGemara: Perhaps he meant "I will be fasting"? Shmuel says: It refers to a case where a Nazir was passing in front of him.\nChallenge: Does Shmuel hold that ambiguous handles (Yadayim She\'einan Mochiachot) are valid?... Perhaps he meant "I will be paying for his sacrifices"?\nConclusion: Rather, he also resolved in his heart.\nNovelty: You might have thought "Mouth and Heart must match" explicitly, so it teaches us this context suffices.',
        concepts: ['c1', 'c3'],
        children: []
    },
    {
        id: 'source-shevuot26b',
        type: LogicType.SOURCE,
        era: Era.AMORA,
        speaker: 'Shevuot 26b',
        hebrewText: `אמר שמואל גמר בלבו צריך שיוציא בשפתיו שנאמר לבטא בשפתים
מיתיבי בשפתים ולא בלב גמר בלבו מנין ת"ל לכל אשר יבטא האדם בשבועה
הא גופה קשיא אמרת בשפתים ולא בלב והדר אמרת גמר בלבו מנין
אמר רב ששת הא לא קשיא הכי קאמר בשפתים ולא שגמר בלבו להוציא בשפתיו ולא הוציא גמר בלבו סתם
מנין ת"ל לכל אשר יבטא
אלא לשמואל קשיא
אמר רב ששת תרין ואימא הכי בשפתים ולא שגמר בלבו להוציא פת חטין והוציא פת שעורין גמר בלבו
להוציא פת חטין והוציא פת סתם מנין ת"ל לכל אשר יבטא האדם
מיתיבי מוצא שפתיך תשמור ועשית אין לי אלא שהוציא בשפתיו גמר בלבו מנין ת"ל כל נדיב לב
שאני התם דכתוב כל נדיב לב
וניגמר מינה
משום דהוו תרומה וקדשים שני כתובין הבאין כאחד וכל שני כתובין הבאין כאחד אין מלמדין
הניחא למ"ד אין מלמדין אלא למ"ד מלמדין מאי איכא למימר
הוו חולין וקרשים וחולין מקדשים לא גמרינן:`,
        englishText: 'Shmuel says: If he resolved in his heart, he must express it with his lips, as it says "To express with lips". \nQuestion: But verses imply heart suffices? \nAnswer: The verse excludes one who planned to speak but didn\'t. Internal resolution alone is not binding for Oaths (unlike Kodshim).',
        concepts: ['c3'],
        children: []
    },
    {
        id: 'source-nedarim6b',
        type: LogicType.SOURCE,
        era: Era.AMORA,
        speaker: 'Nedarim 6b',
        hebrewText: `בעי רב פפא יש יד לקידושין או לא.
היכי דמי אילימא דאמר לה לאשה הרי את מקודשת לי ואמר לחבירתה ואת נמי פשיטא היינו קירושין עצמן
אלא כנון דאמר לה לאשה הרי את מקודשת לי ואמר לה לחבירתה ואת
מי אמרינן ואת נמי אמר לה לחבירתה ותפסי בה קידושין לחבירתה או דלמא ואת חזאי אמר לה לחבירתה
ולא תפסי בה קידושין בחבירתה
ומי מיבעי ליה לרב פפא והא מדאמר ליה רב פפא לאביי מי סבר שמואל ירים שאין מוכיחות הויין ירים מכלל
דסבירא ליה לרב פפא דיש יד לקידושין
חדא מגו מאי דסבירא ליה לשמואל אמר ליה לאביי
בעי רב פפא יש יד לפאה או אין יד לפאה [וכו]`,
        englishText: 'Rav Papa asks: Is there "Yad" (Handle) for Kiddushin? \nCase: He betrothed one woman and said to her friend "And you". Did he mean "And you also" (Valid), or "And you watch" (Invalid)? \nContradiction: But didn\'t Rav Papa ask Shmuel (in Kiddushin 5b) about "Ambiguous Hands"? That implies he assumes Handles DO exist for Kiddushin!',
        concepts: ['c2', 'c1'],
        children: []
    },
    {
        id: 'source-nedarim4b',
        type: LogicType.SOURCE,
        era: Era.AMORA,
        speaker: 'Nedarim 4b-6a',
        hebrewText: `מתני': בל בינויי נדרים כנדרים וחרמים בחרמים ושבועות בשבועות ונזירות כנזירות האומר לחברו מודרני ממך
מופרשני ממך מרוחקני ממך שאני אובל לך שאני טועם לך אפור מנודה אני לך ר"ע היה חוכך בזה להחמור:
גמ': האומר לחבירו מודר אני וכו': אמר שמואל בכולן עד שיאמר שאני אובל לך שאני טועם לך מיתיבי מודר
אני ממך מופרשני ממך מרוחקני ממך ה"ז אסור שאני אובל לך שאני טועם לך ה"ז אסור הבי קתני בר"א באומר
שאני אוכל לך שאני טועם לך והתניא איפכא שאני אוכל לך שאני טועם לך אסור מודרני ממך ומופרשני ממך
מרוחקני ממך ה"ז אסור תני הבי וכבר אמר מודרני אי הי היינו רישא ועוד אסור אסור ל"ל למתני
אלא אמר שמואל טעמא דאמר שאני אובל לך שאני טועם לך הוא דאפור וחבירו מותר אבל אמר מודרני הימך
לחוריה שניהן אפורין בי הא דאמר ר' יוסי בר' חנינא מודרני הימך שניהן אסורין...
איתמר ידים שאין מוכיחות אביי אמר הוויין ידים ורבא אמר לא הוויין ידים אמר רבא רבי אידי אסברה לי אמר קרא
נזיר להזיר לי"י מקיש ידות נזירות לנזירות מה נזירות בהפלאה אף ידות נזירות בהפלאה...`,
        englishText: 'Discussion on Nedarim substitutes and ambiguous handles (Yadayim). Abaye says ambiguous handles are valid; Rava says they are invalid, deriving from "Nazir l\'Hazir" - it must be explicit (Hafla\'ah).',
        concepts: ['c2', 'c5'],
        children: []
    },
    {
        id: 'source-kid49b',
        type: LogicType.SOURCE,
        era: Era.AMORA,
        speaker: 'Kiddushin 49b',
        hebrewText: `מתני' על מנת שאני כהן ונמצא לוי לוי ונמצא בהן נתין ונמצא ממזר ממזר ונמצא נתין בן עיר ונמצא בן ברך בן
ברך ונמצא ב עיר, על מנת שביתי קרוב למרחץ ונמצא רחוק רחוק ונמצא קרוב על מנת שיש לו בת או שפחה
מגודלת ואין לו או על מנת שאין לו ויש לו על מנת שאין לו בנים ויש לו או על מנת שיש לו ואין לו, ובבולם אע"פ
שאמרה בלבי היה להתקדש לו אעפ"כ אינה מקודשת וכן היא שהטעתו:
גמ' ההוא גברא דזבין לנכסיה ארעתא למיסק לאר'ן ישראל ובעידנא דזבין לא אמר ולא מידי אמר רבא הוי
דברים שבלב ודברים שבלב אינם דברים
מנא ליה לרבא הא
אילימא מהא דתנן [: אן יקריב אותו מלמד שכופין אותו יכול בעל כרחו תלמוד לומר לרצונו הא כיצד כופין אותו
עד שיאמר רוצה אני ואמאי הא בלביה לא ניחא ליה אלא לאו משום דאמרינן רברים שבלב אינן רברים...`,
        englishText: 'Mishna: "On condition I am a Cohen..." and found to be a Levi - she is not betrothed even if she says "In my heart I would have accepted him". \nGemara: A man sold his property intending to move to Israel. At the time of sale, he said nothing. Rava said: This is "Words in the Heart", and Words in the Heart are nothing (void).',
        concepts: ['c1'],
        children: []
    },
    {
        id: 'source-kid3a',
        type: LogicType.SOURCE,
        era: Era.AMORA,
        speaker: 'Kiddushin 3a',
        hebrewText: `מניינא דרישא למעוטי מאי
מניינא דסיפא למעוטי מאי
מניינא דרישא למעוטי חופה
ולרב הונא דאמר חופה קונה מק"ו למעוטי מאי
למעוטי חליפין
ם"ד אמינא הואיל וגמר קיחה קיחה משרה עפרון מה שרה מקניא בחליפין אף אשה נמי מקניא בחליפין
קמ"ל
ואימא הכי נמי
חליפין איתנהו בפחות משוה פרוטה ואשה בפחות משוה פרוטה [ג ב] לא מקניא נפשה`,
        englishText: 'The Gemara discusses why Chalipin (Barter) does not work for Kiddushin, even though it works for acquiring a field (which is the source for Kiddushin via "Kicha"). Conclusion: Chalipin works with less than a Peruta, and a woman cannot be acquired for less than a Peruta.',
        concepts: ['c1'],
        children: []
    },
    {
        id: 'source-kid6b-raba',
        type: LogicType.SOURCE,
        era: Era.AMORA,
        speaker: 'Kiddushin 6b',
        hebrewText: `אמר רבא הילך מנה על מנת שתחזירהו לי במכר לא קנה
באשה אינה מקודשת
בפדיון הבן אין בנו פדוי
בתרומה יצא ידי נתינה ואסור לעשות כן מפני שנראה ככהן המסייע בבית הגרגות
מאי קסבר רבא
אי קסבר מתנה על מנת להחזיר שמה מתנה אפילו כולהו נמי ואי קסבר לא שמה מתנה אפילו תרומה נמי לא
ועוד הא רבא הוא דאמר מתנה על מנת להחזיר שמה מתנה
דאמר רבא הילך אתרוג זה על מנת שתחזירהו לי נטלו והחזירו יצא ואם לאו לא יצא
אלא אמר רב אשי בכולהו קני לבר מאשה לפי שאין אשה נקנית בחליפין
א"ל רב הונא מר בריה דרב נחמיה לרב אשי הכי אמרינן משמיה דרבא כוותיך:`,
        englishText: 'Rava says: "Here is a Maneh on condition you return it" - In a sale, it does not acquire. For a woman, she is not betrothed... Why? If "Gift on condition to return" is a gift, it should work! Rav Ashi explains: It works for everything EXCEPT a woman, because it looks like Chalipin (Barter), and a woman is not acquired by Chalipin.',
        concepts: ['c4'],
        children: []
    },
    // --- NEWLY ADDED FROM USER PROMPT ---
    {
        id: 'source-terumot3-8',
        type: LogicType.SOURCE,
        era: Era.TANNA,
        speaker: 'Terumot 3:8 (Mishna)',
        hebrewText: 'נתכוון לומר עולה ואמר שלמים, שלמים ואמר עולה - לא אמר כלום, עד שיהיו פיו ולבו שוין.',
        englishText: 'If he intended to say "Olah" and said "Shelamim", or "Shelamim" and said "Olah" - he has said nothing, until his mouth and heart are equal. (Cited by Rashba)',
        concepts: ['c3', 'c1'],
        children: []
    },
    {
        id: 'source-nedarim27b',
        type: LogicType.SOURCE,
        era: Era.AMORA,
        speaker: 'Nedarim 27b',
        hebrewText: 'נודרין לחרמין ולהרגין... ואמר רב עמרם אמר רב: באומר יאסרו פירות העולם עלי אם אינן של בית המלך, ואומר בלבו: היום.',
        englishText: 'One may vow to murderers and robbers [to save himself]. Rav Amram explains: He says "Let all fruits be forbidden to me if these are not the King\'s property", but in his heart he adds "Today". (Implies Words in the Heart work under duress).',
        concepts: ['c1'],
        children: []
    },
    {
        id: 'source-meilah21a',
        type: LogicType.SOURCE,
        era: Era.TANNA,
        speaker: 'Meilah 21a (Mishna)',
        hebrewText: 'אמר לו הבא לי מן החלון והביא לו... אע"פ שאמר בעל הבית: לא היה בלבי אלא מזה [ונתן מזה] - בעל הבית מעל.',
        englishText: 'If he said "Bring me from the window" and the agent brought from it... even if the owner says "I only meant from this specific purse" - the owner has committed Meilah. Words in the Heart are nothing.',
        concepts: ['c1'],
        children: []
    },
    {
        id: 'source-pesachim6b',
        type: LogicType.SOURCE,
        era: Era.AMORA,
        speaker: 'Pesachim 6b',
        hebrewText: 'הבודק צריך שיבטל... מדין הפקר. ...וכי הפקר בלב מהני? והא דברים שבלב אינן דברים? שאני התם דלאו ברשותיה קיימי.',
        englishText: 'One who searches for Chametz must nullify it (Bitul). This works via Hefker (Renouncing ownership). But does Hefker in the heart work? Are these not Words in the Heart? Answer: Chametz is different because it is not truly in his domain [due to the prohibition].',
        concepts: ['c1', 'c5'],
        children: []
    }
];
