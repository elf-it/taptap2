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
            if(!mamotContract || sender.address == undefined) return;

            const user = await mamotContract.getUser(sender.address);

            setUser(fromNano(user));
        }

        getUser();
    }, [mamotContract])
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
        buy: (ref1: string, ref2: string, ref3: string, ref4: string, ref5: string, ref6: string, value: string) => {
            const referrers = Dictionary.empty(Dictionary.Keys.BigInt(32), Dictionary.Values.Address());

            referrers.set(0n, Address.parse(ref1));
            referrers.set(1n, Address.parse(ref2));
            referrers.set(2n, Address.parse(ref3));
            referrers.set(3n, Address.parse(ref4));
            referrers.set(4n, Address.parse(ref5));
            referrers.set(5n, Address.parse(ref6));
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