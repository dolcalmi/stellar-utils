import {Transaction, xdr} from './sdk';
import BigNumber from 'bignumber.js';
import {getServer} from './server';
import {loadAccount, getMinBalance} from './account';

const fromXDR = txXDR => new Transaction(txXDR);

const txHash = tx => tx.hash().toString('hex');

const currentTime = () => new BigNumber(Math.floor(Date.now() / 1000));

const tooSoon = tx => {
    const minTime = new BigNumber(tx.timeBounds.minTime);
    return minTime.greaterThan(currentTime());
};

export const loadTransaction = hash => getServer().transactions().transaction(hash).call();

export const transactionResult = result => {
    return {
        envelope: xdr.TransactionEnvelope.fromXDR(result.envelope_xdr, 'base64'),
        result: xdr.TransactionResult.fromXDR(result.result_xdr, 'base64'),
        meta: xdr.TransactionMeta.fromXDR(result.result_meta_xdr, 'base64')
    };
};

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

export const checkTransaction = async txXDR => {
    const tx = new Transaction(txXDR);

    // check time bounds

    const minTime = new BigNumber(tx.timeBounds.minTime);

    const tooSoon = minTime.isGreaterThan(currentTime());

    if (tooSoon) {
        const date = new Date(minTime.times(1000).toString());
        return {
            tx,
            isValid: false,
            message: `Too soon: Transaction will be valid on ${date.toString()}`
        };
    }

    // load transaction

    try {
        const transaction = await loadTransaction(tx.hash().toString('hex'));

        if (transaction) {
            return {
                tx,
                isValid: false,
                message: 'Transaction already executed',
                id: transaction.id
            };
        }
    } catch (e) {}

    // too late?

    const maxTime = new BigNumber(tx.timeBounds.maxTime);
    const tooLate = maxTime.isGreaterThan(0) && currentTime.isGreaterThan(maxTime);

    if (tooLate) {
        const date = new Date(maxTime.times(1000).toString());
        return {
            tx,
            isValid: false,
            message: `Too late: Transaction expired on ${date.toString()}`
        };
    }

    // load source account

    const account = await loadAccount(tx.source);

    // Check sequence number

    const txSequence = new BigNumber(tx.sequence);
    const accountSequence = new BigNumber(account.sequence);

    const validSequence = txSequence.isEqualTo(accountSequence.plus(1));

    if (!validSequence) {
        const ts = txSequence.toString();
        const as = accountSequence.toString();
        return {
            tx,
            isValid: false,
            message: `Invalid transaction sequence number ${ts} from account with sequence number ${as}`
        };
    }

    // Check reserve

    const minBalance = new BigNumber(getMinBalance(account, 1));
    const xlm = account.balances.find(b => b.asset_type === 'native');
    const accountReserve = xlm ? xlm.balance : '0';
    const validReserve = new BigNumber(accountReserve).isGreaterThanOrEqualTo(minBalance);

    if (!validReserve) {
        return {
            tx,
            isValid: false,
            message: `Insufficient reserve in account for transaction. (${accountReserve}XLM, min = ${minBalance.toString()}XLM)`
        };
    }

    // Check balances

    const txPayments = tx.operations.filter(op => op.type === 'payment');

    const validBalances = txPayments.every(p => {
        const amount = new BigNumber(p.amount);

        return account.balances.some(b => {
            const balance = new BigNumber(b.balance);
            const amountRequired = b.asset_type === 'native' ? amount.plus(minBalance) : amount;

            return b.asset_code === p.asset.code &&
                   b.asset_issuer === p.asset.issuer &&
                   balance.isGreaterThanOrEqualTo(amountRequired);
        });
    });

    if (!validBalances) {
        const detail = txPayments.reduce((arr, p) => {
            const amount = new BigNumber(p.amount);

            const bal = account.balances.find(b => (
                b.asset_code === p.asset.code && b.asset_issuer === p.asset.issuer
            ));

            if (bal) {
                const balance = new BigNumber(bal.balance);
                const amountRequired = bal.asset_type === 'native' ? amount.plus(minBalance) : amount;

                if (balance.isLessThan(amountRequired)) {
                    const code = bal.asset_code || 'XLM';
                    arr.push(`Balance ${balance.toString()}${code}. Required ${amountRequired.toString()}${code}.`);
                }
            }
            return arr;
        }, []);

        return {
            tx,
            isValid: false,
            message: `Insufficient balance for payment (${detail.join(' ')})`
        };
    }

    // Check trust of destination

    let validTrust = true;
    const trustErrors = [];
    for (const p of txPayments) {
        const dest = await loadAccount(p.destination);
        const assetTrust = dest.balances.some(b => {
            return b.asset_code === p.asset.code &&
                   b.asset_issuer === p.asset.issuer;
        });
        if (!assetTrust) {
            validTrust = false;
            trustErrors.push(`Destination account ${p.destination} does not trust asset ${p.asset.code}.`);
        }
    }

    if (!validTrust) {
        return {
            tx,
            isValid: false,
            message: trustErrors.join(' ')
        };
    }

    return {
        tx,
        isValid: true,
        message: ''
    };
};
