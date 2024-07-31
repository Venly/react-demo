import { FormEvent, useState } from 'react'
import { useAtom, useAtomValue } from 'jotai'
import ReactModal from 'react-modal'
import { modalAtom, selectedTokenAtom, selectedWalletAtom } from '../libs/atoms'
import { venlyConnect } from '../libs/venlyConnect'
import { useAlerts } from '../hooks/useAlerts'
import { copyAddress, formatAddress } from '../libs/utils'
import circlesSm from '../assets/circles-sm.svg'

export default function TransferTokenModal() {
  const { showAlert } = useAlerts()
  const [modal, setModal] = useAtom(modalAtom)
  const selectedWallet = useAtomValue(selectedWalletAtom)
  const selectedToken = useAtomValue(selectedTokenAtom)
  const [formFields, setFormFields] = useState({
    to: '',
    value: '',
  })
  
  function onAfterClose() {
    setFormFields({
      to: '',
      value: '',
    })
  }

  async function handleSubmit(event: FormEvent) {
    event.preventDefault()
    try {
      const res = await venlyConnect.signer.executeTokenTransfer({
        walletId: selectedWallet!.id,
        to: formFields.to,
        value: Number(formFields.value),
        secretType: selectedWallet!.secretType,
        tokenAddress: selectedToken!.tokenAddress,
      })
      showAlert('Token transfer', res)
      setModal(null)
    }
    catch (error) {
      showAlert('Token transfer', error)
    }
  }

  return (
    <ReactModal
      isOpen={modal == 'TransferTokenModal'}
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
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M20 17H4M4 17L8 13M4 17L8 21M4 7H20M20 7L16 3M20 7L16 11" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <div className="modal-header__bg">
              <img src={circlesSm} width={336} height={336}/>
            </div>
          </div>
          <h2 className="modal-header__title">Transfer token</h2>
          <p className="modal-header__subtitle">Allows you to transfer fungible tokens to the destination address.</p>
        </div>

        <div className="modal-form">
          <div className="form-field">
            <label className="form-field__label">Token</label>
            <div className="form-field__container">
              <div className="input-dropdown">
                <div className="input-dropdown__input">
                  {selectedToken &&
                    <>
                      <img src={selectedToken.logo ?? '/chains/ethereum.svg'} className="input-dropdown__img" alt={selectedToken.logo} />
                      <span className="input-dropdown__text">{selectedToken.name}</span>
                      <span className="input-dropdown__subtext">{formatAddress(selectedToken?.tokenAddress)}</span>
                    </>
                  }
                </div>
                <div className="input-dropdown__btn" onClick={() => copyAddress(selectedToken?.tokenAddress)}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                    <path d="M5 15C4.06812 15 3.60218 15 3.23463 14.8478C2.74458 14.6448 2.35523 14.2554 2.15224 13.7654C2 13.3978 2 12.9319 2 12V5.2C2 4.0799 2 3.51984 2.21799 3.09202C2.40973 2.71569 2.71569 2.40973 3.09202 2.21799C3.51984 2 4.0799 2 5.2 2H12C12.9319 2 13.3978 2 13.7654 2.15224C14.2554 2.35523 14.6448 2.74458 14.8478 3.23463C15 3.60218 15 4.06812 15 5M12.2 22H18.8C19.9201 22 20.4802 22 20.908 21.782C21.2843 21.5903 21.5903 21.2843 21.782 20.908C22 20.4802 22 19.9201 22 18.8V12.2C22 11.0799 22 10.5198 21.782 10.092C21.5903 9.71569 21.2843 9.40973 20.908 9.21799C20.4802 9 19.9201 9 18.8 9H12.2C11.0799 9 10.5198 9 10.092 9.21799C9.71569 9.40973 9.40973 9.71569 9.21799 10.092C9 10.5198 9 11.0799 9 12.2V18.8C9 19.9201 9 20.4802 9.21799 20.908C9.40973 21.2843 9.71569 21.5903 10.092 21.782C10.5198 22 11.0799 22 12.2 22Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  Copy
                </div>
              </div>
            </div>
            <span className="form-field__subtext">Balance: {selectedToken?.balance} {selectedToken?.symbol}</span>
          </div>
          <div className="form-field">
            <label className="form-field__label">To</label>
            <input type="text" className="form-field__input" placeholder="Public address (0x)" 
              value={formFields.to} onChange={e => setFormFields({...formFields, to: e.target.value})}
            />
          </div>
          <div className="form-field">
            <label className="form-field__label">Amount ({selectedToken?.symbol ?? 'ETH'})</label>
            <input type="text" className="form-field__input" 
              placeholder="e.g. 0.001"
              value={formFields.value} onChange={e => setFormFields({...formFields, value: e.target.value})}
            />
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
