const lib = require('../lib');

describe('server', () => {
    it('should return server instance', () => {
        expect(lib.getServer()).to.exist;
        expect(lib.getServer().loadAccount).to.be.a('function');
    });

    it('should get mainnet', () => {
        lib.setServer(false);
        expect(lib.getServerURL()).to.equal('https://horizon.stellar.org/');
    });

    it('should get testnet', () => {
        lib.setServer(true);
        expect(lib.getServerURL()).to.equal('https://horizon-testnet.stellar.org/');
    });
});
