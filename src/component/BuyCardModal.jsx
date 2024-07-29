import { useEffect, useState } from "react";
import moneyImgage from "../assets/images/money.png";
import CustomSelect from "./CustomSelect";
import { Dictionary, Address } from "ton-core";
import { useTonConnectUI } from "@tonconnect/ui-react";
import { createTX, getAutoclick } from "../lib/fetch";

const tg = window.Telegram.WebApp;

export default function BuyCardModal({ setShowModal, data }) {
  const [currentChoosedTarrif, setCurrentChoosedTarrif] = useState(0);
  const [disabled, setDisabled] = useState(false);

  const referrers = Dictionary.empty(Dictionary.Keys.BigInt(32), Dictionary.Values.Address());

  referrers.set(0n, Address.parse("UQDs-xDFMg033y71LR8n3ImXIjXD5U79a0nVf3PXUycFRKVo"));
  referrers.set(1n, Address.parse("UQDs-xDFMg033y71LR8n3ImXIjXD5U79a0nVf3PXUycFRKVo"));
  referrers.set(2n, Address.parse("UQDs-xDFMg033y71LR8n3ImXIjXD5U79a0nVf3PXUycFRKVo"));
  referrers.set(3n, Address.parse("UQDs-xDFMg033y71LR8n3ImXIjXD5U79a0nVf3PXUycFRKVo"));
  referrers.set(4n, Address.parse("UQDs-xDFMg033y71LR8n3ImXIjXD5U79a0nVf3PXUycFRKVo"));
  referrers.set(5n, Address.parse("UQDs-xDFMg033y71LR8n3ImXIjXD5U79a0nVf3PXUycFRKVo"));

  const transaction = {
    validUntil: Math.floor(Date.now() / 1000) * 360,
    messages: [
      {
        $$type: "Buy",
        address: "EQCga9E2Wy7iWMyFf0X8ttbvOnfBEM025UtzO2YwOU0NPX7c",
        amount: data.tarrifs[currentChoosedTarrif]?.count * 10000000,
        referrers: referrers
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
      alert(response.index + " : " + data.tarrifs[currentChoosedTarrif]?.count)
      if(response.index == data.tarrifs[currentChoosedTarrif]?.count - 1 && response.status){
        setDisabled(true);
      }
    }
  };

  const sendTransaction = async () => {
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
