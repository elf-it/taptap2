import React, { memo } from "react";
import { Icon } from "./IconSprite";

function MainPageHeader({setNumPage, person, setLangSelectOpen}) {
  return (
    <div className="flex flex-row w-full gap-[7px]">
      <div className="flex flex-1 flex-row items-center justify-start gap-[10px] mb-[25px] elem-bg_green py-[7px] px-[10px] rounded-[10px]">
        <div className="elem-bg_green p-[5px] rounded-full ">
          <Icon name="mamoth" size={20} />
        </div>
        <p className="text-sm text-white font-comic">{person?.username}</p>
      </div>
      <button onClick={() => setNumPage(5)} className="flex flex-row items-center justify-between gap-[10px] mb-[25px] elem-bg_green py-[7px] px-[10px] rounded-[10px]">
        <Icon name={'wallet'} size={24}/>
      </button>
      <button onClick={() => setNumPage(6)} className="flex flex-row items-center justify-between gap-[10px] mb-[25px] elem-bg_green py-[7px] px-[10px] rounded-[10px]">
        <Icon name={'info'} size={24}/>
      </button>
      <button onClick={() => setLangSelectOpen(true)} className="flex flex-row items-center justify-between gap-[10px] mb-[25px] elem-bg_green py-[7px] px-[10px] rounded-[10px] font-comic text-white">
        Eng
      </button>
    </div>
  );
}

export default memo(MainPageHeader);
