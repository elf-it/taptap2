import React, { useEffect, useState } from "react";
import { calculateFontSize } from "../helper/calculateFontSize";
import coinsIcon from "../assets/icons/icon__coins.svg";
import tasksIcon from '../assets/icons/icon__tasks.svg'
import fermIcon from '../assets/icons/icon__ferm.svg'
import walletIcon from '../assets/icons/icon__wallet.svg'
import Timer from "./Timer";

export default function ControlPanel({ count, allSteps, person }) {
  const [unlimited, setUnlimited] = useState(false);
  const [autoFarm, setAutoFarm] = useState(false);
  const [bust, setBust] = useState(false);

  const userInfo = {
    name: "Nickname",
    levelCurrent: person.level,
    levelMax: 6,
  };

  const maxCount = 10000000;

  const formatCount = new Intl.NumberFormat("en-US").format(parseInt(count)); // форматирует число
  const formatMaxCount = new Intl.NumberFormat("en-US").format(allSteps); // форматирует число

  const countFontSize = calculateFontSize(formatCount, 50, 7); // динамически считает размер
  const smallCountFontSize = calculateFontSize(formatCount, 18, 7);
  const maxCountFontSize = calculateFontSize(allSteps < 10000000 ? formatMaxCount : "∞", 14, 7);

  useEffect(() => {
    setUnlimited(person.status_unlimit);
    setAutoFarm(person.status_autoclick);
    setBust(person.status_boost);
  }, []);

  return (
    <div className="flex flex-row items-center gap-[10px] justify-between w-full">
      <div className="flex flex-col gap-[10px]">
        <button
          className="elem-bg_green text-[10px]  font-comic rounded-[13px] flex flex-col items-center justify-center p-[8px]"
        >
          <span
            className={`font-bold text-[22px] ${
              unlimited ? "text-gradient" : "text-gradient_red"
            }`}
          >
            {unlimited ? "ON" : "OFF"}
          </span>
          <span className="text-gradient whitespace-nowrap">Безлимит</span>
        </button>
        <button
          className="elem-bg_green text-[10px]  font-comic rounded-[13px] flex flex-col items-center justify-center p-[8px]"
        >
          <span
            className={`font-bold text-[22px] ${
              autoFarm ? "text-gradient" : "text-gradient_red"
            }`}
          >
            {autoFarm ? "ON" : "OFF"}
          </span>
          <span className="text-gradient whitespace-nowrap">Auto Farm</span>
        </button>
        <button
          className="elem-bg_green text-[10px]  font-comic rounded-[13px] flex flex-col items-center justify-center p-[8px]"
        >
          <span
            className={`font-bold text-[22px] ${
              bust ? "text-gradient" : "text-gradient_red"
            }`}
          >
            {bust ? "ON" : "OFF"}
          </span>
          <span className="text-gradient whitespace-nowrap">Буст</span>
        </button>
      </div>
      <div className="flex flex-col items-center gap-[5px]">
        <p className="text-sm text-white font-comic font-bold">
          Level <span>{userInfo.levelCurrent}</span>
          <span className="text-[#9B9B9B]">/{userInfo.levelMax}</span>
        </p>
        <p
          style={{ fontSize: countFontSize }}
          className="text-gradient font-comic font-bold"
        >
          {formatCount}
        </p>
        <div className="flex flex-row items-center justify-center gap-[5px]">
          <img className="w-[32px]" src={coinsIcon} alt="" />
          <p className="flex flex-row items-center">
            <span
              style={{ fontSize: smallCountFontSize }}
              className="text-lg font-comic font-bold text-[#FFCC48]"
            >
              {allSteps < 10000000 ? formatMaxCount : "∞"}
            </span>
            <span
              className="text-sm font-comic font-bold text-[#9B9B9B] flex flex-row items-center"
            >
              / <Timer time={person.timer * 1000}/>
            </span>
          </p>
        </div>
      </div>
      <div className="flex flex-col gap-[10px]">
        <button className="elem-bg_green text-[10px]  font-comic rounded-[13px] flex flex-col items-center justify-center p-[8px]">
          <img className="relative top-[-18px] mb-[-15px]" src={tasksIcon} alt="" />
          <span className="text-gradient">Задания</span>
        </button>
        <button className="elem-bg_green text-[10px]  font-comic rounded-[13px] flex flex-col items-center justify-center p-[8px]">
          <img className="relative top-[-18px] mb-[-15px]" src={walletIcon} alt="" />
          <span className="text-gradient">Кошелек</span>
        </button>
        <button className="elem-bg_green text-[10px]  font-comic rounded-[13px] flex flex-col items-center justify-center p-[8px]">
          <img className="relative top-[-18px] mb-[-15px]" src={fermIcon} alt="" />
          <span className="text-gradient">Ферма</span>
        </button>
      </div>
    </div>
  );
}
