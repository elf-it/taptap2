import { TonConnectButton } from "@tonconnect/ui-react";
import { useTonConnect } from "../hooks/useTonConnect";


export default function ConnectWallet() {

    const {network} = useTonConnect();

    return(
        <>
            <TonConnectButton className="w-full my-20px mt-50px" />
            <p>{network}</p>
        </>
    );
}