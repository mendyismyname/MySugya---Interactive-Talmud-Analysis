
import { DafSegment } from '../../types';

export const KIDDUSHIN_5B_SEGMENTS: DafSegment[] = [
    {
        id: 'kid-5b-seg1',
        gemaraText: {
            hebrew: 'תנו רבנן: כיצד בכסף? נתן לה כסף או שוה כסף ואמר לה הרי את מקודשת לי, הרי את מאורסת לי, הרי את לי לאינתו - הרי זו מקודשת. אבל היא שנתנה לו ואמרה היא: הריני מקודשת לך, הריני מאורסת לך, הריני לך לאינתו - אינה מקודשת.',
            english: 'Our Rabbis taught: How is it done with money? If he gave her money or money\'s worth and said to her: "Behold you are sanctified to me", "Behold you are betrothed to me", "Behold you are to me as a wife" — she is sanctified. But if she gave to him and said: "Behold I am sanctified to you", "Behold I am betrothed to you", "Behold I am to you as a wife" — she is not sanctified.'
        },
        rashi: [
            {
                id: 'rashi-1-1',
                scholar: 'Rashi',
                hebrewText: 'נתן הוא ואמרה היא - דקסלקא דעתך דהכי קאמר: והוא הדין לנתן הוא ואמרה היא דאינה מקודשת, מדקתני נתן הוא ואמר הוא מקודשת, מכלל דאידך לא הוו קידושין.',
                englishText: 'If He gave and She spoke - You might have thought the Tanna meant: Even if He gave and She spoke it is invalid, since it specified "He gave and He spoke" is valid, implying the other case is not.'
            }
        ],
        tosfos: []
    },
    {
        id: 'kid-5b-seg2',
        gemaraText: {
            hebrew: 'מתקיף לה רב פפא: טעמא דנתן הוא ואמר הוא, הא נתן הוא ואמרה היא - אינה מקודשת? אימא סיפא: אבל היא שנתנה לו ואמרה היא לא הוו קידושין, טעמא דנתנה היא ואמרה היא, הא נתן הוא ואמרה היא הוו קידושין! רישא דוקא, סיפא כדי נסבה? אלא מילתא דסתרא לה לרישא ותני סיפא?',
            english: 'Rav Papa challenges this inference: The reason [it works] is because He gave and He spoke; implying that if He gave and She spoke, she is not sanctified? But look at the end clause: "But if she gave and she spoke, it is not Kiddushin" - implying that if He gave and She spoke, it IS Kiddushin! Is the first clause exact and the second incidental? Or is it a contradiction?'
        },
        rashi: [
            {
                id: 'rashi-2-1',
                scholar: 'Rashi',
                hebrewText: 'רישא דוקא - וה"ה נתן הוא ואמרה היא לא הוו קידושין, והאי דנקט בסיפא נתנה היא, משום דבעי למתני נתנה היא.',
                englishText: 'First clause is exact: Implying "He gave and She spoke" is invalid. The second clause mentioned "She gave" only because it needed to contrast the action of giving.'
            }
        ],
        tosfos: []
    },
    {
        id: 'kid-5b-seg3',
        gemaraText: {
            hebrew: 'ולא הוו קידושין? אלא ה"ק: נתן הוא ואמר הוא - פשיטא דהוו קידושין. נתן הוא ואמרה היא - נעשה כמי שנתנה היא ואמרה היא. ואב"א: נתן הוא ואמר הוא - מקודשת. נתנה היא ואמרה היא - אינה מקודשת. נתן הוא ואמרה היא - ספיקא היא וחיישינן מדרבנן.',
            english: 'Is it really not Kiddushin? Rather, explain it thus: If He gave and He spoke - Obviously valid. If He gave and She spoke - it is treated like She gave and She spoke (Invalid). Alternatively: He gave/He spoke is Valid. She gave/She spoke is Invalid. He gave/She spoke is a Doubt (Safek), and we are strict rabbinically.'
        },
        rashi: [],
        tosfos: []
    },
    {
        id: 'kid-5b-seg4',
        gemaraText: {
            hebrew: 'אמר שמואל: בקידושין, נתן לה כסף ושוה כסף ואמר לה הרי את מקודשת, הרי את מאורסת, הרי את (לי) - הרי זו מקודשת. וכן בגירושין נתן לה ואמר לה הרי את משולחת הרי את מגורשת הרי את מותרת לכל אדם הרי זו מגורשת.',
            english: 'Shmuel said regarding Kiddushin: If he gave her money and said "Behold you are sanctified", "Behold you are betrothed" (without saying "to me") - she is sanctified. And similarly for Divorce: "Behold you are sent away", "Behold you are divorced" - she is divorced.'
        },
        rashi: [],
        tosfos: []
    },
    {
        id: 'kid-5b-seg5',
        gemaraText: {
            hebrew: 'אמר ליה רב פפא לאביי: למימרא דסבר שמואל ידים שאין מוכיחות הויין ידים? והתנן: האומר "אהא" הרי זה נזיר. והוינן בה: ודילמא "אהא בתענית" קאמר? ואמר שמואל: והוא שהיה נזיר עובר לפניו. טעמא דנזיר עובר לפניו, הא לאו הכי לא!',
            english: 'Rav Papa said to Abaye: Does this mean Shmuel holds ambiguous handles (Yadayim She\'einan Mochiachot) are valid? But we learned: If one says "Ah\'a" he is a Nazir. We asked: Maybe he meant a fast? Shmuel answered: Only if a Nazir was passing in front of him! Implications: Only with context is it valid, otherwise not!'
        },
        rashi: [
            {
                id: 'rashi-5-1',
                scholar: 'Rashi',
                hebrewText: 'והוא שהיה נזיר עובר לפניו - דהוי ידים מוכיחות.',
                englishText: 'Only if a Nazir was passing: Because then it is a Proven Handle (Yadayim Mochiachot).'
            }
        ],
        tosfos: [
            {
                id: 'tos-5-1',
                scholar: 'Tosfos',
                hebrewText: 'והתנן האומר אהא הרי זה נזיר - תימה, דבפ"ק דנדרים מוקי שמואל מתניתין דהתם כר\' יהודה, דאמר ידים שאין מוכיחות לא הוו ידים... והכא משמע דסבר כרבנן? וי"ל דהתם אליבא דמאן דבעי לאוקמה מתני\' כר\' יהודה קאמר, וליה לא סבירא ליה.',
                englishText: 'Question: In Nedarim, Shmuel establishes the Mishna according to R\' Yehuda (who invalidates ambiguous handles). Here he seems to rule like the Rabbis? Answer: There he explained it according to R\' Yehuda, but he personally disagrees.',
                linkedSourceId: 'source-nedarim6b'
            }
        ]
    },
    {
        id: 'kid-5b-seg6',
        gemaraText: {
            hebrew: 'א"ל: הכא במאי עסקינן - דאמר "לי". אי הכי מאי קמ"ל? לישני בתראי קמ"ל. הכא כתיב כי יקח ולא שיקח את עצמו, והכא כתיב ושלחה ולא שישלח את עצמו.',
            english: 'He answered: Here we are dealing with a case where he actually said "Li" (to me). If so, what is the novelty? The novelty is the other expressions (Harei At Ishti etc). Here it is written "When a man takes" - he takes her, she doesn\'t take him. And regarding divorce "He sends her" - he sends her, she doesn\'t send him.'
        },
        rashi: [],
        tosfos: []
    },
    {
        id: 'kid-6a-seg1',
        gemaraText: {
            hebrew: 'ת"ר: הרי את אשתי, הרי את ארוסתי, הרי את קנויה לי - מקודשת. הרי את שלי, הרי את ברשותי, הרי את זקוקה לי - מקודשת. תנא תלת תלת שמעינהו וגרסינהו.',
            english: 'Our Rabbis taught: "Behold you are my wife", "Behold you are my betrothed", "Behold you are acquired to me" - She is sanctified. "Behold you are mine", "Behold you are in my domain", "Behold you are bound to me" - She is sanctified.'
        },
        rashi: [],
        tosfos: []
    },
    {
        id: 'kid-6a-seg2',
        gemaraText: {
            hebrew: 'איבעיא להו: "מיוחדת לי" מהו? "מיועדת לי" מהו? "עזרתי" מהו? "נגדתי" מהו? "עצורתי" מהו? "צלעתי" מהו? "סגורתי" מהו? "תחתי" מהו? "תפושתי" מהו? "לקוחתי" מהו? פשוט מיהא חדא, דתניא: האומר "לקוחתי" הרי זו מקודשת, משום שנאמר כי יקח איש אשה.',
            english: 'They asked: What about "Set aside for me"? "Designated for me"? "My helpmate"? "My counterpart"? "My gathered one"? "My rib"? "My closed one"? "My replacement"? "My seized one"? "My taken one"? Solve at least one: For it is taught, one who says "My taken one" is sanctified, as it says "When a man takes a wife".'
        },
        rashi: [],
        tosfos: []
    },
    {
        id: 'kid-6a-seg3',
        gemaraText: {
            hebrew: 'במאי עסקינן? אילימא בשאין מדבר עמה על עסקי גיטה וקידושיה - מנא ידעה מאי קאמר לה? אלא במדבר עמה על עסקי גיטה וקידושיה. ואי דיהיב לה ושתיק ה"נ? דהב"ע דיהב לה ואמר לה בהני לישני. והכי קא מיבעי ליה: הני לישני לקידושי קאמר לה, או דילמא למלאכה קאמר לה? תיקו.',
            english: 'What is the case? If he was not discussing her divorce or betrothal, how would she know what he means? Rather, he was discussing it. But if he gave silently, that would also work! Case: He gave and used these specific phrases. The question is: Do these phrases imply marriage, or perhaps work? Teiku (Undecided).'
        },
        rashi: [
            {
                id: 'rashi-6a-1',
                scholar: 'Rashi',
                hebrewText: 'והכי קא מיבעי ליה - כיון דהני לישני לאו משמעות גמור נינהו, ואיכא למימר למלאכה קאמר, אי גמרינן מענין ראשון לומר קידושין קאמר, או דלמא מספקא לן אי הדר ביה.',
                englishText: 'The Question Is: Since these phrases aren\'t explicit, and could mean work, do we learn from the previous context ("Asukin") that he meant marriage, or maybe he changed his mind?'
            }
        ],
        tosfos: []
    }
];
