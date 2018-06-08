const lib = require('../lib');

// FIXME: Add tests

describe('transaction', () => {
    it('should load loadTransaction', () => {
        expect(lib.loadTransaction).to.be.a('function');
    });
});
