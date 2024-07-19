import React, { useState } from "react";
import arrowDownIcon from "../assets/icons/icon__arrow-down.svg";

export default function CustomSelect({
  list,
  initial,
  img,
  option,
  imageOption,
  handler
}) {
  const [isShown, toggleShown] = useState(false);

  const optionClick = (i) => {
    handler(i)
    toggleShown(false)
  }

  return (
    <div className="relative">
      <div
        onClick={() => toggleShown((prev) => !prev)}
        className="bg-gradient-to-b from-[#45E9B8] to-black p-[1px] rounded-[13px]"
      >
        <div className="h-full w-full bg-[#1A3930] rounded-[12px] items-center px-[10px] py-[8px] flex flex-row gap-[10px] justify-between">
          <div className="flex flex-row gap-[10px] items-center">
            {img && <img src={img} alt="" />}
            <p className="text-lg font-comic text-white font-bold">
              {list && list[initial] ? list[initial][option] : ''}
            </p>
          </div>
          <img src={arrowDownIcon} alt="down" />
        </div>
      </div>

      {isShown && (
        <div className="mt-[10px] absolute bottom-[0px] translate-y-full w-full bg-[#1A3930] rounded-[12px] items-center flex flex-col gap-[10px] justify-between">
          {list.map((item, i) => (
              <div onClick={() => optionClick(i)} className="flex flex-row gap-[10px] items-start justify-start w-full active:bg-[#2A4940] px-[10px] py-[8px]">
                {item && <img src={item[imageOption]} alt="" />}
                <p className="text-lg font-comic text-white font-bold">
                  {item[option]}
                </p>
              </div>
          ))}
        </div>
      )}
    </div>
  );
}
