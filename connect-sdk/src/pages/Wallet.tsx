import '../css/Wallet.css'
import { NavLink, useParams } from 'react-router-dom'
import SendTransactionModal from '../modals/SendTransactionModal'
import SignMessageModal from '../modals/SignMessageModal'
import SignEip712Modal from '../modals/SignEip712Modal'
import ExecuteContractModal from '../modals/ExecuteContractModal'
import TransferTokenModal from '../modals/TransferTokenModal'
import TransferNftModal from '../modals/TransferNftModal'
import TokensTable from '../components/TokensTable'
import NftsTable from '../components/NftsTable'
import WalletInfo from '../components/WalletInfo'
import { useTokens } from '../hooks/useTokens'
import { useNfts } from '../hooks/useNfts'
import { useWallet } from '../hooks/useWallet'

export default function Wallet() {
  const { id } = useParams()
  const { wallet, getWallet } = useWallet(id!)
  const { tokens, isLoading: loadingTokens, getTokens } = useTokens(id!)
  const { nfts, isLoading: loadingNfts, getNfts } = useNfts(id!)

  function refresh() {
    getWallet()
    getTokens()
    getNfts()
  }

  return <>
    <NavLink to="/" className="back-btn btn btn--borderless">
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
        <path d="M19 12H5M5 12L12 19M5 12L12 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
      Back to home
    </NavLink>
    <WalletInfo wallet={wallet} refresh={refresh} />
    <div className="main__grid">
      <TokensTable tokens={tokens} isLoading={loadingTokens} />
      <div className="main__divider"></div>
      <NftsTable nfts={nfts} isLoading={loadingNfts} />
    </div>

    <SendTransactionModal />
    <SignMessageModal />
    <SignEip712Modal />
    <ExecuteContractModal />
    <TransferTokenModal />
    <TransferNftModal />
  </>
}
