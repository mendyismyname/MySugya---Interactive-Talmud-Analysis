
import { Perspective, LogicType, Era } from '../../types';

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
        hebrewText: `[הערות "זר זהב" מדפוס ישן]
במאי עסקינן אילימא בשאין מדבר עמה וכו'. עיקר הפירוש בזה דלא קיימינן אלא אהנהו לישני
דמיבעיא לן, אבל בהנהו לישני דתניא בברייתא בהדיא דהויא מקודשת לא קא מיבעיא להו
דלדידהו לישני דמוכחי דקידושין אינון. ופשיטא מילתא דכל שהיה מדבר עמה על עסקי קידושיה
מקודשת דלקידושין משמע ולא למלאכה. מיהו היינו לדידהו אבל השתא לדידן דלא בקיאין נשי
בלישנא דהני ואינם יודעות לספר בלשון הקודש, כל היכא שאין מדבר עמה על עסקי קידושיה
ואמר לה אפילו מהנהו לישני דתניא בהו מקודשת לא חיישינן לה, דאיהי לא ידעה מאי קאמר, אבל
במדבר עמה על עסקי קידושיה הא ידעה דלקידושין קאמר לה וכיון דהוו לישנא דקידושין הרי זו
מקודשת גמורה, ובאומר הרי את מקודשת לי הרי זה לשון ברור ומובהק וחזקה הוא דידעו ואפילו
בשאין מדבר עמה על עסקי קידושיה חוששין לה שידעה והויא מקודשת, וזו שיטת גדולי רבותינו
ז"ל והיא הנכונה בעיני.

והא דקאמרינן מנא ידעה מאי קאמר לה. אקידושין קיימינן דבעינן דעתה דהוא עיקר סוגיין [וכן משמע
בדעת רש"י להמדייק בלשונו בד"ה והוא שעסקינן ובד'ה מנא ידעה ובד"ה מענין לענין ונלעד"ד
ראיה לדברי רבינו מדבעי לקמן בדלא שמיע ליה הא דרב הונא ולא בעי בדלא שמיע ליה הא דרב
יהודה אלא ודאי דדינו דרב יהודה לא שייכי רק בקידושין וניחא ליה למבעיא בדין השייך בקידושין
ובגיטין] וגיטין אגב ריהטא דמתניתא דלקמן נקטינן לה, דבגיטא לא בעינן דעתה כלל כדתנן
במסכת גיטין [דף נ"ה א'] העיד רבי יוחנן בן גודגדא על החרשת שהשיאה אביה שמתגרשת ואף על
גב דלית לה דעת כלל, ואמרינן עלה בגמרא מעדותו של רבי יוחנן בן גודגדא נלמד אמר לעדים ראו
גט זה שאני נותן לאשתי וחזר ואמר לה כנסי שטר חוב זה הרי זה גט, אלמא לא בעינן דעתה כלל,
מיהו דעתיה בעינן שיהא הוכחה בדברו או במעשיו שנותן לה גט זה לגירושין ואף על גב דלא אמר
לדידה כגון זה שאמר לעדים ראו גט זה שאני נותן לאשתי, אי נמי שיהא מדבר עמה על עסקי
גיטה כי הא דרב יוסי וכדתניא בתוספתא [גיטין פ"ו ה"ט] הוליך אשתו אצל הסופר ונתן לה גט ולא
פירש אם היה מדבר עמה על עסקי גיטה מגורשת ואם לאו אינה מגורשת, מיהו אם מדבר עמה על
עסקי גיטה ואחר כך אמר כנסי שטר חוב זה בטולי בטליה לדבורא קמא ואין דעתו לגירושין,
ואינה מגורשת עד שיאמר לעדים ראו גט זה דהשתא אמרינן אם איתא דבטליה לעדים הוה אמר
ומשום כסופא הוא דקאמר, אבל בשלא אמר כן לעדים אלא שנתן לה ואמר לה כנסי שטר חוב זה
ודאי בטולי בטליה, והוא הדין דאע"ג שהיה מדבר עמה על עסקי גיטה ונתן לה סתם ולא אמר לה
כלום דאי לא עבד לה נתינה גמורה דלא מהני, והיינו הא דתנן בגיטין דף ע"ח אין מצאתו מאחוריו
קוראה והרי הוא גיטה אינו גט עד שיאמר לה הוא גיטיך, ואוקימנא דאעיק [הגירסא לפנינו בגיטין
שם דערק לה ופירש"י עיקם לה והרא"ש העתיק דעזק לה ופי' גם כן כפירש"י] לה חרצה, וההיא
במדבר עמה על עסקי גיטה הוא דאי לא פשיטא, וכבר הרוחתי בדינין אלו התם בדוכתה בס"ד, מפי
רבינו ז"ל.`,
        englishText: `[Notes of 'Zer Zahav' from the old print]
"What case are we dealing with? If we say he was not speaking with her etc." The main explanation in this is that we are only standing on (analyzing) those phrases where we have a doubt. But regarding those phrases taught explicitly in the Braita that she is betrothed, the Gemara does not ask about them, for to them [in their time/language] they were phrases that proved they were for Kiddushin. And it is obvious that as long as he was speaking with her about her Kiddushin matters, she is betrothed, for it implies for Kiddushin and not for work. 
And this [distinction] was for them [in the time of the Gemara]. But now for us, when women are not expert in the language of these [phrases] and do not know how to speak in Lashon Hakodesh: Any case where he is not discussing with her about her Kiddushin matters, and he said to her even one of these phrases about which it is taught 'she is betrothed' - we are not concerned for her [betrothal], for she does not know what he is saying. 
But where he is discussing with her about her Kiddushin matters, she knows that he is speaking to her for Kiddushin, and since they were language of Kiddushin [phrases that can mean it], she is definitely betrothed (Mekudeshes Gemura). 
However, regarding one who says "Harei At Mekudeshes Li" (Behold you are sanctified to me), this is clear and distinct language, and there is a presumption that people know it, and even if he is not discussing with her about her Kiddushin matters, we are concerned for her that she knew and she is betrothed. And this is the method of our great Rabbis of blessed memory, and this is the correct one in my eyes.

And that which we say [in the Gemara]: "How did she know what he said to her?" - We are standing on Kiddushin where we require her Daas (consent/knowledge), for that is the main part of our Sugya. [And so it implies in the opinion of Rashi to one who is precise in his language...]. And Gittin (Divorce) was mentioned [in the text] only due to the flow of the Mishna... for in a Get we do not require her Daas at all, as we learned in Tractate Gittin (55a): "Rabbi Yochanan ben Gudgada testified regarding a deaf-mute woman whose father married her off, that she can be divorced," even though she has no Daas at all. And we say on this in the Gemara: "From the testimony of Rabbi Yochanan ben Gudgada we learn: If he said to witnesses 'See this Get that I am giving to my wife', and he went back and said to her 'Take this debt document', it is a valid Get." This shows we do not require her Daas at all.
However, we do require *his* Daas (the husband's intent), that there be proof in his words or his actions that he is giving her this Get for Divorce. And even though he did not say it to her - for example, where he said to witnesses "See this Get that I am giving to my wife". Alternatively, that he be speaking with her about matters of her Get, like the case of Rav Yose... and as taught in the Tosefta (Gittin 6:9): "If he brought his wife to the scribe and gave her a Get and did not explain - if he was speaking with her about matters of her Get, she is divorced; if not, she is not divorced."
However, if he was speaking with her about matters of her Get, and afterwards said "Take this debt document" - he has surely nullified his first words, and his intent is not for divorce, and she is not divorced until he says to witnesses "See this Get...". For now we say: If it were true that he nullified it [the misleading statement "debt document"] to the witnesses, he would have said so [to them], and it is only due to shame that he speaks [misleadingly to her]. But where he did not speak to witnesses, but gave it to her and said "Take this debt document", he has surely nullified it [the act of divorce].
And the same law applies: Even if he was speaking with her about matters of her Get, and gave it to her silently and said nothing - if he did not perform a complete giving (Netina Gemura), it does not work... And this is what we learned in Gittin (78): "...if she found it behind him and read it and behold it is her Get, it is not a Get until he says to her 'It is your Get'." And we established it as a case where he moved it to her side... and that case refers to where he was speaking with her about matters of her Get...`,
        concepts: ['c2', 'c5'],
        children: []
    }
};

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
        hebrewText: `ואסיקנא דדברים שבלב אינן דברים. והקשה ר"ת ז"ל מהא דתנן במס' תרומות פ"ג נתכוון לומר עולה
ואמר שלמים שלמים ואמר עולה לא אמר ולא כלום,
ותירץ דשאני התם משום דבעינן פיו ולבו שוין, וכדאמרי' ושבועות כ"ו ב') נתכוון להוציא פת חטין
ואמר פת שעורין פת שעורין ואמר פת חטין פטור עד שיהו פיו ולבו שוין,
וטעמא משום דטעות הוא ואין דבורו דבור דלישניה הוא דאתקיל ליה, ודומה לזה נדרי שגגות
(נדרים כ"ה ב') קונם אם אכלתי ואם שתיתי ונזכר שאכל שלא הי' סבור לידור ונדר,
אבל הכא שאומר מה שבלבו לומר אף על פי שאין לבו רוצה במה שגמר בלבו להוציא בפיו דברים
שבלב הן ואינן דברים,
וכן במכר שדעתו למכור סתם ואמר סתם אף על פי שהיה בדעתו שאם לא יעלה לא יהא ממכרו
ממכר הרי אלו דברים שבלב ואינם דברים,
והא דתנן (שם כ"ז ב') נודרין לחרמין ולהרגין ומפרש התם באומר יאסרו כל פירות שבעולם עליו אם
אינן של תרומה ואומר בלבו היום, דאלמא דברים שבלב הוו דברים,
שאני התם דאנוס הוא ואנן סהדי דהוא נשבע בזמן קצר יותר שהוא יכול וכיון שלא הזכיר זמן אלא
סתם לא הוו דברים שבלב דבכלל לשונו הוא,
ובספר יראים ראיתי דטעמא דהרגין משום דסתמן כפירושן שדרכן של בני אדם המדברים עם
ההרגין לומר כך ולא שינה זה לשונו מלשון שאר בני אדם, ואין קורין דברים שבלב אלא כשהוא
סותם דבריו ומוסרן למחשבת לבו במה שדרכן של בני אדם שיהיו מפרשין לשונם ואינם סותמין
דבריהם כמו שסתמן זה,
והא דתנן בפ"ק דנזיר (ב' א') האומר אהא הרי זה נזיר ואוקימנא בשהיה נזיר עובר לפניו ואף על גב
דלא פירש דאלמא דברים שבלב הוו דברים,
התם כיון דאמר אהא ונזיר עובר לפניו כאלו פירש אהא כמוהו שאלו הן ידות נזירות שרבתה אותו
התורה,
והאי תירוצא לא מחוור לי דמכל מקום דברים שבלב הן דהא אפשר דאהא בתענית קאמר
וכדאקשינן עלה התם...
ואפילו לשמואל דמוקי לה בשהיה תופס בשערו מ"מ לאו דברים מפורשין אלא דברים המסורים ללב
הו,
ואפילו תמצא לומר שהתורה רבתה אותן מ"מ ניליף מינה דהא מדכיוצא בזו אתינן למפשטה
וכדאתינן למפשטה מיקריב אותו אפי' בעל כרחו ולא אמרי' שאני התם דרבייה קרא,
ועוד קשיא לי נידוק מתרומה דקי"ל דניטלת במחשבה כלומר שיתן עיניו בצד זה ואוכל בצד אחר
אלמא דברים שבלב ישנן דברים,
וליכא למימר נמי שאני התם דרחמנא רבייה מדכתיב ונחשב לכם תרומתכם וכדאמרן, דא"כ היכי
אתי למפשט מיקריב אותו,
אלא דכל כי האי לא דייקו כלל לדברים שבלב דכי אמרי' דברים שבלב אינן דברים היינו שאינו
דברים לבטל מה שאמר בפיו, כההוא דזבין והיה בלבו תנאי שיעלה לירושלים, ובאומר סבור הייתי
שהיא כהנת וכן כולם,
אבל כל שהדברים שבלבו אינן מבטלין מעשיו אלא מקיימין כנזיר שאמר בלבי הי' להיות כזה שהיה
עובר, או מחשב בתרומה שאין דברי לבו מבטלין שום דבר, הוו דברים, ואין זה בכלל דברי רבא כלל,
כנ"ל,
והא נמי דאמר רבא בפרק השולח (ל"ד א') גלויי מלתא בגיטא מלתא היא קסבר כיון שגלה דעתו
אף על פי שאמר בדברים סתומים מ"מ לא הוו כדברים שבלב כזה שלא אמר כלום, ומיהו קי"ל דלאו
מלתא היא עד שיפרש ממש.`,
        englishText: `And we concluded that "Words in the Heart are not things" (unspoken intent is void). 
Rabbeinu Tam asked from that which we learned in Tractate Terumot Chapter 3: "If he intended to say 'Olah' (Burnt Offering) and said 'Shelamim' (Peace Offering), or 'Shelamim' and said 'Olah' - he has said nothing", because we require "His mouth and his heart to be equal". And as we say in Tractate Shevuot (26b): "He intended to bring out wheat bread and brought out barley bread, or barley and brought out wheat - he is exempt until his mouth and his heart are equal."
He answered: There it is different because it is a mistake, and his speech is not considered speech, for his tongue stumbled. And similar to this are "Vows of Error" (Nedarim 25b): "Konam (forbidden) if I ate or if I drank," and he remembered that he had eaten - where he did not intend to vow [based on reality] and vowed.
But here [in the case of sale], where he says what is in his heart to say [he intentionally sells], even though his heart does not want the result of what he resolved in his heart to express with his mouth [he secretly wants a condition attached], these are "Words in the Heart" and are not things.
And so too regarding a sale, where his intent was to sell unspecifiedly, and he said it unspecifiedly, even though it was in his mind that if he does not go up [to Israel] his sale should not be a sale - behold these are Words in the Heart and are not things [void].

And regarding that which we learned (Nedarim 27b): "We vow to murderers and robbers and tax-collectors" [falsely, to save oneself], and it explains there that he says "Let all fruits of the world be forbidden to me if these are not Terumah" (which is true), but he says in his heart "Today" [limiting the ban to one day]. This implies Words in the Heart ARE things?
There it is different because he is under duress. And we are witnesses that he swears for the shortest time possible. And since he did not mention a time but left it unspecified, they are not "Words in the Heart" [contradicting], for it is included in his language [unspecified can mean today].
And in Sefer Yereim I saw that the reason for robbers is because "Unspecified means as interpreted" - meaning, it is the way of people speaking to robbers to say this... and he did not deviate from the language of other people. And we only call it "Words in the Heart" when he seals his words and hands them over to the thought of his heart, in a way where people usually explain their language and do not seal their words as this one did.

And regarding that which we learned in the first chapter of Nazir (2a): "One who says 'Aha' (I will be) is a Nazir," and we established it as "when a Nazir is passing before him," even though he did not explain - implying Words in the Heart are things?
There, since he said "Aha" and a Nazir was passing before him, it is as if he explained "I will be like him", for these are "Handles of Nezirut" which the Torah amplified.
But this answer is not clear to me, for nevertheless they are Words in the Heart, for it is possible he meant "I will be in a fast", as we asked about it there...
And even according to Shmuel who establishes it as "holding his hair", nevertheless they are not explicit words but words handed over to the heart.
And even if you find to say that the Torah amplified them [handles], nevertheless we should derive from it [to other places in Torah]...
And furthermore it is difficult for me from the logic of Terumah, where we hold "It is taken by thought" (intent), meaning if he sets his eyes on one side and eats from the other [it works]. This implies Words in the Heart ARE things?
...
Rather... that implies: "Words in the Heart are not things" applies specifically to annul what he said with his mouth, like the one who sold and had in his heart a condition that he go up to Jerusalem...
But any case where the words in his heart do not annul his actions but sustain them, like the Nazir where he said "In my heart it was to be like this one who was passing", or one who thinks regarding Terumah - where the words of his heart do not annul any matter - these ARE things [valid]. And this is not in the category of Rava's rule [Words in the Heart are nothing] at all. This appears correct to me.`,
        concepts: ['c1', 'c3'],
        linkedSourceId: 'source-terumot3-8', // Added
        children: []
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
        hebrewText: `בעי רב פפא יש יד לקידושין וכו' אפי' ביד מוכיח קמיבעיא ליה מי אמרינן נהי דלא אתרבו להו ידות
בהדיא גמרינן במה מצינו מנדרים או אין יד ואפי' מוכיח דנדרים שאני דחמירי דאפי' בדבורא
בעלמא חיילי משא"כ בקידושין שהן צריכין איזה מעשה כסף או שטר או ביאה.
דאמר לה לאשה הרי את מקודשת לי ונתן לה שתי פרוטות ואמר לחברתה ואת מי אמרינן ואת נמי אמר לה
לחברתה - וכי אמרה דניחא לה הויא מקודשת דחברתה קבלה בשליחותה כדקי"ל בפ' האיש מקדש
(קדושין דף נב) דאשה נעשית שליח לחברתה ואפילו במקום שנעשית לה צרה אבל ליכא לפרושי בנותן
פרוטה לזו ופרוטה לזו דודאי משמע דכה"ג ליכא לספוקי כלל בואת חזאי ואפילו תמצא לומר אין יד
לקידושין [קידושין] עצמן הן.
או דלמא ואת חזאי אמר לה לחברתה - דאע"ג דלא משמע הכי ויד מוכיח הוא דואת נמי קאמר כיון
דאין יד לא מהני הנך קידושין ואמרי' ואת חזאי קאמר.
והא מדאמר ליה רב פפא לאביי מי סבר שמואל ידים שאין מוכיחות הויין ידים - גבי קידושין בפ"ק
דקידושין (דף ה:) מכלל דס"ל לרב פפא דיש יד לקידושין דמדלא מתמה אלא ביד שאינו מוכיח
מכלל דמוכיח פשיטא ליה דהוי יד.
מגו מאי דס"ל אמר ליה לאביי - דנהי דרב פפא מספקא ליה דדלמא אין יד לקידושין כלל מיהא לא מצי
לאקשויי עלה דשמואל דדלמא איהו ס"ל דיש יד אלא אקשי ליה דידיה אדידיה דאפילו ס"ל דיש יד
לקידושין יד שאינו מוכיח לא הוי יד דהכי שמעינן ליה לשמואל גבי נזיר וא"ת ומאי קא מספקא
ליה בקידושין מאי שנא מגיטין דלכו"ע יש יד כדמוכח סוגיין דלעיל ולא פליגי אלא ביד שאינו
מוכיח י"ל דשאני גט כיון דאיכא מעשה דהיינו נתינת הגט לידה הוי טפי מיד ועיקר מוכיח מקרי
משא"כ בבעיין דלחדא הוא דיהב שתי פרוטות אבל לחברתה לא יהיב מידי.`,
        englishText: `Rav Papa asks: "Is there a Handle (Yad) for Kiddushin etc." Even regarding a Proven Handle (Yad Mochiach) he asks: Do we say... granted that Handles were not explicitly included for them [in the Torah], we derive 'Mah Matzinu' (comparison) from Nedarim? Or perhaps there is no Handle [for Kiddushin], even a Proven one, because Nedarim is different as they are stricter, for they take effect by mere speech... unlike Kiddushin which requires an act of Money, Deed, or Relations.
"Where he said to a woman Behold you are sanctified to me and gave her two Perutos and said to her friend 'And You'". Do we say 'And You' also meant to her friend? ... And if she says she is amenable, she is betrothed... [Note: The mechanism would be] that her friend received it as her agent, as we hold in Chapter 'HaIsh Mekadesh' (Kiddushin 52) that a woman can become an agent for her friend even in a place where she becomes her rival wife. 
But it cannot be interpreted as 'He gave a Peruta to this one and a Peruta to that one' [directly], for that certainly implies [Kiddushin], and in such a case there is no doubt at all in 'And You' [that it means Kiddushin]. And even if you find to say there is no Handle for Kiddushin, [in such a direct giving case] it is Kiddushin itself [not a handle].
"Or perhaps 'And You I saw' (watched) he said to her friend" - for even though it doesn't imply this, since [hypothetically] there is no Handle, those words of Kiddushin do not take effect, and we forcedly say he meant 'And you I saw'.
"And didn't Rav Papa ask Abaye: Does Shmuel hold...?" - regarding Kiddushin in the first chapter... implying Rav Papa holds there *is* a Handle for Kiddushin, for since he only wonders about a Handle that is *not* Proven, it implies that a Proven Handle is obvious to him that it is a Handle.
"From within what he holds [Shmuel's view] he said to Abaye" - For granted that Rav Papa is in doubt whether there is a Handle for Kiddushin at all, nevertheless he could not challenge Shmuel [on that basis], for perhaps Shmuel holds there *is* a Handle. Rather, he challenged him [Shmuel] from within his own view: That even if you hold there is a Handle for Kiddushin, a Handle that is not Proven should not be a Handle, for so we heard from Shmuel regarding Nazir.
And if you ask: What is his doubt regarding Kiddushin? How is it different from Gittin (Divorce) where there definitely is a Handle, as our Sugya above proves, and they only disagree about a Handle that is not Proven?
One can answer: A Get is different. Since there is an Act, which is the giving of the Get into her hand, it is more like a Handle and is primarily called "Proven". This is unlike our question [in Kiddushin] where he gave the two Perutos to one woman, but to her friend he gave nothing.`,
        concepts: ['c2', 'c3'],
        linkedSourceId: 'source-nedarim6b',
        children: []
    }
};

export const RAN_PESACHIM_FULL: Perspective = {
    id: 'seg-ran-pesachim',
    scholarName: 'Ran (Pesachim)',
    scholarNameHebrew: 'הר״ן (פסחים)',
    description: 'Bitul Chametz & Hefker',
    rootNode: {
        id: 'ran-pesachim-root',
        type: LogicType.STATEMENT,
        era: Era.RISHON,
        speaker: 'Ran (Pesachim 6b)',
        hebrewText: `שם. הבודק צריך שיבטל. לישנא דקרא נקט, דכתוב תשביתו ומתרגמינן תבטלון, ובטול זה ודאי מדין
הפקר הוא
וכדמוכח סוגיין מדמייתינן עלה ההיא דסופי תאנים דההיא מתורת הפקר נגעו בה, כדמוכח
בדוכתא,
ואיכא למידק והפקר כי האי גוונא מי מהני, אטו מאן דאמר דנכסי דידיה ליבטלון וליהוו כעפרא מי
הוי הפקר,
ותו דאמרי' בחמץ ומבטלו בלבו ובודאי דלענין הפקר ממונא הפקר בלב לא מהני ולא מידי דדברים
שבלב אינם דברים,
ותו למאי דאמרי' התם בנדרים [מג א] דלר' יוסי הפקר כמתנה מה מתנה עד דאתיא לרשות זוכה לא
נפקא מרשות נותן הכי נמי בהפקר, וכיון שכן ביטול חמץ לר' יוסי היכי מהני מדין הפקר והא לא
אתי לרשות זוכה,
י"ל דאין הכי נמי דמאי דהוי ברשותיה דאיניש לא מצי מפקיר ליה כי האי גונא, אבל חמץ שאני
לפי שאינו ברשותו של אדם אלא שעשאו הכתוב כאלו הוא ברשותו, ומשו"ה בגילויי דעתא בעלמא
דלא ניחא ליה למיהוי ליה זכותא בגויה כלל סגי.`,
        englishText: `There. "One who searches [for leaven] must nullify (Yevatel)." He used the language of scripture, for it is written "Tashbitu" (You shall destroy/cease), and the Targum translates "Tevatlon" (You shall nullify). And this nullification is certainly using the mechanism of Hefker (Renouncing ownership).
And this is proven from our Sugya, since we bring regarding it that case of "Ends of Figs" [drying in the field], and that case touches upon the law of Hefker, as is proven in its place.
And one might ask: Does Hefker work in this manner? Does one who says "My property shall be nullified and be like dust" effect Hefker? [Usually Hefker requires language of "Harei Elu Hefker" - these are ownerless].
And furthermore, regarding what we say "In Chametz, he nullifies it in his heart" - certainly for Hefker of monetary assets, Hefker in the heart does nothing, for "Words in the Heart are not things"!
And furthermore, according to what we say there in Nedarim (43a) that according to Rabbi Yose "Hefker is like a Gift": Just as a gift does not leave the giver's domain until it enters the recipient's domain, so too with Hefker. And since this is so, how does Bitul Chametz work for Rabbi Yose via the law of Hefker? Behold it has not come into the domain of a winner!
One can answer: Indeed, for property that is truly in a person's domain, one cannot make it Hefker in this manner. But Chametz is different, because it is not [truly] in a person's domain [due to the prohibition], only that the Scripture made it *as if* it is in his domain [to violate Bal Yera'eh]. And therefore, mere "Giluy Daata" (Revealing of Mind/Intent) that he does not want any right in it at all is sufficient.`,
        concepts: ['c1', 'c2'],
        linkedSourceId: 'source-pesachim6b',
        children: []
    }
};

export const RAMBAM_FULL: Perspective = {
    id: 'seg-rambam-main',
    scholarName: 'Rambam',
    scholarNameHebrew: 'רמב״ם',
    description: 'Ishus 3:8',
    rootNode: {
        id: 'rambam-main-root',
        type: LogicType.LAW,
        era: Era.RISHON,
        speaker: 'Rambam (Ishus 3:8)',
        hebrewText: 'היה מדבר עם האשה על עסקי קידושין ונתן לה כסף או שוה כסף ולא אמר לה כלום--הרי זו מקודשת, והוא שיהיו עסוקין באותו עניין ולא פסקו מעניין לעניין אחר',
        englishText: 'If he was speaking with the woman about matters of Kiddushin and gave her money or money\'s worth and said nothing to her - she is betrothed, provided they were engaged in that same topic and did not stop from one topic to another.',
        concepts: ['c2', 'c5'],
        children: []
    },
    analysis: {
        focus: "Contextual Validity",
        chiddush: "Context (Asukin) acts as a valid substitute for Speech (Dibur).",
        reasoning: "Intent is clear from the context."
    }
};

export const RAMBAM_NEZIRUT: Perspective = {
    id: 'seg-rambam-nezirut',
    scholarName: 'Rambam (Nezirut)',
    scholarNameHebrew: 'רמב״ם (נזירות)',
    description: 'Laws of Nezirut 1:5-6',
    rootNode: {
        id: 'rambam-nezirut-root',
        type: LogicType.LAW,
        era: Era.RISHON,
        speaker: 'Rambam (Nezirut 1:5-6)',
        hebrewText: `אין אומרין בנזירות עד שיוציא בשפתיו דבר שמשמעו אצל כל העם כענין שבלבו, אלא
כיון שגמר בלבו והוציא בשפתיו דברים שעניינם שיהיה נזיר אף על פי שהן עניינות רחוקות ואף
על פי שאין במשמען לשון נזירות הרי הוא נזיר.
כיצד הרי שהיה נזיר עובר לפניו ואמר אהיה הרי זה נזיר הואיל ובלבו היה שיהיה כמו זה ואף על פי
שלא פירש ואמר אהיה כמו זה, וכן אם אחז בשערו ואמר אהיה נאה או אהא מכלכל או אהא
מסלסל או שאמר הריני מסלסל או הריני מכלכל או הרי עלי לשלח פרע הרי זה נזיר והוא שיגמור
בלבו להזיר,`,
        englishText: `We do not say in Nezirut [that it is valid] until he expresses with his lips a thing whose meaning is universally understood to be like the matter in his heart. Rather, once he resolved in his heart and expressed with his lips words whose subject is that he be a Nazir, even if they are distant matters [metaphors] and even though they do not literally imply language of Nezirut - he is a Nazir.
How so? If a Nazir was passing before him and he said "Aheye" (I will be) - he is a Nazir, since in his heart it was "I will be like this one", even though he did not explain and say "I will be like this one".
And similarly if he held his hair and said "I will be beautiful", or "I will be curling", or "I will be tending", or if he said "Behold I am curling" or "Behold I am tending" or "Behold it is upon me to grow long hair" - he is a Nazir, provided he resolved in his heart to be a Nazir.`,
        concepts: ['c1'],
        children: []
    }
};

export const RAMBAM_NEDARIM: Perspective = {
    id: 'seg-rambam-nedarim',
    scholarName: 'Rambam (Nedarim)',
    scholarNameHebrew: 'רמב״ם (נדרים)',
    description: 'Laws of Nedarim 2:2',
    rootNode: {
        id: 'rambam-nedarim-root',
        type: LogicType.LAW,
        era: Era.RISHON,
        speaker: 'Rambam (Nedarim 2:2)',
        hebrewText: `ואין הנודר נאסר בדבר שאסר על עצמו עד שיוציא בשפתיו ויהיה פיו ולבו שוין כמו
שבארנו בשבועות, אבל המתכוון לנדור בנזיר ונדר בקרבן, בקרבן ונדר בנזיר, בשבועה ונדר, או
שנתכוון לנדור ונשבע, או שנתכוון לומר תאנים ואמר ענבים, הרי זה מותר בשניהם ואין כאן נדר.`,
        englishText: `And the vower is not prohibited in the thing he forbade upon himself until he expresses it with his lips and his mouth and heart are in agreement, as we explained in [Laws of] Shevuot. 
But one who intends to vow a Nazirite vow and vows a Korban [instead], or intends a Korban and vows a Nazirite vow, or intends an Oath and vows, or intended to vow and swore, or intended to say Figs and said Grapes - he is permitted in both [what he said and what he thought] and there is no vow here.`,
        concepts: ['c3', 'c1'],
        children: []
    }
};

export const RAMBAM_ISHUS: Perspective = {
    id: 'seg-rambam-ishus',
    scholarName: 'Rambam (Ishus)',
    scholarNameHebrew: 'רמב״ם (אישות)',
    description: 'Laws of Ishus 4:1-2',
    rootNode: {
        id: 'rambam-ishus-root',
        type: LogicType.LAW,
        era: Era.RISHON,
        speaker: 'Rambam (Ishus 4:1-2)',
        hebrewText: `הלכה א: יש לאיש לקדש נשים רבות כאחת והוא שיהיה בכסף אם קידש בכסף פרוטה לכל אחת
ואחת, ויש לאחת מהן או לאחר לקבל הקידושין על ידי כולן מדעתו.
הלכה ב: המקדש את האשה ונתן קידושיה מדעתה ביד חברתה ואמור לחברתה כשנתן הקידושין
בידה ואת נמי, או וכן גם את וכיוצא בזה, הרי שתיהן מקודשות. אבל אם נתן בידה ואמר לה ואת,
הרי זו שקבלה הקידושין ספק מקודשת, שמא לא נתכוון אלא לראות מה בלבה, וכאילו אמר לה ואת
מה תאמרי בדבר זה, ולפיכך קיבלה היא הקידושין שהרי זה עדיין שואלה לראות מה בלבה ומפני זה
היא ספק מקודשת.`,
        englishText: `Halacha 1: A man may betroth many women at once. And provided it is with Money: if he betrothed with money, there must be a Peruta for each and every one. And one of them, or another person, may accept the Kiddushin on behalf of all of them with their consent.
Halacha 2: One who betroths a woman and gave her betrothal money with her consent into the hand of her friend, and said to her friend when he gave the betrothal money into her hand "And you also", or "And so too you", or similar to this - behold they are both betrothed.
But if he gave it into her hand and said to her "And you" (Ve'at) [without 'also'], she who received the betrothal money is doubtfully betrothed (Safek Mekudeshes), lest he only intended to see what was in her heart, as if saying to her "And you, what do you say about this matter?", and therefore she accepted the Kiddushin [for the first woman] because he is still asking her to see what is in her heart. And because of this she is doubtfully betrothed.`,
        concepts: ['c2'],
        children: []
    }
};

export const RAMBAM_OTHER: Perspective = {
    id: 'seg-rambam-other',
    scholarName: 'Rambam (Misc)',
    scholarNameHebrew: 'רמב״ם (שונות)',
    description: 'Ishus 5:25, Bikurim 11:8, Trumos 12:19, Avadim 5:3',
    rootNode: {
        id: 'rambam-other-root',
        type: LogicType.LAW,
        era: Era.RISHON,
        speaker: 'Rambam (Misc)',
        hebrewText: `רמב"ם הלכות אישות פרק ה הלכה כה
האומר לאשה הרי את מקודשת לי בדינר זה על מנת שתחזירהו לי אינה מקודשת בין החזירה בין
לא החזירה, שאם לא החזירתו הרי לא נתקיים התנאי, ואם החזירתו הרי לא נהנית ולא הגיע לידה
כלום.

רמב"ם הלכות ביכורים פרק יא הלכה ח
רצה הכהן להחזיר לו הפדיון מחזיר, ולא יתן לו הוא ודעתו שיחזיר, ואם עשה כן והחזיר לו אין בנו
פדוי עד שיגמור בלבו ליתן לו מתנה גמורה, ואם רצה הכהן אח"כ להחזיר יחזיר, וכן אם פירש ונתן
לו על מנת להחזיר הרי בנו פדוי.

רמב"ם הלכות תרומות פרק יב הלכה יט
נתן תרומה לכהן ע"מ להחזירה יצא ידי נתינה, ואסור לעשות כן מפני שנמצא במסייע בבית הגרנות,
וכן אסור להן שיחטפו תרומות ומעשרות ואפילו לשאול חלקן בפיהן אסור אלא נוטלין בכבוד, שעל
שלחן המקום הם אוכלים ועל שלחנו הם שותים ומתנות אלו לה' הם והוא זיכה להן שנאמר ואני
נתתי לך את משמרת תרומותי.

רמב"ם הלכות עבדים פרק ה הלכה ג
כיצד בשטר כותב לו על הנייר או על החרס הרי את בן חורין או הרי את של עצמך או אין לי עסק
בך וכן כל כיוצא בזה בענין זה שזה הוא גופו של גט שחרור ומוסר לו את השטר בפני שני עדים או
שהיו העדים חתומים בו ומסרו לו בינו לבינו הרי זה יצא לחירות שהרי גיטו וידו באין כאחד, אמר
לו שלא בכתב הרי את בן חורין הרי את של עצמך אף על פי שהעידו עליו עדים בב"ד ואף על פי
שקנו מידו עדיין לא נשתחרר שאין העבד יוצא לחירות אלא בכסף או בשטר או בראשי איברים,
והכותב לשפחתו הרי את מותרת לכל אדם לא אמר כלום.`,
        englishText: `Ishus 5:25: One who says to a woman "Behold you are betrothed to me with this Dinar on condition that you return it to me" - she is not betrothed, whether she returns it or not. For if she does not return it, the condition is not fulfilled. And if she returns it, she has not benefited nor has anything come into her hand.

Bikurim 11:8: If the Kohen wants to return the Redemption [money] to him, he may return it. But he [the father] should not give it to him with the intention that he return it. And if he did so and he returned it, his son is not redeemed, until he resolves in his heart to give it as a complete gift [and then] if the Kohen wants afterwards to return it he returns it. And so too if he explicitly gave it to him "on condition to return" - his son is redeemed.

Trumos 12:19: If one gave Terumah to a Kohen on condition to return it, he has fulfilled the mitzvah of giving. But it is forbidden to do so because he is found to be "assisting in the threshing floor" [getting favor for priestly gifts]. And so too it is forbidden for them [Kohanim] to grab Terumot and Ma'asrot, and even to ask for their portion with their mouths is forbidden; rather they take with honor...

Avadim 5:3: How is it done via Deed (Shtar)? He writes for him on paper or pottery "Behold you are a free man" or "Behold you belong to yourself" or "I have no business with you"... and hands him the deed... But if he said to him verbally "Behold you are a free man"... even if witnesses testified to it in court... he is not freed, for a slave only goes free via Money, Deed, or Major Limbs. And one who writes to his maidservant "Behold you are permitted to every man", he has said nothing.`,
        concepts: [],
        children: []
    }
};

export const RAMBAN_FULL: Perspective = {
    id: 'seg-ramban',
    scholarName: 'Rambam',
    scholarNameHebrew: 'רמב״ן',
    description: 'Intent that Confirms the Act',
    rootNode: {
        id: 'ramban-root',
        type: LogicType.STATEMENT,
        era: Era.RISHON,
        speaker: 'Ramban (Kid 50a)',
        hebrewText: `חידושי הרמב"ן קידושין דף נ' עמ' א'

> ואי קשיא הא דתנן (נזיר'א) האומר אהא הרי זה נזיר ואוקימנא (שם ה'ב) כשהיה נזיר
עובר לפניו, ואמאי הא דברים שבלב הן,
> אינו כן דהואיל דאמר אהא הרי הוא כמי שאמר כזה שזה הוא ידות הנדרים שרבתה
אותן תורה, והואיל והדבר מוכיח על מה אמר הרי הוא נדר גמור,
> וכן הא דאמרינן גלויי דעתא בגיטא מלתא היא כגון דגלי דעתיה בדבור סתם
בשעת מעשה, אבל הכא ליכא גלויי דעתא בעידן זביני כלל דהא לא אמר כלום,
> ואיכא למידק הא דתנן בנדרים (ניא') נדר בקרבן ואמר לא נדרתי אלא בקרבן של
מלכים נדר בחרם ואמר לא נדרתי אלא בחרמו של ים דהוא מותר, ואמאי הא דברים
שבלב נינהו,
> ודמיא להא דתנן (מעילה פ"ו מ"א) צא והבא לי מן החלון ואמר לא היה בלבי אלא מזה,
פי' לא היה בלבי מאותו כיס שהביא אלא מאחר, וקתני בעה"ב מעל משום דדברים
שבלב הן ואינן דברים,
> ואיכא למימר קרבן גבוה וקרבן מלכים שני מינין ושני גופין הן, אבל יש להם שם
אחד, וכשנדר סתם ופירש לא נדרתי אלא מאחד מהן אינו אלא פירוש דיבורו ואינו
עוקר מה שאמר בפיו ולא מתנה עליו תנאים אחרים,
> אבל האומר הביא לי מחלון פלוני, מכל מה שיש בחלון אמר, שהרי הכל בכלל,
וכשהוא אומר לא אמרתי אלא מכיס פלוני הוא מתנה תנאים אחרים שאינן במשמע,
שהרי מחלון זה אמר והוא מודה ומחלון זה הביא לו,
> ומה שפירש [רמב"ם פ"ז ממעילה] לא היה בלבי אלא מזה כלומר מן הדלוסקמא ואמרתי
חלון, טועה הוא, דאי הכי למעקר קאתי, והא אמרן דלאו כל כמיניה למעקר תנאיה,
ואף על פי שמחלק בין תנאי לדיבור זה בדברים הבאי אין שומעין לו.`,
        englishText: `And if you ask from that which we learned: "One who says Aha is a Nazir" and we established it as "when a Nazir is passing before him" - why? Are these not Words in the Heart?
It is not so [not Words in the Heart]. For since he said "Aha", it is as if he said "Like this one", for this is "Yadot Nedarim" (Handles of Vows) which the Torah included. And since the matter proves what he said, it is a complete Vow.
And similarly regarding "Revealing intent (Gilui Daas) in a Get is significant" - this refers to where he revealed his intent via speech unspecifiedly at the time of the action. But here [in the case of sale], there is no revealing of intent at the time of the sale at all, for he said nothing.
And one might ask from that which we learned in Nedarim (11a): "He vowed a Korban and said 'I only vowed a Korban of Kings'... he is permitted". Why? Are these not Words in the Heart?
And it seems similar to that which we learned (Meilah 21a): "Go and bring me from the window" and [if he brought it but the owner] said "My heart was only referring to this one [and not the one you brought]"... the Householder has misused sacred property (Meilah) because Words in the Heart are not things.
One can answer: Korban of Heaven and Korban of Kings are two distinct types and two bodies, but they share one name. And when he vowed unspecifiedly and explained "I only vowed from one of them", it is merely an explanation of his speech, and he is not uprooting what he said with his mouth, nor making other conditions upon it.
But one who says "Bring me from such-and-such window" - he spoke about *everything* in the window, for everything is included. And when he says "I only spoke about such-and-such purse", he is making other conditions that are not implied, for he said "This window" and he admits it, and he brought from this window.`,
        concepts: ['c1', 'c5'],
        linkedSourceId: 'source-meilah21a', // Added
        children: []
    }
};

export const SHITA_MEKUBETZET: Perspective = {
    id: 'seg-shita',
    scholarName: 'Shita Mekubetzet',
    scholarNameHebrew: 'שיטה מקובצת',
    description: 'Nazir 2b',
    rootNode: {
        id: 'shita-root',
        type: LogicType.STATEMENT,
        era: Era.RISHON,
        speaker: 'Shita Mekubetzet (Nazir 2b)',
        hebrewText: `מהו דתימא בעינן פיו ולבו שוין כאחד שיוציא בפיו מה שמחשב בלבו. אבל הכא שאנו צריכין
למחשבת לבו לפרש מה שהוציא בפיו דאיכא לספוקי שמא לפוטרו מקרבנותיו קאמר סלקא דעתך
אמינא הוי דברים שבלב ואינן דברים
קא משמע לן כיון שנזיר עובר לפניו ואין לבו מכחיש מה שמוציא בפיו אלא מפרש בלבו מה
שמוציא בפיו מקרי שפיר פיו ולבו שוין
אבל אי נזיר עובר לפניו אפילו גמר בלבו ונתכוון לנזירות לאו כלום הוא דדברים שבלב הוא כיון
דאינו מוציא דבר בפיו שיהיה לנזירות דהא איכא לספוקי בתענית ופיו ולבו שוין בעינן וליכא אלא
חד. הרב ר' עזריאל ז"ל:`,
        englishText: `You might have said we require "Mouth and Heart equal" as one, meaning he must express with his mouth what he thinks in his heart. But here, where we need the thought of his heart to interpret what he expressed with his mouth - for there is a doubt, perhaps "To exempt him from his sacrifices" he meant - I would have thought it is "Words in the Heart" and invalid.
It teaches us (Ka Mashma Lan): Since a Nazir is passing before him, and his heart does not contradict what he expresses with his mouth, but rather his heart explains what he expresses with his mouth... it is properly called "Mouth and Heart equal".
But if a Nazir was passing before him, even if he resolved in his heart and intended for Nezirut [but didn't say "Aha"], it is nothing, for it is Words in the Heart, since he did not express anything with his mouth that could be for Nezirut. For it is possible to doubt [it means] Fasting, and we require Mouth and Heart equal, and here there is only one [Heart]. (Rabbi Azriel z"l).`,
        concepts: ['c1'],
        children: []
    }
};

export const RAVED: Perspective = {
    id: 'seg-raved',
    scholarName: 'Raved',
    scholarNameHebrew: 'הראב״ד',
    description: 'Hasagot on Rambam',
    rootNode: {
        id: 'raved-root',
        type: LogicType.REBUTTAL,
        era: Era.RISHON,
        speaker: 'Raved (Hasagot)',
        hebrewText: `השגת הראב"ד, שם
אמר לו שלא בכתב הרי את בן חורין וכו' עד או בראשי איברים. א"א דבר זה אינו מחוור שהקנין הרי
הוא ככסף מההוא מעשה דכומתא [שאן] הלכה כר"ש שהכסף גומר בו, עב"ל,`,
        englishText: `Hasagat HaRavad, there:
[Rambam wrote:] "If he said to him not in writing 'Behold you are a free man'... until 'or by major limbs'".
Abraham (The Raavad) said: This matter is not clear. For the Acquisition [Kinyan Sudar/Chalipin] is like Money! From that story of the aristocracy (Kumat) [where they used a scarf]... the Halacha is like Rabbi Shimon that the money concludes the matter [and thus Chalipin should work for freeing a slave just like Money].`,
        concepts: [],
        children: []
    }
};

export const TOSFOS_NEDARIM: Perspective = {
    id: 'seg-tosfos-nedarim',
    scholarName: 'Tosfos (Nedarim)',
    scholarNameHebrew: 'תוספות (נדרים)',
    description: 'Nedarim 5b',
    rootNode: {
        id: 'tosfos-nedarim-root',
        type: LogicType.STATEMENT,
        era: Era.RISHON,
        speaker: 'Tosfos (Nedarim 5b)',
        hebrewText: `לימא קסבר שמואל ידים שאין מוכיחות לא הויין ידים מדקאמר מודרני ממך שרי. ומשני אין כלומר ודאי
סבר דלא הויין ידים ומוקי לה למתניתין כרבי יהודה דתנן גופו של גט הרי את מותרת לכל אדם רבי
יהודה אומר ודין דיהוי ליכי מינאי אגרת וכו' במאי קמיפלגי רבנן סברי ידים שאין מוכיחות הויין
ידים ולא בעי ודין וכו' ורבי יהודה סבר לא הויין ידים מדקבעי לומר ודין דאי לא כתב ודין בגט הוי
כמגרש בדבורא בעלמא ושטר ראיה בעלמא הוא וכן משמע פ' המגרש דקאמר דקריא למוכיחות
מודין ולקמן בשמעתין משמע דהמוכיח הוי מלישנא דמנאי מדקאמ' עד כאן לא קאמר התם לא
בעי ידים מוכיחות אלא גבי גט דאין אדם מגרש אשת חבירו אלמא דמלישנא דמנאי קדייק.
ואמאי דחיק שמואל לאוקמא מתני' כרבי יהודה לוקמא כרבנן. תמה הלא יש לו לאוקמה כרי יהודה משום
דס"ל כוותיה ויש מתרצים דמוטב לאוקמא כרבנן ואף על גב דהוא לא ס"ל ועתה להך לישנא משמע
דשמואל סבר דידים שאין מוכיחות לא הויין ידים והכי מוכח סוגיא דקידושין (דף ה:) גבי הרי את
מאורסת דקאמר לימא קסבר שמואל ידים שאין מוכיחות הויין ידים לא דאמר הרי את מאורסת לי
אבל אי לא אמר לי לא והיינו כסוגיא דהכא מיהו תימה גדול מאי פריך מאי דוחקיה לאוקמה מתני'
בר' יהודה דשינויא דשנינן שנויא דחיקא הוא מוטב לאוקמה כרבנן והוא לא ס"ל ועוד הקשה הר"ר
יוסף מהאי דפרק כל הגט (דף כו:) דקאמר הכותב טופסי גיטין צריך שיניח מקום האיש ומקום
האשה ומקום הזמן וקאמר שמואל עלה דההיא אף מקום הרי את מותרת לכל אדם פי' משום דהוא
עיקר של גט ואי סבירא ליה כר' יהודה א"כ צריך שיניח מקום ודין שהרי ודין הוי עיקר לר' יהודה
להכי ל"ג (אין) כ"א ושמואל מוקי לה למתני' כרי יהודה והוא סבר לה כרבנן ואז ניחא דפריך שפיר
לוקמא כרבנן כיון דגם הוא סבר כרבנן מיהו קשה מההיא דקידושין דמשמע שמואל אית ליה דלא
הויין ידים ור"י מחלק בידים שאין מוכיחות גרועות כי ההיא דקידושין דאם לא אמר לי הוי
גרועות טפי מדאי דאדם עשוי לקדש אשה לחבירו וכן ההיא דנזיר דפריך עלה דאמר האומר אהא
ה"ז נזיר ופריך ודילמא אהא בתענית קאמר ומוקי שמואל שהיה נזיר עובר לפניו ולהכי צ"ל הכא
ליכא קסבר שמואל ידים שאין מוכיחות לא הויין ידים ומשני לא שמואל מוקי לה למתני' כרי יהודה
פירוש לעולם קסבר הויין ידים חשובות כי הכא מודרני ממך ומוקי לה למתנ' כר' יהודה והוא לא
סבירא ליה ובהא ניחא ההיא דריש פ"א דנזיר משום דאהא הוי ידים גרועות משמע כוליה גופיה
וזהו תענית דנזיר לא הוי כוליה גופיה ולהכי צריך לאוקומה בנזיר עובר לפניו וכן ההיא דקידושין
כדפי' התם ור"ת גרס אין השתא יש ליישבו ודייק אין ידים גרועות כי התם לא הויין ידים אבל
ידים חשובות ס"ל דהויין ידים.`,
        englishText: `Shall we say Shmuel holds ambiguous handles are not handles, since he says "I am vowed from you" is permitted? ... And he establishes the Mishna according to Rabbi Yehuda... In what do they disagree? The Rabbis hold ambiguous handles ARE handles... and Rabbi Yehuda holds they are NOT handles...
And why was Shmuel forced to establish the Mishna like Rabbi Yehuda? Let him establish it like the Rabbis!... It is difficult, what forced him... The answer we gave is a forced answer...
Therefore, do not teach "Yes", rather: Shmuel establishes the Mishna like Rabbi Yehuda, but he himself holds like the Rabbis...
However, it is difficult from that case in Kiddushin... and that case in Nazir...
Therefore we must say: Here, "I am excluded from you" is a valid Handle according to Shmuel... and he establishes the Mishna like Rabbi Yehuda, and he disagrees [with R' Yehuda]...
And this resolves the case in the beginning of Nazir, because "Aha" is a weak handle... and similarly in Kiddushin...
Ri (Rabbi Yitzchak) distinguishes between "Bad Handles" (Yadayim Gruos) - like the case in Kiddushin where if he didn't say "Li" it is very bad because a man is likely to betroth a woman for his friend... and so too regarding "Aha" in Nazir... these are "Bad Handles" and not valid. But "Important Handles" (Yadayim Chashuvot) he holds are valid.`,
        concepts: ['c2'],
        children: []
    }
};

export const TOSFOS_YESHANIM: Perspective = {
    id: 'seg-tosfos-yeshanim',
    scholarName: 'Tosfos Yeshanim',
    scholarNameHebrew: 'תוספות ישנים',
    description: 'Kiddushin 46a',
    rootNode: {
        id: 'ty-root',
        type: LogicType.STATEMENT,
        era: Era.RISHON,
        speaker: 'Tosfos Yeshanim (Kid 46a)',
        hebrewText: `אימא גמרה ומקניא כו'. אע"ג דלא תלו בדידה להתקרש בפחות משוה פרוטה בדאמרינן בפ"ק מיהו בקל עושה צריבותאו`,
        englishText: `Say that she resolves and transfers [herself]... Even though it does not depend on her to be betrothed with less than a Peruta, as we said in the first chapter - however, she easily creates the closeness [required].`,
        concepts: [],
        children: []
    }
};

export const RASHBA_KID5B: Perspective = {
    id: 'seg-rashba-kid5b',
    scholarName: 'Rashba (Kid 5b)',
    scholarNameHebrew: 'הרשב״א (קידושין ה׳ ע״ב)',
    description: 'Natan Hu V\'Amra Hi',
    rootNode: {
        id: 'rashba-kid5b-root',
        type: LogicType.STATEMENT,
        era: Era.RISHON,
        speaker: 'Rashba (Kid 5b)',
        hebrewText: `אבל נתן הוא ואמרה היא ספיקא הוי וחיישינן מדרבנן. וא"ת ולידוק מינה נמי נתנה היא ואמר הוא,
ותירץ הראב"ד ז"ל דההיא לא פסיקא ליה דאיכא אדם חשוב דהויא מקודשת גמורה כדאיתא לקמן,
וכן בתוס' רבותינו הצרפתים ז"ל, אבל רב אלפסי והרמב"ם ז"ל כתבו דנתנה היא ואמר הוא אין כאן
בית מיחוש ונראין דבריהם דהא דאמרינן לקמן דבאדם חשוב מקודשת היינו דוקא בשחזר הוא
ואמר לה התקדשי לי בהנאה זו שאני מקבל ממך מתנה זו, וכן פי' שם ר"ח ז"ל וא"כ הו"ל כנתן הוא
ואמר הוא אבל נתנה היא ממש ואמר הוא אינה מקודשת, והדין נותן שאם נתנה היא במה קנאה
אדרבה דמי לכי תקח אשה איש, והלכך נתנה היא אף על פי שאמר הוא אמרה דידיה בלא נתינה
לית בי מששא ואינה מקודשת,
וא"ת נתן הוא ואמרה היא אמאי אינה מקודשת גמורה דהא אמרינן לקמן בסמוך הי' מדבר עמה על
עסקי גיטה וקדושיה ונתן לה ולא פירש ר"י (הגליל) אומר דיו, ותירצו בתוס' דהכא בשלא דברו
מעיקרא בעסקי קדושין כלל אלא השתא הוא דאמרה לי' תן לי דינר ואתקדש אני לך ונתן לה ולא
פירש דהא לא אמר איהו מידי לא השתא ולא מעיקרא, והא דאמרינן לקמן תן מנה לפלוני ואתקדש
אני לך מקודשת מדין ערב דוקא בשחזר הוא וא"ל בשעת נתינה הרי את מקודשת לי במנה זה
שאני נותן לזה הא נתן ולא פירש אינה מקודשת, ואף על פי שהדברים מראין דלדעת מה שאמרה לו
נתן הוא וכמו שפירש דמי מ"מ העדאת עדים בעינן דהמקדש בלא עדים אין חוששין לקדושין, א"כ
כיון שלא פירש כן ואפשר שלשם מתנה נתן ולא לשם קדושין אף על פי שהוא מודה (נ"א: מוכח)
דלשם קדושין נתן כמו שאמרה אפ"ה אין כאן עדות שמיעה ולא ראיה לשם קדושין (נ"א לשם
עדות) אלא שהם דנין כונת הלב ואין כאן עדות, אבל בשהיו עסוקים באותו ענין כיון שהוא בעצמו
נתרצה בהם מעיקרא ה"ז כאלו פירש עכשיו בשעת נתינה דאדבורא דנפשי' קא סמיך ויהיב. [עיין
בתשו' סי' תרי"ג].`,
        englishText: `"But 'He gave and She spoke' is a doubt and we are strict rabbinically."
And if you ask: Let us infer from this also regarding 'She gave and He spoke' [that it is also a doubt]?
The Raavad answered that that case is not conclusive because there is the case of an 'Important Man' where she is definitely betrothed, as we see later. And so is the view of Tosfos of our French Rabbis.
But the Rif and Rambam wrote that regarding 'She gave and He spoke' there is no concern [it is invalid]. And their words appear correct, for what we say later that with an Important Man she is betrothed - that is specifically where he went back and said to her "Be betrothed to me with this benefit that I accept this gift from you". And so Rabbeinu Chananel explained there. And if so, it becomes like "He gave and He spoke". 
But where She gave literally and He spoke [without the return statement], she is not betrothed. And the logic dictates this, for if she gave, with what did he acquire her? On the contrary, it resembles "When a woman takes a man"! Therefore, if she gave, even though he spoke - his speech without giving has no substance and she is not betrothed.

And if you ask: Why is 'He gave and She spoke' not definitely valid betrothal? For we say later nearby 'If he was speaking with her about her divorce or betrothal and gave to her and did not explain... Rabbi Yossi says it is sufficient'?
Tosfos answered: Here it refers to a case where they were not speaking about betrothal matters originally at all. Rather, now she said to him "Give me a dinar and I will be betrothed to you", and he gave to her and did not explain. For he said nothing, neither now nor originally.
...Nevertheless, we require Witness Testimony (Ha'adaat Eidim), for one who betroths without witnesses, we are not concerned for his Kiddushin. If so, since he did not explain so, and it is possible he gave for a gift and not for Kiddushin... even though he admits he gave for Kiddushin... nevertheless there is no auditory testimony here... only that they are judging the Intent of the Heart, and there is no testimony here.
But where they were discussing the matter [Asukin], since he himself agreed to them originally, it is as if he explained now at the time of giving, for he relies on his own previous speech and gives.`,
        concepts: ['c2', 'c3'],
        children: []
    }
};
