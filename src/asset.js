import {Asset, Keypair, Operation, TransactionBuilder, StellarTomlResolver} from './sdk';
import {loadAccount} from './account';
import {sendPayment} from './payment';
import {getServer} from './server';

export const trustAsset = async (secretKey, asset, limit) => {
    const keypair = Keypair.fromSecret(secretKey);

    const account = await loadAccount(keypair.publicKey());

    const transaction = new TransactionBuilder(account)
        .addOperation(Operation.changeTrust({
            asset,
            limit
        }))
        .build();

    transaction.sign(keypair);

    return getServer().submitTransaction(transaction);
};

export const setHomeDomain = async (secretKey, homeDomain) => {
    const keypair = Keypair.fromSecret(secretKey);

    const account = await loadAccount(keypair.publicKey());

    const transaction = new TransactionBuilder(account)
        .addOperation(Operation.setOptions({
            homeDomain
        }))
        .build();

    transaction.sign(keypair);

    return getServer().submitTransaction(transaction);
};

export const lockAccount = async (secretKey) => {
    const keypair = Keypair.fromSecret(secretKey);

    const account = await loadAccount(keypair.publicKey());

    const transaction = new TransactionBuilder(account)
        .addOperation(Operation.setOptions({
            masterWeight: 0,
            lowThreshold: 1,
            medThreshold: 1,
            highThreshold: 1
        }))
        .build();

    transaction.sign(keypair);

    return getServer().submitTransaction(transaction);
};

export const createAsset = async (
    code,
    limit = '1000000',
    homeDomain = '',
    issuingSecret,
    distributionSecret
) => {
    // Keys for accounts to issue and receive the new asset

    const issuingKeys = Keypair.fromSecret(issuingSecret);
    const distributionKeys = Keypair.fromSecret(distributionSecret);

    // Create an object to represent the new asset

    const asset = new Asset(code, issuingKeys.publicKey());

    // First, the receiving account must trust the asset

    await trustAsset(distributionSecret, asset, limit);

    // Set the home domain on the issuing account
    if (homeDomain) {
        await setHomeDomain(issuingSecret, homeDomain);
    }

    // The issuing account sends asset to distribution account

    const destination = distributionKeys.publicKey();

    let memo = `Create ${limit} ${code}`;
    if (memo.length > 28) {
        memo = `Create ${code}`;
    }

    await sendPayment(issuingSecret, destination, limit, memo, asset);

    // Lock the issuing account

    await lockAccount(issuingSecret);

    // Return asset

    return asset;
};

export const getStellarToml = domain => StellarTomlResolver.resolve(domain);
