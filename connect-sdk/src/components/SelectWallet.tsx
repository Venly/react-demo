import { useState } from 'react'
import { Wallet } from '@venly/connect'
import { formatAddress } from '../libs/utils'

export default function SelectWallet({ 
  wallets, selectedWallet, setSelectedWallet
}: { 
  wallets: Wallet[]|null
  selectedWallet?: Wallet
  setSelectedWallet: (state: Wallet) => void
}) {
  const [isOpen, setIsOpen] = useState(false)

  function onSelect(wallet: Wallet) {
    setSelectedWallet(wallet)
    setIsOpen(false)
  }

  return (
    <button type="button" className="input-dropdown" onBlur={() => setIsOpen(false)}>
      <div className={`input-dropdown__input ${isOpen ? 'active' : ''}`} onClick={() => setIsOpen(!isOpen)}>
        {selectedWallet &&
          <>
            <img src={`/chains/${selectedWallet.secretType.toLowerCase()}.svg`} 
              className="input-dropdown__img" alt={selectedWallet.secretType}
            />
            <span className="input-dropdown__text">{selectedWallet.description}</span>
            <span className="input-dropdown__subtext">{formatAddress(selectedWallet.address)}</span>
          </>
        }
      </div>
      <svg className="input-dropdown__icon" width="20" height="20" viewBox="0 0 20 20" fill="none">
        <path d="M5 7.5L10 12.5L15 7.5" stroke="currentColor" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
      {isOpen &&
        <ul className="input-dropdown__menu">
          {!wallets?.length &&
            <p className="input-dropdown__empty">No wallets found</p>
          }
          {wallets?.map(wallet => {
            const active = selectedWallet?.id == wallet.id
            return (
              <li className={`input-dropdown__item ${active ? 'active' : ''}`} key={wallet.id} 
                onClick={() => onSelect(wallet)} 
              >
                <img src={`/chains/${wallet.secretType.toLowerCase()}.svg`} className="input-dropdown__img" alt={wallet.secretType} />
                <span className="input-dropdown__text">{wallet.description}</span>
                <span className="input-dropdown__subtext">{formatAddress(wallet.address)}</span>
                <svg className="input-dropdown__check" width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path d="M16.6668 5L7.50016 14.1667L3.3335 10" stroke="currentColor" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </li>
            )
          })}
        </ul>
      }
    </button>
  )
}
