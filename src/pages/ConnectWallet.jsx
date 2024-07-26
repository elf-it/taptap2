import { CHAIN, TonConnectButton } from "@tonconnect/ui-react";
import { useTonConnect } from "../hooks/useTonConnect";


export default function ConnectWallet() {

    const {network} = useTonConnect();

    return(
        <>
            <TonConnectButton className="w-full my-20px mt-50px" />
            <p className="text-white">{network ? network === CHAIN.MAINNET ? "mainnet" : "testnet" : "N/A"}</p>
        </>
    );
}