const lib = require('../lib');

// FIXME: Add tests

describe('payment', () => {
    it('should send payment', () => {
        expect(lib.sendPayment).to.be.a('function');
    });
});
