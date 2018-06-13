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

const TX_HASH = '9d805889d3062827cd4526d1e2287d18d8a2df00591a9c974f5985ec88419c2f';
const TX_XDR = 'AAAAAPtawr/k0OvULiefnxmZ2lspwmBSs0FM+b+sZsMkGyb/AAAAZACGCKQAAAAGAAAAAQAAAABa7HFgAAAAAAAAAAAAAAAAAAAAAQAAAAAAAAABAAAAAAkdo5gZH3EVlA9T11x/hP5eXfPTa0cxqKAYPVBYcpTyAAAAAVdMTwAAAAAAN5Elfl1kQx1zgHE9fuRFc+Jxrn1+uK7y7B9BS/F6R+gAAAWvMQekAAAAAAAAAAAA';
const TX_RESULT = {
    'id': '9d805889d3062827cd4526d1e2287d18d8a2df00591a9c974f5985ec88419c2f',
    'paging_token': '37730888263413760',
    'hash': '9d805889d3062827cd4526d1e2287d18d8a2df00591a9c974f5985ec88419c2f',
    'ledger': 8784907,
    'created_at': '2018-05-04T09:55:20Z',
    'source_account': 'GDPCWCCJDXJHSA3GA62PFMZNP6A7NZSEGNEH3F3LSSUQZZ3NDCFVB6GB',
    'source_account_sequence': '37599917530677284',
    'fee_paid': 100,
    'operation_count': 1,
    'envelope_xdr': 'AAAAAN4rCEkd0nkDZge08rMtf4H25kQzSH2Xa5SpDOdtGItQAAAAZACFlO0AAAAkAAAAAAAAAAAAAAABAAAAAQAAAADeKwhJHdJ5A2YHtPKzLX+B9uZEM0h9l2uUqQznbRiLUAAAAAAAAAAAqPMfg85rdtqsI67HaZruuUxjTvDuM1I+xEr2lNUvF38AAAAABfXhAAAAAAAAAAABbRiLUAAAAECETswelFKLYXbO74VBH4INZKdnqfVHVthNbE1CQ6mVBlrCd6kqsp0De+mf9sVLfNGVVLGv67ye7deLWGT4aCIE',
    'result_xdr': 'AAAAAAAAAGQAAAAAAAAAAQAAAAAAAAAAAAAAAAAAAAA=',
    'result_meta_xdr': 'AAAAAAAAAAEAAAADAAAAAACGDAsAAAAAAAAAAKjzH4POa3barCOux2ma7rlMY07w7jNSPsRK9pTVLxd/AAAAAAX14QAAhgwLAAAAAAAAAAAAAAAAAAAAAAAAAAABAAAAAAAAAAAAAAAAAAAAAAAAAwCGDAsAAAAAAAAAAN4rCEkd0nkDZge08rMtf4H25kQzSH2Xa5SpDOdtGItQAAAAFtYFD5AAhZTtAAAAJAAAAAEAAAAAAAAAAAAAAAABAAAAAAAAAAAAAAAAAAAAAAAAAQCGDAsAAAAAAAAAAN4rCEkd0nkDZge08rMtf4H25kQzSH2Xa5SpDOdtGItQAAAAFtAPLpAAhZTtAAAAJAAAAAEAAAAAAAAAAAAAAAABAAAAAAAAAAAAAAAAAAAA',
    'fee_meta_xdr': 'AAAAAgAAAAMAhguqAAAAAAAAAADeKwhJHdJ5A2YHtPKzLX+B9uZEM0h9l2uUqQznbRiLUAAAABbWBQ/0AIWU7QAAACMAAAABAAAAAAAAAAAAAAAAAQAAAAAAAAAAAAAAAAAAAAAAAAEAhgwLAAAAAAAAAADeKwhJHdJ5A2YHtPKzLX+B9uZEM0h9l2uUqQznbRiLUAAAABbWBQ+QAIWU7QAAACQAAAABAAAAAAAAAAAAAAAAAQAAAAAAAAAAAAAAAAAAAA==',
    'memo_type': 'none',
    'signatures': [
        'hE7MHpRSi2F2zu+FQR+CDWSnZ6n1R1bYTWxNQkOplQZawnepKrKdA3vpn/bFS3zRlVSxr+u8nu3Xi1hk+GgiBA=='
    ]
};

module.exports = {
    TEST_USER,
    FUNDING_SECRET,
    ACCOUNT,
    ASSET_CODE,
    ASSET_ISSUER,
    TX_HASH,
    TX_XDR,
    TX_RESULT
};
