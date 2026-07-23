// ============================================================
//  MA'LUMOTLAR BAZASI
//  Yangi bo'lim qo'shish yoki savol o'zgartirish — FAQAT shu fayl
// ============================================================

const TOPICS = [

  // ==========================================================
  {
    id: "nabatiy",
    name: "Nabatiylar davlati",
    tagline: "M.a. III asr oxiri — milodiy 106-yil",
    icon: "🏛",
    ready: true,
    stats: [
      ["M.a. VI asr", "Nabatiylar ko\u02bbchib kelgan"],
      ["M.a. IV asr", "Petra qurilgan"],
      ["106-yil", "Rim tarkibiga o\u02bbtgan"],
      ["22 belgi", "Nabatiy alifbosi"]
    ],
    sections: [
      {
        h: "Tarixi va joylashuvi",
        p: "Nabatiylar davlati (Nabateya podsholigi) — miloddan avvalgi III asr oxiri va milodiy 106-yil oralig\u02bbida hozirgi Iordaniya, Isroil, Suriya va Saudiya Arabistoni hududlarida mavjud bo\u02bblgan qadimiy arab davlati. Miloddan avvalgi VI asrda bu yerga ko\u02bbchmanchi arab qabilalari — nabatiylar kelib o\u02bbrnashgan va vaqt o\u02bbtib o\u02bbz podsholigini tuzgan. Davlat Furot daryosidan Qizil dengizgacha va Sinay yarim orolgacha bo\u02bblgan yerlarni egallagan."
      },
      {
        h: "Petra — poytaxt",
        p: "Petra Iordaniyaning janubi-g\u02bbarbiy qismida qoyalardan o\u02bbyib yasalgan qadimiy shahar bo\u02bblib, miloddan avvalgi IV asrda nabatiylar tomonidan poytaxt sifatida qurilgan. \u201cPetra\u201d so\u02bbzi yunoncha \u201ctosh\u201d yoki \u201cqoya\u201d degan ma\u02bcnoni anglatadi. Shahar dunyoning yetti yangi mo\u02bbjizasidan biri va YuNESKOning Butunjahon merosi obyekti hisoblanadi."
      },
      {
        h: "Savdo",
        p: "Buyuk ipak yo\u02bbli hamda Arabistondan chiqadigan qimmatbaho xushbo\u02bby moddalar va ziravorlar karvon yo\u02bbllarini nazorat qilib, katta boylik to\u02bbplagan."
      },
      {
        h: "Suv ta\u02bcminoti",
        p: "Cho\u02bbl hududida yashagani uchun qoya toshlarga suv yig\u02bbadigan hovuzlar, quvurlar va maxsus tizimlar qurgan."
      },
      {
        h: "Yozuvi",
        p: "O\u02bbziga xos 22 ta belgidan iborat nabatiy yozuviga ega bo\u02bblgan. Keyinchalik bu yozuv asosida arab yozuvi shakllangan."
      },
      {
        h: "Inqirozi",
        p: "Miloddan avvalgi I asr oxiridan boshlab Rim imperiyasi ta\u02bcsiriga tushgan. Milodiy 106-yilda Rim imperatori Trayan davrida davlat o\u02bbz mustaqilligini yo\u02bbqotib, Rimning Arabistondagi viloyatiga aylantirilgan."
      }
    ],
    timeline: [
      ["M.a. VI asr", "Ko\u02bbchmanchi nabatiy qabilalari hududga kelib o\u02bbrnashgan"],
      ["M.a. IV asr", "Petra qoyalardan o\u02bbyib, poytaxt sifatida qurilgan"],
      ["M.a. III asr oxiri", "Nabateya podsholigi rasman shakllangan"],
      ["M.a. I asr oxiri", "Rim imperiyasi ta\u02bcsiri kuchaygan"],
      ["Milodiy 106-yil", "Trayan davrida Rimning Arabiston viloyatiga aylangan"]
    ],
    questions: [
      { q: "Nabatiylar davlatining poytaxti qaysi shahar bo\u02bblgan?", o: ["Damashq", "Petra", "Palmira", "Bosra"], a: 1, e: "Poytaxt qoyalardan o\u02bbyib yasalgan Petra shahri bo\u02bblgan." },
      { q: "\u201cPetra\u201d so\u02bbzi qaysi tildan olingan va nimani anglatadi?", o: ["Lotincha — \u201cshahar\u201d", "Arabcha — \u201ccho\u02bbl\u201d", "Yunoncha — \u201ctosh\u201d, \u201cqoya\u201d", "Oromiycha — \u201csavdo\u201d"], a: 2, e: "\u201cPetra\u201d yunoncha \u201ctosh\u201d yoki \u201cqoya\u201d degan ma\u02bcnoni anglatadi." },
      { q: "Petra qaysi davlat hududida joylashgan?", o: ["Isroil", "Suriya", "Saudiya Arabistoni", "Iordaniya"], a: 3, e: "Petra Iordaniyaning janubi-g\u02bbarbiy qismida joylashgan." },
      { q: "Nabatiylar davlati qachon o\u02bbz mustaqilligini yo\u02bbqotgan?", o: ["Milodiy 66-yilda", "Milodiy 106-yilda", "Miloddan avvalgi 106-yilda", "Milodiy 206-yilda"], a: 1, e: "Milodiy 106-yilda davlat Rim tarkibiga qo\u02bbshib olingan." },
      { q: "Nabatiylar davlatini bosib olgan Rim imperatori kim edi?", o: ["Avgust", "Neron", "Trayan", "Adrian"], a: 2, e: "Imperator Trayan davrida davlat Rim viloyatiga aylantirilgan." },
      { q: "Nabatiy yozuvi nechta belgidan iborat bo\u02bblgan?", o: ["18 ta", "22 ta", "28 ta", "32 ta"], a: 1, e: "Nabatiy yozuvi 22 ta belgidan iborat bo\u02bblgan." },
      { q: "Nabatiy yozuvi asosida keyinchalik qaysi yozuv shakllangan?", o: ["Arab yozuvi", "Lotin yozuvi", "Yunon yozuvi", "Kirill yozuvi"], a: 0, e: "Aynan nabatiy yozuvi asosida arab yozuvi shakllangan." },
      { q: "Petra qachon poytaxt sifatida qurilgan?", o: ["Miloddan avvalgi VI asrda", "Miloddan avvalgi IV asrda", "Milodiy I asrda", "Milodiy IV asrda"], a: 1, e: "Petra miloddan avvalgi IV asrda nabatiylar tomonidan qurilgan." },
      { q: "Nabatiy qabilalari bu hududga qachon kelib o\u02bbrnashgan?", o: ["Miloddan avvalgi VI asrda", "Miloddan avvalgi III asrda", "Milodiy I asrda", "Miloddan avvalgi IX asrda"], a: 0, e: "Miloddan avvalgi VI asrda ko\u02bbchmanchi arab qabilalari kelib o\u02bbrnashgan." },
      { q: "Nabatiylar davlati hududi qaysi chegaralar oralig\u02bbida bo\u02bblgan?", o: ["Nil daryosidan O\u02bbrta yer dengizigacha", "Furot daryosidan Qizil dengizgacha va Sinay yarim orolgacha", "Dajla daryosidan Fors ko\u02bbrfazigacha", "Iordan daryosidan Qora dengizgacha"], a: 1, e: "Hudud Furot daryosidan Qizil dengizgacha va Sinay yarim orolgacha cho\u02bbzilgan." },
      { q: "Nabatiylar asosan nima hisobiga katta boylik to\u02bbplagan?", o: ["Dehqonchilik va chorvachilik", "Qullar savdosi", "Karvon savdo yo\u02bbllarini nazorat qilish", "Konchilik"], a: 2, e: "Ular ipak yo\u02bbli va ziravorlar karvon yo\u02bbllarini nazorat qilgan." },
      { q: "Nabatiylar qanday qimmatbaho tovarlar savdosi bilan mashhur edi?", o: ["Xushbo\u02bby moddalar va ziravorlar", "Kumush va qalay", "Yog\u02bboch va mo\u02bbyna", "Shisha va sopol"], a: 0, e: "Arabistondan chiqadigan xushbo\u02bby moddalar va ziravorlar asosiy tovar edi." },
      { q: "Cho\u02bbl sharoitida yashash uchun nabatiylar nimani qurgan?", o: ["Yer osti shaharlarini", "Suv yig\u02bbadigan hovuzlar, quvurlar va suv tizimlarini", "Katta kemalarni", "Devoriy qal\u02bcalar zanjirini"], a: 1, e: "Qoya toshlarda suv yig\u02bbadigan maxsus tizimlar qurilgan." },
      { q: "Petra qanday xalqaro maqomga ega?", o: ["Faqat milliy yodgorlik", "Dunyoning yetti yangi mo\u02bbjizasidan biri va YuNESKO merosi", "Qadimgi dunyoning yetti mo\u02bbjizasidan biri", "Hech qanday maqomga ega emas"], a: 1, e: "Petra yetti yangi mo\u02bbjizadan biri va YuNESKO Butunjahon merosi obyekti." },
      { q: "Nabatiylar davlati qaysi zamonaviy davlatlar hududida joylashgan edi?", o: ["Misr, Liviya, Tunis", "Iroq, Eron, Turkiya", "Iordaniya, Isroil, Suriya, Saudiya Arabistoni", "Yaman, Ummon, BAA"], a: 2, e: "Davlat shu to\u02bbrt zamonaviy davlat hududlarida mavjud bo\u02bblgan." },
      { q: "Petra shahri qanday usulda qurilgan?", o: ["G\u02bbishtdan terilgan", "Qoyalardan o\u02bbyib yasalgan", "Yog\u02bbochdan yasalgan", "Suv ustida qurilgan"], a: 1, e: "Petra butunlay qoyalardan o\u02bbyib yasalgan." },
      { q: "Rim imperiyasining ta\u02bcsiri qachondan boshlab kuchaygan?", o: ["Miloddan avvalgi I asr oxiridan", "Milodiy III asrdan", "Miloddan avvalgi V asrdan", "Milodiy 106-yildan keyin"], a: 0, e: "Miloddan avvalgi I asr oxiridan davlat Rim ta\u02bcsiriga tusha boshlagan." },
      { q: "106-yildan keyin Nabatiylar davlati nimaga aylantirilgan?", o: ["Mustaqil knyazlikka", "Rimning Arabistondagi viloyatiga", "Fors satrapligiga", "Yunon polisiga"], a: 1, e: "Davlat Rimning Arabistondagi viloyati bo\u02bblib qoldi." },
      { q: "Nabatiylar qaysi xalq vakillari edi?", o: ["Forslar", "Yunonlar", "Arablar", "Oromiylar"], a: 2, e: "Nabatiylar ko\u02bbchmanchi arab qabilalari edi." },
      { q: "Nabatiylar davlati taxminan qancha vaqt mavjud bo\u02bblgan?", o: ["M.a. III asr oxiridan milodiy 106-yilgacha", "M.a. VI asrdan milodiy 300-yilgacha", "Milodiy I\u2013IV asrlar", "M.a. X\u2013V asrlar"], a: 0, e: "Davlat m.a. III asr oxiri va milodiy 106-yil oralig\u02bbida mavjud bo\u02bblgan." }
    ]
  },

  // ==========================================================
  {
    id: "tadmur",
    name: "Tadmur viloyati",
    tagline: "Ma\u02bclumotlar kutilmoqda",
    icon: "🌴",
    ready: false,
    stats: [],
    sections: [],
    timeline: [],
    questions: []
  },

  // ==========================================================
  {
    id: "laxmiy",
    name: "Laxmiylar davlati",
    tagline: "Ma\u02bclumotlar kutilmoqda",
    icon: "🐎",
    ready: false,
    stats: [],
    sections: [],
    timeline: [],
    questions: []
  },

  // ==========================================================
  {
    id: "gassoniy",
    name: "G\u02bbassoniylar davlati",
    tagline: "Ma\u02bclumotlar kutilmoqda",
    icon: "⚔",
    ready: false,
    stats: [],
    sections: [],
    timeline: [],
    questions: []
  },

  // ==========================================================
  {
    id: "kinda",
    name: "Kinda davlati",
    tagline: "Ma\u02bclumotlar kutilmoqda",
    icon: "🏜",
    ready: false,
    stats: [],
    sections: [],
    timeline: [],
    questions: []
  }

];

module.exports = { TOPICS };
