import {Keypair} from './sdk';

export const isValidPublicKey = key => {
    let valid = true;
    try {
        Keypair.fromPublicKey(key);
    } catch (e) {
        valid = false;
    }
    return valid;
};
