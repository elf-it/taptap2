import { Address, Dictionary, OpenedContract, fromNano, toNano } from 'ton-core';
import { Buy, Mamotic } from '../wrappers/Mamotic';
import { useAsyncInitialize } from "./useAsyncInitialize";
import { useTonClient } from "./useTonClient";
import { useEffect, useState } from 'react';
import { useTonConnect } from './useTonConnect';

export function useMamotContract(){
    const {client} = useTonClient();
    const {sender} = useTonConnect();
    const [user, setUser] = useState<string>("");

    const mamotContract = useAsyncInitialize(async () => {
        if(!client) return;

        const contract = Mamotic.fromAddress(Address.parse(""));

        return client.open(contract) as OpenedContract<Mamotic>;
    }, [client]);

    useEffect(() => {
        async function getUser() {
            if(!mamotContract) return;

            const user = await mamotContract.getUser(sender.address);

            setUser(fromNano(user));
        }

        getUser();
    })
    /*
    mamotContract.send(
        userS.getSender(),
        {
            value: toNano("4")
        },
        {
            $$type: "Buy",
            referrers
        }
    );
    */

    return {
        user: user,
        buy: (ref1: Address, ref2: Address, ref3: Address, ref4: Address, ref5: Address, ref6: Address, value: string) => {
            const referrers = Dictionary.empty(Dictionary.Keys.BigInt(32), Dictionary.Values.Address());

            referrers.set(0n, ref1);
            referrers.set(1n, ref2);
            referrers.set(2n, ref3);
            referrers.set(3n, ref4);
            referrers.set(4n, ref5);
            referrers.set(5n, ref6);
            const message: Buy = {
                $$type: "Buy",
                referrers
            }

            mamotContract?.send(sender, {
                value: toNano(value)
            }, message);
        }
    }
}