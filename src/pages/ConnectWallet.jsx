import { TonConnectButton, useTonConnectUI, useTonAddress, useTonWallet } from "@tonconnect/ui-react";


export default function ConnectWallet() {
    const transaction = {
        messages: [
            {
                address: "0:412410771DA82CBA306A55FA9E0D43C9D245E38133CB58F1457DFB8D5CD8892F",
                amount: "20000000"
            }
        ]
    }

    const [tonConnectUI, setOptions] = useTonConnectUI();

    const userFriendlyAddress = useTonAddress();
    const rawAddress = useTonAddress(false);

    const wallet = useTonWallet();

    return(
        <div>
            <TonConnectButton style={{float: "right"}} />
            <div>
                <button className="w-full text-white" onClick={() => tonConnectUI.sendTransaction(transaction)}>Buy</button>
                userFriendlyAddress && (
                    <div>
                        <span>User-friendly address: {userFriendlyAddress}</span>
                        <span>Raw address: {rawAddress}</span>
                    </div>
                    wallet && (
                        <div>
                            <span>Connected wallet: {wallet.name}</span>
                            <span>Device: {wallet.device.appName}</span>
                        </div>
                    )
                )
            </div>
        </div>
    );
}