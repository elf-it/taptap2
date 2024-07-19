import { TonConnectButton, useTonConnectUI, useTonAddress, useTonWallet } from "@tonconnect/ui-react";


export default function ConnectWallet() {
    const transaction = {
        messages: [
            {
                address: "1:e4ced2de3d61c81e73a3214eb3725ce23405d172136d65940c7f52ce5a413871",
                amount: "20000000"
            }
        ]
    }

    const [tonConnectUI, setOptions] = useTonConnectUI();

    const userFriendlyAddress = useTonAddress();
    const rawAddress = useTonAddress(false);

    return(
        <div>
            <TonConnectButton style={{float: "right"}} />
            <div>
                <button className="w-full text-white" onClick={() => tonConnectUI.sendTransaction(transaction)}>Buy</button>
                {
                    userFriendlyAddress && (
                        <div>
                            <span>User-friendly address: {userFriendlyAddress}</span>
                            <span>Raw address: {rawAddress}</span>
                        </div>
                    )
                }
                {
                    wallet && (
                        <div>
                            <span>Connected wallet: {wallet.name}</span>
                            <span>Device: {wallet.device.appName}</span>
                        </div>
                    )
                }
            </div>
        </div>
    );
}