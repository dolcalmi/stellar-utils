const lib = require('../lib');
const {SKIP_ASYNC} = process.env;
const {TEST_USER, TX_HASH, TX_XDR, TX_RESULT} = require('./mocks');

describe('transaction', () => {
    if (!SKIP_ASYNC) {
        it('should load transaction', () => {
            lib.setServer(true);
            return lib.loadTransaction(TX_HASH).then(result => {
                expect(result).to.exist;
                expect(result.id).to.be.a('string');
            });
        });

        it('should check transaction executed', () => {
            lib.setServer(true);
            const tx = new lib.Transaction(TX_XDR);
            return lib.checkTransactionExecuted(tx).then(result => {
                expect(result).to.be.true;
            });
        });

        it('should check transaction not executed', () => {
            lib.setServer(true);
            return lib.loadAccount(TEST_USER.publicKey).then(account => {
                const transaction = new lib.TransactionBuilder(account)
                    .addOperation(lib.Operation.setOptions({
                        masterWeight: 1,
                        lowThreshold: 1,
                        medThreshold: 1,
                        highThreshold: 1
                    }))
                    .build();

                return lib.checkTransactionExecuted(transaction).then(result => {
                    expect(result).to.be.false;
                });
            });
        });

        it('should validate transaction', () => {
            lib.setServer(true);
            return lib.validateTransaction(TX_XDR).then(result => {
                expect(result.isExecuted).to.be.true;
                expect(result.isValid).to.be.false;
                expect(result.isTooSoon).to.be.false;
                expect(result.numOperations).to.be.a('number');
                expect(result.txId).to.be.a('string');
            });
        });
    }

    it('should check transaction is not yet valid', () => {
        lib.setServer(true);
        return lib.loadAccount(TEST_USER.publicKey).then(account => {
            const hour = 60 * 60;
            const timeValid = Math.floor(Date.now() / 1000) + hour;
            const transaction = new lib.TransactionBuilder(account, {
                timebounds: {
                    minTime: timeValid,
                    maxTime: 0
                }
            })
                .addOperation(lib.Operation.setOptions({
                    masterWeight: 1,
                    lowThreshold: 1,
                    medThreshold: 1,
                    highThreshold: 1
                }))
                .build();


            const txXDR = transaction.toEnvelope().toXDR('base64');
            return lib.validateTransaction(txXDR).then(result => {
                expect(result.isExecuted).to.be.false;
                expect(result.isValid).to.be.false;
                expect(result.isTooSoon).to.be.true;
                expect(result.isSigned).to.be.false;
                expect(result.numOperations).to.be.a('number');
                expect(result.txId).to.not.exist;
            });
        });
    });

    it('should parse transaction result xdr', () => {
        const tx = lib.transactionResultXDR(TX_RESULT);
        expect(tx.result).to.exist;
        expect(tx.envelope).to.exist;
        expect(tx.meta).to.exist;
    });
});
