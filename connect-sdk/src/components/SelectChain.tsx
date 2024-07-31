import { useState } from 'react'
import { chains, evmChains } from '../libs/chains'

export default function SelectChain({ 
  selected, setSelected
}: { 
  selected: string
  setSelected: (state: string) => void
}) {
  const [isOpen, setIsOpen] = useState(false)

  function onSelect(secretType: string) {
    setSelected(secretType)
    setIsOpen(false)
  }

  return (
    <button type="button" className="input-dropdown" onBlur={() => setIsOpen(false)}>
      <div className={`input-dropdown__input ${isOpen ? 'active' : ''}`} onClick={() => setIsOpen(!isOpen)}>
        <img src={`/chains/${selected.toLowerCase()}.svg`} className="input-dropdown__img" alt={selected} />
        <span className="input-dropdown__text">{chains[selected].name} </span>
      </div>
      <svg className="input-dropdown__icon" width="20" height="20" viewBox="0 0 20 20" fill="none">
        <path d="M5 7.5L10 12.5L15 7.5" stroke="currentColor" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
      {isOpen &&
        <ul className="input-dropdown__menu">
          {evmChains.map(secretType => {
            const active = selected == secretType
            const chain = chains[secretType]
            return (
              <li className={`input-dropdown__item ${active ? 'active' : ''}`} key={secretType} 
                onClick={() => onSelect(secretType)} 
              >
                <img src={`/chains/${secretType.toLowerCase()}.svg`} className="input-dropdown__img" alt={secretType} />
                <span className="input-dropdown__text">{chain.name}</span>
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
