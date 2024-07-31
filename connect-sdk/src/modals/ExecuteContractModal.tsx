import { FormEvent, useState } from 'react'
import { useAtom, useAtomValue } from 'jotai'
import ReactModal from 'react-modal'
import { modalAtom, selectedWalletAtom } from '../libs/atoms'
import { venlyConnect } from '../libs/venlyConnect'
import { contractData } from '../libs/exampleData'
import { useAlerts } from '../hooks/useAlerts'
import { copyAddress, formatAddress } from '../libs/utils'
import circlesSm from '../assets/circles-sm.svg'

export default function ExecuteContractModal() {
  const { showAlert } = useAlerts()
  const [modal, setModal] = useAtom(modalAtom)
  const selectedWallet = useAtomValue(selectedWalletAtom)
  const [formFields, setFormFields] = useState({
    to: '',
    value: '',
    functionName: 'transfer',
    inputs: JSON.stringify(contractData, null, 4),
  })
  
  function onAfterClose() {
    setFormFields({
      ...formFields,
      to: '',
      value: '',
    })
  }

  async function handleSubmit(event: FormEvent) {
    event.preventDefault()
    try {
      const res = await venlyConnect.signer.executeContract({
        walletId: selectedWallet!.id,
        secretType: selectedWallet!.secretType,
        to: formFields.to,
        value: Number(formFields.value),
        functionName: formFields.functionName,
        inputs: JSON.parse(formFields.inputs),
      })
      showAlert('Execute contract', res)
      setModal(null)
    }
    catch (error) {
      showAlert('Execute contract', error)
    }
  }

  return (
    <ReactModal
      isOpen={modal == 'ExecuteContractModal'}
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
              <path d="M14 2.26953V6.40007C14 6.96012 14 7.24015 14.109 7.45406C14.2049 7.64222 14.3578 7.7952 14.546 7.89108C14.7599 8.00007 15.0399 8.00007 15.6 8.00007H19.7305M14 17.5L16.5 15L14 12.5M10 12.5L7.5 15L10 17.5M20 9.98822V17.2C20 18.8802 20 19.7202 19.673 20.362C19.3854 20.9265 18.9265 21.3854 18.362 21.673C17.7202 22 16.8802 22 15.2 22H8.8C7.11984 22 6.27976 22 5.63803 21.673C5.07354 21.3854 4.6146 20.9265 4.32698 20.362C4 19.7202 4 18.8802 4 17.2V6.8C4 5.11984 4 4.27976 4.32698 3.63803C4.6146 3.07354 5.07354 2.6146 5.63803 2.32698C6.27976 2 7.11984 2 8.8 2H12.0118C12.7455 2 13.1124 2 13.4577 2.08289C13.7638 2.15638 14.0564 2.27759 14.3249 2.44208C14.6276 2.6276 14.887 2.88703 15.4059 3.40589L18.5941 6.59411C19.113 7.11297 19.3724 7.3724 19.5579 7.67515C19.7224 7.94356 19.8436 8.2362 19.9171 8.5423C20 8.88757 20 9.25445 20 9.98822Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <div className="modal-header__bg">
              <img src={circlesSm} width={336} height={336}/>
            </div>
          </div>
          <h2 className="modal-header__title">Execute contract</h2>
          <p className="modal-header__subtitle">Allows you to execute a write function on a smart contract.</p>
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
            <label className="form-field__label">To</label>
            <input type="text" className="form-field__input" placeholder="Contract address (0x)" 
              value={formFields.to} onChange={e => setFormFields({...formFields, to: e.target.value})}
            />
          </div>

          <div className="form-field">
            <label className="form-field__label">Amount ({selectedWallet?.balance?.symbol})</label>
            <input type="text" className="form-field__input" 
              placeholder="e.g. 0.001"
              value={formFields.value} onChange={e => setFormFields({...formFields, value: e.target.value})}
            />
          </div>

          <div className="form-field">
            <label className="form-field__label">Function name</label>
            <input type="text" className="form-field__input" placeholder="e.g. transfer" 
              value={formFields.functionName} onChange={e => setFormFields({...formFields, functionName: e.target.value})}
            />
          </div>

          <div className="form-field">
            <label className="form-field__label">Inputs</label>
            <textarea className="form-field__input" placeholder="{ types, domain, primaryType, message }" rows={6}
              value={formFields.inputs} onChange={e => setFormFields({...formFields, inputs: e.target.value})}
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
