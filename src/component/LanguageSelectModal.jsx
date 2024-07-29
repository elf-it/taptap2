import React, { useState } from "react";
import { Icon } from "./IconSprite";

export default function LanguageSelectModal({ isOpen, setLangSelectOpen }) {
  const onOverlayClose = (e) => {
    if (e && e.target === e.currentTarget) {
      setLangSelectOpen(false);
    }
  };

  const close = () => {
    setLangSelectOpen(false);
  };

  const saveAndClose = () => {
    // other code
    setLangSelectOpen(false)
  }

  const suggestedLanguages = ["English (UK)", "English", "Bahasa Indonesia"];
  const otherLanguages = ["Chineses", "Croatian", "Czech", "Danish"];

  const [currentLang, setCurrentLang] = useState("English");

  return (
    <div
      onClick={onOverlayClose}
      className={`h-full  w-full absolute top-0 transition-all ${
        !isOpen
          ? "pointer-events-none backdrop-blur-none"
          : "pointer-events-auto backdrop-blur-md"
      } pt-[20%]`}
    >
      <div
        className={`transition-all will-change-auto relative p-[1px] ${
          !isOpen ? "bottom-[-100%]" : "bottom-0"
        } bg-gradient-to-b from-gradientStartColor to-[#0F0F0F] rounded-t-[13px] h-full w-full`}
      >
        <div className="bg-[#0F0F0F] w-full h-full rounded-[12px] p-[25px] flex flex-col items-center">
          <button onClick={close} className="self-end">
            <Icon name="cross" color={"rgba(255,255,255,0.5)"} size={24} />
          </button>
          <p className="text-gradient font-comic font-bold text-[24px]">
            Смена языка
          </p>
          <p className="text-white font-comic text-[14px] mb-[50px]">
            Выбери язык приложения
          </p>
          <div className="flex-1 overflow-y-auto w-full py-[10px]">
            <p className="font-comic text-white/20 text-[14px] mb-[10px]">
              Suggested Languages
            </p>
            {suggestedLanguages.map((lang, i) => (
              <LangItem
                key={i}
                lang={lang}
                currentLang={currentLang}
                setCurrentLang={setCurrentLang}
              />
            ))}

            <p className="font-comic text-white/20 text-[14px] mt-[20px] mb-[10px]">
              Other Languages
            </p>
            {otherLanguages.map((lang, i) => (
              <LangItem
                key={i}
                lang={lang}
                currentLang={currentLang}
                setCurrentLang={setCurrentLang}
              />
            ))}
          </div>
          <button
            onClick={saveAndClose}
            className={`font-comic text-sm text-black py-[15px] rounded-xl w-full flex flex-row items-center justify-center gap-[10px] bg-gradient-to-b from-gradientStartColor to-gradientEndColor`}
          >
            Сохранить
          </button>
        </div>
      </div>
    </div>
  );
}

const LangItem = ({ lang, currentLang, setCurrentLang }) => {
  return (
    <button
      onClick={() => setCurrentLang(lang)}
      className="py-[10px] flex flex-row items-center justify-between w-full"
    >
      <p className="font-comic text-white text-[16px]">{lang}</p>
      {lang === currentLang && <Icon name="done" color="#45E9B8" size={24} />}
    </button>
  );
};
