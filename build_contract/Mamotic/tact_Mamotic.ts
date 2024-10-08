import { 
    Cell,
    Slice, 
    Address, 
    Builder, 
    beginCell, 
    ComputeError, 
    TupleItem, 
    TupleReader, 
    Dictionary, 
    contractAddress, 
    ContractProvider, 
    Sender, 
    Contract, 
    ContractABI, 
    ABIType,
    ABIGetter,
    ABIReceiver,
    TupleBuilder,
    DictionaryValue
} from '@ton/core';

export type StateInit = {
    $$type: 'StateInit';
    code: Cell;
    data: Cell;
}

export function storeStateInit(src: StateInit) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeRef(src.code);
        b_0.storeRef(src.data);
    };
}

export function loadStateInit(slice: Slice) {
    let sc_0 = slice;
    let _code = sc_0.loadRef();
    let _data = sc_0.loadRef();
    return { $$type: 'StateInit' as const, code: _code, data: _data };
}

function loadTupleStateInit(source: TupleReader) {
    let _code = source.readCell();
    let _data = source.readCell();
    return { $$type: 'StateInit' as const, code: _code, data: _data };
}

function storeTupleStateInit(source: StateInit) {
    let builder = new TupleBuilder();
    builder.writeCell(source.code);
    builder.writeCell(source.data);
    return builder.build();
}

function dictValueParserStateInit(): DictionaryValue<StateInit> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeStateInit(src)).endCell());
        },
        parse: (src) => {
            return loadStateInit(src.loadRef().beginParse());
        }
    }
}

export type Context = {
    $$type: 'Context';
    bounced: boolean;
    sender: Address;
    value: bigint;
    raw: Cell;
}

export function storeContext(src: Context) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeBit(src.bounced);
        b_0.storeAddress(src.sender);
        b_0.storeInt(src.value, 257);
        b_0.storeRef(src.raw);
    };
}

export function loadContext(slice: Slice) {
    let sc_0 = slice;
    let _bounced = sc_0.loadBit();
    let _sender = sc_0.loadAddress();
    let _value = sc_0.loadIntBig(257);
    let _raw = sc_0.loadRef();
    return { $$type: 'Context' as const, bounced: _bounced, sender: _sender, value: _value, raw: _raw };
}

function loadTupleContext(source: TupleReader) {
    let _bounced = source.readBoolean();
    let _sender = source.readAddress();
    let _value = source.readBigNumber();
    let _raw = source.readCell();
    return { $$type: 'Context' as const, bounced: _bounced, sender: _sender, value: _value, raw: _raw };
}

function storeTupleContext(source: Context) {
    let builder = new TupleBuilder();
    builder.writeBoolean(source.bounced);
    builder.writeAddress(source.sender);
    builder.writeNumber(source.value);
    builder.writeSlice(source.raw);
    return builder.build();
}

function dictValueParserContext(): DictionaryValue<Context> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeContext(src)).endCell());
        },
        parse: (src) => {
            return loadContext(src.loadRef().beginParse());
        }
    }
}

export type SendParameters = {
    $$type: 'SendParameters';
    bounce: boolean;
    to: Address;
    value: bigint;
    mode: bigint;
    body: Cell | null;
    code: Cell | null;
    data: Cell | null;
}

export function storeSendParameters(src: SendParameters) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeBit(src.bounce);
        b_0.storeAddress(src.to);
        b_0.storeInt(src.value, 257);
        b_0.storeInt(src.mode, 257);
        if (src.body !== null && src.body !== undefined) { b_0.storeBit(true).storeRef(src.body); } else { b_0.storeBit(false); }
        if (src.code !== null && src.code !== undefined) { b_0.storeBit(true).storeRef(src.code); } else { b_0.storeBit(false); }
        if (src.data !== null && src.data !== undefined) { b_0.storeBit(true).storeRef(src.data); } else { b_0.storeBit(false); }
    };
}

export function loadSendParameters(slice: Slice) {
    let sc_0 = slice;
    let _bounce = sc_0.loadBit();
    let _to = sc_0.loadAddress();
    let _value = sc_0.loadIntBig(257);
    let _mode = sc_0.loadIntBig(257);
    let _body = sc_0.loadBit() ? sc_0.loadRef() : null;
    let _code = sc_0.loadBit() ? sc_0.loadRef() : null;
    let _data = sc_0.loadBit() ? sc_0.loadRef() : null;
    return { $$type: 'SendParameters' as const, bounce: _bounce, to: _to, value: _value, mode: _mode, body: _body, code: _code, data: _data };
}

function loadTupleSendParameters(source: TupleReader) {
    let _bounce = source.readBoolean();
    let _to = source.readAddress();
    let _value = source.readBigNumber();
    let _mode = source.readBigNumber();
    let _body = source.readCellOpt();
    let _code = source.readCellOpt();
    let _data = source.readCellOpt();
    return { $$type: 'SendParameters' as const, bounce: _bounce, to: _to, value: _value, mode: _mode, body: _body, code: _code, data: _data };
}

function storeTupleSendParameters(source: SendParameters) {
    let builder = new TupleBuilder();
    builder.writeBoolean(source.bounce);
    builder.writeAddress(source.to);
    builder.writeNumber(source.value);
    builder.writeNumber(source.mode);
    builder.writeCell(source.body);
    builder.writeCell(source.code);
    builder.writeCell(source.data);
    return builder.build();
}

function dictValueParserSendParameters(): DictionaryValue<SendParameters> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeSendParameters(src)).endCell());
        },
        parse: (src) => {
            return loadSendParameters(src.loadRef().beginParse());
        }
    }
}

export type Deploy = {
    $$type: 'Deploy';
    queryId: bigint;
}

export function storeDeploy(src: Deploy) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(2490013878, 32);
        b_0.storeUint(src.queryId, 64);
    };
}

export function loadDeploy(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 2490013878) { throw Error('Invalid prefix'); }
    let _queryId = sc_0.loadUintBig(64);
    return { $$type: 'Deploy' as const, queryId: _queryId };
}

function loadTupleDeploy(source: TupleReader) {
    let _queryId = source.readBigNumber();
    return { $$type: 'Deploy' as const, queryId: _queryId };
}

function storeTupleDeploy(source: Deploy) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.queryId);
    return builder.build();
}

function dictValueParserDeploy(): DictionaryValue<Deploy> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeDeploy(src)).endCell());
        },
        parse: (src) => {
            return loadDeploy(src.loadRef().beginParse());
        }
    }
}

export type DeployOk = {
    $$type: 'DeployOk';
    queryId: bigint;
}

export function storeDeployOk(src: DeployOk) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(2952335191, 32);
        b_0.storeUint(src.queryId, 64);
    };
}

export function loadDeployOk(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 2952335191) { throw Error('Invalid prefix'); }
    let _queryId = sc_0.loadUintBig(64);
    return { $$type: 'DeployOk' as const, queryId: _queryId };
}

function loadTupleDeployOk(source: TupleReader) {
    let _queryId = source.readBigNumber();
    return { $$type: 'DeployOk' as const, queryId: _queryId };
}

function storeTupleDeployOk(source: DeployOk) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.queryId);
    return builder.build();
}

function dictValueParserDeployOk(): DictionaryValue<DeployOk> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeDeployOk(src)).endCell());
        },
        parse: (src) => {
            return loadDeployOk(src.loadRef().beginParse());
        }
    }
}

export type FactoryDeploy = {
    $$type: 'FactoryDeploy';
    queryId: bigint;
    cashback: Address;
}

export function storeFactoryDeploy(src: FactoryDeploy) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(1829761339, 32);
        b_0.storeUint(src.queryId, 64);
        b_0.storeAddress(src.cashback);
    };
}

export function loadFactoryDeploy(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 1829761339) { throw Error('Invalid prefix'); }
    let _queryId = sc_0.loadUintBig(64);
    let _cashback = sc_0.loadAddress();
    return { $$type: 'FactoryDeploy' as const, queryId: _queryId, cashback: _cashback };
}

function loadTupleFactoryDeploy(source: TupleReader) {
    let _queryId = source.readBigNumber();
    let _cashback = source.readAddress();
    return { $$type: 'FactoryDeploy' as const, queryId: _queryId, cashback: _cashback };
}

function storeTupleFactoryDeploy(source: FactoryDeploy) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.queryId);
    builder.writeAddress(source.cashback);
    return builder.build();
}

function dictValueParserFactoryDeploy(): DictionaryValue<FactoryDeploy> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeFactoryDeploy(src)).endCell());
        },
        parse: (src) => {
            return loadFactoryDeploy(src.loadRef().beginParse());
        }
    }
}

export type WithdrawPercents = {
    $$type: 'WithdrawPercents';
    amount: bigint;
    passkey: string;
}

export function storeWithdrawPercents(src: WithdrawPercents) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(1741503767, 32);
        b_0.storeCoins(src.amount);
        b_0.storeStringRefTail(src.passkey);
    };
}

export function loadWithdrawPercents(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 1741503767) { throw Error('Invalid prefix'); }
    let _amount = sc_0.loadCoins();
    let _passkey = sc_0.loadStringRefTail();
    return { $$type: 'WithdrawPercents' as const, amount: _amount, passkey: _passkey };
}

function loadTupleWithdrawPercents(source: TupleReader) {
    let _amount = source.readBigNumber();
    let _passkey = source.readString();
    return { $$type: 'WithdrawPercents' as const, amount: _amount, passkey: _passkey };
}

function storeTupleWithdrawPercents(source: WithdrawPercents) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.amount);
    builder.writeString(source.passkey);
    return builder.build();
}

function dictValueParserWithdrawPercents(): DictionaryValue<WithdrawPercents> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeWithdrawPercents(src)).endCell());
        },
        parse: (src) => {
            return loadWithdrawPercents(src.loadRef().beginParse());
        }
    }
}

export type WithdrawOwner = {
    $$type: 'WithdrawOwner';
    amount: bigint;
}

export function storeWithdrawOwner(src: WithdrawOwner) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(3504909737, 32);
        b_0.storeInt(src.amount, 257);
    };
}

export function loadWithdrawOwner(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 3504909737) { throw Error('Invalid prefix'); }
    let _amount = sc_0.loadIntBig(257);
    return { $$type: 'WithdrawOwner' as const, amount: _amount };
}

function loadTupleWithdrawOwner(source: TupleReader) {
    let _amount = source.readBigNumber();
    return { $$type: 'WithdrawOwner' as const, amount: _amount };
}

function storeTupleWithdrawOwner(source: WithdrawOwner) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.amount);
    return builder.build();
}

function dictValueParserWithdrawOwner(): DictionaryValue<WithdrawOwner> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeWithdrawOwner(src)).endCell());
        },
        parse: (src) => {
            return loadWithdrawOwner(src.loadRef().beginParse());
        }
    }
}

 type Mamotic_init_args = {
    $$type: 'Mamotic_init_args';
    payeer: Address;
    comission: Address;
    percentPayeer: bigint;
    percentComission: bigint;
}

function initMamotic_init_args(src: Mamotic_init_args) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeAddress(src.payeer);
        b_0.storeAddress(src.comission);
        b_0.storeInt(src.percentPayeer, 257);
        let b_1 = new Builder();
        b_1.storeInt(src.percentComission, 257);
        b_0.storeRef(b_1.endCell());
    };
}

async function Mamotic_init(payeer: Address, comission: Address, percentPayeer: bigint, percentComission: bigint) {
    const __code = Cell.fromBase64('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');
    const __system = Cell.fromBase64('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');
    let builder = beginCell();
    builder.storeRef(__system);
    builder.storeUint(0, 1);
    initMamotic_init_args({ $$type: 'Mamotic_init_args', payeer, comission, percentPayeer, percentComission })(builder);
    const __data = builder.endCell();
    return { code: __code, data: __data };
}

const Mamotic_errors: { [key: number]: { message: string } } = {
    2: { message: `Stack underflow` },
    3: { message: `Stack overflow` },
    4: { message: `Integer overflow` },
    5: { message: `Integer out of expected range` },
    6: { message: `Invalid opcode` },
    7: { message: `Type check error` },
    8: { message: `Cell overflow` },
    9: { message: `Cell underflow` },
    10: { message: `Dictionary error` },
    13: { message: `Out of gas error` },
    32: { message: `Method ID not found` },
    34: { message: `Action is invalid or not supported` },
    37: { message: `Not enough TON` },
    38: { message: `Not enough extra-currencies` },
    128: { message: `Null reference exception` },
    129: { message: `Invalid serialization prefix` },
    130: { message: `Invalid incoming message` },
    131: { message: `Constraints error` },
    132: { message: `Access denied` },
    133: { message: `Contract stopped` },
    134: { message: `Invalid argument` },
    135: { message: `Code of a contract was not found` },
    136: { message: `Invalid address` },
    137: { message: `Masterchain support is not enabled for this contract` },
    7728: { message: `insufficient contract balance, try again later` },
    30483: { message: `passkey` },
    53979: { message: `only owner is allowed to withdraw` },
}

const Mamotic_types: ABIType[] = [
    {"name":"StateInit","header":null,"fields":[{"name":"code","type":{"kind":"simple","type":"cell","optional":false}},{"name":"data","type":{"kind":"simple","type":"cell","optional":false}}]},
    {"name":"Context","header":null,"fields":[{"name":"bounced","type":{"kind":"simple","type":"bool","optional":false}},{"name":"sender","type":{"kind":"simple","type":"address","optional":false}},{"name":"value","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"raw","type":{"kind":"simple","type":"slice","optional":false}}]},
    {"name":"SendParameters","header":null,"fields":[{"name":"bounce","type":{"kind":"simple","type":"bool","optional":false}},{"name":"to","type":{"kind":"simple","type":"address","optional":false}},{"name":"value","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"mode","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"body","type":{"kind":"simple","type":"cell","optional":true}},{"name":"code","type":{"kind":"simple","type":"cell","optional":true}},{"name":"data","type":{"kind":"simple","type":"cell","optional":true}}]},
    {"name":"Deploy","header":2490013878,"fields":[{"name":"queryId","type":{"kind":"simple","type":"uint","optional":false,"format":64}}]},
    {"name":"DeployOk","header":2952335191,"fields":[{"name":"queryId","type":{"kind":"simple","type":"uint","optional":false,"format":64}}]},
    {"name":"FactoryDeploy","header":1829761339,"fields":[{"name":"queryId","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"cashback","type":{"kind":"simple","type":"address","optional":false}}]},
    {"name":"WithdrawPercents","header":1741503767,"fields":[{"name":"amount","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"passkey","type":{"kind":"simple","type":"string","optional":false}}]},
    {"name":"WithdrawOwner","header":3504909737,"fields":[{"name":"amount","type":{"kind":"simple","type":"int","optional":false,"format":257}}]},
]

const Mamotic_getters: ABIGetter[] = [
    {"name":"balance","arguments":[],"returnType":{"kind":"simple","type":"int","optional":false,"format":257}},
    {"name":"id","arguments":[],"returnType":{"kind":"simple","type":"int","optional":false,"format":257}},
    {"name":"user","arguments":[{"name":"addr","type":{"kind":"simple","type":"address","optional":false}}],"returnType":{"kind":"simple","type":"int","optional":false,"format":257}},
]

const Mamotic_receivers: ABIReceiver[] = [
    {"receiver":"internal","message":{"kind":"empty"}},
    {"receiver":"internal","message":{"kind":"text","text":"withdraw safe"}},
    {"receiver":"internal","message":{"kind":"typed","type":"WithdrawOwner"}},
    {"receiver":"internal","message":{"kind":"typed","type":"WithdrawPercents"}},
    {"receiver":"internal","message":{"kind":"typed","type":"Deploy"}},
]

export class Mamotic implements Contract {
    
    static async init(payeer: Address, comission: Address, percentPayeer: bigint, percentComission: bigint) {
        return await Mamotic_init(payeer, comission, percentPayeer, percentComission);
    }
    
    static async fromInit(payeer: Address, comission: Address, percentPayeer: bigint, percentComission: bigint) {
        const init = await Mamotic_init(payeer, comission, percentPayeer, percentComission);
        const address = contractAddress(0, init);
        return new Mamotic(address, init);
    }
    
    static fromAddress(address: Address) {
        return new Mamotic(address);
    }
    
    readonly address: Address; 
    readonly init?: { code: Cell, data: Cell };
    readonly abi: ContractABI = {
        types:  Mamotic_types,
        getters: Mamotic_getters,
        receivers: Mamotic_receivers,
        errors: Mamotic_errors,
    };
    
    private constructor(address: Address, init?: { code: Cell, data: Cell }) {
        this.address = address;
        this.init = init;
    }
    
    async send(provider: ContractProvider, via: Sender, args: { value: bigint, bounce?: boolean| null | undefined }, message: null | 'withdraw safe' | WithdrawOwner | WithdrawPercents | Deploy) {
        
        let body: Cell | null = null;
        if (message === null) {
            body = new Cell();
        }
        if (message === 'withdraw safe') {
            body = beginCell().storeUint(0, 32).storeStringTail(message).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'WithdrawOwner') {
            body = beginCell().store(storeWithdrawOwner(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'WithdrawPercents') {
            body = beginCell().store(storeWithdrawPercents(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'Deploy') {
            body = beginCell().store(storeDeploy(message)).endCell();
        }
        if (body === null) { throw new Error('Invalid message type'); }
        
        await provider.internal(via, { ...args, body: body });
        
    }
    
    async getBalance(provider: ContractProvider) {
        let builder = new TupleBuilder();
        let source = (await provider.get('balance', builder.build())).stack;
        let result = source.readBigNumber();
        return result;
    }
    
    async getId(provider: ContractProvider) {
        let builder = new TupleBuilder();
        let source = (await provider.get('id', builder.build())).stack;
        let result = source.readBigNumber();
        return result;
    }
    
    async getUser(provider: ContractProvider, addr: Address) {
        let builder = new TupleBuilder();
        builder.writeAddress(addr);
        let source = (await provider.get('user', builder.build())).stack;
        let result = source.readBigNumber();
        return result;
    }
    
}