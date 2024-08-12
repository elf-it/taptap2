import React, { useContext } from "react";
import crownSvg from "../assets/icons/icon__crown.svg";

import star1 from "../assets/icons/icon__star1.svg";
import star2 from "../assets/icons/icon__star2.svg";
import star3 from "../assets/icons/icon__star3.svg";
import star4 from "../assets/icons/icon__star4.svg";
import star5 from "../assets/icons/icon__star5.svg";

import ticketIcon from "../assets/icons/icon__ticket.svg";
import key3 from "../assets/icons/key3.svg";
import case3 from "../assets/icons/case3.svg";
import BuyCard from "../component/BuyCard";

import { LngContext } from "../store/langContext";

export default function Lottery({person, setNumPage}) {

  const [lang, setLang] = useContext(LngContext)

  const [showModal, setShowModal] = useState(false);
  const [modalInfo, setModalInfo] = useState(null);

  const firstCardClick = (data) => {
    if(userFriendlyAddress != ""){
      setModalInfo(data)
      setShowModal(true)
    }else{
      setNumPage(5)
    }
  };

  const data = [
    {
      title: lang?.stats?.get_silver[person.lang],
      icon: star1,
      count: person.ticketsStatus.silver,
      maxCount: 1000000,
      present: lang?.lottery?.present1[person.lang],
    },
    {
      title: lang?.stats?.get_gold[person.lang],
      icon: star2,
      count: person.ticketsStatus.gold,
      maxCount: 1000000,
      present: lang?.lottery?.present2[person.lang],
    },
    {
      title: lang?.stats?.get_platinum[person.lang],
      icon: star3,
      count: person.ticketsStatus.platinum,
      maxCount: 1000000,
      present: lang?.lottery?.present3[person.lang],
    },
    {
      title: lang?.stats?.get_black[person.lang],
      icon: star4,
      count: person.ticketsStatus.black,
      maxCount: 1000000,
      present: lang?.lottery?.present4[person.lang],
    },
    {
      title: lang?.stats?.get_ultima[person.lang],
      icon: star5,
      count: person.ticketsStatus.ultima,
      maxCount: 1000000,
      present: lang?.lottery?.present5[person.lang],
    },
  ];

  const cardData = {
    index: 2,
    colorClass: "elem-bg_yellow",
    title: lang?.lottery?.info_card[person.lang],
    descr: lang?.lottery?.description_card[person.lang],
    image: case3,
    tarrifs: [
      {
        image: ticketIcon,
        time: lang?.lottery?.tarif1[person.lang],
        count: 1,
      },
      {
        image: ticketIcon,
        time: lang?.lottery?.tarif2[person.lang],
        count: 5,
      },
      {
        image: ticketIcon,
        time: lang?.lottery?.tarif3[person.lang],
        count: 10,
      },
      {
        image: ticketIcon,
        time: lang?.lottery?.tarif4[person.lang],
        count: 20,
      },
      {
        image: ticketIcon,
        time: lang?.lottery?.tarif5[person.lang],
        count: 50,
      },
    ],
    btn: {
      text: lang?.lottery?.button_card[person.lang],
      color: "#FFCD56",
      textColor: "#911B00",
      icon: key3,
      handler: firstCardClick,
    },
    info: lang?.lottery?.info_card[person.lang],
  };

  return (
    <div className=" py-[24px] px-[17px] flex flex-col items-center gap-[20px] pb-[100px] h-full overflow-auto">
      <div className="elem-bg_green px-[8px] rounded-[40px] w-auto flex flex-row items-center gap-[8px]">
        <img src={crownSvg} alt="" />
        <p className="font-comic text-gradient font-bold text-sm">
          {person.status}
        </p>
      </div>
      <p className="font-comic text-gradient text-[50px] font-bold">
        <span>{person ? person.tickets : "0"}</span>
        <span className="text-[#9B9B9B] text-sm font-normal">/{lang?.lottery?.ticket[person.lang]}</span>
      </p>
      <BuyCard data={cardData} />
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
            onClick={() => setNumPage(2)}
            className={`font-comic text-sm text-black py-[15px] rounded-xl w-full flex flex-row items-center justify-center gap-[10px] bg-gradient-to-b from-gradientStartColor to-gradientEndColor`}
          >
            {lang?.lottery?.status_button[person.lang]}{" "}
          </button>
        </div>
      </div>
    </div>
  );
}
