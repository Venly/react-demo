export type Chain = {
  name: string
  symbol: string
}

export const chains: Record<string, Chain> = {
  AETERNITY: {
    name: 'Aeternity',
    symbol: 'AE',
  },
  ARBITRUM: {
    name: 'Arbitrum',
    symbol: 'ETH',
  },
  AVAC: {
    name: 'Avalanche',
    symbol: 'AVAX',
  },
  BASE: {
    name: 'Base',
    symbol: 'ETH',
  },
  BITCOIN: {
    name: 'Bitcoin',
    symbol: 'BTC',
  },
  BSC: {
    name: 'BNB Chain',
    symbol: 'BNB',
  },
  ETHEREUM: {
    name: 'Ethereum',
    symbol: 'ETH',
  },
  GOCHAIN: {
    name: 'GoChain',
    symbol: 'GO',
  },
  HEDERA: {
    name: 'Hedera',
    symbol: 'HBAR',
  },
  IMX: {
    name: 'ImmutableX',
    symbol: 'ETH',
  },
  LITECOIN: {
    name: 'Litecoin',
    symbol: 'LTC',
  },
  MATIC: {
    name: 'Polygon',
    symbol: 'POL',
  },
  NEO: {
    name: 'NEO',
    symbol: 'NEO',
  },
  VECHAIN: {
    name: 'VeChain',
    symbol: 'VET',
  },
  XPLA: {
    name: 'XPLA',
    symbol: 'XPLA',
  },
  OPTIMISM: {
    name: 'OPTIMISM',
    symbol: 'ETH',
  },
}

export const evmChains: string[] = [
  'ARBITRUM',
  'BASE',
  'BSC',
  'ETHEREUM',
  'MATIC',
  'XPLA',
  'OPTIMISM'
]
