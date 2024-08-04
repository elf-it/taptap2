import React, { useContext } from "react";
import crownSvg from "../assets/icons/icon__crown.svg";

import star1 from "../assets/icons/icon__star1.svg";
import star2 from "../assets/icons/icon__star2.svg";
import star3 from "../assets/icons/icon__star3.svg";
import star4 from "../assets/icons/icon__star4.svg";
import star5 from "../assets/icons/icon__star5.svg";
import { LngContext } from "../store/langContext";

export default function Lottery({person}) {

  const [lang, setLang] = useContext(LngContext)

  const data = [
    {
      title: lang?.stats?.get_silver[person.lang],
      icon: star1,
      count: 200,
      maxCount: 2000,
      present: lang?.lottery?.present1[person.lang],
    },
    {
      title: lang?.stats?.get_silver[person.lang],
      icon: star2,
      count: 700,
      maxCount: 2000,
      present: lang?.lottery?.present2[person.lang],
    },
    {
      title: lang?.stats?.get_platinum[person.lang],
      icon: star3,
      count: 1200,
      maxCount: 2000,
      present: lang?.lottery?.present3[person.lang],
    },
    {
      title: lang?.stats?.get_black[person.lang],
      icon: star4,
      count: 100,
      maxCount: 2000,
      present: lang?.lottery?.present4[person.lang],
    },
    {
      title: lang?.stats?.get_ultima[person.lang],
      icon: star5,
      count: 700,
      maxCount: 2000,
      present: lang?.lottery?.present5[person.lang],
    },
  ];

  return (
    <div className=" py-[24px] px-[17px] flex flex-col items-center gap-[20px] pb-[100px] h-full overflow-auto">
      <div className="elem-bg_green px-[8px] rounded-[40px] w-auto flex flex-row items-center gap-[8px]">
        <img src={crownSvg} alt="" />
        <p className="font-comic text-gradient font-bold text-sm">
          {person.status}
        </p>
      </div>
      <p className="font-comic text-gradient text-[50px] font-bold">
        <span>223</span>
        <span className="text-[#9B9B9B] text-sm font-normal">/{lang?.lottery?.ticket[person.lang]}</span>
      </p>
      <p>
        <span className="font-comic text-white text-[20px] font-bold">
          {lang?.lottery?.one_ticket[person.lang]} ={" "}
        </span>
        <span className="font-comic text-gradient text-[20px] font-bold">
          {lang?.lottery?.one_ton[person.lang]}
        </span>
      </p>
      <button
        className={`font-comic text-sm text-black py-[15px] rounded-xl w-4/5 flex flex-row items-center justify-center gap-[10px] bg-gradient-to-b from-gradientStartColor to-gradientEndColor`}
      >
        {lang?.lottery?.buy_button[person.lang]}
      </button>
      <div
        className={`elem-bg_green px-[24px] py-[20px] rounded-[15px] w-full flex flex-col items-center gap-[12px]`}
      >
        <p className="w-[183px] text-white font-comic text-[18px] text-center">
          {lang?.lottery?.title[person.lang]}
        </p>
        <p className="text-white font-comic text-[14px] text-center">
          {lang?.lottery?.description[person.lang]}
        </p>
        <div className="flex flex-col w-full gap-[30px]">
          {data.map((item, i) => (
            <div key={i} className="w-full flex flex-col gap-[8px]">
              <div className="flex flex-row justify-between items-center">
                <div className="flex flex-row gap-[10px] items-start">
                  <img src={item.icon} alt="" />
                  <p className="text-white font-comic text-[18px] font-bold">
                    {item.title}
                  </p>
                </div>
                <p className="text-[#45E9B8] font-comic text-[20px] font-bold">
                  {item.present}
                </p>
              </div>
              <div className="bg-[#7AC5AE]/50 w-full h-[10px] rounded-[10px] ">
                <div
                  className="h-full rounded-[10px] shadow-[#45E9B8] shadow-lg bg-gradient-to-b from-gradientStartColor to-gradientEndColor"
                  style={{ width: `${(item.count / item.maxCount) * 100}%` }}
                ></div>
              </div>
              <p className="text-center">
                <span className="text-[14px] text-white font-comic font-bold">
                  {item.count}
                </span>
                <span className="text-[14px] text-[#9B9B9B] font-comic font-bold">
                  /{item.maxCount}
                </span>
              </p>
            </div>
          ))}
          <button
            className={`font-comic text-sm text-black py-[15px] rounded-xl w-full flex flex-row items-center justify-center gap-[10px] bg-gradient-to-b from-gradientStartColor to-gradientEndColor`}
          >
            {lang?.lottery?.status_button[person.lang]}{" "}
          </button>
        </div>
      </div>
    </div>
  );
}
