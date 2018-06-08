const lib = require('../lib');

describe('lib', () => {
    it('should exist', () => {
        expect(lib).to.exist;
        expect(lib.utils).to.exist;
        expect(lib.sdk).to.exist;
    });

    it('should not duplicate sdk keys', () => {
        const utilKeys = Object.keys(lib.utils);
        const sdkKeys = Object.keys(lib.sdk);
        expect(utilKeys.filter(key => key !== 'default').every(key => {
            const hasDupeKey = sdkKeys.includes(key);
            if (hasDupeKey) {
                console.error(`[ERROR] Duplicate key ${key}`);
            }
            return hasDupeKey;
        })).to.be.false;
    });

    it('should expose BigNumber', () => {
        expect(lib.BigNumber).to.exist;
        expect(new lib.BigNumber(100).toString()).to.equal('100');
    });
});
