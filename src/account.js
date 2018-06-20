import {getServer} from './server';
import {Keypair, Operation, TransactionBuilder, Memo} from './sdk';
import BigNumber from 'bignumber.js';

export const loadAccount = publicKey => getServer().loadAccount(publicKey);

export const createAccount = async (fromSecret, destination, startingBalance, memo) => {
    const fundingKeys = Keypair.fromSecret(fromSecret);

    const fundingAccount = await loadAccount(fundingKeys.publicKey());

    if (typeof startingBalance === 'number') {
        startingBalance = String(startingBalance);
    }

    const txb = new TransactionBuilder(fundingAccount)
        .addOperation(Operation.createAccount({
            destination,
            startingBalance
        }));

    if (memo && typeof memo === 'string') {
        txb.addMemo(Memo.text(memo));
    }

    if (memo && typeof memo === 'object') {
        txb.addMemo(memo);
    }

    const transaction = txb.build();

    transaction.sign(fundingKeys);

    await getServer().submitTransaction(transaction);

    const account = await getServer().loadAccount(destination);

    return account;
};

export const checkAccountExists = async pk => {
    try {
        await loadAccount(pk);
        return true;
    } catch (e) {
        return false;
    }
};

export const getBalance = (account, assetCode) => {
    const asset = account.balances.find(b => b.asset_code === assetCode);
    return asset ? asset.balance : '0';
};

export const getMinBalance = (account, numTransactions = 1) => {
    const subentryCount = account.subentry_count;
    const txFee = new BigNumber(100).times(0.0000001).times(numTransactions);
    const minBalance = new BigNumber(1 + subentryCount * 0.5).plus(txFee);
    return minBalance.toString();
};

export const checkHasGas = account => {
    const balanceXLM = getBalance(account);
    const minXLM = getMinBalance(account);
    return new BigNumber(balanceXLM).isGreaterThanOrEqualTo(minXLM);
};

export const getAssetIssuer = (account, assetCode) => {
    const asset = account.balances.find(b => b.asset_code === assetCode);
    return asset && asset.asset_issuer || null;
};

export const checkAssetTrusted = (account, asset) => {
    return account.balances.some(balance => (
        balance.asset_code === asset.getCode() &&
        balance.asset_issuer === asset.getIssuer()
    ));
};

export const moneyFormat = (amount, maxDp = 7) => {
    if (typeof amount === 'number') {
        amount = amount.toFixed(maxDp);
    }
    const num = new BigNumber(amount);
    return num.toFormat(Math.min(num.dp(), maxDp));
};

export const createTestAccount = async () => {
    const keypair = Keypair.random();

    await fetch(`https://horizon-testnet.stellar.org/friendbot?addr=${keypair.publicKey()}`);

    return keypair;
};

// const weights = {
//     masterWeight: 1,
//     lowThreshold: 2,
//     medThreshold: 2,
//     highThreshold: 2
// }

export const multiSig = async (secretKey, signers, weights) => {
    const keypair = Keypair.fromSecret(secretKey);

    const account = await loadAccount(keypair.publicKey());

    const txb = new TransactionBuilder(account);

    signers.forEach(({publicKey, weight}) => {
        txb.addOperation(Operation.setOptions({
            signer: {
                ed25519PublicKey: publicKey,
                weight: Number(weight)
            }
        }));
    });

    if (weights) {
        txb.addOperation(Operation.setOptions(weights));
    }

    const transaction = txb.build();

    transaction.sign(keypair);

    return getServer().submitTransaction(transaction);
};
