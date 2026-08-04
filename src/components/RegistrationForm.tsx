import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import type { Variants } from "framer-motion";
import { i18nProps, i18nPhProps } from "@/i18n";
import { useApp } from "@/store/app";
// import PhoneInput from "react-phone-number-input/input";
import "react-phone-number-input/style.css";

const EASE_OUT_EXPO: [number, number, number, number] = [0.16, 1, 0.3, 1];

const formCard: Variants = {
  hidden: { opacity: 0, y: 32, scale: 0.98 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.6,
      ease: EASE_OUT_EXPO,
      delay: 0.1,
      delayChildren: 0.2,
      staggerChildren: 0.06,
    },
  },
};

const formGroup: Variants = {
  hidden: { opacity: 0, y: 16 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: EASE_OUT_EXPO },
  },
};

function getTodayString(): string {
  return new Date().toISOString().split("T")[0];
}

function CheckIcon() {
  return (
    <svg
      className="w-4 h-4 text-green-500"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M5 13l4 4L19 7"
      />
    </svg>
  );
}

/* Selected-state check chip (decorative; .selected on the parent card stays
   the single source of truth for selection). */
function CardCheck() {
  return (
    <span className="card-check" aria-hidden="true">
      <svg
        style={{ width: "12px", height: "12px" }}
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="3"
          d="M5 13l4 4L19 7"
        />
      </svg>
    </span>
  );
}

/* Registration section: details form + date cards + exam type cards. */
export default function RegistrationForm() {
  const {
    selectedExamType,
    selectedExamDate,
    selectDate,
    selectExam,
    handleRegistration,
  } = useApp();
  const reduceMotion = useReducedMotion();
  const today = getTodayString();
  const [phoneValue, setPhoneValue] = useState<string | undefined>();

  /* past dates (before today) are disabled: not clickable, not selectable, badged */
  function isPast(d: string): boolean {
    return d !== "TEST" && d < today;
  }

  function dateCardClass(d: string, base: string): string {
    let cls = base;
    if (isPast(d)) return cls + " past";
    if (selectedExamDate === d) cls += " selected";
    return cls;
  }

  function dateCardClick(d: string): (() => void) | undefined {
    if (isPast(d)) return undefined;
    return function () {
      selectDate(d);
    };
  }

  const startEnabled = selectedExamType !== null;

  const inputClass =
    "w-full h-12 px-4 mt-1.5 rounded-[12px] border border-[#D9DFEC] bg-white text-[15px] text-slate-900 placeholder:text-slate-400 focus:outline-none";
  const labelClass =
    "text-[13px] font-semibold tracking-[0.01em] text-slate-700";

  return (
    <section id="registration" className="relative bg-[#F5F7FC] py-16 md:py-24">
      {/* subtle dot grid texture */}
      <div
        className="absolute inset-0 pointer-events-none"
        aria-hidden="true"
        style={{
          backgroundImage:
            "radial-gradient(rgba(10,31,92,.06) 1px, transparent 1px)",
          backgroundSize: "24px 24px",
          maskImage:
            "linear-gradient(180deg, transparent, black 15%, black 85%, transparent)",
          WebkitMaskImage:
            "linear-gradient(180deg, transparent, black 15%, black 85%, transparent)",
        }}
      />
      <div className="relative max-w-[800px] mx-auto px-5 md:px-6">
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={
            reduceMotion
              ? { duration: 0.01 }
              : { duration: 0.5, ease: EASE_OUT_EXPO }
          }
        >
          <div
            className="w-12 h-1 rounded-full bg-red mb-4"
            aria-hidden="true"
          />
          <h2
            className="text-navy text-[26px] md:text-[34px] font-extrabold tracking-[-0.02em] leading-[1.15]"
            {...i18nProps("reg_title")}
          />
          <p
            className="text-slate-500 text-sm mt-2 leading-[1.7]"
            {...i18nProps("reg_sub")}
          />
        </motion.div>
        <motion.form
          id="registration-form"
          className="form-highlight mt-8 space-y-6"
          onSubmit={handleRegistration}
          variants={formCard}
          initial={reduceMotion ? false : "hidden"}
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
        >
          <motion.div className="form-input-group" variants={formGroup}>
            <label className={labelClass}>
              <span {...i18nProps("label_full_name")}></span>{" "}
              <span className="text-red">*</span>
            </label>
            <input
              type="text"
              id="reg-name"
              required
              {...i18nPhProps("ph_full_name")}
              className={inputClass}
            />
          </motion.div>
          <motion.div className="form-input-group" variants={formGroup}>
            <label className={labelClass}>
              <span {...i18nProps("label_phone")}></span>{" "}
              <span className="text-red">*</span>
            </label>
            <input type="tel" id="reg-phone" required placeholder="+998 (90) 123 45 67"
              className={inputClass} />
            {/* <PhoneInput
              id="reg-phone"
              placeholder="+998 (90) 123 45 67"
              className={inputClass}
              country="UZ"
              value={phoneValue}
              required
              onBlur={(e: React.FocusEvent<HTMLInputElement>) => {
                if (!phoneValue) {
                  e.target.setCustomValidity(
                    "Please enter a valid phone number.",
                  );
                } else {
                  e.target.setCustomValidity("");
                }
              }}
              onChange={setPhoneValue}
            /> */}
          </motion.div>
          <motion.div className="form-input-group" variants={formGroup}>
            <label className={labelClass} {...i18nProps("label_email")} />
            <input
              type="email"
              id="reg-email"
              placeholder="student@example.com"
              className={inputClass}
            />
          </motion.div>
          <motion.div variants={formGroup}>
            <label className={labelClass}>
              <span {...i18nProps("label_dates")}></span>{" "}
              <span className="text-red">*</span>
            </label>
            <p
              className="text-slate-400 text-xs mt-0.5"
              {...i18nProps("label_dates_sub")}
            />
            <div
              id="date-cards"
              className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 sm:gap-3 mt-3"
            >
              <div
                className={dateCardClass("TEST", "date-card test-card")}
                data-date="TEST"
                onClick={function () {
                  selectDate("TEST");
                }}
              >
                <span className="test-badge">TEST</span>
                <CardCheck />
                <div
                  className="text-xs text-gray-400 font-medium uppercase tracking-wider"
                  {...i18nProps("date_today")}
                />
                <div
                  className="text-lg font-bold text-red mt-1"
                  {...i18nProps("date_try_now")}
                />
                <div
                  className="text-xs text-gray-500 mt-1"
                  {...i18nProps("date_immediate")}
                />
              </div>
              <div
                className={dateCardClass("2026-07-16", "date-card")}
                data-date="2026-07-16"
                onClick={dateCardClick("2026-07-16")}
              >
                {isPast("2026-07-16") && (
                  <span
                    className="past-badge"
                    {...i18nProps("date_passed")}
                  ></span>
                )}
                <CardCheck />
                <div className="text-xs text-gray-400 font-medium uppercase tracking-wider">
                  2026
                </div>
                <div
                  className="text-lg font-bold text-navy mt-1"
                  {...i18nProps("dc_0716")}
                />
                <div
                  className="text-xs text-red font-semibold mt-1"
                  {...i18nProps("date_open_doors")}
                />
              </div>
              <div
                className={dateCardClass("2026-07-24", "date-card")}
                data-date="2026-07-24"
                onClick={dateCardClick("2026-07-24")}
              >
                {isPast("2026-07-24") && (
                  <span
                    className="past-badge"
                    {...i18nProps("date_passed")}
                  ></span>
                )}
                <CardCheck />
                <div className="text-xs text-gray-400 font-medium uppercase tracking-wider">
                  2026
                </div>
                <div
                  className="text-lg font-bold text-navy mt-1"
                  {...i18nProps("dc_0724")}
                />
                <div
                  className="text-xs text-gray-500 mt-1"
                  {...i18nProps("date_exams_day")}
                />
              </div>
              <div
                className={dateCardClass("2026-08-07", "date-card")}
                data-date="2026-08-07"
                onClick={dateCardClick("2026-08-07")}
              >
                {isPast("2026-08-07") && (
                  <span
                    className="past-badge"
                    {...i18nProps("date_exams_day")}
                  ></span>
                )}
                <CardCheck />
                <div className="text-xs text-gray-400 font-medium uppercase tracking-wider">
                  2026
                </div>
                <div
                  className="text-lg font-bold text-navy mt-1"
                  {...i18nProps("dc_0807")}
                />
                <div
                  className="text-xs text-gray-500 mt-1"
                  {...i18nProps("date_exams_day")}
                />
              </div>
              <div
                className={dateCardClass("2026-08-13", "date-card")}
                data-date="2026-08-13"
                onClick={dateCardClick("2026-08-13")}
              >
                {isPast("2026-08-13") && (
                  <span
                    className="past-badge"
                    {...i18nProps("date_exams_day")}
                  ></span>
                )}
                <CardCheck />
                <div className="text-xs text-gray-400 font-medium uppercase tracking-wider">
                  2026
                </div>
                <div
                  className="text-lg font-bold text-navy mt-1"
                  {...i18nProps("dc_0813")}
                />
                <div
                  className="text-xs text-gray-500 mt-1"
                  {...i18nProps("date_exams_day")}
                />
              </div>
            </div>
            <input
              type="hidden"
              id="reg-date"
              required
              value={selectedExamDate ?? ""}
              onChange={function () {
                /* controlled hidden mirror */
              }}
            />
          </motion.div>
          <motion.div variants={formGroup}>
            <label className={labelClass}>
              <span {...i18nProps("label_exam_type")}></span>{" "}
              <span className="text-red">*</span>
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mt-3">
              <div
                className={
                  selectedExamType === "mathematics"
                    ? "exam-card selected"
                    : "exam-card"
                }
                data-exam="mathematics"
                onClick={function () {
                  selectExam("mathematics");
                }}
              >
                <CardCheck />
                <div className="exam-icon-tile">
                  <svg
                    className="w-6 h-6 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                    />
                  </svg>
                </div>
                <h3
                  className="text-navy text-xl font-bold tracking-[-0.01em] leading-[1.25]"
                  {...i18nProps("exam_math_name")}
                />
                <p
                  className="text-slate-500 text-[13px] mt-1 leading-[1.6]"
                  {...i18nProps("exam_math_desc")}
                />
                <ul className="mt-3 space-y-2">
                  <li className="flex items-center gap-2 text-[13px] text-slate-600">
                    <CheckIcon />
                    <span {...i18nProps("exam_math_a")}></span>
                  </li>
                  <li className="flex items-center gap-2 text-[13px] text-slate-600">
                    <CheckIcon />
                    <span {...i18nProps("exam_math_b")}></span>
                  </li>
                  <li className="flex items-center gap-2 text-[13px] text-slate-600">
                    <CheckIcon />
                    <span {...i18nProps("exam_math_c")}></span>
                  </li>
                  <li className="flex items-center gap-2 text-[13px] text-slate-600">
                    <CheckIcon />
                    <span {...i18nProps("exam_math_d")}></span>
                  </li>
                </ul>
              </div>
              <div
                className={
                  selectedExamType === "english"
                    ? "exam-card selected"
                    : "exam-card"
                }
                data-exam="english"
                onClick={function () {
                  selectExam("english");
                }}
              >
                <CardCheck />
                <div className="exam-icon-tile">
                  <svg
                    className="w-6 h-6 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                    />
                  </svg>
                </div>
                <h3
                  className="text-navy text-xl font-bold tracking-[-0.01em] leading-[1.25]"
                  {...i18nProps("exam_eng_name")}
                />
                <p
                  className="text-slate-500 text-[13px] mt-1 leading-[1.6]"
                  {...i18nProps("exam_eng_desc")}
                />
                <ul className="mt-3 space-y-2">
                  <li className="flex items-center gap-2 text-[13px] text-slate-600">
                    <CheckIcon />
                    <span {...i18nProps("exam_eng_p1")}></span>
                  </li>
                  <li className="flex items-center gap-2 text-[13px] text-slate-600">
                    <CheckIcon />
                    <span {...i18nProps("exam_eng_p2")}></span>
                  </li>
                  <li className="flex items-center gap-2 text-[13px] text-slate-600">
                    <CheckIcon />
                    <span {...i18nProps("exam_eng_p3")}></span>
                  </li>
                </ul>
              </div>
            </div>
          </motion.div>
          <motion.div variants={formGroup}>
            <button
              type="submit"
              id="startExamBtn"
              disabled={!startEnabled}
              className={
                "w-full h-[52px] rounded-[12px] text-[15px] font-bold tracking-[0.01em] mt-6 transition-all duration-200 flex items-center justify-center gap-2 " +
                (startEnabled
                  ? "btn-cta-enabled"
                  : "bg-[#E9EDF6] text-slate-400 cursor-not-allowed")
              }
            >
              <span {...i18nProps("btn_start_exam")} />
              <svg
                className="cta-arrow"
                style={{ width: "18px", height: "18px" }}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2.5"
                  d="M13 7l5 5-5 5M6 12h12"
                />
              </svg>
            </button>
          </motion.div>
        </motion.form>
      </div>
    </section>
  );
}
