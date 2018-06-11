import {Server, Network} from './sdk';

let server = null;

const createServer = testnet => {
    if (testnet) {
        Network.useTestNetwork();
    } else {
        Network.usePublicNetwork();
    }

    const uri = testnet ? 'https://horizon-testnet.stellar.org' : 'https://horizon.stellar.org';

    server = new Server(uri);

    return server;
};

export const getServer = () => {
    if (!server) {
        createServer();
    }
    return server;
};

export const setServer = testnet => createServer(testnet);

export const useTestnet = () => createServer(true);

export const useMainnet = () => createServer(false);

export const getServerURL = () => getServer().serverURL.href();
