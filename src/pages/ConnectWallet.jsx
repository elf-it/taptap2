/*
import { CHAIN, TonConnectButton, useTonConnectModal } from "@tonconnect/ui-react";
import { useTonConnect } from "../hooks/useTonConnect";
import { Address } from "ton-core";
import { useMamotContract } from "../hooks/useMamotContract";


export default function ConnectWallet() {

    const {network, wallet, connected} = useTonConnect();
    const {user, buy} = useMamotContract();

    return(
        <>
            <TonConnectButton className="my-20px mt-50px" />
            <p className="text-white">network: {network ? network === CHAIN.MAINNET ? "mainnet" : "testnet" : "N/A"}</p>
            <p className="text-white">wallet: {wallet ? Address.parse(wallet).toString() : "Loading..."}</p>
            <p className="text-white">user ref balance: {user ?? "Loading..."}</p>
            <button className="text-white" disabled={!connected} onClick={() => buy(Address.parse("UQDs-xDFMg033y71LR8n3ImXIjXD5U79a0nVf3PXUycFRKVo"), Address.parse("UQDs-xDFMg033y71LR8n3ImXIjXD5U79a0nVf3PXUycFRKVo"), Address.parse("UQDs-xDFMg033y71LR8n3ImXIjXD5U79a0nVf3PXUycFRKVo"), Address.parse("UQDs-xDFMg033y71LR8n3ImXIjXD5U79a0nVf3PXUycFRKVo"), Address.parse("UQDs-xDFMg033y71LR8n3ImXIjXD5U79a0nVf3PXUycFRKVo"), Address.parse("UQDs-xDFMg033y71LR8n3ImXIjXD5U79a0nVf3PXUycFRKVo"), "0.5")}>buy</button>
        </>
    );
}


*/

import { CHAIN, TonConnectButton, useTonConnectModal, useTonConnectUI } from "@tonconnect/ui-react";
import { useTonConnect } from "../hooks/useTonConnect";
import { Address } from "ton-core";
import { useMamotContract } from "../hooks/useMamotContract";
import lock from "../assets/images/wallet-lock.png";
import { Icon } from "../component/IconSprite";
import coinsSvg from "../assets/icons/icon__coins.svg";

export default function ConnectWallet({person}) {

  const [tonConnectUI, setOptions] = useTonConnectUI();
  const {network, wallet, connected} = useTonConnect();
  const { state, open, close } = useTonConnectModal();
  const {user, buy, withdraw} = useMamotContract();

  const disconnect = async () => {
    await tonConnectUI.disconnect();
  }

  return (
    <div className="flex flex-col items-center justify-center h-full px-[17px]">
      <img className="w-[224px] " src={lock} alt="" />
      <div className="flex flex-col items-center mb-[40px] w-full">
        <h3 className="text-[32px] font-comic text-white font-bold  w-full text-center mb-[20px]">
          Кошелек
        </h3>
        {!connected ? (
          <>
            <p className="text-base font-comic text-white text-center mb-[50px]">
              Подключите свой кошелек для совершения покупок и получения
              вознаграждений{" "}
            </p>
            <button
              onClick={open}
              className={`font-comic text-sm text-black py-[15px] rounded-xl w-4/5 flex flex-row items-center justify-center gap-[10px] bg-gradient-to-b from-gradientStartColor to-gradientEndColor`}
            >
              Подключить свой кошелек
            </button>
          </>
        ) : (
          <div className="flex flex-col gap-[10px]">
            <div className="flex flex-row items-center w-full gap-[10px]">
              <div className="flex-1 elem-bg_green p-[15px] rounded-[13px] flex flex-row gap-[10px] items-center">
                <Icon name="wallet-wallet" size={24} color={network ? network === CHAIN.MAINNET ? "#45E9B8" : "#ff0000" : "#ffffff"} />
                <p className="text-[14px] font-comic text-white">
                  {Address.parse(wallet).toString().substring(0, 8) + "..." + Address.parse(wallet).toString().substring(Address.parse(wallet).toString().length - 7, Address.parse(wallet).toString().length)}
                </p>
                <button onClick={disconnect}>
                <Icon
                  styles={{ marginLeft: "auto" }}
                  name="cross"
                  size={24}
                  color="rgba(255,255,255,0.5)"
                />
                </button>
              </div>
              <div className="elem-bg_green p-[15px] rounded-[13px]">
                <Icon name="copy" size={24} color="#45E9B8" />
              </div>
            </div>
            <div className="elem-bg_green p-[24px] rounded-[13px] flex flex-col gap-[10px] items-center">
              <div className="flex flex-row items-center gap-[10px] justify-center">
                <img className="w-[32px]" src={coinsSvg} alt="" />
                <p className="text-[#FFCC48] font-comic text-[24px]">+{person.bonuses}</p>
              </div>
              <p className="text-white font-comic text-[14px]">Реферальных бонусов</p>
              <button
                className={`font-comic text-sm text-black py-[15px] rounded-xl w-full flex flex-row items-center justify-center gap-[10px] bg-gradient-to-b from-gradientStartColor to-gradientEndColor`}
                disabled={!connected}
                onClick={() => withdraw()}
              >
                Получить бонус
                <img className="w-[32px]" src={coinsSvg} alt="" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}