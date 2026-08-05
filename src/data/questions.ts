/* Exam data ported verbatim from the original js2.html (TEAM University Exams). */

export interface ExamDate {
  date: string;
  label: string;
  label_uz?: string;
  label_ru?: string;
  subtitle: string;
  subtitle_uz?: string;
  subtitle_ru?: string;
  isTest?: boolean;
}

export interface FaqItem {
  q: string;
  a: string;
}

export interface Question {
  num: number;
  text: string;
  text_uz?: string;
  text_ru?: string;
  options?: string[];
  options_uz?: string[];
  options_ru?: string[];
  correct?: number | string;
  image?: string;
  maxWords?: number;
  keywords?: string[];
}

export interface Passage {
  title?: string;
  text: string;
  questions?: Question[];
}

export interface WordItem {
  label: string;
  text: string;
}

export interface WritingTask {
  num: number;
  title: string;
  marks: number;
  minWords: number;
  prompt: string;
}

export interface Section {
  type: string;
  title: string;
  title_uz?: string;
  title_ru?: string;
  instruction?: string;
  passages?: Passage[];
  passage?: string | Passage;
  words?: WordItem[];
  questions?: Question[];
  correctMapping?: number[];
  tasks?: WritingTask[];
}

export const EXAM_DATES: ExamDate[] = [
  {
    date: "Now",
    label: "Try Today",
    label_uz: "Bugun sinab ko'ring",
    label_ru: "Попробуйте сегодня",
    subtitle: "Immediate Access",
    subtitle_uz: "Darhol kirish",
    subtitle_ru: "Мгновенный доступ",
    isTest: true,
  },
  {
    date: "2026-07-24",
    label: "July 24, 2026",
    label_uz: "2026-yil 24 Iyul",
    label_ru: "24 Июля 2026",
    subtitle: "Exams Day",
    subtitle_uz: "Imtihon kuni",
    subtitle_ru: "День экзамена",
  },
  {
    date: "2026-08-07",
    label: "August 7, 2026",
    label_uz: "2026-yil 7 Avgust",
    label_ru: "7 Августа 2026",
    subtitle: "Exams Day",
    subtitle_uz: "Imtihon kuni",
    subtitle_ru: "День экзамена",
  },
  {
    date: "2026-08-13",
    label: "August 13, 2026",
    label_uz: "2026-yil 13 Avgust",
    label_ru: "13 Августа 2026",
    subtitle: "Exams Day",
    subtitle_uz: "Imtihon kuni",
    subtitle_ru: "День экзамена",
  },
];
export const BITRIX24_WEBHOOK_URL =
  "https://teamuni.bitrix24.ru/rest/129/7o3qxas6wu7bvxsr/crm.lead.add.json";
export const UF_EXAM_TYPE = "UF_CRM_1784278080";
export const UF_EXAM_SCORE = "UF_CRM_1784278263";
export const UF_EXAM_TOTAL = "UF_CRM_1784278598";
export const UF_EXAM_SECTIONS = "UF_CRM_1784278707";

export const faqData: FaqItem[] = [
  {
    q: "What do I need to take the exam?",
    a: "You need a stable internet connection, a quiet environment, and a fully charged device. Make sure you have your registration details ready.",
  },
  {
    q: "Can I change my answers?",
    a: "Yes, you can navigate back and forth between questions and change your answers at any time before submitting the exam.",
  },
  {
    q: "What happens if time runs out?",
    a: "The exam will be automatically submitted with your current answers. Please manage your time wisely during the examination.",
  },
  {
    q: "Is the exam available in multiple languages?",
    a: "Yes! The exam interface is available in English, Uzbek and Russian — use the language selector at the top of the page. Note: English exam questions always remain in English.",
  },
  {
    q: "How do I report a technical failure?",
    a: "If you experience any technical issues during the exam, please contact our support team immediately at admission@teamuni.uz or call +998 78 113 08 28.",
  },
];

export const faqDataUZ: FaqItem[] = [
  {
    q: "Imtihon topshirish uchun nima kerak?",
    a: "Barqaror internet aloqasi, tinch muhit va to'liq zaryadlangan qurilma kerak. Ro'yxatdan o'tish ma'lumotlaringizni tayyorlab qo'ying.",
  },
  {
    q: "Javoblarimni o'zgartira olamanmi?",
    a: "Ha, savollar orasida erkin harakatlanishingiz va imtihonni topshirishdan oldin istalgan vaqtda javoblaringizni o'zgartirishingiz mumkin.",
  },
  {
    q: "Vaqt tugab qolsa nima bo'ladi?",
    a: "Imtihon joriy javoblaringiz bilan avtomatik topshiriladi. Imtihon davomida vaqtni to'g'ri taqsimlang.",
  },
  {
    q: "Imtihon bir necha tildami?",
    a: "Ha! Imtihon interfeysi ingliz, o'zbek va rus tillarida mavjud — sahifa yuqorisidagi til tanlagich orqali almashtirishingiz mumkin. Eslatma: ingliz tili imtihonining savollari har doim ingliz tilida bo'ladi.",
  },
  {
    q: "Texnik muammo yuzaga kelsa kimga murojaat qilaman?",
    a: "Imtihon paytida texnik muammolar yuzaga kelsa, darhol admission@teamuni.uz manziliga yozing yoki +998 78 113 08 28 raqamiga qo'ng'iroq qiling.",
  },
];
export const faqDataRU: FaqItem[] = [
  {
    q: "Что мне нужно для сдачи экзамена?",
    a: "Стабильное интернет-соединение, тихая обстановка и полностью заряженное устройство. Подготовьте свои регистрационные данные.",
  },
  {
    q: "Могу ли я изменить свои ответы?",
    a: "Да, вы можете свободно переходить между вопросами и изменять ответы в любое время до отправки экзамена.",
  },
  {
    q: "Что будет, если время истечёт?",
    a: "Экзамен будет автоматически отправлен с вашими текущими ответами. Пожалуйста, грамотно распределяйте время во время экзамена.",
  },
  {
    q: "Доступен ли экзамен на нескольких языках?",
    a: "Да! Интерфейс экзамена доступен на английском, узбекском и русском языках — переключить язык можно в селекторе вверху страницы. Обратите внимание: вопросы экзамена по английскому языку всегда остаются на английском.",
  },
  {
    q: "Как сообщить о технической неполадке?",
    a: "Если во время экзамена возникнут технические проблемы, немедленно свяжитесь с нашей службой поддержки по адресу admission@teamuni.uz или позвоните по номеру +998 78 113 08 28.",
  },
];

const q2_q3 =
  "The three major challenges facing humanity in our time are food, all of which is (Q2) …… plants as a source of energy production, energy, a source of whose production plants are, and environmental degradation, and they are intimately involved in climate change and a major factor in a variety of environmental concerns, with none independent of (Q3) ……, so plant research is instrumental in addressing all of these problems and moving into the future.";
const q4_q5 =
  "A herbal is a book of plants, describing their appearance, their properties and how they may be used for preparing ointments and medicines. The medical use of plants is recorded on fragments of papyrus and clay tablets from ancient Egypt, Samaria and China (Q4) …… date back 5,000 years but document traditions far older still. Over 700 herbal remedies were detailed in the Papyrus Ebers, an Egyptian text written in 1500 BC. Around 65 BC, a Greek physician called Dioscorides wrote a herbal that was translated into Latin and Arabic. Known as ‘De materia medica’, it became (Q5) …… work on medicinal plants in both Christian and Islamic worlds until the late 17th century.";
const q6_q10 =
  "Australia and New Zealand have many common links. Both countries were recently settled by Europeans, are predominantly English speaking and in that sense, share (Q6) …… common cultural heritage. Although in close proximity to one another, both countries are geographically isolated and have small populations (Q7) …… world standards. They have similar histories and enjoy close relations on many fronts. In terms of population characteristics, Australia and New Zealand have (Q8) …… in common. Both countries have minority indigenous populations, and during the latter half of the 20th century have seen a steady stream of migrants from a variety of regions throughout the world. Both countries have experienced similar (Q9) …… in fertility since the high levels recorded during the baby boom, and alongside this have enjoyed the benefits of continually improving life expectancy. One consequence of these trends (Q10) …… that both countries are faced with an ageing population, and the associated challenge of providing appropriate care and support for this growing group within the community.";
export const englishSections: Section[] = [
  {
    type: "grammar",
    title: "Grammar",
    instruction: "Choose the correct answer.",
    passages: [{ text: "" }, { text: "" }, { text: "" }, { text: "" }],
    questions: [
      {
        num: 1,
        text: "The free market is (Q1) _____ competitive and companies are constantly trying to gain an edge over their rivals. Merchandizing and brand image play a major role in attracting customers, but they often lead to over-packaging.",
        options: ["severely", "slowly", "extremely", "also"],
        correct: 2,
      },
      {
        num: 2,
        text: q2_q3,
        options: ["produced by", "made to", "have shown", "invented in"],
        correct: 0,
      },
      {
        num: 3,
        text: q2_q3,
        options: ["another", "other", "each", "each other"],
        correct: 3,
      },
      {
        num: 4,
        text: q4_q5,
        options: ["who", "that", "and", "what"],
        correct: 1,
      },
      {
        num: 5,
        text: q4_q5,
        options: [
          "influential",
          "more influential",
          "most influential",
          "the most influential",
        ],
        correct: 3,
      },
      { num: 6, text: q6_q10, options: ["-", "a", "an", "the"], correct: 1 },
      {
        num: 7,
        text: q6_q10,
        options: ["by", "on", "over", "under"],
        correct: 0,
      },
      {
        num: 8,
        text: q6_q10,
        options: ["much", "many", "more", "most"],
        correct: 0,
      },
      {
        num: 9,
        text: q6_q10,
        options: ["usage", "branch", "declines", "improve"],
        correct: 2,
      },
      {
        num: 10,
        text: q6_q10,
        options: ["-", "is", "were", "are"],
        correct: 1,
      },
    ],
  },
  {
    type: "wordbank",
    title: "Word Bank",
    instruction:
      "Read the text below and choose the correct word (A-H) for each space (11-15). Note: There are THREE words which you do not need to use.",
    passage:
      "Spanish is spoken by more than 300 million people in over 20 countries and is rapidly becoming one of the most popular [Q11] for language learners around the world. A popular course for beginners, Suenos World Spanish is designed to meet the varied needs of adult learners, [Q12] learning at home or in a class. From the very beginning it encourages you to develop your listening and speaking skills with confidence and [Q13] many opportunities to practice reading in Spanish. Using the extensive [Q14] of media available, from the course book to the audio CDs or cassettes, to the popular accompanying television series and free online [Q15], Suenos World Spanish can help you reach the equivalent level of a first qualification, such as GCSE.",
    words: [
      { label: "A", text: "majority" },
      { label: "B", text: "activities" },
      { label: "C", text: "provides" },
      { label: "D", text: "widely" },
      { label: "E", text: "choices" },
      { label: "F", text: "whether" },
      { label: "G", text: "range" },
      { label: "H", text: "choose" },
    ],
    questions: [
      { num: 11, text: "Q11" },
      { num: 12, text: "Q12" },
      { num: 13, text: "Q13" },
      { num: 14, text: "Q14" },
      { num: 15, text: "Q15" },
    ],
    correctMapping: [4, 5, 2, 6, 1],
  },
  {
    type: "reading",
    title: "Reading",
    instruction: "Read the text and answer the questions below.",
    passages: [
      {
        title: "International Students in Australia",
        text: "Australia has emerged as a premier destination for international students seeking high-quality education in a multicultural environment. The influx of international students has significantly contributed to the diversity and richness of Australia's educational landscape, fostering cross-cultural exchange and global perspectives within academic institutions across the country. One of the key attractions for international students in Australia is the reputation of its universities and vocational institutions for excellence in teaching and research. Australian universities consistently rank among the top institutions globally, offering a wide range of programs and courses across various disciplines. The multicultural environment in Australian campuses provides international students with opportunities to interact with peers from diverse cultural backgrounds, facilitating intercultural understanding and collaboration. This exposure to different perspectives enriches the learning experience and prepares students for success in an increasingly interconnected world. International students contribute significantly to the Australian economy through tuition fees, accommodation expenses, and expenditure on goods and services. Their presence also supports local communities, particularly in areas with higher concentrations of educational institutions, stimulating economic growth and creating employment opportunities. However, international students may face challenges such as language barriers, cultural adjustment, and homesickness. Adequate support services and resources are essential to ensure their well-being and academic success while studying in Australia. International students play a vital role in enhancing Australia's educational landscape, bringing diversity, talent, and global perspectives to academic institutions nationwide. By fostering an inclusive and supportive environment, Australia can continue to attract and retain international students, contributing to the country's reputation as a leading destination for higher education.",
        questions: [
          {
            num: 16,
            text: 'What does the word "influx" mean in the context of the text?',
            options: [
              "A decrease in the number of international students",
              "A sudden surge or arrival of international students",
              "A gradual decline in educational opportunities",
              "A reduction in the quality of academic institutions",
            ],
            correct: 1,
          },
          {
            num: 17,
            text: "What is one of the primary reasons why international students choose Australia for their education?",
            options: [
              "The availability of cheap housing options",
              "The presence of exotic wildlife",
              "The reputation of universities and vocational institutions",
              "The abundance of fast-food restaurants",
            ],
            correct: 2,
          },
          {
            num: 18,
            text: "What challenges might international students encounter while studying in Australia?",
            options: [
              "Limited access to academic resources",
              "Difficulty in adapting to the local culture",
              "A lack of employment opportunities",
              "Ease of communication with peers",
            ],
            correct: 1,
          },
        ],
      },
      {
        title: "Global Impact of COVID-19",
        text: "According to recent data from the World Health Organization (WHO), COVID-19 has resulted in over 5 million deaths worldwide, with millions more experiencing long-term health complications. Additionally, the economic fallout has been staggering, with the International Monetary Fund (IMF) estimating global GDP losses of around 4.5 trillion dollars. In the wake of the pandemic, unemployment rates soared, reaching historic highs in many countries. The International Labour Organization (ILO) reports that over 200 million people lost their jobs globally, exacerbating income inequality and pushing millions into poverty. Furthermore, the pandemic exacerbated existing disparities in access to healthcare and education, particularly in low-income and marginalized communities. UNESCO highlights that over 1.5 billion students experienced disruptions to their education, exacerbating learning inequalities. As countries navigate the post-pandemic landscape, efforts are underway to rebuild economies, strengthen healthcare systems, and address the socio-economic fallout. However, the road to recovery remains fraught with challenges, requiring coordinated global action, innovation, and resilience to mitigate the long-term impacts of the pandemic and build a more equitable and resilient future.",
        questions: [
          {
            num: 19,
            text: "What is the estimated global GDP loss due to the economic fallout of COVID-19, according to the International Monetary Fund (IMF)?",
            options: [
              "Around 1 trillion dollars",
              "Around 2.5 trillion dollars",
              "Around 4.5 trillion dollars",
              "Around 7 trillion dollars",
            ],
            correct: 2,
          },
          {
            num: 20,
            text: "What is emphasized as necessary for navigating the post-pandemic landscape in the text?",
            options: [
              "Coordinated global action, innovation, and resilience",
              "Increased reliance on individual countries efforts",
              "Isolation and withdrawal from global cooperation",
              "Avoiding any further economic investments",
            ],
            correct: 0,
          },
        ],
      },
    ],
  },

  {
    type: "shortanswer",
    title: "Short Answer",
    instruction:
      "Read the text and complete the sentences below. Use MAXIMUM THREE WORDS. NB: If more than three words are used, the answer will be marked as INCORRECT.",
    passage: {
      title: "Technology in Modern Society",
      text: "In the modern era, technology has become an integral part of our daily lives, revolutionizing the way we communicate, work, and interact with the world around us. From the advent of smartphones to the rise of artificial intelligence, technological advancements have reshaped society in profound ways. It is important to mention that the explorations of the multifaceted impact of technology on modern society is huge. Firstly, technology has greatly enhanced communication, allowing people to connect instantaneously across vast distances. Social media platforms and messaging apps have facilitated global connectivity, enabling individuals to share ideas, experiences, and information in real-time. Technology has revolutionized various industries, leading to increased efficiency and productivity. Automation and digitalization have transformed manufacturing processes, while e-commerce platforms have revolutionized the way we shop and conduct business. However, the pervasive influence of technology also raises concerns regarding privacy, cybersecurity, and social inequality. The proliferation of digital devices has led to heightened vulnerabilities, with personal data often at risk of exploitation. Additionally, technological advancements have widened the gap between those who have access to resources and those who do not, exacerbating societal disparities. While technology has undoubtedly brought about numerous benefits, its impact on modern society is complex and far-reaching. As we navigate the digital age, it is imperative to critically examine the implications of technological progress and strive for a balanced integration that promotes inclusivity, security, and ethical use.",
    },
    questions: [
      {
        num: 21,
        text: "Technological advancements have fundamentally transformed society by revolutionizing communication, work, and interaction, permeating every aspect of modern life from smartphones to _____.",
        maxWords: 3,
        keywords: ["artificial intelligence", "AI"],
      },
      {
        num: 22,
        text: "Technology has improved communication by letting people connect instantly across long distances through _____ and messaging apps.",
        maxWords: 3,
        keywords: ["social media", "social media platforms"],
      },
      {
        num: 23,
        text: "Technology has greatly changed _____, making things work faster and better.",
        maxWords: 3,
        keywords: ["various industries", "industries"],
      },
      {
        num: 24,
        text: "Technology makes some people worried because it can make it easier for others to see our _____ and make us less safe online.",
        maxWords: 3,
        keywords: ["personal data", "data"],
      },
      {
        num: 25,
        text: "Technology has lots of _____, but it's important to think carefully about how we use it so that everyone can be included, stay safe, and use it in the right way.",
        maxWords: 3,
        keywords: ["benefits", "advantages"],
      },
    ],
  },
  {
    type: "tfng",
    title: "True / False / Not Given",
    instruction:
      "Read the text below. In questions 26-30, write TRUE (if the statement agrees with the text), FALSE (if the statement contradicts the information) or NOT GIVEN (if there is no information on this).",
    passage: {
      title: "The 2008 Economic Crisis",
      text: "The 2008 economic collapse, often referred to as the Great Recession, stands as one of the most significant financial crises of modern times, sending shockwaves across the globe. Triggered primarily by the collapse of the housing market bubble in the United States, its ramifications reverberated throughout the world economy, leading to widespread unemployment, home foreclosures, and a plunge in consumer confidence. In the United States alone, the housing market crash wiped out trillions of dollars in wealth. According to the U.S. Federal Reserve, home prices plummeted by 30% in some regions, leaving many homeowners with mortgages worth more than their homes. This, coupled with the proliferation of subprime mortgages and the subsequent spike in mortgage defaults, contributed to the collapse of major financial institutions such as Lehman Brothers and Bear Stearns. Unemployment soared to staggering levels. By October 2009, the U.S. unemployment rate had reached a peak of 10%, with millions of Americans losing their jobs. The ripple effects were felt globally, with unemployment rates climbing in numerous countries as demand for goods and services plummeted. Stock markets experienced unprecedented volatility, with the Dow Jones Industrial Average dropping over 50% from its peak in 2007 to its trough in 2009. Investor confidence shattered as financial institutions faced insolvency, leading to widespread panic selling and further exacerbating the crisis. Governments around the world scrambled to implement bailout packages and stimulus measures to stabilize their economies. The U.S. government enacted the Troubled Asset Relief Program (TARP), injecting hundreds of billions of dollars into struggling financial institutions to prevent further collapse. The 2008 economic collapse serves as a stark reminder of the interconnectedness of the global economy and the devastating consequences of unchecked speculation and risky financial practices. It took years for economies to recover fully from the fallout, leaving a lasting impact on individuals, businesses, and governments worldwide.",
    },
    questions: [
      {
        num: 26,
        text: "The 2008 economic collapse was primarily caused by a housing market bubble in Europe.",
        correct: "false",
      },
      {
        num: 27,
        text: "The housing market crash in the United States resulted in the loss of billions of dollars.",
        correct: "notgiven",
      },
      {
        num: 28,
        text: "The Dow Jones Industrial Average experienced a slight increase during the 2008 economic collapse.",
        correct: "false",
      },
      {
        num: 29,
        text: "Governments worldwide were slow to respond to the 2008 economic collapse.",
        correct: "notgiven",
      },
      {
        num: 30,
        text: "The Troubled Asset Relief Program (TARP) was enacted by the U.S. government to bail out struggling financial institutions.",
        correct: "true",
      },
    ],
  },
  {
    type: "writing",
    title: "Writing",
    tasks: [
      {
        num: 1,
        title: "Writing Task 1",
        marks: 15,
        minWords: 100,
        prompt:
          "You are having a party and want to invite your friend from a different city. Write a letter to your friend. In your letter: - Describe why you are having the party; - Give directions on how to get to the venue; - Suggest how can accommodate him/her. Write at least 100 words.",
      },
      {
        num: 2,
        title: "Writing Task 2",
        marks: 25,
        minWords: 200,
        prompt:
          "Parents are the best teachers. Do you agree or disagree? Give reasons for your answer. Express your ideas in 200-250 words.",
      },
    ],
  },
];

export const mathSections: Section[] = [
  {
    title: "Basic Mathematics",
    title_uz: "Boshlang'ich matematika",
    title_ru: "Базовая математика",
    type: "mcq",
    questions: [
      {
        num: 1,
        text: "Perform the division with remainder of 55/7 and find the sum of the quotient and remainder.",
        options: ["6", "7", "13", "15"],
        correct: 2,
        text_uz:
          "55:7 Qoldiqli boʻlishni bajaring va toʻliqsiz boʻlinma va qoldiq yigʻindisini toping.",
        text_ru:
          "55:7 Выполните деление с остатком и найдите сумму неполного деления и остатка.",
      },
      {
        num: 2,
        text: "How many mm² are there in 1 cm²?",
        options: ["10", "100", "1000", "10000"],
        correct: 1,
        text_uz: "1 cm² necha mm² ga teng?",
        text_ru: "Сколько mm² составляет 1 cm²?",
      },
      {
        num: 3,
        text: "The numbers 1, 2, 3, and 4 are placed into the following shapes. Numbers 1 and 3 are not inside the circle. Number 2 is located between numbers 1 and 3. If the circle contains 4, which number is in the square?",
        image:
          "https://static.tildacdn.com/tild3736-3539-4234-b337-383432663238/3.png",
        options: ["1", "2", "3", "4"],
        correct: 1,
        text_uz:
          "Quyidagi shakllarga 1, 2, 3 va 4 sonlari yozilgan. 1 va 3 sonlari aylanada emas. 2 soni 1 va 3 sonlari orasida joylashgan. Aylanada 4 yozilgan boʻlsa kvadratda qanday son yozilgan?",
        text_ru:
          "Цифры 1, 2, 3 и 4 записываются в следующих фигурках. Цифры 1 и 3 не записаны в кружочке. Число 2 находится между числами 1 и 3. Если в кружочке написано 4, то какое число будет в квадрате?",
      },
      {
        num: 4,
        text: "How many zeros does the product of all integers from 13 to 27 end with?",
        options: ["3", "4", "5", "6"],
        correct: 1,
        text_uz:
          "13 dan 27 gacha boʻlgan sonlar koʻpaytmasi nechta nol bilan tugaydi?",
        text_ru:
          "Определите количество нулей, которыми оканчивается произведение чисел от 13 до 27.",
      },
      {
        num: 5,
        text: "Compare: 2 minutes 10 seconds and 130 seconds.",
        options: [">", "<", "=", "No correct answer"],
        correct: 2,
        text_uz: "Taqqoslang: 2 minut 10 sekund va 130 sekund.",
        text_ru: "Сравните: 2 минуты 10 секунд и 130 секунд.",
        options_uz: [">", "<", "=", "Toʻgʻri javob berilmagan"],
        options_ru: [">", "<", "=", "Нет верного ответа"],
      },
      {
        num: 6,
        text: "Which number is missing in the sequence?",
        image:
          "https://static.tildacdn.com/tild6335-6464-4461-a362-323165313962/6.png",
        options: ["5", "6", "7", "8"],
        correct: 2,
        text_uz: "Ketma-ketlikda tushirib qoldirilgan son qaysi?",
        text_ru: "Какое число пропущено в данной последовательности?",
      },
      {
        num: 7,
        text: "Akbar thought of a number. He multiplied it by 5, then added 2024 to the result. After that, he subtracted 24 and obtained 3000. Find the number Akbar thought of.",
        options: ["150", "200", "1000", "5000"],
        correct: 1,
        text_uz:
          "Akbar bir son oʻyladi. Uni 5 ga koʻpaytirdi, hosil boʻlgan yangi songa 2024 ni qoʻshdi. Soʻngra 24 ni ayirdi. Natijada 3000 hosil boʻldi. Akbar oʻylagan sonni toping.",
        text_ru:
          "Акбар задумал число. Он увеличил это число в 5 раз, потом к получившемуся числу прибавил 2024. После он отнял от этого числа 24. В итоге он получил 3000. Найдите число, которое задумал Акбар.",
      },
      {
        num: 8,
        text: "The products of the numbers written inside the squares and the circles are equal. Find the number that should replace the question mark.",
        image:
          "https://static.tildacdn.com/tild6132-3762-4134-a533-353734303839/9.png",
        options: ["3", "4", "5", "6"],
        correct: 1,
        text_uz:
          "Kvadratlar va aylanalar ichida yozilgan sonlar koʻpaytmasi teng. U holda ? oʻrnida turgan sonni toping.",
        text_ru:
          "Произведение чисел, записанных в квадратах и кружках, равно. Найдите число, которое должно быть вместо вопросительного знака.",
      },
      {
        num: 9,
        text: "What number will be obtained if the smallest three-digit odd number is added to the largest two-digit even number?",
        options: ["100", "199", "200", "299"],
        correct: 1,
        text_uz:
          "Eng katta ikki xonali juft songa eng kichik uch xonali toq son qoʻshilsa qaysi son hosil boʻladi?",
        text_ru:
          "Какое число получится, если к наименьшему трехзначному нечетному числу прибавить наибольшее двузначное четное число?",
      },
      {
        num: 10,
        text: "Find the pattern and determine the value of A.",
        image:
          "https://static.tildacdn.com/tild6531-3534-4335-b131-363839316630/10.png",
        options: ["50", "51", "54", "57"],
        correct: 2,
        text_uz:
          "Ketma-ketlikdagi qonuniyatni aniqlab, A ning oʻrnida qaysi son turganini toping.",
        text_ru: "Найдите A из последовательности:",
      },
    ],
  },
  {
    title: "Intermediate Mathematics",
    title_uz: "O'rta darajadagi matematika",
    title_ru: "Математика среднего уровня",
    type: "mcq",
    questions: [
      {
        num: 11,
        text: "Which of the following numbers is prime?",
        options: ["13151", "45¹⁰³ − 1", "10¹⁰ + 1", "20¹⁰ + 1"],
        correct: 0,
        text_uz: "Qaysi biri tub son?",
        text_ru: "Какое число является простым?",
      },
      {
        num: 12,
        text: "If a and b are non-zero digits, find the value of (ababab) ÷ (ab).",
        options: ["10001", "10010", "10100", "10101"],
        correct: 3,
        text_uz:
          "a va b noldan farqli raqamlar boʻlsa, ababab sonini ab songa boʻlgandagi natijani toping.",
        text_ru:
          "Если a и b — ненулевые цифры, найдите результат деления ababab на ab.",
      },
      {
        num: 13,
        text: "Climbing Mount Fuji is allowed only from July 1 to August 27 each year. During this period, approximately 200,000 people climb Mount Fuji. On average, how many people climb Mount Fuji each day?",
        options: ["340", "710", "3400", "7400"],
        correct: 2,
        text_uz:
          "Har yili faqatgina 1-iyuldan 27-avgustga qadar Fudziyama togʻiga chiqishga ruxsat beriladi. Ayni shu vaqt mobaynida taxminan 200 000 nafar odam Fudziyama togʻiga koʻtariladi. Oʻrtacha har kuni nechta odam Fudziyama togʻiga koʻtariladi?",
        text_ru:
          "На гору Фудзи разрешено восхождение только с 1 июля по 27 августа каждого года. За это время на гору Фудзияму поднялось около 200 000 человек. В среднем сколько человек ежедневно поднимается на гору Фудзи?",
      },
      {
        num: 14,
        text: "Calculate the value of the expression: ",
        image:
          "https://static.tildacdn.com/tild6264-3137-4437-b065-376565656363/image.png",
        options: ["2400", "2025", "2024", "2000"],
        correct: 2,
        text_uz: "Ushbu ifodaning qiymatini hisoblang:",
        text_ru: "Вычислите значение этого выражения:",
      },
      {
        num: 15,
        text: "Find the difference between the smallest four-digit number and the largest three-digit number.",
        options: ["9000", "1000", "999", "1"],
        correct: 3,
        text_uz:
          "Eng kichik toʻrt xonali son va eng katta uch xonali sonning farqini toping.",
        text_ru:
          "Найдите разницу между наименьшим четырехзначным числом и наибольшим трехзначным числом.",
      },
      {
        num: 16,
        text: "On the coordinate plane, draw a quadrilateral with vertices at A(5,3), B(-2,3), C(-2,-3), D(5,-3). What kind of quadrilateral is it? Find its area and perimeter.",
        options: [
          "Rectangle; S = 36 square units; P = 24 units",
          "Square; S = 49 square units; P = 28 units",
          "Rectangle; S = 42 square units; P = 26 units",
          "Rectangle; S = 56 square units; P = 30 units",
        ],
        correct: 2,
        text_uz:
          "Koordinata tekisligida uchlari A(5;3), B(-2;3), C(-2;-3), D(5;-3) nuqtalarda boʻlgan toʻrtburchak chizing. Bu qanday toʻrtburchak boʻladi? Uning yuzini va perimetrini hisoblang.",
        text_ru:
          "На координатной плоскости нарисуйте четырехугольник с вершинами в точках A(5;3), B(-2;3), C(-2;-3), D(5;-3). Что это будет за четырехугольник? Вычислите его площадь и периметр.",
        options_uz: [
          "Toʻgʻri toʻrtburchak; S = 36 kvadrat birlik; P = 24 birlik",
          "Kvadrat; S = 49 kvadrat birlik; P = 28 birlik",
          "Toʻgʻri toʻrtburchak; S = 42 kvadrat birlik; P = 26 birlik",
          "Toʻgʻri toʻrtburchak; S = 56 kvadrat birlik; P = 30 birlik",
        ],
        options_ru: [
          "Прямоугольник; S = 36 кв. ед.; P = 24 ед.",
          "Квадрат; S = 49 кв. ед.; P = 28 ед.",
          "Прямоугольник; S = 42 кв. ед.; P = 26 ед.",
          "Прямоугольник; S = 56 кв. ед.; P = 30 ед.",
        ],
      },
      {
        num: 17,
        text: "How many times greater is the number 1:(2:3) than 1:2:3?",
        options: ["-4/3", "0", "4/3", "9"],
        correct: 3,
        text_uz: "1:(2:3) soni 1:2:3 sonidan necha marta katta?",
        text_ru: "Во сколько раз число 1:(2:3) больше числа 1:2:3?",
      },
      {
        num: 18,
        text: "When spectators entered the theater in groups of 2, 4, 8, and 11, each time one spectator remained outside. What is the smallest possible number of spectators?",
        options: ["99", "89", "43", "17"],
        correct: 1,
        text_uz:
          "Tomoshabinlar teatr binosiga 2 tadan, 4 tadan, 8 tadan, 11 tadan kiritilganda har gal tashqarida bir tomoshabin qolgan. Eng kamida nechta tomoshabin boʻlgan?",
        text_ru:
          "Когда зрители входили в театр группами по 2, 4, 8, 11 человек, один зритель оставался снаружи. Определите минимальное возможное количество зрителей.",
      },
      {
        num: 19,
        text: "Find the last digit of the sum: \n 5²⁰²⁴ + 7²⁰²⁴",
        options: ["2", "4", "6", "8"],
        correct: 2,
        text_uz: "Yigʻindining oxirgi raqamini toping:\n 5²⁰²⁴ + 7²⁰²⁴",
        text_ru: "Найдите последнюю цифру суммы:\n 5²⁰²⁴ + 7²⁰²⁴",
      },
      {
        num: 20,
        text: "If the ratio of the number of boys to the total number of students in a class is 4/7, what is the ratio of the number of girls to the number of boys?",
        options: ["4/3", "3/4", "3/7", "3/11"],
        correct: 1,
        text_uz:
          "Sinfda oʻqiydigan oʻgʻil bolalar sonining barcha oʻquvchilar soniga nisbati 4/7 kabi boʻlsa, qiz bolalar sonining oʻgʻil bolalar soniga nisbati nechaga teng boʻladi?",
        text_ru:
          "Каково отношение количества девочек к количеству мальчиков, если отношение количества мальчиков к общему количеству учеников в классе составляет 4/7?",
      },
    ],
  },
  {
    title: "Advanced Mathematics",
    title_uz: "Yuqori darajadagi matematika",
    title_ru: "Продвинутая математика",
    type: "mcq",
    questions: [
      {
        num: 21,
        text: "Find the unknown angle.",
        image:
          "https://static.tildacdn.com/tild6636-6162-4639-b363-316338663933/1.png",
        options: ["x = 30°", "x = 35°", "x = 45°", "x = 50°"],
        correct: 2,
        text_uz: "Nomaʼlum burchakni toping:",
        text_ru: "Найдите неизвестный угол.",
      },
      {
        num: 22,
        text: "Find the largest prime divisor of the sum of the three-digit numbers abc, cab, and bca.",
        options: ["31", "37", "47", "53"],
        correct: 1,
        text_uz:
          "Uch xonali abc, cab va bca sonlar yigʻindisining boʻluvchilari ichida eng katta tub sonni toping.",
        text_ru:
          "Найдите наибольшее простое число среди делителей суммы трехзначных чисел abc, cab и bca.",
      },
      {
        num: 23,
        text: "Find the unknown angle.",
        image:
          "https://static.tildacdn.com/tild3835-3736-4466-b562-633161393461/3.png",
        options: ["x = 95°", "x = 100°", "x = 105°", "x = 120°"],
        correct: 2,
        text_uz: "Nomaʼlum burchakni toping:",
        text_ru: "Найдите неизвестный угол.",
      },
      {
        num: 24,
        text: "An athlete started a running training program on Tuesday by running 1350 m. Each following day, he ran 180 m more than the previous day. He finished the training program on the day when he ran 4410 m. On which day of the week did he finish the program?",
        options: ["Wednesday", "Thursday", "Friday", "Saturday"],
        correct: 2,
        text_uz:
          "Sportchi seshanba kuni yugurish mashgʻulotini boshlab, 1350 m masofani yugurdi. Keyingi har bir kuni oldingisidan 180 m koʻproq yugurdi. Sportchi 4410 m yugurgan kuni mashgʻulotni tugatdi. Sportchi haftaning qaysi kunida mashgʻulotni tugatgan?",
        text_ru:
          "Спортсмен приступил к беговому тренировочному курсу во вторник и пробежал дистанцию 1350 м. Каждый день он пробегал на 180 м больше, чем в предыдущий день. Спортсмен завершил тренировочный курс в тот день, когда пробежал 4410 м. В какой день недели спортсмен закончил курс?",
        options_uz: ["Chorshanba", "Payshanba", "Juma", "Shanba"],
        options_ru: ["Среда", "Четверг", "Пятница", "Суббота"],
      },
      {
        num: 25,
        text: "The price of a product was increased twice consecutively. As a result, the final price became 124% higher than the original price. If the first increase was 60%, by what percentage was the price increased the second time?",
        options: ["56", "40", "30", "25"],
        correct: 1,
        text_uz:
          "Mahsulotning narxi ketma-ket ikki marta oshirilgach, yangi narx dastlabkisidan 124% yuqori boʻldi. Narx birinchi marta 60% oshirilgan boʻlsa, ikkinchi marta necha foizga oshirilgan?",
        text_ru:
          "После того как цена на товар была повышена дважды подряд, новая цена выросла на 124% от первоначальной. Если в первый раз цена выросла на 60%, на сколько процентов она увеличилась во второй раз?",
      },
      {
        num: 26,
        text: "Simplify the expression: ",
        image:
          "https://static.tildacdn.com/tild3839-6635-4563-b238-366564333764/6.png",
        options: ["(a+b)/ab", "(a-b)/ab", "ab/(a-b)", "ab/(a+b)"],
        correct: 3,
        text_uz: "Soddalashtiring:",
        text_ru: "Упростите:",
      },
      {
        num: 27,
        text: "How many three-digit numbers contain exactly one digit 7?",
        options: ["313", "213", "225", "109"],
        correct: 2,
        text_uz: "Nechta uch xonali sonda faqatgina bitta 7 raqami bor?",
        text_ru: "Сколько трехзначных чисел имеют только одну цифру 7?",
      },
      {
        num: 28,
        text: "Calculate the value of the expression: ",
        image:
          "https://static.tildacdn.com/tild6361-3334-4665-b839-316561623062/8.png",
        options: ["28", "32", "33", "29"],
        correct: 2,
        text_uz: "Ifodaning qiymatini hisoblang:",
        text_ru: "Вычислите значение выражения:",
      },
      {
        num: 29,
        text: "Find the minimum value of x³ − y².",
        image:
          "https://static.tildacdn.com/tild3665-6439-4165-b863-653534653932/9.png",
        options: ["-8", "-12", "-32", "-33"],
        correct: 3,
        text_uz: "x³ − y² ifodaning eng kichik qiymatini toping.",
        text_ru: "Найдите минимальное значение выражения x³ − y².",
      },
      {
        num: 30,
        text: "Solve the equation:",
        image:
          "https://static.tildacdn.com/tild6462-3665-4534-b965-366130646662/10.png",
        options: ["4048", "4047", "2024", "2023"],
        correct: 2,
        text_uz: "Tenglamani yeching:",
        text_ru: "Решите уравнение:",
      },
    ],
  },
  {
    title: "English",
    type: "mcq",
    questions: [
      {
        num: 31,
        text: "Choose the correct sentence:",
        options: [
          "She don't like apples.",
          "She doesn't like apples.",
          "She don't likes apples.",
          "She doesn't likes apples.",
        ],
        correct: 1,
      },
      {
        num: 32,
        text: "Choose the correct word to complete the sentence: I usually ______ at 7:00 in the morning.",
        options: ["wakes up", "waking up", "wake up", "woken up"],
        correct: 2,
      },
      {
        num: 33,
        text: "Choose the correct option: They ______ to the park yesterday.",
        options: ["go", "going", "went", "gone"],
        correct: 2,
      },
      {
        num: 34,
        text: "Choose the correct word: I have two ______.",
        options: ["childs", "children", "childs.", "childrens"],
        correct: 1,
      },
      {
        num: 35,
        text: "Choose the correct preposition: The book is ______ the table.",
        options: ["in", "on", "at", "under"],
        correct: 3,
      },
      {
        num: 36,
        text: "Choose the correct word: My brother is ______ than me.",
        options: ["taller", "tall", "tallest", "more tall"],
        correct: 0,
      },
      {
        num: 37,
        text: "Choose the correct option: I ______ a new phone last week.",
        options: ["buy", "bought", "buys", "buying"],
        correct: 1,
      },
      {
        num: 38,
        text: "Choose the correct verb form: She ______ English very well.",
        options: ["speaks", "speak", "speaking", "spoken"],
        correct: 0,
      },
      {
        num: 39,
        text: "Choose the correct form of the verb: They ______ at the moment.",
        options: ["work", "worked", "are working", "works"],
        correct: 2,
      },
      {
        num: 40,
        text: "Choose the correct pronoun: ______ is my friend, Sarah.",
        options: ["This", "These", "Those", "That"],
        correct: 3,
      },
      {
        num: 41,
        text: "Choose the correct answer: How ______ sugar do you want in your coffee?",
        options: ["many", "much", "some", "few"],
        correct: 1,
      },
      {
        num: 42,
        text: "Choose the correct form of the verb: If I ______ enough money, I would buy a new car.",
        options: ["have", "had", "has", "having"],
        correct: 1,
      },
      {
        num: 43,
        text: "Choose the correct option: She was very tired ______ she went to bed early.",
        options: ["so", "because", "but", "and"],
        correct: 0,
      },
      {
        num: 44,
        text: "Choose the correct word to complete the sentence: The film was ______ interesting that I watched it twice.",
        options: ["such", "so", "too", "very"],
        correct: 3,
      },
      {
        num: 45,
        text: "Choose the correct word: They have been living here ______ five years.",
        options: ["since", "for", "during", "from"],
        correct: 1,
      },
      {
        num: 46,
        text: "Choose the correct verb form: He suggested ______ to the park.",
        options: ["go", "to go", "going", "gone"],
        correct: 2,
      },
      {
        num: 47,
        text: "Choose the correct option: By the time we arrived, the concert ______.",
        options: ["will start", "starts", "started", "had started"],
        correct: 3,
      },
      {
        num: 48,
        text: "Choose the correct form of the verb: I wish I ______ more time to relax.",
        options: ["have", "had", "will have", "having"],
        correct: 1,
      },
      {
        num: 49,
        text: "Choose the correct word: He was ______ than I expected.",
        options: [
          "more friendly",
          "friendlier",
          "more friendlier",
          "the friendliest",
        ],
        correct: 1,
      },
      {
        num: 50,
        text: "Choose the correct preposition: I'm not very good ______ playing chess.",
        options: ["on", "in", "at", "for"],
        correct: 2,
      },
    ],
  },
];
