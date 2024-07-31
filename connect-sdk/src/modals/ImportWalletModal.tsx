import { FormEvent, useEffect, useState } from 'react'
import { useAtom } from 'jotai'
import ReactModal from 'react-modal'
import { ImportWalletRequest, Wallet } from '@venly/connect'
import { modalAtom } from '../libs/atoms'
import { venlyConnect } from '../libs/venlyConnect'
import SelectWallet from '../components/SelectWallet'
import SelectChain from '../components/SelectChain'
import { useAlerts } from '../hooks/useAlerts'
import { useWallets } from '../hooks/useWallets'
import circlesSm from '../assets/circles-sm.svg'

export default function ImportWalletModal() {
  const { showAlert } = useAlerts()
  const { wallets, getWallets } = useWallets()
  const [modal, setModal] = useAtom(modalAtom)
  const [selectedWallet, setSelectedWallet] = useState<Wallet|undefined>(undefined)
  const [selectedChain, setSelectedChain] = useState<string>('ETHEREUM')

  useEffect(() => {
    if (wallets)
      setSelectedWallet(wallets.at(0))
  },[wallets])
  
  function onAfterClose() {
    
  }

  async function handleSubmit(event: FormEvent) {
    event.preventDefault()
    try {
      const res = await venlyConnect.signer.importWallet({
        walletId: selectedWallet!.id,
        to: selectedChain,
        confirmationRequestType: 'IMPORT',
      } as ImportWalletRequest)
      if (res?.status == 'SUCCESS')
        getWallets()
      showAlert('Import wallet', res)
      setModal(null)
    }
    catch (error) {
      showAlert('Import wallet', error)
    }
  }

  return (
    <ReactModal
      isOpen={modal == 'ImportWalletModal'}
      parentSelector={() => document.querySelector('.app')!}
      overlayClassName="modal-overlay"
      className="modal"
      onRequestClose={() => setModal(null)}
      onAfterClose={onAfterClose}
    >
      <form onSubmit={e => handleSubmit(e)}>
        <button type="button" className="btn btn--close" onClick={() => setModal(null)}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
        <div className="modal-header">
          <div className="modal-header__icon">
            <svg width="24" height="24" viewBox="0 0 20 20" fill="none">
              <path d="M6.66699 14.1667L10.0003 17.5M10.0003 17.5L13.3337 14.1667M10.0003 17.5V10M16.667 13.9524C17.6849 13.1117 18.3337 11.8399 18.3337 10.4167C18.3337 7.88536 16.2816 5.83333 13.7503 5.83333C13.5682 5.83333 13.3979 5.73833 13.3054 5.58145C12.2187 3.73736 10.2124 2.5 7.91699 2.5C4.46521 2.5 1.66699 5.29822 1.66699 8.75C1.66699 10.4718 2.3632 12.0309 3.48945 13.1613" stroke="currentColor" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <div className="modal-header__bg">
              <img src={circlesSm} width={336} height={336}/>
            </div>
          </div>
          <h2 className="modal-header__title">Import wallet</h2>
          <p className="modal-header__subtitle">Allows you to import a wallet from one EVM chain to another.</p>
        </div>

        <div className="modal-form">
          <div className="form-field">
            <label className="form-field__label">Wallet</label>
            <div className="form-field__container">
              <SelectWallet wallets={wallets} selectedWallet={selectedWallet} setSelectedWallet={setSelectedWallet} />
            </div>
            <span className="form-field__subtext">Balance: {selectedWallet?.balance?.balance} {selectedWallet?.balance?.symbol}</span>
          </div>

          <div className="form-field">
            <label className="form-field__label">To chain</label>
            <div className="form-field__container">
              <SelectChain selected={selectedChain} setSelected={setSelectedChain} />
            </div>
          </div>
        </div>

        <div className="modal__buttons">
          <button type="submit" className="btn btn--primary btn--large">Confirm</button>
          <button type="button" className="btn btn--large" onClick={() => setModal(null)}>Cancel</button>
        </div>
      </form>
    </ReactModal>
  )
}
