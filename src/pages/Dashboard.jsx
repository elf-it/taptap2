import React, { useState } from "react";
import crownSvg from "../assets/icons/icon__crown.svg";
import coinsSvg from "../assets/icons/icon__coins.svg";
import ticketSvg from "../assets/icons/icon__ticket.svg";
import userImage from "../assets/images/user-image.png";
import copySvg from "../assets/icons/icon__copy.svg";
import CopyToClipboard from "react-copy-to-clipboard";

const tg = window.Telegram.WebApp;
const myLink = "http://t.me/mamontenokBot_bot/Mamontenok?startapp=" + tg.initDataUnsafe?.user?.id;

export default function Dashboard() {

  const [state, setState] = useState(false);

  const fakeData = [
    {
      name: "Pepe",
      coins: "70,00",
      photo: userImage,
    },
    {
      name: "Pepe",
      coins: "70,00",
      photo: userImage,
    },
    {
      name: "Pepe",
      coins: "70,00",
      photo: userImage,
    },
    {
      name: "Pepe",
      coins: "70,00",
      photo: userImage,
    },
    {
      name: "Pepe",
      coins: "70,00",
      photo: userImage,
    },
    {
      name: "Pepe",
      coins: "70,00",
      photo: userImage,
    },
  ];

  const fakeData2 = [
    {
      name: "Pepe",
      coins: "70,00",
      status: "Gold Status",
    },
    {
      name: "Pepe",
      coins: "70,00",
      status: "Gold Status",
    },
    {
      name: "Pepe",
      coins: "70,00",
      status: "Gold Status",
    },
    {
      name: "Pepe",
      coins: "70,00",
      status: "Gold Status",
    },
    {
      name: "Pepe",
      coins: "70,00",
      status: "Gold Status",
    },
    {
      name: "Pepe",
      coins: "70,00",
      status: "Gold Status",
    },
  ];

  return (
    
      <div className=" py-[24px] px-[17px] flex flex-col items-center gap-[8px] pb-[80px] h-full overflow-auto">
        <div className="elem-bg_green px-[8px] rounded-[40px] w-auto flex flex-row items-center gap-[8px]">
          <img src={crownSvg} alt="" />
          <p className="font-comic text-gradient font-bold text-sm">
            Gold Status
          </p>
        </div>

        <div className="flex flex-row items-center gap-[8px]">
          <img src={coinsSvg} alt="" />
          <p className="font-comic text-gradient text-[50px] font-bold">
            10,000
          </p>
        </div>

        <div className="flex flex-row items-center gap-[8px]">
          <img src={ticketSvg} alt="" />
          <p className="font-comic text-sm">
            <span className="text-[#FFCC48]">23</span>
            <span className="text-[#9B9B9B]">/билет</span>
          </p>
        </div>

        <div className="flex flex-col items-center elem-bg_green py-[24px] px-[20px] rounded-[15px] w-full mb-[10px]">
          <h3 className="text-lg text-white font-comic font-bold mb-[8px]">
            Meme coins
          </h3>
          {fakeData.map((user, i) => (
            <div
            key={i}
              className={`py-[10px] flex flex-row items-center justify-between w-full ${
                i !== fakeData.length - 1 ? "border-b" : ""
              } border-white/20`}
            >
              <div className="flex flex-row items-center gap-[8px]">
                <img
                  className="w-[32px] h-[32px] rounded-full"
                  src={user.photo}
                  alt=""
                />
                <p className="text-lg text-white font-comic font-bold">
                  {user.name}
                </p>
              </div>
              <p className="text-gradient text-xl font-comic font-bold">
                +{user.coins}
              </p>
            </div>
          ))}
        </div>

        <div className="flex flex-col items-center elem-bg_green py-[24px] px-[20px] rounded-[15px] w-full gap-[20px]">
          <h3 className="text-lg text-white font-comic font-bold mb-[8px]">
            Приглашенные друзья
          </h3>
          <div className="flex flex-row items-center gap-[8px]">
            <img className="w-[32px] h-[19px]" src={coinsSvg} alt="" />
            <p className="font-comic text-sm">
              <span className="text-[#FFCC48]">+400</span>
              <span className="text-[#9B9B9B]">/за друга</span>
            </p>
          </div>

          <div className="w-full flex flex-row items-center gap-[8px]">
            <button className="flex-1 py-[16px] bg-gradient-to-b from-gradientStartColor to-gradientEndColor rounded-[13px]">
              <a href={myLink} className="font-comic text-sm">Пригласить друга</a>
            </button>
            <CopyToClipboard text={myLink}
              onCopy={() => setState(true)}>
              <button className="p-[16px] elem-bg_green rounded-[13px] overflow-hidden"><img src={copySvg} alt="" /></button>
            </CopyToClipboard>
          </div>

          <div className="flex flex-col w-full">
            {fakeData2.map((user, i) => (
              <div
                className={`py-[5px] flex flex-row items-center justify-between w-full ${
                  i !== fakeData.length - 1 ? "border-b" : ""
                } border-white/20`}
              >
                <div className="flex flex-col">
                  <p className="text-lg text-white font-comic font-bold">
                    {user.name}
                  </p>
                  <p className="text-xs text-gradient font-comic">
                    {user.status}
                  </p>
                </div>
                <p className="text-gradient text-xl font-comic font-bold">
                  {user.coins}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
  );
}
