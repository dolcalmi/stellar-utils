const lib = require('../lib');
const sdk = require('stellar-sdk');

describe('sdk', () => {
    it('should have full api', () => {
        expect(Object.keys(lib)).to.include.members(Object.keys(sdk));
    });

    it('should create a keypair', () => {
        const keypair = lib.Keypair.random();

        expect(keypair.publicKey()).to.be.a('string');
        expect(keypair.publicKey().length).to.equal(56);

        expect(keypair.secret()).to.be.a('string');
        expect(keypair.secret().length).to.equal(56);
    });
});
