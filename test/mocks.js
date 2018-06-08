const TEST_USER = {
    publicKey: 'GCUPGH4DZZVXNWVMEOXMO2M2524UYY2O6DXDGUR6YRFPNFGVF4LX63TW',
    secretKey: 'SBBZSQRKV4NDIKRVSXYL3T7NYKR3QP4X23VYGLEWYITFCKFN6Y4GY2PA'
};

const FUNDING_SECRET = 'SCJ7G5VR5LLT3FDKLC5CCCHMQGSY4ERQGQCAHSBS4656BPKDK3JTTVGI';

const ACCOUNT = {
    '_baseAccount': {
        '_accountId': 'GCUPGH4DZZVXNWVMEOXMO2M2524UYY2O6DXDGUR6YRFPNFGVF4LX63TW',
        'sequence': '37730888263401473'
    },
    '_links': {
        'self': {
            'href': 'https://horizon-testnet.stellar.org/accounts/GCUPGH4DZZVXNWVMEOXMO2M2524UYY2O6DXDGUR6YRFPNFGVF4LX63TW'
        },
        'transactions': {
            'href': 'https://horizon-testnet.stellar.org/accounts/GCUPGH4DZZVXNWVMEOXMO2M2524UYY2O6DXDGUR6YRFPNFGVF4LX63TW/transactions{?cursor,limit,order}',
            'templated': true
        },
        'operations': {
            'href': 'https://horizon-testnet.stellar.org/accounts/GCUPGH4DZZVXNWVMEOXMO2M2524UYY2O6DXDGUR6YRFPNFGVF4LX63TW/operations{?cursor,limit,order}',
            'templated': true
        },
        'payments': {
            'href': 'https://horizon-testnet.stellar.org/accounts/GCUPGH4DZZVXNWVMEOXMO2M2524UYY2O6DXDGUR6YRFPNFGVF4LX63TW/payments{?cursor,limit,order}',
            'templated': true
        },
        'effects': {
            'href': 'https://horizon-testnet.stellar.org/accounts/GCUPGH4DZZVXNWVMEOXMO2M2524UYY2O6DXDGUR6YRFPNFGVF4LX63TW/effects{?cursor,limit,order}',
            'templated': true
        },
        'offers': {
            'href': 'https://horizon-testnet.stellar.org/accounts/GCUPGH4DZZVXNWVMEOXMO2M2524UYY2O6DXDGUR6YRFPNFGVF4LX63TW/offers{?cursor,limit,order}',
            'templated': true
        },
        'trades': {
            'href': 'https://horizon-testnet.stellar.org/accounts/GCUPGH4DZZVXNWVMEOXMO2M2524UYY2O6DXDGUR6YRFPNFGVF4LX63TW/trades{?cursor,limit,order}',
            'templated': true
        },
        'data': {
            'href': 'https://horizon-testnet.stellar.org/accounts/GCUPGH4DZZVXNWVMEOXMO2M2524UYY2O6DXDGUR6YRFPNFGVF4LX63TW/data/{key}',
            'templated': true
        }
    },
    'id': 'GCUPGH4DZZVXNWVMEOXMO2M2524UYY2O6DXDGUR6YRFPNFGVF4LX63TW',
    'paging_token': '',
    'account_id': 'GCUPGH4DZZVXNWVMEOXMO2M2524UYY2O6DXDGUR6YRFPNFGVF4LX63TW',
    'sequence': '37730888263401473',
    'subentry_count': 1,
    'thresholds': {
        'low_threshold': 0,
        'med_threshold': 0,
        'high_threshold': 0
    },
    'flags': {
        'auth_required': false,
        'auth_revocable': false
    },
    'balances': [
        {
            'balance': '598.5000000',
            'limit': '922337203685.4775807',
            'asset_type': 'credit_alphanum4',
            'asset_code': 'WLO',
            'asset_issuer': 'GA3ZCJL6LVSEGHLTQBYT27XEIVZ6E4NOPV7LRLXS5QPUCS7RPJD6RK5T'
        },
        {
            'balance': '9.9999900',
            'asset_type': 'native'
        }
    ],
    'signers': [
        {
            'public_key': 'GCUPGH4DZZVXNWVMEOXMO2M2524UYY2O6DXDGUR6YRFPNFGVF4LX63TW',
            'weight': 1,
            'key': 'GCUPGH4DZZVXNWVMEOXMO2M2524UYY2O6DXDGUR6YRFPNFGVF4LX63TW',
            'type': 'ed25519_public_key'
        }
    ],
    'data_attr': {}
};

const ASSET_CODE = 'WLO';
const ASSET_ISSUER = 'GA3ZCJL6LVSEGHLTQBYT27XEIVZ6E4NOPV7LRLXS5QPUCS7RPJD6RK5T';

module.exports = {
    TEST_USER,
    FUNDING_SECRET,
    ACCOUNT,
    ASSET_CODE,
    ASSET_ISSUER
};
