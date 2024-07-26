import { TonConnectButton, useTonConnectUI, useTonAddress, useTonWallet } from "@tonconnect/ui-react";
import { useTonConnect } from "../hooks/useTonConnect";


export default function ConnectWallet() {

    const {network} = useTonConnect();

    const transaction = {
        validUntil: Math.floor(Date.now() / 1000) * 360,
        messages: [
            {
                address: "0:e4ced2de3d61c81e73a3214eb3725ce23405d172136d65940c7f52ce5a413871",
                amount: "20000000"
            }
        ]
    }

    const [tonConnectUI, setOptions] = useTonConnectUI();

    const userFriendlyAddress = useTonAddress();
    const rawAddress = useTonAddress(false);

    const wallet = useTonWallet();

    return(
        <>
            <TonConnectButton className="w-full my-20px mt-50px" />
            <p>{network}</p>
        </>
    );
}