const lib = require('../lib');
const {SKIP_ASYNC} = process.env;
const {TEST_USER, FUNDING_SECRET} = require('./mocks');

describe('payment', () => {
    if (!SKIP_ASYNC) {
        it('should get payment history', () => {
            lib.setServer(true);
            return lib.paymentHistory(TEST_USER.publicKey).then(payments => {
                expect(payments).to.exist;
                expect(payments).to.be.an('array');
                expect(payments.length).to.be.above(0);
                payments.map(p => {
                    expect(p).to.include.all.keys('id', 'type');
                });
            });
        });

        it('should format payment info', () => {
            lib.setServer(true);
            return lib.paymentHistory(TEST_USER.publicKey, 1)
                .then(payments => payments.pop())
                .then(payment => lib.paymentInfo(payment))
                .then(info => {
                    expect(info).to.include.all.keys('date', 'direction', 'assetCode', 'from', 'to');
                });
        });

        it('should send payment', () => {
            lib.setServer(true);
            return lib.sendPayment(FUNDING_SECRET, TEST_USER.publicKey, '1', 'Test')
                .then(tx => {
                    expect(tx).to.exist;
                    expect(tx.hash).to.be.a('string');
                });
        });
    }
});
