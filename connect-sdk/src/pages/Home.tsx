import '../css/Home.css'
import Header from '../components/Header'
import WalletsTable from '../components/WalletsTable'
import SendTransactionModal from '../modals/SendTransactionModal'
import SignMessageModal from '../modals/SignMessageModal'
import SignEip712Modal from '../modals/SignEip712Modal'
import ExecuteContractModal from '../modals/ExecuteContractModal'
import ImportWalletModal from '../modals/ImportWalletModal'

export default function Home() {
  return <>
    <Header />
    <WalletsTable />

    <SendTransactionModal />
    <SignMessageModal />
    <SignEip712Modal />
    <ExecuteContractModal />
    <ImportWalletModal />
  </>
}
