import { TonConnectButton, useTonConnectUI, useTonAddress } from "@tonconnect/ui-react";


export default function ConnectWallet() {
    const transaction = {
        messages: [
            {
                address: "UQAAp_ua2wpsaXnzFf4nna5J-HKpptzF4iPjbWsof1354cXQ",
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
                userFriendlyAddress && (
                    <div>
                        <span>User-friendly address: {userFriendlyAddress}</span>
                        <span>Raw address: {rawAddress}</span>
                    </div>
                )
            </div>
        </div>
    );
}