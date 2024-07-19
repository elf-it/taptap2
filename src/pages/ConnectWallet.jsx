import { TonConnectButton, useTonConnectUI } from "@tonconnect/ui-react";


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

    return(
        <div>
            <TonConnectButton style={{float: "right"}} />
            <div>
                <button className="w-full text-white" onClick={() => tonConnectUI.sendTransaction(transaction)}>Buy</button>
            </div>
        </div>
    );
}