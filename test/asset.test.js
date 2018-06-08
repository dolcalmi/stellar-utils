const lib = require('../lib');

// FIXME: Add tests

describe('asset', () => {
    it('should trust asset', () => {
        expect(lib.trustAsset).to.be.a('function');
    });
});
