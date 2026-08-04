/* I18N dictionary + helpers ported verbatim from the original js2.html. */

export type LangCode = "en" | "uz" | "ru";

export const LANGS: Record<LangCode, string> = { en: "EN", uz: "UZ", ru: "RU" };

let currentLang: LangCode = "en";
try {
  const urlLang = new URLSearchParams(window.location.search).get("lang");
  if (urlLang && (LANGS as Record<string, string>)[urlLang])
    currentLang = urlLang as LangCode;
  else
    currentLang = (localStorage.getItem("team_exam_lang") as LangCode) || "en";
} catch (e) {
  /* ignore */
}
if (!LANGS[currentLang]) currentLang = "en";

export function getCurrentLang(): LangCode {
  return currentLang;
}
export function setCurrentLang(lang: LangCode): void {
  currentLang = lang;
}

export const I18N: Record<LangCode, Record<string, string>> = {
  en: {
    nav_registration: "Registration",
    nav_exam_info: "Exam Info",
    nav_faq: "FAQ",
    hero_title: "Welcome to TEAM University Exams",
    hero_sub:
      "Take your Mathematics or English examination online. Please register your details and select your preferred exam to begin.",
    stat_exam_types: "Exam Types",
    stat_questions: "Questions",
    stat_time: "1h 45m",
    stat_time_text: "Time",
    reg_title: "Student Registration",
    reg_sub: "Please fill in your details to register for the examination.",
    label_full_name: "Full Name",
    ph_full_name: "Enter your full name",
    label_phone: "Phone Number",
    label_email: "Email Address",
    label_dates: "Available Exam Dates",
    label_dates_sub: "Select your preferred exam date",
    date_today: "TODAY",
    date_try_now: "Try Now",
    date_immediate: "Immediate access",
    date_open_doors: "Open Doors + Exams",
    date_exams_day: "Exams Day",
    date_exams: "Exams",
    date_passed: "Passed",
    label_exam_type: "Select Exam Type",
    exam_math_name: "Mathematics",
    exam_eng_name: "English",
    exam_math_desc:
      "30 Multiple Choice questions,<br>20 basic English questions &bull; 1h 45m",
    exam_math_a: "Section A: 10 Basic questions",
    exam_math_b: "Section B: 10 Intermediate questions",
    exam_math_c: "Section C: 10 Advanced questions",
    exam_math_d: "Section D: 20 Basic English questions",
    exam_eng_desc: "Use of English, Reading &amp; Writing &bull; 1h 45m",
    exam_eng_p1: "Part 1: Use of English &amp; Reading (30 questions)",
    exam_eng_p2: "Part 2: Grammar Test (20 questions)",
    exam_eng_p3: "Part 3: Writing Tasks (Letter + Essay)",
    btn_start_exam: "Start Exam",
    info_title: "Exam Information",
    info_sub: "Everything you need to know before taking your exams",
    info_duration_t: "Exam Duration",
    info_duration:
      "Each exam is 1 hour 45 minutes long.<br>Be sure to manage your time wisely. The timer will start when you begin the exam.",
    info_types_t: "Question Types",
    info_types:
      "Mathematics: 30 Multiple Choice<br>and 20 Basic English questions<br>English: Grammar, Word Bank, Reading, Short Answer, T/F/Not Given, Writing",
    info_rules_t: "Exam Rules",
    info_rules:
      "Be on time. No cheating devices.<br>No tab switching. Your answers are saved automatically. Submit before time expires.",
    faq_title: "Frequently Asked Questions",
    footer_contact: "Contact",
    footer_quick: "Quick Links",
    footer_home: "Home",
    footer_about: "About Us",
    footer_programs: "Programs",
    footer_rights: "&copy; 2020 TEAM University. All Rights Reserved.",
    footer_contact_info:
      "Phone: +998 78 113 08 28<br>Email: admission@teamuni.uz",
    footer_tagline:
      "The first private entrepreneurial university in Uzbekistan.",
    footer_follow: "Follow us",
    footer_exams: "Exams",
    waiting_title: "Your Exam is Scheduled",
    waiting_sub: "You have successfully registered for the examination.",
    waiting_date_label: "Your exam date is",
    waiting_note:
      "Please return on your scheduled exam date to take the examination.",
    btn_back_home: "Back to Home",
    taken_title: "Exam Already Taken",
    taken_text:
      "You have already taken this exam. Each student is allowed only one attempt.",
    sidebar_progress: "Progress",
    sidebar_questions: "Questions",
    legend_answered: "Answered",
    legend_unanswered: "Unanswered",
    legend_current: "Current",
    legend_flagged: "Flagged",
    btn_review_all: "Review All Answers",
    btn_submit_exam: "Submit Exam",
    btn_previous: "Previous",
    btn_next: "Next",
    btn_review: "Review",
    btn_flag: "Flag for Review",
    btn_flagged: "Flagged",
    kbd_hint:
      "Keyboard: 1-4 to answer | &#8592; &#8594; to navigate | F to flag | S for next",
    btn_exit: "Exit",
    review_mode: "You are in review mode.",
    stat_total_q: "Total Questions",
    review_warn_title: "You have {n} unanswered questions.",
    review_warn_sub: "Please review all questions before submitting.",
    btn_back_exam: "Back to Exam",
    modal_quick_review: "Quick Review",
    btn_close: "Close",
    btn_full_review: "Full Review",
    results_title: "Exam Submitted<br>Successfully!",
    results_sub:
      "Thank you for completing your examination. Your answers have been recorded.",
    results_summary: "Exam Summary",
    results_name: "Student Name",
    results_exam_type: "Exam Type",
    results_exam_date: "Exam Date",
    results_language: "Language",
    results_next_t: "What happens next?",
    results_next1:
      "Your exam will be reviewed by our academic team within 5 working days.",
    results_next2:
      "You will receive your results via email at the address provided during registration.",
    results_next3:
      "For any questions, contact us at admission@teamuni.uz or +998 78 113 08 28.",
    btn_return_home: "Return to Home",
    dq_title: "Exam Disqualified",
    dq_text:
      "You have been disqualified from this examination for switching windows/tabs too many times. This is considered a violation of exam rules.",
    dq_status: "Status",
    dq_reason: "Reason",
    dq_reason_val: "Tab switching (3 violations)",
    warn_title: "Warning!",
    warn_default: "You switched to another window.",
    btn_understand: "I Understand",
    confirm_cancel: "Cancel",
    confirm_ok: "Confirm",
    submit_confirm: "Submit your exam? You cannot undo this action.",
    exit_confirm: "Are you sure you want to exit? Your progress will be lost.",
    toast_required: "Please fill in all required fields.",
    toast_date: "Please select an exam date.",
    toast_type: "Please select an exam type.",
    toast_word_first: "Please select a word chip first",
    toast_menu: "Menu opened",
    math_exam_label: "MATHEMATICS EXAM",
    eng_exam_label: "ENGLISH EXAM",
    all_sections: "All Sections",
    part1_title: "Part 1 &mdash; UoE &amp; Reading",
    answered_short: "answered",
    question_of: "Question {n} of {total}",
    review_banner:
      "{a} of {t} questions answered &#8226; {f} flagged for review",
    dc_0716: "Jul 16",
    dc_0724: "Jul 24",
    dc_0807: "Aug 7",
    dc_0813: "Aug 13",
  },
  uz: {
    nav_registration: "Ro'yxatdan o'tish",
    nav_exam_info: "Imtihon haqida",
    nav_faq: "Savollar",
    hero_title: "TEAM Universiteti imtihonlariga xush kelibsiz",
    hero_sub:
      "Matematika yoki ingliz tili imtihonini onlayn topshiring. Boshlash uchun ma'lumotlaringizni kiriting va o'zingizga mos imtihonni tanlang.",
    stat_exam_types: "Imtihon turlari",
    stat_questions: "Savollar",
    stat_time: "1s 45d",
    stat_time_text: "Vaqt",
    reg_title: "Talabani ro'yxatdan o'tkazish",
    reg_sub: "Imtihonga ro'yxatdan o'tish uchun ma'lumotlaringizni to'ldiring.",
    label_full_name: "To'liq F.I.Sh.",
    ph_full_name: "To'liq ismingizni kiriting",
    label_phone: "Telefon raqami",
    label_email: "Elektron pochta",
    label_dates: "Mavjud imtihon sanalari",
    label_dates_sub: "O'zingizga qulay imtihon sanasini tanlang",
    date_today: "BUGUN",
    date_try_now: "Hozir sinab ko'ring",
    date_immediate: "Darhol kirish",
    date_open_doors: "Ochiq eshiklar + Imtihonlar",
    date_exams_day: "Imtihon kuni",
    date_exams: "Imtihonlar",
    date_passed: "O'tgan",
    label_exam_type: "Imtihon turini tanlang",
    exam_math_name: "Matematika",
    exam_eng_name: "Ingliz tili",
    exam_math_desc:
      "30 ta test savoli,<br>20 ta oddiy ingliz tili savollari &bull; 1s 45d",
    exam_math_a: "A bo'lim: 10 ta asosiy savol",
    exam_math_b: "B bo'lim: 10 ta o'rta daraja savoli",
    exam_math_c: "C bo'lim: 10 ta murakkab savol",
    exam_math_d: "D bo'lim: 20 ta oddiy ingliz tili savollari",
    exam_eng_desc: "Use of English, Reading &amp; Writing &bull; 1s 45d",
    exam_eng_p1: "1-qism: Use of English &amp; Reading (30 savol)",
    exam_eng_p2: "2-qism: Grammar Test (20 savol)",
    exam_eng_p3: "3-qism: Writing Tasks (Letter + Essay)",
    btn_start_exam: "Imtihonni boshlash",
    info_title: "Imtihon haqida ma'lumot",
    info_sub:
      "Imtihon topshirishdan oldin bilishingiz kerak bo'lgan hamma narsa",
    info_duration_t: "Imtihon davomiyligi",
    info_duration:
      "Har bir imtihon 1 soat 45 daqiqa davom etadi. Vaqtingizni oqilona boshqarishingizga ishonch hosil qiling. Taymer imtihonni boshlaganingizda ishga tushadi.",
    info_types_t: "Savol turlari",
    info_types:
      "Matematika: 30 ta test savoli<br>va 20 ta oddiy ingliz tili savollari<br>Ingliz tili: Grammar, Word Bank, Reading, Short Answer, T/F/Not Given, Writing",
    info_rules_t: "Imtihon qoidalari",
    info_rules:
      "O'z vaqtida keling. Yordamchi vositalar taqiqlanadi. Boshqa vkladkalarga o'tmang. Javoblaringiz avtomatik saqlanadi. Vaqt tugashidan oldin topshiring.",
    faq_title: "Ko'p so'raladigan savollar",
    footer_contact: "Aloqa",
    footer_quick: "Foydali havolalar",
    footer_home: "Bosh sahifa",
    footer_about: "Biz haqimizda",
    footer_programs: "Yo'nalishlar",
    footer_rights: "&copy; 2020 TEAM University. Barcha huquqlar himoyalangan.",
    footer_contact_info:
      "Telefon: +998 78 113 08 28<br>El. pochta: admission@teamuni.uz",
    footer_tagline: "O'zbekistondagi ilk xususiy tadbirkorlik universiteti.",
    footer_follow: "Ijtimoiy tarmoqlar",
    footer_exams: "Imtihonlar",
    waiting_title: "Imtihoningiz rejalashtirildi",
    waiting_sub: "Siz imtihonga muvaffaqiyatli ro'yxatdan o'tdingiz.",
    waiting_date_label: "Imtihon sanangiz",
    waiting_note:
      "Imtihonni topshirish uchun belgilangan sanada qaytib keling.",
    btn_back_home: "Bosh sahifaga qaytish",
    taken_title: "Imtihon allaqachon topshirilgan",
    taken_text:
      "Siz bu imtihonni allaqachon topshirgansiz. Har bir talabaga faqat bitta urinish beriladi.",
    sidebar_progress: "Jarayon",
    sidebar_questions: "Savollar",
    legend_answered: "Javob berilgan",
    legend_unanswered: "Javobsiz",
    legend_current: "Joriy",
    legend_flagged: "Belgilangan",
    btn_review_all: "Barcha javoblarni ko'rish",
    btn_submit_exam: "Imtihonni topshirish",
    btn_previous: "Oldingi",
    btn_next: "Keyingi",
    btn_review: "Ko'rib chiqish",
    btn_flag: "Ko'rib chiqish uchun belgilash",
    btn_flagged: "Belgilangan",
    kbd_hint:
      "Klaviatura: javob uchun 1-4 | harakat uchun &#8592; &#8594; | belgilash uchun F | keyingisi uchun S",
    btn_exit: "Chiqish",
    review_mode: "Siz javoblarni ko'rib chiqish rejimidasiz.",
    stat_total_q: "Jami savollar",
    review_warn_title: "Sizda {n} ta javobsiz savol bor.",
    review_warn_sub: "Topshirishdan oldin barcha savollarni ko'rib chiqing.",
    btn_back_exam: "Imtihonga qaytish",
    modal_quick_review: "Tezkor ko'rib chiqish",
    btn_close: "Yopish",
    btn_full_review: "To'liq ko'rib chiqish",
    results_title: "Imtihon muvaffaqiyatli<br>topshirildi!",
    results_sub:
      "Imtihonni yakunlaganingiz uchun rahmat. Javoblaringiz qayd etildi.",
    results_summary: "Imtihon bo'yicha ma'lumot",
    results_name: "Talaba F.I.Sh.",
    results_exam_type: "Imtihon turi",
    results_exam_date: "Imtihon sanasi",
    results_language: "Til",
    results_next_t: "Keyin nima bo'ladi?",
    results_next1:
      "Imtihoningiz akademik jamoamiz tomonidan 5 ish kuni ichida ko'rib chiqiladi.",
    results_next2:
      "Natijalaringiz ro'yxatdan o'tishda ko'rsatilgan elektron pochtangizga yuboriladi.",
    results_next3:
      "Savollar bo'lsa, admission@teamuni.uz manziliga yozing yoki +998 78 113 08 28 raqamiga qo'ng'iroq qiling.",
    btn_return_home: "Bosh sahifaga qaytish",
    dq_title: "Imtihondan chetlatildingiz",
    dq_text:
      "Siz oynalarni/vkladkalarni juda ko'p almashtirganingiz uchun imtihondan chetlatildingiz. Bu imtihon qoidalarini buzish hisoblanadi.",
    dq_status: "Holat",
    dq_reason: "Sabab",
    dq_reason_val: "Vkladkalarni almashtirish (3 ta ogohlantirish)",
    warn_title: "Ogohlantirish!",
    warn_default: "Siz boshqa oynaga o'tdingiz.",
    btn_understand: "Tushundim",
    confirm_cancel: "Bekor qilish",
    confirm_ok: "Tasdiqlash",
    submit_confirm:
      "Imtihonni topshirasizmi? Bu amalni ortga qaytarib bo'lmaydi.",
    exit_confirm: "Chiqishga ishonchingiz komilmi? Barcha jarayon yo'qotiladi.",
    toast_required: "Iltimos, barcha majburiy maydonlarni to'ldiring.",
    toast_date: "Iltimos, imtihon sanasini tanlang.",
    toast_type: "Iltimos, imtihon turini tanlang.",
    toast_word_first: "Avval so'z tanlang",
    toast_menu: "Menyu ochildi",
    math_exam_label: "MATEMATIKA IMTIHONI",
    eng_exam_label: "INGLIZ TILI IMTIHONI",
    all_sections: "Barcha bo'limlar",
    part1_title: "1-qism &mdash; UoE &amp; Reading",
    answered_short: "javob berildi",
    question_of: "Savol {n} / {total}",
    review_banner:
      "{t} tadan {a} ta savolga javob berildi &#8226; {f} ta belgilangan",
    dc_0716: "16 Iyul",
    dc_0724: "24 Iyul",
    dc_0807: "7 Iyul",
    dc_0813: "13 Iyul",
  },
  ru: {
    nav_registration: "Регистрация",
    nav_exam_info: "Об экзамене",
    nav_faq: "Вопросы",
    hero_title: "Добро пожаловать на экзамены TEAM University",
    hero_sub:
      "Сдайте экзамен по математике или английскому языку онлайн. Чтобы начать, заполните свои данные и выберите экзамен.",
    stat_exam_types: "Типа экзаменов",
    stat_questions: "Вопросы",
    stat_time: "1ч 45м",
    stat_time_text: "Время",
    reg_title: "Регистрация студента",
    reg_sub: "Пожалуйста, заполните свои данные для регистрации на экзамен.",
    label_full_name: "Ф.И.О.",
    ph_full_name: "Введите ваше полное имя",
    label_phone: "Номер телефона",
    label_email: "Электронная почта",
    label_dates: "Доступные даты экзамена",
    label_dates_sub: "Выберите удобную дату экзамена",
    date_today: "СЕГОДНЯ",
    date_try_now: "Попробовать",
    date_immediate: "Мгновенный доступ",
    date_open_doors: "День открытых дверей + Экзамены",
    date_exams_day: "День экзамена",
    date_exams: "Экзамены",
    date_passed: "Прошла",
    label_exam_type: "Выберите тип экзамена",
    exam_math_name: "Математика",
    exam_eng_name: "Английский язык",
    exam_math_desc:
      "30 тестовых вопросов, 20 базовых вопросов по английскому &bull; 1ч 45м",
    exam_math_a: "Раздел A: 10 базовых вопросов",
    exam_math_b: "Раздел B: 10 вопросов среднего уровня",
    exam_math_c: "Раздел C: 10 сложных вопросов",
    exam_math_d: "Раздел D: 20 базовых вопросов по английскому",
    exam_eng_desc: "Use of English, Reading &amp; Writing &bull; 1ч 45м",
    exam_eng_p1: "Часть 1: Use of English &amp; Reading (30 вопросов)",
    exam_eng_p2: "Часть 2: Grammar Test (20 вопросов)",
    exam_eng_p3: "Часть 3: Writing Tasks (Letter + Essay)",
    btn_start_exam: "Начать экзамен",
    info_title: "Информация об экзамене",
    info_sub: "Всё, что нужно знать перед сдачей экзамена",
    info_duration_t: "Длительность экзамена",
    info_duration:
      "Каждый экзамен длится 1 час 45 минут.<br>Убедитесь, что вы разумно управляете своим временем. Таймер начнется, когда вы начнете экзамен.",
    info_types_t: "Типы вопросов",
    info_types:
      "Математика: 30 тестовых вопросов<br>и 20 базовых вопросов по английскому<br>Английский: Grammar, Word Bank, Reading, Short Answer, T/F/Not Given, Writing",
    info_rules_t: "Правила экзамена",
    info_rules:
      "Приходите вовремя. Шпаргалки и устройства запрещены.<br>Не переключайте вкладки. Ответы сохраняются автоматически. Отправьте работу до окончания времени.",
    faq_title: "Часто задаваемые вопросы",
    footer_contact: "Контакты",
    footer_quick: "Быстрые ссылки",
    footer_home: "Главная",
    footer_about: "О нас",
    footer_programs: "Программы",
    footer_rights: "&copy; 2020 TEAM University. Все права защищены.",
    footer_contact_info:
      "Телефон: +998 78 113 08 28<br>Эл. почта: admission@teamuni.uz",
    footer_tagline:
      "Первый частный предпринимательский университет в Узбекистане.",
    footer_follow: "Мы в соцсетях",
    footer_exams: "Экзамены",
    waiting_title: "Ваш экзамен запланирован",
    waiting_sub: "Вы успешно зарегистрировались на экзамен.",
    waiting_date_label: "Дата вашего экзамена",
    waiting_note:
      "Пожалуйста, вернитесь в назначенную дату, чтобы сдать экзамен.",
    btn_back_home: "На главную",
    taken_title: "Экзамен уже сдан",
    taken_text:
      "Вы уже сдали этот экзамен. Каждому студенту разрешена только одна попытка.",
    sidebar_progress: "Прогресс",
    sidebar_questions: "Вопросы",
    legend_answered: "Отвечено",
    legend_unanswered: "Без ответа",
    legend_current: "Текущий",
    legend_flagged: "Отмечено",
    btn_review_all: "Проверить все ответы",
    btn_submit_exam: "Сдать экзамен",
    btn_previous: "Назад",
    btn_next: "Далее",
    btn_review: "Проверка",
    btn_flag: "Отметить для проверки",
    btn_flagged: "Отмечено",
    kbd_hint:
      "Клавиатура: 1-4 для ответа | &#8592; &#8594; навигация | F — отметить | S — далее",
    btn_exit: "Выход",
    review_mode: "Вы в режиме проверки ответов.",
    stat_total_q: "Всего вопросов",
    review_warn_title: "У вас {n} вопросов без ответа.",
    review_warn_sub: "Пожалуйста, проверьте все вопросы перед отправкой.",
    btn_back_exam: "Вернуться к экзамену",
    modal_quick_review: "Быстрый просмотр",
    btn_close: "Закрыть",
    btn_full_review: "Полный просмотр",
    results_title: "Экзамен успешно<br>отправлен!",
    results_sub: "Спасибо за прохождение экзамена. Ваши ответы записаны.",
    results_summary: "Итоги экзамена",
    results_name: "Имя студента",
    results_exam_type: "Тип экзамена",
    results_exam_date: "Дата экзамена",
    results_language: "Язык",
    results_next_t: "Что дальше?",
    results_next1:
      "Ваш экзамен будет проверен нашей академической командой в течение 5 рабочих дней.",
    results_next2:
      "Вы получите результаты на электронную почту, указанную при регистрации.",
    results_next3:
      "По любым вопросам пишите на admission@teamuni.uz или звоните +998 78 113 08 28.",
    btn_return_home: "Вернуться на главную",
    dq_title: "Экзамен аннулирован",
    dq_text:
      "Вы были отстранены от экзамена за многократное переключение окон/вкладок. Это считается нарушением правил экзамена.",
    dq_status: "Статус",
    dq_reason: "Причина",
    dq_reason_val: "Переключение вкладок (3 нарушения)",
    warn_title: "Внимание!",
    warn_default: "Вы переключились на другое окно.",
    btn_understand: "Понятно",
    confirm_cancel: "Отмена",
    confirm_ok: "Подтвердить",
    submit_confirm: "Сдать экзамен? Это действие нельзя отменить.",
    exit_confirm: "Вы уверены, что хотите выйти? Весь прогресс будет потерян.",
    toast_required: "Пожалуйста, заполните все обязательные поля.",
    toast_date: "Пожалуйста, выберите дату экзамена.",
    toast_type: "Пожалуйста, выберите тип экзамена.",
    toast_word_first: "Сначала выберите слово",
    toast_menu: "Меню открыто",
    math_exam_label: "ЭКЗАМЕН ПО МАТЕМАТИКЕ",
    eng_exam_label: "ЭКЗАМЕН ПО АНГЛИЙСКОМУ",
    all_sections: "Все разделы",
    part1_title: "Часть 1 &mdash; UoE &amp; Reading",
    answered_short: "отвечено",
    question_of: "Вопрос {n} из {total}",
    review_banner: "Отвечено на {a} из {t} вопросов &#8226; отмечено: {f}",
    dc_0716: "16 Июля",
    dc_0724: "24 Июля",
    dc_0807: "7 Августа",
    dc_0813: "13 Августа",
  },
};

export function t(key: string): string {
  const p = I18N[currentLang];
  if (p && p[key] !== undefined) return p[key];
  const e = I18N.en;
  return e[key] !== undefined ? e[key] : key;
}

export function getQText<T extends object>(q: T): string {
  const r = q as Record<string, unknown>;
  if (currentLang !== "en" && r["text_" + currentLang])
    return r["text_" + currentLang] as string;
  return r.text as string;
}
export function getQOptions<T extends object>(q: T): string[] {
  const r = q as Record<string, unknown>;
  if (currentLang !== "en" && r["options_" + currentLang])
    return r["options_" + currentLang] as string[];
  return r.options as string[];
}
export function getSecTitle<T extends object>(s: T): string {
  const r = s as Record<string, unknown>;
  if (currentLang !== "en" && r["title_" + currentLang])
    return r["title_" + currentLang] as string;
  return r.title as string;
}
export function getDateLabel<T extends object>(fd: T): string {
  const r = fd as Record<string, unknown>;
  if (currentLang !== "en" && r["label_" + currentLang])
    return r["label_" + currentLang] as string;
  return r.label as string;
}

export function pad2(n: number): string {
  return n < 10 ? "0" + n : "" + n;
}

/* Spread-helpers: keep the original data-i18n / data-i18n-ph attributes while
   rendering the translated HTML exactly like the original innerHTML injection. */
export function i18nProps(key: string): {
  "data-i18n": string;
  dangerouslySetInnerHTML: { __html: string };
} {
  return { "data-i18n": key, dangerouslySetInnerHTML: { __html: t(key) } };
}
export function i18nPhProps(key: string): {
  "data-i18n-ph": string;
  placeholder: string;
} {
  return { "data-i18n-ph": key, placeholder: t(key) };
}
