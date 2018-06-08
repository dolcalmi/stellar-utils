const lib = require('../lib');
const {TEST_USER, FUNDING_SECRET, ACCOUNT, ASSET_CODE, ASSET_ISSUER} = require('./mocks');
const {SKIP_ASYNC} = process.env;

describe('account', () => {
    if (!SKIP_ASYNC) {
        it('should load account', () => {
            lib.setServer(true);
            return lib.loadAccount(TEST_USER.publicKey).then(account => {
                expect(account).to.exist;
                expect(account.id).to.be.a('string');
            });
        });

        it('should check account exists', () => {
            lib.setServer(true);
            return lib.checkAccountExists(TEST_USER.publicKey).then(exists => {
                expect(exists).to.be.true;
            });
        });

        it('should check account does not exist', () => {
            lib.setServer(true);

            const keypair = lib.Keypair.random();

            return lib.checkAccountExists(keypair.publicKey).then(exists => {
                expect(exists).to.be.false;
            });
        });

        it('should create account', () => {
            const keypair = lib.Keypair.random();
            const destination = keypair.publicKey();
            return lib.createAccount(
                FUNDING_SECRET,
                destination,
                2
            ).then(account => {
                expect(account).to.exist;
                expect(account.id).to.equal(destination);
            });
        });

        it('should create test account', () => {
            return lib.createTestAccount().then(keypair => {
                expect(keypair.publicKey()).to.be.a('string');
                expect(keypair.publicKey().length).to.equal(56);
                expect(keypair.secret()).to.be.a('string');
                expect(keypair.secret().length).to.equal(56);
            });
        });
    }

    it('should get account XLM balance', () => {
        expect(lib.getBalance(ACCOUNT)).to.equal('9.9999900');
    });

    it('should get account WLO balance', () => {
        expect(lib.getBalance(ACCOUNT, ASSET_CODE)).to.equal('598.5000000');
    });

    it('should get account minimum balance', () => {
        expect(lib.getMinBalance(ACCOUNT)).to.equal('1.50001');
    });

    it('should check account has gas', () => {
        expect(lib.checkHasGas(ACCOUNT)).to.be.true;
    });

    it('should get asset issuer from account', () => {
        expect(lib.getAssetIssuer(ACCOUNT, ASSET_CODE)).to.equal(ASSET_ISSUER);
    });

    it('should get asset trusted account', () => {
        const asset = new lib.Asset(ASSET_CODE, ASSET_ISSUER);
        expect(lib.checkAssetTrusted(ACCOUNT, asset)).to.be.true;
    });

    it('should format balance', () => {
        const balance = lib.getBalance(ACCOUNT, ASSET_CODE);
        expect(lib.moneyFormat(balance)).to.equal('598.5');
    });
});
