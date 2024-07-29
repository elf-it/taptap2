import { CompilerConfig } from '@ton/blueprint';

export const compile: CompilerConfig = {
    lang: 'tact',
    target: 'contracts/mamotic.tact',
    options: {
        debug: true,
    },
};
