import { CHAIN, TonConnectButton } from "@tonconnect/ui-react";
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
            <button disabled={!connected} onClick={buy("", "", "", "", "", "", "1")}>buy</button>
        </>
    );
}