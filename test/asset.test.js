const lib = require('../lib');
const {SKIP_ASYNC} = process.env;
const {ASSET_CODE, ASSET_ISSUER} = require('./mocks');

describe('asset', () => {
    if (!SKIP_ASYNC) {
        let keypairA = null;
        let keypairB = null;
        before(() => Promise.all([
            lib.createTestAccount(),
            lib.createTestAccount()
        ]).then(values => {
            keypairA = values[0];
            keypairB = values[1];
        }));

        it('should trust asset', () => {
            lib.setServer(true);
            const asset = new lib.Asset(ASSET_CODE, ASSET_ISSUER);
            return lib.trustAsset(keypairA.secret(), asset)
                .then(result => {
                    expect(result).to.exist;
                    expect(result.hash).to.be.a('string');
                });
        });

        it('should set home domain', () => {
            lib.setServer(true);
            return lib.setHomeDomain(keypairA.secret(), 'example.com')
                .then(result => {
                    expect(result).to.exist;
                    expect(result.hash).to.be.a('string');
                });
        });

        it('should create asset', () => {
            lib.setServer(true);

            // eslint-disable-next-line no-console
            return lib.createAsset('FOO', '100', 'example.com', keypairA.secret(), keypairB.secret(), info => console.log(info))
                .then(asset => {
                    expect(asset).to.exist;
                    expect(asset.getCode()).to.equal('FOO');
                });
        });

        it('should lock account', () => {
            lib.setServer(true);

            return lib.lockAccount(keypairB.secret())
                .then(result => {
                    expect(result).to.exist;
                    expect(result.hash).to.be.a('string');
                });
        });

        it('should get stellar.toml', () => {
            lib.setServer(true);

            return lib.getStellarToml('pigzbe.com')
                .then(result => {
                    expect(result).to.exist;
                    expect(result.CURRENCIES).to.be.an('array');
                });
        });
    }
});
