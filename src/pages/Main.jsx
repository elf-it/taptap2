import React, { useCallback, useState } from "react";
import MainPageHeader from "../component/MainPageHeader";
import ControlPanel from "../component/ControlPanel";

import Clicker from "../component/Clicker";

export default function Main({setNumPage}) {
  const [count, setCount] = useState(100000);
  const step = 15;

  const incrementCount = useCallback(() => {
    setCount((prev) => (prev += step));
  },[]);

  return (
    <div className=" py-[24px] px-[17px] flex flex-col items-center gap-[8px] pb-[100px] h-full overflow-hidden">
      <MainPageHeader setNumPage={setNumPage} />
      <ControlPanel count={count} />
      <Clicker handleClick={incrementCount} />
    </div>
  );
}
