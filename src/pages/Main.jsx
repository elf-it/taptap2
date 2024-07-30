import React, { useCallback, useState } from "react";
import MainPageHeader from "../component/MainPageHeader";
import ControlPanel from "../component/ControlPanel";
import LanguageSelectModal from '../component/LanguageSelectModal';
import Clicker from "../component/Clicker";
import { createPortal } from "react-dom";
import { setMyCoins } from "../lib/fetch";

export default function Main({setNumPage, person}) {
  const [count, setCount] = useState(0);
  const [touchCoins, setTouchCoins] = useState(0);
  const [langSelectOpen, setLangSelectOpen] = useState(false)
  const step = 15;

  const incrementCount = useCallback(() => {
    setCount(count + touchCoins);
    setTouchCoins((prev) => (prev += step));
  },[]);

  const setCoins = async () => {
    let c = touchCoins
    setTouchCoins(0)
    const response = await setMyCoins({tid: person.tid, amount: c})
    if(response.error){
      console.log(response.error)
    }
  };

  useEffect(() => {
    setCount(person.myCoins + person.autoCoins)
    const id2 = setInterval(() => {
      setCoins()
    }, 10000);

    return () => {
      clearInterval(id2);
    };
  }, [])

  return (
    <>
    <div className="py-[24px] px-[17px] flex flex-col items-center gap-[8px] pb-[100px] h-full overflow-hidden">
      <MainPageHeader setNumPage={setNumPage} person={person} setLangSelectOpen={setLangSelectOpen} />
      <ControlPanel count={count} />
      <Clicker handleClick={incrementCount} />
    </div>
    {createPortal(<LanguageSelectModal isOpen={langSelectOpen} setLangSelectOpen={setLangSelectOpen}/>, document.body)}
    </>
  );
}
