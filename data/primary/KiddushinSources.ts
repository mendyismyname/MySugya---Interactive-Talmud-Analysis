
import { ChumashData, MishnaContextText, Commentary } from '../../types';

export const CHUMASH_DEVARIM_24_1: ChumashData = {
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
        }
    ]
};

export const MISHNA_KIDDUSHIN_CONTEXT = {
    previous: {
        ref: 'נדרים ב:א',
        hebrew: 'כָּל כִּנּוּיֵי נְדָרִים כִּנְדָרִים...',
        english: 'All substitutes for vows are like vows...'
    },
    current: {
        ref: 'קידושין א:א',
        hebrew: 'הָאִשָּׁה נִקְנֵית בְּשָׁלֹשׁ דְּרָכִים, וְקוֹנָה אֶת עַצְמָהּ בִּשְׁתֵּי דְרָכִים. נִקְנֵית בְּכֶסֶף, בִּשְׁטָר, וּבְבִיאָה. בְּכֶסֶף, בֵּית שַׁמַּאי אוֹמְרִים, בְּדִינָר וּבְשָׁוֶה דִינָר. וּבֵית הִלֵּל אוֹמְרִים, בִּפְרוּטָה וּבְשָׁוֶה פְרוּטָה. וְכַמָּה הִיא פְרוּטָה, אֶחָד מִשְּׁמוֹנָה בְאִיסָר הָאִיטַלְקִי. וְקוֹנָה אֶת עַצְמָהּ, בְּגֵט וּבְמִיתַת הַבָּעַל. הַיְבָמָה נִקְנֵית בְּבִיאָה, וְקוֹנָה אֶת עַצְמָהּ בְּחָלִיצָה וּבְמִיתַת הַיָּבָם.',
        english: 'A woman is acquired in three ways, and acquires herself in two ways. She is acquired with Money, with a Document (Shtar), and with Relations. With Money: Beit Shammai says a Dinar or a Dinar\'s worth. Beit Hillel says a Peruta or a Peruta\'s worth... And she acquires herself (goes free) with a Get (Divorce) or the death of the husband.'
    },
    next: {
        ref: 'קידושין ב:א',
        hebrew: 'הָאִישׁ מְקַדֵּשׁ בּוֹ וּבִשְׁלוּחוֹ...',
        english: 'A man can betroth in person or via an agent...'
    },
    bartenura: [
        {
            id: 'bart-1',
            scholar: 'Bartenura',
            hebrewText: 'נקנית - לא תני מתקדשת, לישנא דקרא נקט כי יקח איש אשה, וקיחה איקרי קנין דכתיב (בראשית כג) נתתי כסף השדה קח ממני.',
            englishText: 'Nikneit (Acquired) - It does not say "Betrothed" (Mitkadeshet), because it uses the language of Scripture "When a man takes (Yikach) a wife", and Taking is called Acquisition (Kinyan), as it is written "I gave the money for the field, Take it from me".'
        }
    ]
};