import React, { useContext, useEffect, useState } from "react";
import crownSvg from "../assets/icons/icon__crown.svg";
import coinsSvg from "../assets/icons/icon__coins.svg";
import ticketSvg from "../assets/icons/icon__ticket.svg";
import bome from "../assets/dasboardCoins/bome.png";
import dogecoin from "../assets/dasboardCoins/dogecoin.png";
import dogwifhat from "../assets/dasboardCoins/dogwifhat.png";
import floki from "../assets/dasboardCoins/floki.png";
import mew from "../assets/dasboardCoins/mew.png";
import mog from "../assets/dasboardCoins/mog.png";
import notcoin from "../assets/dasboardCoins/notcoin.png";
import pepe from "../assets/dasboardCoins/pepe.png";
import ponke from "../assets/dasboardCoins/ponke.png";
import popcat from "../assets/dasboardCoins/popcat.png";
import shiba from "../assets/dasboardCoins/shiba.png";
import { useMamotContract } from "../hooks/useMamotContract";
import { Address, toNano, beginCell } from "@ton/core";
import { useTonConnect } from "../hooks/useTonConnect";
import { useTonConnectUI } from "@tonconnect/ui-react";

import copySvg from "../assets/icons/icon__copy.svg";
import CopyToClipboard from "react-copy-to-clipboard";
import { createTX, getReferals } from "../lib/fetch";
import { LngContext } from "../store/langContext";

import TonWeb from "tonweb";

const tg = window.Telegram.WebApp;
const myLink = "https://t.me/mamontenokBot_bot/Mamontenok?startapp=" + tg.initDataUnsafe?.user?.id;
const shareLink = "https://t.me/share/url?url=http://t.me/mamontenokBot_bot/Mamontenok?startapp=" + tg.initDataUnsafe?.user?.id

export default function Dashboard({person, count}) {

  const {contractAddress} = useMamotContract();
  const [tonConnectUI, setOptions] = useTonConnectUI();

  const {network, wallet, connected} = useTonConnect();

  const [state, setState] = useState(false);
  const [referals, setReferals] = useState([]);

  const [lang, setLang] = useContext(LngContext);

  const formatCount = new Intl.NumberFormat("en-US").format(count);

  const fakeData = [
    {
      name: "Notcoin",
      coins: person.Notcoin.toString(),
      photo: notcoin,
    },
    {
      name: "Pepe",
      coins: person.Pepe.toString(),
      photo: pepe,
    },
    {
      name: "Shiba",
      coins: person.Shiba.toString(),
      photo: shiba,
    },
    {
      name: "Dogecoin",
      coins: person.Dogecoin.toString(),
      photo: dogecoin,
    },
    {
      name: "Dogwifhat",
      coins: person.Dogwifhat.toString(),
      photo: dogwifhat,
    },
    {
      name: "Popcat",
      coins: person.Popcat.toString(),
      photo: popcat,
    },
    {
      name: "Mog",
      coins: person.Mog.toString(),
      photo: mog,
    },
    {
      name: "Floki",
      coins: person.Floki.toString(),
      photo: floki,
    },
    {
      name: "Ponke",
      coins: person.Ponke.toString(),
      photo: ponke,
    },
    {
      name: "Mew",
      coins: person.Mew.toString(),
      photo: mew,
    },
    {
      name: "Bome",
      coins: person.Bome.toString(),
      photo: bome,
    }
  ];

  const withdrawN = async (amount, passkey, tid, wallet) => {
    const body = beginCell()
    .storeUint(1741503767, 32)
    .storeCoins(toNano(amount))
    .storeStringRefTail(passkey)
    .endCell();

    const transaction = {
      validUntil: Math.floor(Date.now() / 1000) + 60,
      messages: [
          {
              address: contractAddress,
              amount: toNano((0.02).toString()).toString(),
              payload: body.toBoc().toString("base64")
          }
      ]
    }
    
    try {
      const result = await tonConnectUI.sendTransaction(transaction);
      
      if(result){
        const bocCell = TonWeb.boc.Cell.oneFromBoc(TonWeb.utils.base64ToBytes(result.boc));
        const hash = TonWeb.utils.bytesToBase64(await bocCell.hash());
        const res = await createTX({txhash: hash, tid, package_index: 5, amount, package: 5});
        console.log(res)
        if(res.hash){
          console.log(res)
          alert("ожидайте начисления")
        }
      }
    } catch (e) {
      console.error(e);
    }
  }

  const nGetReferals = async () => {
    if(tg.initDataUnsafe?.user?.id != undefined){
      const response = await getReferals({tid: tg.initDataUnsafe?.user?.id})

      if(response.error){
        console.log(response.error)
      }else{
        setReferals(response.referals);
      }
    }else{
      console.log("no tg app")
    }
  };

  useEffect(() => {
    nGetReferals();
  }, []);

  return (
    
      <div className=" py-[24px] px-[17px] flex flex-col items-center gap-[8px] pb-[80px] h-full overflow-auto">
        <div className="elem-bg_green px-[8px] rounded-[40px] w-auto flex flex-row items-center gap-[8px]">
          <img src={crownSvg} alt="" />
          <p className="font-comic text-gradient font-bold text-sm">
            {person.status}
          </p>
        </div>

        <div className="flex flex-row items-center gap-[8px]">
          <img src={coinsSvg} alt="" />
          <p className="font-comic text-gradient text-[50px] font-bold">
            {formatCount}
          </p>
        </div>

        <div className="flex flex-row items-center gap-[8px]">
          <img src={ticketSvg} alt="" />
          <p className="font-comic text-sm">
            <span className="text-[#FFCC48]">{person ? person.tickets : "0"}</span>
            <span className="text-[#9B9B9B]">/{lang?.dashboard?.text_ticket[person.lang]}</span>
          </p>
        </div>

        <div className="flex flex-col items-center elem-bg_green py-[24px] px-[20px] rounded-[15px] w-full mb-[10px]">
          <h3 className="text-lg text-white font-comic font-bold mb-[8px]">
            {lang?.dashboard?.text_meme_coins[person.lang]}
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
            {lang?.dashboard?.text_friends[person.lang]}
          </h3>
          <div className="elem-bg_green px-[8px] rounded-[40px] w-auto flex flex-row items-center gap-[8px]">
            <img src={crownSvg} alt="" />
            <p className="font-comic text-gradient font-bold text-sm">
              {person.status}
            </p>
          </div>
          <div className="flex flex-row items-center gap-[8px]">
            <img className="w-[32px] h-[19px]" src={coinsSvg} alt="" />
            <p className="font-comic text-[28px] text-[#FFCC48] font-bold">+{person.bonuses}</p>
          </div>
          <button disabled={!connected || person.bonuses == 0} onClick={() => withdrawN(person.bonuses.toString(), "86ffdf1bcad21feaed5790dedbd7aa23e17ddba4255e541324dff2aa80c13547", person.tid, Address.parse(wallet).toString())} className={`p-[16px] ${!connected || person.bonuses == 0 ? "elem-bg_green" : "bg-gradient-to-b from-gradientStartColor to-gradientEndColor"} rounded-[13px] overflow-hidden flex flex-row items-center gap-[10px] w-full justify-center`}>
          <p className={`font-comic ${!connected || person.bonuses == 0 && "font-bold text-base text-gradient"}`}>{lang?.dashboard?.text_get_bonus[person.lang]}</p>
              <img className="w-[32px] h-[19px]" src={coinsSvg} alt="" />
            </button>
          <div className="w-full flex flex-row items-center gap-[8px]">
            <button onClick={() => tg.openTelegramLink(shareLink)} className="flex-1 py-[16px] bg-gradient-to-b from-gradientStartColor to-gradientEndColor rounded-[13px]">
              <p className="font-comic text-sm">{lang?.dashboard?.text_invite_friend[person.lang]}</p>
            </button>
            <CopyToClipboard text={myLink}
              onCopy={() => {
                setState(true);
              }}>
              <button className="p-[16px] elem-bg_green rounded-[13px] overflow-hidden"><img src={copySvg} alt="" /></button>
            </CopyToClipboard>
          </div>

          <div className="flex flex-col w-full">
            {referals.map((user, i) => (
              <div
                className={`py-[5px] flex flex-row items-center justify-between w-full ${
                  i !== referals.length - 1 ? "border-b" : ""
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
