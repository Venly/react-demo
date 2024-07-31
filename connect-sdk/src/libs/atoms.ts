import { atom } from 'jotai'
import { NFT, Profile, TokenBalance, Wallet } from '@venly/connect'

export const walletsAtom = atom<Wallet[]|null>(null)
export const walletsLoadingAtom = atom<boolean>(false)

export const selectedWalletAtom = atom<Wallet|null>(null)
export const selectedTokenAtom = atom<TokenBalance|null>(null)
export const selectedNftAtom = atom<NFT|null>(null)

export const profileAtom = atom<Profile|null>(null)
export const profileLoadingAtom = atom<boolean>(false)

export const alertsAtom = atom<any[]>([])

export const modalAtom = atom<string|null>(null)
