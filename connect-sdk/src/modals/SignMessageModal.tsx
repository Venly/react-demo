import { FormEvent, useState } from 'react'
import { useAtom, useAtomValue } from 'jotai'
import ReactModal from 'react-modal'
import { modalAtom, selectedWalletAtom } from '../libs/atoms'
import { venlyConnect } from '../libs/venlyConnect'
import { useAlerts } from '../hooks/useAlerts'
import { copyAddress, formatAddress } from '../libs/utils'
import circlesSm from '../assets/circles-sm.svg'

export default function SignMessageModal() {
  const { showAlert } = useAlerts()
  const [modal, setModal] = useAtom(modalAtom)
  const selectedWallet = useAtomValue(selectedWalletAtom)
  const [formFields, setFormFields] = useState({
    data: '',
  })
  
  function onAfterClose() {
    setFormFields({
      data: '',
    })
  }

  async function handleSubmit(event: FormEvent) {
    event.preventDefault()
    try {
      const res = await venlyConnect.signer.signMessage({
        walletId: selectedWallet!.id,
        secretType: selectedWallet!.secretType,
        data: formFields.data,
      })
      showAlert('Sign message', res)
      setModal(null)
    }
    catch (error) {
      showAlert('Sign message', error)
    }
  }

  return (
    <ReactModal
      isOpen={modal == 'SignMessageModal'}
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
              <path d="M7 8.5H12M7 12H15M7 18V20.3355C7 20.8684 7 21.1348 7.10923 21.2716C7.20422 21.3906 7.34827 21.4599 7.50054 21.4597C7.67563 21.4595 7.88367 21.2931 8.29976 20.9602L10.6852 19.0518C11.1725 18.662 11.4162 18.4671 11.6875 18.3285C11.9282 18.2055 12.1844 18.1156 12.4492 18.0613C12.7477 18 13.0597 18 13.6837 18H16.2C17.8802 18 18.7202 18 19.362 17.673C19.9265 17.3854 20.3854 16.9265 20.673 16.362C21 15.7202 21 14.8802 21 13.2V7.8C21 6.11984 21 5.27976 20.673 4.63803C20.3854 4.07354 19.9265 3.6146 19.362 3.32698C18.7202 3 17.8802 3 16.2 3H7.8C6.11984 3 5.27976 3 4.63803 3.32698C4.07354 3.6146 3.6146 4.07354 3.32698 4.63803C3 5.27976 3 6.11984 3 7.8V14C3 14.93 3 15.395 3.10222 15.7765C3.37962 16.8117 4.18827 17.6204 5.22354 17.8978C5.60504 18 6.07003 18 7 18Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <div className="modal-header__bg">
              <img src={circlesSm} width={336} height={336}/>
            </div>
          </div>
          <h2 className="modal-header__title">Sign message</h2>
          <p className="modal-header__subtitle">Allows you to sign arbitrary data with the specified wallet.</p>
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
            <label className="form-field__label">Message</label>
            <textarea className="form-field__input" placeholder="e.g. some text message" rows={4} required
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
