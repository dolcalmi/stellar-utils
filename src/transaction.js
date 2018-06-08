import {Transaction} from './sdk';
import BigNumber from 'bignumber.js';
import {getServer} from './server';

const fromXDR = txXDR => new Transaction(txXDR);

const txHash = tx => tx.hash().toString('hex');

const currentTime = () => new BigNumber(Math.floor(Date.now() / 1000));

const tooSoon = tx => {
    const minTime = new BigNumber(tx.timeBounds.minTime);
    return minTime.greaterThan(currentTime());
};

export const loadTransaction = hash => getServer().transactions().transaction(hash).call();

export const checkTransactionExecuted = async tx => {
    try {
        await loadTransaction(txHash(tx));
        return true;
    } catch (e) {
        return false;
    }
};

export const validateTransaction = async xdr => {
    const transaction = fromXDR(xdr);

    const isTooSoon = tooSoon(transaction);

    if (isTooSoon) {
        return {
            isValid: false,
            isExecuted: false,
            isTooSoon,
        };
    }

    const tx = await loadTransaction(txHash(tx));
    const isExecuted = !!tx;

    return {
        isValid: !isExecuted,
        isExecuted,
        isTooSoon,
        txId: tx && tx.id || null
    };
};
