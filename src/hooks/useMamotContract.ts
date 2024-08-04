import { Address, OpenedContract, fromNano, toNano } from '@ton/core';
import { Mamotic } from '../wrappers/Mamotic';
import { useAsyncInitialize } from "./useAsyncInitialize";
import { useTonClient } from "./useTonClient";
import { useEffect, useState } from 'react';
import { useTonConnect } from './useTonConnect';

export function useMamotContract(){
    const {client} = useTonClient();
    const {sender} = useTonConnect();
    const [user, setUser] = useState<string>("");
    const ca = "EQCZZjHxfjcRfOTzHFl1XEt6DCHGlTGLe0QNCj4EjMrUQPUN";

    const mamotContract = useAsyncInitialize(async () => {
        if(!client) return;

        const contract = Mamotic.fromAddress(Address.parse(ca));

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

    return {
        user: user,
        contractAddress: ca,
        buy: (value: string) => {

            mamotContract?.send(sender, {
                value: toNano(value)
            }, null);
        },
        withdraw: (amount: string, passkey: string) => {
            mamotContract?.send(sender, {
                value: toNano("0.02")
            },
            {
                $$type: 'WithdrawPercents',
                amount: toNano(amount),
                passkey: passkey
            });
        }
    }
}