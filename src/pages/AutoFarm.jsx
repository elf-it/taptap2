import React, { useContext, useEffect, useState } from "react";
import BuyCard from "../component/BuyCard";
import case1 from "../assets/icons/case1.svg";
import case2 from "../assets/icons/case2.svg";
import case3 from "../assets/icons/case3.svg";
import case4 from "../assets/icons/case4.svg";
import case5 from "../assets/icons/case5.png";
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
import BuyCardModal from "../component/BuyCardModal";
import { createPortal } from "react-dom";
import { useTonAddress } from "@tonconnect/ui-react";
import { LngContext } from "../store/langContext";

export default function AutoFarm({setNumPage, person}) {
  const [showModal, setShowModal] = useState(false);
  const [modalInfo, setModalInfo] = useState(null);

  const [lang, setLang] = useContext(LngContext);

  const userFriendlyAddress = useTonAddress();

  const firstCardClick = (data) => {
    if(userFriendlyAddress != ""){
      setModalInfo(data)
      setShowModal(true)
    }else{
      setNumPage(5)
    }
  };

  useEffect(() => {
    if(!showModal){
        setModalInfo(null)
    }
  },[showModal])

  const firstCardData = {
    index: 0,
    colorClass: "elem-bg_violet",
    title: lang?.autofarm?.title_unlimit[person.lang],
    descr: lang?.autofarm?.description_unlimit[person.lang],
    image: case1,
    tarrifs: [
      {
        image: clock,
        time:'X5',
        count: 10,
      },
      {
        image: clock,
        time:'X6',
        count: 20,
      },
      {
        image: clock,
        time:'X7',
        count: 30,
      },
      {
        image: clock,
        time:'X8',
        count: 40,
      },
      {
        image: clock,
        time:'X10',
        count: 50,
      },
    ],
    btn: {
      text: lang?.autofarm?.button_unlimit[person.lang],
      color: "#CC92FF",
      textColor: "white",
      icon: key1,
      handler: firstCardClick,
    },
    info: lang?.autofarm?.info_unlimit[person.lang],
  };

  const secondCardData = {
    index: 1,
    colorClass: "elem-bg_blue",
    title: lang?.autofarm?.title_autofarm[person.lang],
    descr: lang?.autofarm?.description_autofarm[person.lang],
    image: case2,
    tarrifs: [
      {
        image: clock,
        time: lang?.autofarm?.tarif_time1_autofarm[person.lang],
        count: 1,
      },
      {
        image: clock,
        time: lang?.autofarm?.tarif_time2_autofarm[person.lang],
        count: 2,
      },
      {
        image: clock,
        time: lang?.autofarm?.tarif_time3_autofarm[person.lang],
        count: 3,
      },
      {
        image: clock,
        time: lang?.autofarm?.tarif_time4_autofarm[person.lang],
        count: 4,
      },
    ],
    btn: {
      text: lang?.autofarm?.button_autofarm[person.lang],
      color: "#82BCFF",
      textColor: "white",
      icon: key2,
      handler: firstCardClick,
    },
    info: lang?.autofarm?.info_autofarm[person.lang],
  };

  const thirdCardData = {
    index: 2,
    colorClass: "elem-bg_yellow",
    title: lang?.autofarm?.title_lottery[person.lang],
    descr: lang?.autofarm?.description_lottery[person.lang],
    image: case3,
    tarrifs: [],
    btn: {
      text: lang?.autofarm?.button_lottery[person.lang],
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
    title: lang?.autofarm?.title_status[person.lang],
    descr: lang?.autofarm?.description_status[person.lang],
    image: case4,
    tarrifs: [
      {
        image: star1,
        time: lang?.stats?.get_silver[person.lang],
        count: 1,
        percents:50
      },
      {
        image: star2,
        time: lang?.stats?.get_gold[person.lang],
        count: 2,
        percents:100
      },
      {
        image: star3,
        time: lang?.stats?.get_platinum[person.lang],
        count: 3,
        percents:150
      },
      {
        image: star4,
        time: lang?.stats?.get_black[person.lang],
        count: 4,
        percents:200
      },
      {
        image: star5,
        time: lang?.stats?.get_ultima[person.lang],
        count: 5,
        percents:250
      },
    ],
    btn: {
      text: lang?.autofarm?.button_status[person.lang],
      color: "#F582FF",
      textColor: "white",
      icon: key4,
      handler: firstCardClick,
    },
    info: null,
  };

  const fifthCardData = {
    index: 4,
    colorClass: "elem-bg_green",
    title: lang?.autofarm?.title_boost[person.lang],
    descr: lang?.autofarm?.description_boost[person.lang],
    image: case5,
    tarrifs: [
      {
        image: coinsIcon,
        time: lang?.autofarm?.tarifs_time1_boost[person.lang],
        count: 1,
        percents:50
      },
      {
        image: coinsIcon,
        time: lang?.autofarm?.tarifs_time2_boost[person.lang],
        count: 2,
        percents:100
      },
      {
        image: coinsIcon,
        time: lang?.autofarm?.tarifs_time3_boost[person.lang],
        count: 3,
        percents:150
      },
      {
        image: coinsIcon,
        time: lang?.autofarm?.tarifs_time4_boost[person.lang],
        count: 4,
        percents:200
      },
      {
        image: coinsIcon,
        time: lang?.autofarm?.tarifs_time5_boost[person.lang],
        count: 5,
        percents:250
      },
    ],
    btn: {
      text: lang?.autofarm?.button_boost[person.lang],
      color: "#45E9B8",
      textColor: "black",
      icon: key4,
      handler: firstCardClick,
    },
    info: lang?.autofarm?.info_boost[person.lang],
  };

  return (
    <div className=" py-[24px] px-[17px] flex flex-col items-center gap-[8px] pb-[80px] h-full overflow-auto">
      <BuyCard data={fourthCardData} />
      <BuyCard data={secondCardData} />
      <BuyCard data={fifthCardData} />
      <BuyCard data={firstCardData} />
      <BuyCard data={thirdCardData} />
      {showModal && createPortal(<BuyCardModal setShowModal={setShowModal} data={modalInfo}/>, document.body)}
    </div>
  );
}
