import { useEffect, useState } from "react";
import moneyImgage from "../assets/images/money.png";
import CustomSelect from "./CustomSelect";
import Button from "./Button";
import { useTonConnectUI } from "@tonconnect/ui-react";
import { createTX, getAutoclick } from "../lib/fetch";

const tg = window.Telegram.WebApp;

export default function BuyCardModal({ setShowModal, data }) {
  const [currentChoosedTarrif, setCurrentChoosedTarrif] = useState(0);
  const [disabled, setDisabled] = useState(false);

  const transaction = {
    validUntil: Math.floor(Date.now() / 1000) * 360,
    messages: [
      {
        address: "0:e4ced2de3d61c81e73a3214eb3725ce23405d172136d65940c7f52ce5a413871",
        amount: data.tarrifs[currentChoosedTarrif]?.count * 10000000
      }
    ]
  }

  const [tonConnectUI, setOptions] = useTonConnectUI();

  const overlayClick = (event) => {
    if (event.currentTarget === event.target) setShowModal(false);
  };

  const getAutoclickT = async () => {
    const response = await getAutoclick({tid: tg.initDataUnsafe?.user?.id})
    if(response.error){
      console.log(response.error)
    }else{
      if(response.index == data.tarrifs[currentChoosedTarrif]?.count - 1 && response.status){
        setDisabled(true);
      }
    }
  };

  const sendTransaction = async () => {
    alert("123")
    const result = await tonConnectUI.sendTransaction(transaction)
    const response = await createTX({tid: tg.initDataUnsafe?.user?.id, txhash: result.boc, package_index: data.index, amount: data.tarrifs[currentChoosedTarrif]?.count * 10000000})
    if(response.error){
      console.log(response.error)
      alert(response.error)
    }else{
      alert("https://tonviewer.com/transaction/" + response.hash)
      setShowModal(false)
    }
  };

  useEffect(() => {
    getAutoclickT()
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
