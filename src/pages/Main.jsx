import React, { useState } from "react";
import MainPageHeader from "../component/MainPageHeader";
import ControlPanel from "../component/ControlPanel";
import LanguageSelectModal from '../component/LanguageSelectModal';
import Clicker from "../component/Clicker";
import { createPortal } from "react-dom";

export default function Main({setNumPage, person, addStep, count, allSteps}) {
  
  const [langSelectOpen, setLangSelectOpen] = useState(false)

  return (
    <>
    <div className="py-[24px] px-[17px] flex flex-col items-center gap-[8px] pb-[100px] h-full overflow-hidden">
      <MainPageHeader setNumPage={setNumPage} person={person} setLangSelectOpen={setLangSelectOpen} />
      <ControlPanel count={count} allSteps={allSteps} />
      <Clicker handleClick={addStep} />
    </div>
    {createPortal(<LanguageSelectModal isOpen={langSelectOpen} setLangSelectOpen={setLangSelectOpen}/>, document.body)}
    </>
  );
}
