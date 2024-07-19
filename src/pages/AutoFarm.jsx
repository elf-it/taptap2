import React, { useEffect, useState } from "react";

import Button from "../component/Button";
import BuyCard from "../component/BuyCard";

import case1 from "../assets/icons/case1.svg";
import case2 from "../assets/icons/case2.svg";
import case3 from "../assets/icons/case3.svg";
import case4 from "../assets/icons/case4.svg";
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
import BuyCardModal from "../component/BuyCardModal";
import { createPortal } from "react-dom";

export default function AutoFarm() {
  const [showModal, setShowModal] = useState(false);
  const [modalInfo, setModalInfo] = useState(null);

  const firstCardClick = (data) => {
    setModalInfo(data)
    setShowModal(true)
  };

  useEffect(() => {
    if(!showModal){
        setModalInfo(null)
    }
  },[showModal])

  const firstCardData = {
    index: 0,
    colorClass: "elem-bg_violet",
    title: "Режим безлимит",
    descr: "Выбери свое вермя для неограниченного кликанья:",
    image: case1,
    tarrifs: [
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
    ],
    btn: {
      text: "Купить",
      color: "#CC92FF",
      textColor: "white",
      icon: key1,
      handler: firstCardClick,
    },
    info: "Плата взимается однократно. ",
  };

  const secondCardData = {
    index: 1,
    colorClass: "elem-bg_blue",
    title: "Функция авто-клик",
    descr:
      "Включается один раз в день, и система автоматически кликает за пользователя.",
    image: case2,
    tarrifs: [
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
    ],
    btn: {
      text: "Купить",
      color: "#82BCFF",
      textColor: "white",
      icon: key2,
      handler: firstCardClick,
    },
    info: "Плата взимается однократно, но функцию необходимо включать каждый день.",
  };

  const thirdCardData = {
    index: 2,
    colorClass: "elem-bg_yellow",
    title: "Покупка билетов лотереи",
    descr: "",
    image: case3,
    tarrifs: [],
    btn: {
      text: "Купить",
      color: "#FFCD56",
      textColor: "#911B00",
      icon: key3,
      handler: () => alert('123'),
    },
    info: null,
  };

  const fourthCardData = {
    index: 3,
    colorClass: "elem-bg_pink",
    title: "Покупка статуса",
    descr:
      "Включается один раз в день, и система автоматически кликает за пользователя.",
    image: case4,
    tarrifs: [
      {
        image: star1,
        time: "Сильвер",
        count: 1,
      },
      {
        image: star2,
        time: "Голд",
        count: 2,
      },
      {
        image: star3,
        time: "Платина",
        count: 3,
      },
      {
        image: star4,
        time: "Блек",
        count: 4,
      },
      {
        image: star5,
        time: "Ультима",
        count: 5,
      },
    ],
    btn: {
      text: "Купить",
      color: "#F582FF",
      textColor: "white",
      icon: key4,
      handler: firstCardClick,
    },
    info: null,
  };

  return (
    <div className=" py-[24px] px-[17px] flex flex-col items-center gap-[8px] pb-[80px] h-full overflow-auto">
      <BuyCard data={firstCardData} />
      <BuyCard data={secondCardData} />
      <BuyCard data={thirdCardData} />
      <BuyCard data={fourthCardData} />
      {showModal && createPortal(<BuyCardModal setShowModal={setShowModal} data={modalInfo}/>, document.body)}
    </div>
  );
}
