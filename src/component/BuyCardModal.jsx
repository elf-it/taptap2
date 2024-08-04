import { useEffect, useState } from "react";
import moneyImgage from "../assets/images/money.png";
import CustomSelect from "./CustomSelect";
import { useTonConnectUI } from "@tonconnect/ui-react";
import { useMamotContract } from "../hooks/useMamotContract";
import { createTX } from "../lib/fetch";
import { toNano } from "@ton/core";
import TonWeb from "tonweb";

const tg = window.Telegram.WebApp;

export default function BuyCardModal({ setShowModal, data }) {
  const {contractAddress} = useMamotContract();
  const [tonConnectUI, setOptions] = useTonConnectUI();
  const [currentChoosedTarrif, setCurrentChoosedTarrif] = useState(0);
  const [disabled, setDisabled] = useState(false);

  const overlayClick = (event) => {
    if (event.currentTarget === event.target) setShowModal(false);
  };

  const sendTransaction = async () => {
    const transaction = {
      validUntil: Math.floor(Date.now() / 1000) + 60,
      messages: [
          {
              address: contractAddress,
              amount: toNano((data.tarrifs[currentChoosedTarrif]?.count / 50).toString()).toString()
          }
      ]
    }
    
    try {
      const result = await tonConnectUI.sendTransaction(transaction);
      
      if(result){
        const bocCell = TonWeb.boc.Cell.oneFromBoc(TonWeb.utils.base64ToBytes(result.boc));
        const hash = TonWeb.utils.bytesToBase64(await bocCell.hash());
        const res = await createTX({txhash: hash, tid: tg.initDataUnsafe?.user?.id, package_index: currentChoosedTarrif, amount: data.tarrifs[currentChoosedTarrif]?.count});
        if(res.hash){
          setShowModal(false)
          alert("Ожидайте начисления!")
        }
      }
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    //getAutoclickT()
  }, [])

  return (
    <div
      onClick={overlayClick}
      className="flex flex-row h-full w-full absolute top-0 right-0 bottom-0 left-0 backdrop-blur-sm px-[15px] items-center "
    >
      <div className="w-full h-[320px] bg-gradient-to-b from-[#45E9B8] to-black p-[1px] rounded-[15px]">
        <div className="h-full w-full bg-black rounded-[14px] flex flex-col items-center px-[20px] justify-between pb-[20px] ">
          <img
            className="w-[115px] h-[72px] translate-y-[-25px]"
            src={moneyImgage}
            alt=""
          />
          <p className="text-2xl text-gradient font-comic font-bold mt-[-15px]">
            {data?.title}
          </p>
          <p className="text-sm text-white font-comic text-center">
            {data?.descr}
          </p>
          <div className="flex flex-row items-center justify-between gap-[5px] w-full">
            <CustomSelect
              list={data?.tarrifs}
              initial={currentChoosedTarrif}
              img={data?.tarrifs[currentChoosedTarrif]?.image}
              option={"time"}
              imageOption={"image"}
              handler={setCurrentChoosedTarrif}
            />
            <p className="text-sm text-white font-comic flex flex-row items-center gap-[10px]">
              Цена:{" "}
              <span className="font-bold text-2xl">
                {data.tarrifs[currentChoosedTarrif]?.count} TON
              </span>
            </p>
          </div>
          <button
            disabled={disabled}
            className={`font-comic text-sm text-black py-[15px] rounded-xl w-full flex flex-row items-center justify-center gap-[10px] bg-gradient-to-b from-gradientStartColor to-gradientEndColor`}
            onClick={sendTransaction}
          >
            Купить
          </button>
        </div>
      </div>
    </div>
  );
}
