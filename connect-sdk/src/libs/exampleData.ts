export const contractData = [
  {
    type: 'address', 
    value: '0x80cbb6c4342948e5be81987dce8251dbedd69138'
  },
  {
    type: 'uint256', 
    value: '73680000'
  }
]

export const eip712Data = {
  types: {
    EIP712Domain: [
      {
        name: 'name',
        type: 'string'
      },
      {
        name: 'version',
        type: 'string'
      },
      {
        name: 'chainId',
        type: 'uint256'
      },
      {
        name: 'verifyingContract',
        type: 'address'
      },
      {
        name: 'salt',
        type: 'bytes32'
      }
    ],
    Bid: [
      {
        name: 'amount',
        type: 'uint256'
      },
      {
        name: 'bidder',
        type: 'Identity'
      }
    ],
    Identity: [
      {
        name: 'userId',
        type: 'uint256'
      },
      {
        name: 'wallet',
        type: 'address'
      }
    ]
  },
  domain: {
    name: 'My amazing dApp',
    version: '2',
    chainId: 1,
    verifyingContract: '0x1C56346CD2A2Bf3202F771f50d3D14a367B48070',
    salt: '0xf2d857f4a3edcb9b78b4d503bfe733db1e3f6cdc2b7971ee739626c97e86a558'
  },
  primaryType: 'Bid',
  message: {
    amount: 100,
    bidder: {
      userId: 323,
      wallet: '0x3333333333333333333333333333333333333333'
    }
  }
}
