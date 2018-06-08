const lib = require('../lib');
const {TEST_USER, ASSET_ISSUER} = require('./mocks');

describe('validation', () => {
    it('should validate good public key', () => {
        expect(lib.isValidPublicKey(TEST_USER.publicKey)).to.be.true;
        expect(lib.isValidPublicKey(ASSET_ISSUER)).to.be.true;
    });

    it('should invalidate bad public key', () => {
        expect(lib.isValidPublicKey(TEST_USER.secretKey)).to.be.false;
        expect(lib.isValidPublicKey('')).to.be.false;
        expect(lib.isValidPublicKey(null)).to.be.false;
        expect(lib.isValidPublicKey('abcd')).to.be.false;
    });
});
