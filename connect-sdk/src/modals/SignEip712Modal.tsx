import { FormEvent, useState } from 'react'
import { useAtom, useAtomValue } from 'jotai'
import ReactModal from 'react-modal'
import { modalAtom, selectedWalletAtom } from '../libs/atoms'
import { venlyConnect } from '../libs/venlyConnect'
import { eip712Data } from '../libs/exampleData'
import { useAlerts } from '../hooks/useAlerts'
import { copyAddress, formatAddress } from '../libs/utils'
import circlesSm from '../assets/circles-sm.svg'

export default function SignEip712Modal() {
  const { showAlert } = useAlerts()
  const [modal, setModal] = useAtom(modalAtom)
  const selectedWallet = useAtomValue(selectedWalletAtom)
  const [formFields, setFormFields] = useState({
    data: JSON.stringify(eip712Data, null, 4),
  })
  
  function onAfterClose() {
    
  }

  async function handleSubmit(event: FormEvent) {
    event.preventDefault()
    try {
      const res = await venlyConnect.signer.signEip712({
        walletId: selectedWallet!.id,
        secretType: selectedWallet!.secretType,
        data: JSON.parse(formFields.data),
      })
      showAlert('Sign EIP712', res)
      setModal(null)
    }
    catch (error) {
      showAlert('Sign EIP712', error)
    }
  }

  return (
    <ReactModal
      isOpen={modal == 'SignEip712Modal'}
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
              <path d="M18.5708 20C19.8328 20 20.8568 18.977 20.8568 17.714V13.143L21.9998 12L20.8568 10.857V6.286C20.8568 5.023 19.8338 4 18.5708 4M5.429 4C4.166 4 3.143 5.023 3.143 6.286V10.857L2 12L3.143 13.143V17.714C3.143 18.977 4.166 20 5.429 20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <div className="modal-header__bg">
              <img src={circlesSm} width={336} height={336}/>
            </div>
          </div>
          <h2 className="modal-header__title">Sign EIP712 message</h2>
          <p className="modal-header__subtitle">Allows you to sign a structured EIP712 message with the specified wallet.</p>
        </div>

        <div className="modal-form">
          <div className="form-field">
            <label className="form-field__label">Wallet</label>
            <div className="form-field__container">
              <div className="input-dropdown">
                <div className="input-dropdown__input">
                  {selectedWallet &&
                    <>
                      <img src={`/chains/${selectedWallet.secretType.toLowerCase()}.svg`} 
                        className="input-dropdown__img" alt={selectedWallet.secretType}
                      />
                      <span className="input-dropdown__text">{selectedWallet.description}</span>
                      <span className="input-dropdown__subtext">{formatAddress(selectedWallet?.address)}</span>
                    </>
                  }
                </div>
                <div className="input-dropdown__btn" onClick={() => copyAddress(selectedWallet?.address)}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                    <path d="M5 15C4.06812 15 3.60218 15 3.23463 14.8478C2.74458 14.6448 2.35523 14.2554 2.15224 13.7654C2 13.3978 2 12.9319 2 12V5.2C2 4.0799 2 3.51984 2.21799 3.09202C2.40973 2.71569 2.71569 2.40973 3.09202 2.21799C3.51984 2 4.0799 2 5.2 2H12C12.9319 2 13.3978 2 13.7654 2.15224C14.2554 2.35523 14.6448 2.74458 14.8478 3.23463C15 3.60218 15 4.06812 15 5M12.2 22H18.8C19.9201 22 20.4802 22 20.908 21.782C21.2843 21.5903 21.5903 21.2843 21.782 20.908C22 20.4802 22 19.9201 22 18.8V12.2C22 11.0799 22 10.5198 21.782 10.092C21.5903 9.71569 21.2843 9.40973 20.908 9.21799C20.4802 9 19.9201 9 18.8 9H12.2C11.0799 9 10.5198 9 10.092 9.21799C9.71569 9.40973 9.40973 9.71569 9.21799 10.092C9 10.5198 9 11.0799 9 12.2V18.8C9 19.9201 9 20.4802 9.21799 20.908C9.40973 21.2843 9.71569 21.5903 10.092 21.782C10.5198 22 11.0799 22 12.2 22Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  Copy
                </div>
              </div>
            </div>
            <span className="form-field__subtext">Balance: {selectedWallet?.balance?.balance} {selectedWallet?.balance?.symbol}</span>
          </div>
          <div className="form-field">
            <label className="form-field__label">Data</label>
            <textarea className="form-field__input" placeholder="{ types, domain, primaryType, message }" rows={8}
              value={formFields.data} onChange={e => setFormFields({...formFields, data: e.target.value})}
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
