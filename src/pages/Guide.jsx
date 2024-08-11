import React, { useContext, useEffect, useState } from "react";

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
import ticket from "../assets/images/ticket.png";

import coinsIcon from "../assets/icons/icon__coins.svg";
import { LngContext } from "../store/langContext";

const tg = window.Telegram.WebApp;

if(!tg.initDataUnsafe?.start_param){
  tg.close()
}

export default function Guide({setNumPage}) {
  const [currentStep, setCurrentStep] = useState(0);
  const [lc, setLc] = useState(null);

  const [lang, setLang] = useContext(LngContext);

  const pages = [
    <GuideFirstStep lang={lang} lc={lc} />,
    <GuideSecondStep lang={lang} lc={lc} />,
    <GuideFifthStep lang={lang} lc={lc} />,
    <GuideThirdStep lang={lang} lc={lc} />,
    <GuideSevenStep lang={lang} lc={lc} />,
    <GuideFourthStep lang={lang} lc={lc} />,
    <GuideSixthStep lang={lang} lc={lc} />,
  ];

  const auth = async () => {
    if(tg.initDataUnsafe?.user?.id != undefined){
      const response = await registration({tid: tg.initDataUnsafe?.user?.id, username: tg.initDataUnsafe?.user?.username, referrer: tg.initDataUnsafe?.start_param, lang: tg.initDataUnsafe?.user?.language_code})

      if(response.error){
        tg.close()
      }else{
        setNumPage(0)
        //window.location.reload();
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

  useEffect(() => {
    setLc(tg.initDataUnsafe?.user?.language_code + "_lang")
  }, [])

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
          {currentStep === pages.length - 1 ? lang?.guid?.ingame_button[lc] : lang?.guid?.next_button[lc]}
        </button>
      </div>
    </div>
  );
}

function GuideFirstStep({lang, lc}) {
  console.log(lang)
  console.log(lc)
  return (
    <div className="flex flex-col items-center justify-center h-full">
      <div className="flex flex-col items-center w-[267px] mb-[40px]">
        <h3 className="text-[40px] font-comic text-white font-bold">{lang?.guid?.fs_hello[lc]}</h3>
        <h3 className="text-[40px] font-comic text-white font-bold">
          {lang?.guid?.name[lc]}
        </h3>
        <p className="text-base font-comic text-white text-center">
          {lang?.guid?.description_page1[lc]}
        </p>
      </div>

      <img className="w-[293px]" src={mammothImage} alt="" />
    </div>
  );
}

function GuideSecondStep({lang, lc}) {
  return (
    <div className="flex flex-col items-center justify-center h-full">
      <div className="flex flex-col items-center mb-[40px] px-[10px]">
        <h3 className="text-[32px] font-comic text-white font-bold  w-full text-center">
          {lang?.guid?.description_page2_1[lc]}{" "}
        </h3>
        <h3 className="text-[32px] font-comic text-white font-bold  w-full text-center">
        {lang?.guid?.description_page2_2[lc]}
        </h3>
        <p className="text-base font-comic text-white text-center">
        {lang?.guid?.description_page2_3[lc]}
        </p>
      </div>

      <img className="w-full" src={mammothWithMoneyImage} alt="" />
    </div>
  );
}

function GuideThirdStep({lang, lc}) {
  const data = [
    {
      image: clock,
      time: lang?.guid?.time1_page3[lc],
      count: 1,
    },
    {
      image: clock,
      time: lang?.guid?.time2_page3[lc],
      count: 2,
    },
    {
      image: clock,
      time: lang?.guid?.time3_page3[lc],
      count: 3,
    },
    {
      image: clock,
      time: lang?.guid?.time4_page3[lc],
      count: 4,
    },
  ];

  return (
    <div className="flex flex-col items-center justify-center h-full px-[17px]">
      <img className="w-[300px] h-[300px]" src={case1} alt="" />
      <div className="flex flex-col items-center mb-[40px] px-[10px] mt-[-50px]">
        <h3 className="text-[32px] font-comic text-white font-bold  w-full text-center">
          {lang?.guid?.description1_page3[lc]}
        </h3>
        <p className="text-base font-comic text-white text-center">
          {lang?.guid?.description2_page3[lc]}
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

      <p className="text-white/90 font-bold font-comic text-sm px-[10px] text-center mt-auto mb-[20px]">
        {lang?.guid?.description3_page3[lc]}
      </p>
    </div>
  );
}

function GuideFourthStep({lang, lc}) {
  const data = [
    {
      image: clock,
      time: lang?.guid?.time1_page4[lc],
      count: 10,
    },
    {
      image: clock,
      time: lang?.guid?.time2_page4[lc],
      count: 20,
    },
    {
      image: clock,
      time: lang?.guid?.time3_page4[lc],
      count: 30,
    },
    {
      image: clock,
      time: lang?.guid?.time4_page4[lc],
      count: 40,
    },
    {
      image: clock,
      time: lang?.guid?.time5_page4[lc],
      count: 50,
    },
  ];

  return (
    <div className="flex flex-col items-center justify-center h-full px-[17px]">
      <img className="w-[300px] h-[300px]" src={case2} alt="" />
      <div className="flex flex-col items-center mb-[40px] px-[10px] mt-[-50px]">
        <h3 className="text-[32px] font-comic text-white font-bold  w-full text-center">
          {lang?.guid?.description1_page4[lc]}
        </h3>
        <p className="text-base font-comic text-white text-center">
          {lang?.guid?.description2_page4[lc]}
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

      <p className="text-white/90 font-bold font-comic text-sm px-[10px] text-center mt-auto mb-[20px]">
        {lang?.guid?.description3_page4[lc]}
      </p>
    </div>
  );
}

function GuideFifthStep({lang, lc}) {
  const data = [
    {
      image: star1,
      time: lang?.guid?.time1_page5[lc],
      count: 1,
      percents: 50,
      description: lang?.guid?.description1_page5[lc],
      price: 1,
    },
    {
      image: star2,
      time: lang?.guid?.time2_page5[lc],
      count: 2,
      percents: 100,
      description: lang?.guid?.description2_page5[lc],
      price: 2,
    },
    {
      image: star3,
      time: lang?.guid?.time3_page5[lc],
      count: 3,
      percents: 150,
      description: lang?.guid?.description3_page5[lc],
      price: 3,
    },
    {
      image: star4,
      time: lang?.guid?.time4_page5[lc],
      count: 4,
      percents: 200,
      description: lang?.guid?.description4_page5[lc],
      price: 4,
    },
    {
      image: star5,
      time: lang?.guid?.time5_page5[lc],
      count: 5,
      percents: 250,
      description: lang?.guid?.description5_page5[lc],
      price: 5,
    },
  ];

  return (
    <div className="flex flex-col items-center justify-center h-full px-[17px]">
      <img className="w-[300px] h-[300px]" src={case3} alt="" />
      <div className="flex flex-col items-center mb-[40px] px-[10px] mt-[-50px]">
        <h3 className="text-[32px] font-comic text-white font-bold  w-full text-center">
          {lang?.guid?.title_page5[lc]}
        </h3>
      </div>

      <div className="w-full flex flex-col gap-[8px] elem-bg_green p-[15px] rounded-[15px]">
        {data.map((tarrif, i) => (
          <div
            key={i}
            className={`flex flex-row items-center gap-[8px] justify-between pb-[8px] ${
              i !== data.length - 1 ? "border-b" : ""
            } border-white/20`}
          >
            <div className="flex flex-col w-full">
              <div className="flex flex-row items-center gap-[8px]">
                <img src={tarrif.image} alt="" />
                <p className="text-white font-bold font-comic text-lg">
                  {tarrif.time}
                </p>
                <p className="text-gradient font-bold font-comic text-xl ml-auto">
                  {tarrif.price} TON
                </p>
              </div>
              <p className="text-white font-bold font-comic text-[10px]">
                {tarrif.description}
              </p>
            </div>
          </div>
        ))}
      </div>

      <p className="text-white/90 font-bold font-comic text-sm px-[10px] text-center mt-auto mb-[20px]">
        {lang?.guid?.description6_page5[lc]}
      </p>
    </div>
  );
}

function GuideSixthStep({lang, lc}) {
  const data = [
    {
      image: star1,
      time: lang?.guid?.time1_page6[lc],
      count: lang?.guid?.count1_page6[lc],
      description: lang?.guid?.descriptoin1_page6[lc],
      price: lang?.guid?.price1_page6[lc]
    },
    {
      image: star2,
      time: lang?.guid?.time2_page6[lc],
      count: lang?.guid?.count2_page6[lc],
      description: lang?.guid?.descriptoin2_page6[lc],
      price: lang?.guid?.price2_page6[lc]
    },
    {
      image: star3,
      time: lang?.guid?.time3_page6[lc],
      count: lang?.guid?.count3_page6[lc],
      description: lang?.guid?.descriptoin3_page6[lc],
      price: lang?.guid?.price3_page6[lc]
    },
    {
      image: star4,
      time: lang?.guid?.time4_page6[lc],
      count: lang?.guid?.count4_page6[lc],
      description: lang?.guid?.descriptoin4_page6[lc],
      price: lang?.guid?.price4_page6[lc]
    },
    {
      image: star5,
      time: lang?.guid?.time5_page6[lc],
      count: lang?.guid?.count5_page6[lc],
      description: lang?.guid?.descriptoin5_page6[lc],
      price: lang?.guid?.price5_page6[lc]
    },
  ];

  return (
    <div className="flex flex-col items-center justify-center h-full px-[20px]">
      <img className="w-[67px] h-[67px] my-[40px]" src={ticket} alt="" />
      <div className="flex flex-col items-center mb-[40px] px-[10px]">
        <h3 className="text-[32px] font-comic text-white font-bold  w-full text-center">
          {lang?.guid?.title1_page6[lc]}
        </h3>
        <p className="text-base font-comic text-white text-center w-[307px]">
          {lang?.guid?.title2_page6[lc]}
        </p>
      </div>

      <div className="w-full flex flex-col gap-[8px] elem-bg_green p-[15px] rounded-[15px]">
        {data.map((tarrif, i) => (
          <div
            key={i}
            className={`flex flex-row items-center gap-[8px] justify-between pb-[8px] ${
              i !== data.length - 1 ? "border-b" : ""
            } border-white/20`}
          >
            <div className="flex flex-col w-full">
              <div className="flex flex-row items-center gap-[8px]">
                <img src={tarrif.image} alt="" />
                <p className="text-white font-bold font-comic text-lg">
                  {tarrif.time}
                </p>
                <p className="text-gradient font-bold font-comic text-xl ml-auto">
                  {tarrif.price} TON
                </p>
              </div>
              <p className="text-white font-bold font-comic text-[10px]">
                {tarrif.description}
              </p>
            </div>
          </div>
        ))}
      </div>

      <p className="text-white/50 font-bold font-comic text-sm px-[10px] text-center mt-auto mb-[20px]"></p>
    </div>
  );
}

function GuideSevenStep({lang, lc}) {
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
          {lang?.guid?.title1_page7[lc]}
        </h3>
        <p className="text-base font-comic text-white text-center w-[307px]">
          {lang?.guid?.title2_page7[lc]}{" "}
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
            {/*tarrif.percents && (
              <span className="text-white font-bold font-comic text-xl">
                + {tarrif.percents}%
              </span>
            )*/}
            <p className="text-[#45E9B8] font-bold font-comic text-xl">
              {tarrif.count} TON
            </p>
          </div>
        ))}
      </div>

      <p className="text-white/50 font-bold font-comic text-sm px-[10px] text-center mt-auto mb-[20px]"></p>
    </div>
  );
}
