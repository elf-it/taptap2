import React, { useState } from "react";

import { registration } from "../lib/fetch";

import mammothImage from "../assets/images/mammoth.png";
import mammothWithMoneyImage from "../assets/images/mammoth-money.png";
import case1 from "../assets/images/case-gradient.png";
import case2 from "../assets/images/case-gradient1.png";
import case3 from "../assets/images/case-gradient2.png";
import case4 from "../assets/images/case-gradient3.png";
import case5 from "../assets/images/case-gradient4.png";
import key1 from "../assets/icons/key1.svg";
import key2 from "../assets/icons/key2.svg";
import key3 from "../assets/icons/key3.svg";
import key4 from "../assets/icons/key4.svg";
import clock from "../assets/icons/icon__clock.svg";
import star1 from "../assets/icons/icon__star1.svg";
import star2 from "../assets/icons/icon__star2.svg";
import star3 from "../assets/icons/icon__star3.svg";
import star4 from "../assets/icons/icon__star4.svg";
import star5 from "../assets/icons/icon__star5.svg";

import coinsIcon from "../assets/icons/icon__coins.svg";

const tg = window.Telegram.WebApp;

export default function Guide() {
  const [currentStep, setCurrentStep] = useState(0);
  const pages = [
    <GuideFirstStep />,
    <GuideSecondStep />,
    <GuideFifthStep />,
    <GuideThirdStep />,
    <GuideSevenStep />,
    <GuideFourthStep />,
    <GuideSixthStep />,
  ];

  const auth = async () => {
    if(tg.initDataUnsafe?.user?.id != undefined){
      alert(tg.initDataUnsafe?.user?.language_code)
      const response = await registration({tid: tg.initDataUnsafe?.user?.id, username: tg.initDataUnsafe?.user?.username, referrer: tg.initDataUnsafe?.start_param, lang: tg.initDataUnsafe?.user?.language_code})

      if(response.error){
        console.log(response.error)
      }else{
        window.location.reload();
      }
    }else{
      console.log("no tg app")
    }
  };

  const increaseStep = () => {
    setCurrentStep((prev) => {
      if (prev + 1 > pages.length - 1) {
        return prev;
      } else {
        return prev + 1;
      }
    });
  };

  return (
    <div className="flex flex-col py-[20px] h-full overlow">
      <div className="flex flex-row items-center gap-[5px] px-[10px]">
        {pages.map((page, i) => {
          const isActivePage = i === currentStep;
          return (
            <div
              key={i}
              onClick={() => setCurrentStep(i)}
              className={`h-[5px] flex-1 bg-gradient-to-b from-gradientStartColor to-gradientEndColor ${
                isActivePage ? "opacity-100" : "opacity-20"
              } rounded-[5px]`}
            ></div>
          );
        })}
      </div>
      <div className="flex-1 overflow-auto">{pages[currentStep]}</div>
      <div className="px-[10px]">
        <button
          onClick={() => {
            if(currentStep == pages.length - 1){
              auth()
            }else{
              increaseStep()
            }
          }}
          className={`font-comic text-sm text-black py-[15px] rounded-xl w-full flex flex-row items-center justify-center gap-[10px] bg-gradient-to-b from-gradientStartColor to-gradientEndColor`}
        >
          Далее
        </button>
      </div>
    </div>
  );
}

function GuideFirstStep() {
  return (
    <div className="flex flex-col items-center justify-center h-full">
      <div className="flex flex-col items-center w-[267px] mb-[40px]">
        <h3 className="text-[40px] font-comic text-white font-bold">Привет!</h3>
        <h3 className="text-[40px] font-comic text-white font-bold">
          Это Мамотик
        </h3>
        <p className="text-base font-comic text-white text-center">
          Жми на мамонтенка и получай мем-токены
        </p>
      </div>

      <img className="w-[293px]" src={mammothImage} alt="" />
    </div>
  );
}

function GuideSecondStep() {
  return (
    <div className="flex flex-col items-center justify-center h-full">
      <div className="flex flex-col items-center mb-[40px] px-[10px]">
        <h3 className="text-[32px] font-comic text-white font-bold  w-full text-center">
          Получай бесплатно{" "}
        </h3>
        <h3 className="text-[32px] font-comic text-white font-bold  w-full text-center">
          до 10 000 токенов
        </h3>
        <p className="text-base font-comic text-white text-center">
          с повышением статуса количество увеличивается количество получаемых
          токенов
        </p>
      </div>

      <img className="w-full" src={mammothWithMoneyImage} alt="" />
    </div>
  );
}

function GuideThirdStep() {
  const data = [
    {
      image: clock,
      time: "6 часов",
      count: 1,
    },
    {
      image: clock,
      time: "12 часов",
      count: 2,
    },
    {
      image: clock,
      time: "18 часов",
      count: 3,
    },
    {
      image: clock,
      time: "24 часа",
      count: 4,
    },
  ];

  return (
    <div className="flex flex-col items-center justify-center h-full px-[17px]">
      <img className="w-[300px] h-[300px]" src={case1} alt="" />
      <div className="flex flex-col items-center mb-[40px] px-[10px] mt-[-50px]">
        <h3 className="text-[32px] font-comic text-white font-bold  w-full text-center">
          Автоклик
        </h3>
        <p className="text-base font-comic text-white text-center">
          Активируй бота и он будет тапать токены вместо тебя
        </p>
      </div>

      <div className="w-full flex flex-col gap-[8px] w-[310px]">
        {data.map((tarrif, i) => (
          <div
            key={i}
            className={`flex flex-row items-center gap-[8px] justify-between pb-[8px] ${
              i !== data.length - 1 ? "border-b" : ""
            } border-white/20`}
          >
            <div className="flex flex-row items-center gap-[8px]">
              <img src={tarrif.image} alt="" />
              <p className="text-white font-bold font-comic text-lg">
                {tarrif.time}
              </p>
            </div>
            <p className="text-[#45E9B8] font-bold font-comic text-xl">
              {tarrif.count} TON
            </p>
          </div>
        ))}
      </div>

      <p className="text-white/50 font-bold font-comic text-sm px-[10px] text-center mt-auto mb-[20px]">
        Плата взимается однократно, функцию можно включать каждый день.
      </p>
    </div>
  );
}

function GuideFourthStep() {
  const data = [
    {
      image: clock,
      time: "X5",
      count: 10,
    },
    {
      image: clock,
      time: "X6",
      count: 20,
    },
    {
      image: clock,
      time: "X7",
      count: 30,
    },
    {
      image: clock,
      time: "X8",
      count: 40,
    },
    {
      image: clock,
      time: "X10",
      count: 50,
    },
  ];

  return (
    <div className="flex flex-col items-center justify-center h-full px-[17px]">
      <img className="w-[300px] h-[300px]" src={case2} alt="" />
      <div className="flex flex-col items-center mb-[40px] px-[10px] mt-[-50px]">
        <h3 className="text-[32px] font-comic text-white font-bold  w-full text-center">
          Режим безлимит
        </h3>
        <p className="text-base font-comic text-white text-center">
          Время неограниченного фарминга токенов
        </p>
      </div>

      <div className="w-full flex flex-col gap-[8px] w-[310px]">
        {data.map((tarrif, i) => (
          <div
            key={i}
            className={`flex flex-row items-center gap-[8px] justify-between pb-[8px] ${
              i !== data.length - 1 ? "border-b" : ""
            } border-white/20`}
          >
            <div className="flex flex-row items-center gap-[8px]">
              <img src={tarrif.image} alt="" />
              <p className="text-white font-bold font-comic text-lg">
                {tarrif.time}
              </p>
            </div>
            <p className="text-[#45E9B8] font-bold font-comic text-xl">
              {tarrif.count} TON
            </p>
          </div>
        ))}
      </div>

      <p className="text-white/50 font-bold font-comic text-sm px-[10px] text-center mt-auto mb-[20px]">
        Плата взимается однократно.
      </p>
    </div>
  );
}

function GuideFifthStep() {
  const data = [
    {
      image: star1,
      time: "Сильвер",
      count: 1,
      percents: 50,
    },
    {
      image: star2,
      time: "Голд",
      count: 2,
      percents: 100,
    },
    {
      image: star3,
      time: "Платина",
      count: 3,
      percents: 150,
    },
    {
      image: star4,
      time: "Блек",
      count: 4,
      percents: 200,
    },
    {
      image: star5,
      time: "Ультима",
      count: 5,
      percents: 250,
    },
  ];

  return (
    <div className="flex flex-col items-center justify-center h-full px-[17px]">
      <img className="w-[300px] h-[300px]" src={case3} alt="" />
      <div className="flex flex-col items-center mb-[40px] px-[10px] mt-[-50px]">
        <h3 className="text-[32px] font-comic text-white font-bold  w-full text-center">
          Статусы
        </h3>
        <p className="text-base font-comic text-white text-center">
          Можно достичь через инвайты или покупки
        </p>
      </div>

      <div className="w-full flex flex-col gap-[8px] w-[310px]">
        {data.map((tarrif, i) => (
          <div
            key={i}
            className={`flex flex-row items-center gap-[8px] justify-between pb-[8px] ${
              i !== data.length - 1 ? "border-b" : ""
            } border-white/20`}
          >
            <div className="flex flex-row items-center gap-[8px]">
              <img src={tarrif.image} alt="" />
              <p className="text-white font-bold font-comic text-lg">
                {tarrif.time}
              </p>
            </div>
            <p className="text-[#45E9B8] font-bold font-comic text-xl">
            {tarrif.percents && <span className="text-white">+ { tarrif.percents}% {" "}</span>}
              {tarrif.count} TON
            </p>
          </div>
        ))}
      </div>

      <p className="text-white/50 font-bold font-comic text-sm px-[10px] text-center mt-auto mb-[20px]"></p>
    </div>
  );
}

function GuideSixthStep() {
  const data = [
    {
      image: star1,
      time: "Сильвер",
      count: "Розыгрыш Lamborghini",
    },
    {
      image: star2,
      time: "Голд",
      count: "Розыгрыш квартиры стоимостью $500,000",
    },
    {
      image: star3,
      time: "Платина",
      count: "Розыгрыш $1,000,000",
    },
    {
      image: star4,
      time: "Блек",
      count: "Розыгрыш $5,000,000",
    },
    {
      image: star5,
      time: "Ультима",
      count: "Розыгрыш $10,000,000",
    },
  ];

  return (
    <div className="flex flex-col items-center justify-center h-full px-[20px]">
      <img className="w-[300px] h-[300px]" src={case4} alt="" />
      <div className="flex flex-col items-center mb-[40px] px-[10px] mt-[-50px]">
        <h3 className="text-[32px] font-comic text-white font-bold  w-full text-center">
          Лотерея
        </h3>
        <p className="text-base font-comic text-white text-center w-[307px]">
          Каждый статус дает возможность участвовать в розыгрышах:
        </p>
      </div>

      <div className="flex flex-col items-center elem-bg_green p-[15px] rounded-[15px] w-full mb-[10px] gap-[8px]">
        {data.map((tarrif, i) => (
          <div
            key={i}
            className={`w-full flex flex-row items-center gap-[8px] justify-between pb-[8px] ${
              i !== data.length - 1 ? "border-b" : ""
            } border-white/20`}
          >
            <div className="flex flex-row items-center  gap-[8px]">
              <img src={tarrif.image} alt="" />
              <p className="text-white font-bold font-comic text-lg">
                {tarrif.time}
              </p>
            </div>
            <p className="text-white font-bold font-comic text-xs text-end">
              {tarrif.count}
            </p>
          </div>
        ))}
      </div>

      <p className="text-white/50 font-bold font-comic text-sm px-[10px] text-center mt-auto mb-[20px]"></p>
    </div>
  );
}

function GuideSevenStep() {
  const data = [
    {
      image: coinsIcon,
      time: 50,
      count: 1,
      percents: 50,
    },
    {
      image: coinsIcon,
      time: 100,
      count: 2,
      percents: 100,
    },
    {
      image: coinsIcon,
      time: 150,
      count: 3,
      percents: 150,
    },
    {
      image: coinsIcon,
      time: 200,
      count: 4,
      percents: 200,
    },
    {
      image: coinsIcon,
      time: 250,
      count: 5,
      percents: 250,
    },
  ];

  return (
    <div className="flex flex-col items-center justify-center h-full px-[20px]">
      <img className="w-[300px] h-[300px]" src={case5} alt="" />
      <div className="flex flex-col items-center mb-[40px] px-[10px] mt-[-50px]">
        <h3 className="text-[32px] font-comic text-white font-bold  w-full text-center">
          Буст
        </h3>
        <p className="text-base font-comic text-white text-center w-[307px]">
          Покупай буст, получай увеличенное колличество монет{" "}
        </p>
      </div>

      <div className="flex flex-col items-center elem-bg_green p-[15px] rounded-[15px] w-full mb-[10px] gap-[8px]">
        {data.map((tarrif, i) => (
          <div
            key={i}
            className={`w-full flex flex-row items-center gap-[8px] justify-between pb-[8px] ${
              i !== data.length - 1 ? "border-b" : ""
            } border-white/20`}
          >
            <div className="flex flex-row items-center  gap-[8px]">
              <img src={tarrif.image} alt="" />
              <p className="text-white font-bold font-comic text-lg">
                +{tarrif.time}
              </p>
            </div>
            <p className="text-[#45E9B8] font-bold font-comic text-xl">
              {tarrif.percents && <span className="text-white">+ { tarrif.percents}% {" "}</span>}
              {tarrif.count} TON
            </p>
          </div>
        ))}
      </div>

      <p className="text-white/50 font-bold font-comic text-sm px-[10px] text-center mt-auto mb-[20px]"></p>
    </div>
  );
}
