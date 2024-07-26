import { CHAIN, TonConnectButton } from "@tonconnect/ui-react";
import { useTonConnect } from "../hooks/useTonConnect";
import { Address } from "ton-core";


export default function ConnectWallet() {

    const {network, wallet} = useTonConnect();

    return(
        <>
            <TonConnectButton className="my-20px mt-50px" />
            <p className="text-white">network: {network ? network === CHAIN.MAINNET ? "mainnet" : "testnet" : "N/A"}</p>
            <p className="text-white">wallet: {wallet ? Address.parse(wallet).toString() : "Loading..."}</p>
        </>
    );
}