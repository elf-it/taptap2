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
} from 'ton-core';

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

export type Buy = {
    $$type: 'Buy';
    referrers: Dictionary<bigint, Address>;
}

export function storeBuy(src: Buy) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(2599776987, 32);
        b_0.storeDict(src.referrers, Dictionary.Keys.BigInt(257), Dictionary.Values.Address());
    };
}

export function loadBuy(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 2599776987) { throw Error('Invalid prefix'); }
    let _referrers = Dictionary.load(Dictionary.Keys.BigInt(257), Dictionary.Values.Address(), sc_0);
    return { $$type: 'Buy' as const, referrers: _referrers };
}

function loadTupleBuy(source: TupleReader) {
    let _referrers = Dictionary.loadDirect(Dictionary.Keys.BigInt(257), Dictionary.Values.Address(), source.readCellOpt());
    return { $$type: 'Buy' as const, referrers: _referrers };
}

function storeTupleBuy(source: Buy) {
    let builder = new TupleBuilder();
    builder.writeCell(source.referrers.size > 0 ? beginCell().storeDictDirect(source.referrers, Dictionary.Keys.BigInt(257), Dictionary.Values.Address()).endCell() : null);
    return builder.build();
}

function dictValueParserBuy(): DictionaryValue<Buy> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeBuy(src)).endCell());
        },
        parse: (src) => {
            return loadBuy(src.loadRef().beginParse());
        }
    }
}

export type Withdraw = {
    $$type: 'Withdraw';
    address: Address;
}

export function storeWithdraw(src: Withdraw) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(3991120219, 32);
        b_0.storeAddress(src.address);
    };
}

export function loadWithdraw(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 3991120219) { throw Error('Invalid prefix'); }
    let _address = sc_0.loadAddress();
    return { $$type: 'Withdraw' as const, address: _address };
}

function loadTupleWithdraw(source: TupleReader) {
    let _address = source.readAddress();
    return { $$type: 'Withdraw' as const, address: _address };
}

function storeTupleWithdraw(source: Withdraw) {
    let builder = new TupleBuilder();
    builder.writeAddress(source.address);
    return builder.build();
}

function dictValueParserWithdraw(): DictionaryValue<Withdraw> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeWithdraw(src)).endCell());
        },
        parse: (src) => {
            return loadWithdraw(src.loadRef().beginParse());
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
    22865: { message: `user not found` },
    53979: { message: `only owner is allowed to withdraw` },
}

const Mamotic_types: ABIType[] = [
    {"name":"StateInit","header":null,"fields":[{"name":"code","type":{"kind":"simple","type":"cell","optional":false}},{"name":"data","type":{"kind":"simple","type":"cell","optional":false}}]},
    {"name":"Context","header":null,"fields":[{"name":"bounced","type":{"kind":"simple","type":"bool","optional":false}},{"name":"sender","type":{"kind":"simple","type":"address","optional":false}},{"name":"value","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"raw","type":{"kind":"simple","type":"slice","optional":false}}]},
    {"name":"SendParameters","header":null,"fields":[{"name":"bounce","type":{"kind":"simple","type":"bool","optional":false}},{"name":"to","type":{"kind":"simple","type":"address","optional":false}},{"name":"value","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"mode","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"body","type":{"kind":"simple","type":"cell","optional":true}},{"name":"code","type":{"kind":"simple","type":"cell","optional":true}},{"name":"data","type":{"kind":"simple","type":"cell","optional":true}}]},
    {"name":"Deploy","header":2490013878,"fields":[{"name":"queryId","type":{"kind":"simple","type":"uint","optional":false,"format":64}}]},
    {"name":"DeployOk","header":2952335191,"fields":[{"name":"queryId","type":{"kind":"simple","type":"uint","optional":false,"format":64}}]},
    {"name":"FactoryDeploy","header":1829761339,"fields":[{"name":"queryId","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"cashback","type":{"kind":"simple","type":"address","optional":false}}]},
    {"name":"Buy","header":2599776987,"fields":[{"name":"referrers","type":{"kind":"dict","key":"int","value":"address"}}]},
    {"name":"Withdraw","header":3991120219,"fields":[{"name":"address","type":{"kind":"simple","type":"address","optional":false}}]},
]

const Mamotic_getters: ABIGetter[] = [
    {"name":"balance","arguments":[],"returnType":{"kind":"simple","type":"int","optional":false,"format":257}},
    {"name":"user","arguments":[{"name":"addr","type":{"kind":"simple","type":"address","optional":false}}],"returnType":{"kind":"simple","type":"int","optional":false,"format":257}},
]

const Mamotic_receivers: ABIReceiver[] = [
    {"receiver":"internal","message":{"kind":"empty"}},
    {"receiver":"internal","message":{"kind":"typed","type":"Buy"}},
    {"receiver":"internal","message":{"kind":"text","text":"withdraw safe"}},
    {"receiver":"internal","message":{"kind":"text","text":"withdraw percents"}},
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
    
    async send(provider: ContractProvider, via: Sender, args: { value: bigint, bounce?: boolean| null | undefined }, message: null | Buy | 'withdraw safe' | 'withdraw percents' | Deploy) {
        
        let body: Cell | null = null;
        if (message === null) {
            body = new Cell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'Buy') {
            body = beginCell().store(storeBuy(message)).endCell();
        }
        if (message === 'withdraw safe') {
            body = beginCell().storeUint(0, 32).storeStringTail(message).endCell();
        }
        if (message === 'withdraw percents') {
            body = beginCell().storeUint(0, 32).storeStringTail(message).endCell();
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
    
    async getUser(provider: ContractProvider, addr: Address) {
        let builder = new TupleBuilder();
        builder.writeAddress(addr);
        let source = (await provider.get('user', builder.build())).stack;
        let result = source.readBigNumber();
        return result;
    }
    
}