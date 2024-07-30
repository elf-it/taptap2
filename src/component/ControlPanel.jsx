import React, { useState } from "react";
import { calculateFontSize } from "../helper/calculateFontSize";
import caseIcon from "../assets/icons/icon__case.svg";
import walletIcon from "../assets/icons/icon__wallet.svg";
import coinsIcon from "../assets/icons/icon__coins.svg";

export default function ControlPanel({ count, allSteps }) {
  const [unlimited, setUnlimited] = useState(false);
  const [autoFarm, setAutoFarm] = useState(false);

  const userInfo = {
    name: "Nickname",
    levelCurrent: 9,
    levelMax: 20,
  };

  const maxCount = 10000000;

  const formatCount = new Intl.NumberFormat("en-US").format(count); // форматирует число
  const formatMaxCount = new Intl.NumberFormat("en-US").format(allSteps); // форматирует число

  const countFontSize = calculateFontSize(formatCount, 50, 7); // динамически считает размер
  const smallCountFontSize = calculateFontSize(formatCount, 18, 7);
  const maxCountFontSize = calculateFontSize(formatMaxCount, 14, 7);

  const unlimitedClick = () => {
    setUnlimited((prev) => !prev);
  };

  const autoFarmClick = () => {
    setAutoFarm((prev) => !prev);
  };
  return (
    <div className="flex flex-row items-center gap-[10px] justify-between w-full">
      <div className="flex flex-col gap-[10px]">
        <button
          onClick={unlimitedClick}
          className="elem-bg_green text-[10px]  font-comic rounded-[13px] flex flex-col items-center justify-center p-[8px]"
        >
          <span
            className={`font-bold text-[22px] ${
              unlimited ? "text-gradient" : "text-gradient_red"
            }`}
          >
            {unlimited ? "ON" : "OFF"}
          </span>
          <span className="text-gradient">Безлимит</span>
        </button>
        <button
          onClick={autoFarmClick}
          className="elem-bg_green text-[10px]  font-comic rounded-[13px] flex flex-col items-center justify-center p-[8px]"
        >
          <span
            className={`font-bold text-[22px] ${
              autoFarm ? "text-gradient" : "text-gradient_red"
            }`}
          >
            {autoFarm ? "ON" : "OFF"}
          </span>
          <span className="text-gradient">Auto Farm</span>
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
          <p>
            <span
              style={{ fontSize: smallCountFontSize }}
              className="text-lg font-comic font-bold text-[#FFCC48]"
            >
              {formatMaxCount}
            </span>
            <span
              style={{ fontSize: maxCountFontSize }}
              className="text-sm font-comic font-bold text-[#9B9B9B]"
            >
              /{7000}
            </span>
          </p>
        </div>
      </div>
      <div className="flex flex-col gap-[10px]">
        <button className="elem-bg_green text-[10px]  font-comic rounded-[13px] flex flex-col items-center justify-center p-[8px]">
          <img src={caseIcon} alt="" />
          <span className="text-gradient">Безлимит</span>
        </button>
        <button className="elem-bg_green text-[10px]  font-comic rounded-[13px] flex flex-col items-center justify-center p-[8px]">
          <img src={walletIcon} alt="" />
          <span className="text-gradient">Кошелек</span>
        </button>
      </div>
    </div>
  );
}
