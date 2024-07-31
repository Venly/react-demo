import { useSetAtom } from 'jotai'
import { TokenBalance } from '@venly/connect'
import Skeleton from 'react-loading-skeleton'
import { modalAtom, selectedTokenAtom } from '../libs/atoms'
import { copyAddress, formatAddress } from '../libs/utils'
import circlesMd from '../assets/circles-md.svg'

export default function Tokens({
  tokens, isLoading
}: {
  tokens: TokenBalance[]|null
  isLoading: boolean
}) {
  const setModal = useSetAtom(modalAtom)
  const setSelectedToken = useSetAtom(selectedTokenAtom)

  function openModal(modal: string, token: TokenBalance) {
    setSelectedToken(token)
    setModal(modal)
  }

  function onClickCopy(event: React.MouseEvent, address: string) {
    event.stopPropagation()
    copyAddress(address)
  }

  function renderTableBody() {
    if (!tokens) {
      return [0, 1].map(index => {
        return (
          <tr className="table-grid__row" key={index}>
            <td>
              <div className="table-grid__flex">
                <Skeleton width={40} height={38} circle />
                <div className="table-grid__block">
                  <p className="table-grid__title"><Skeleton width={100} height={14} /></p>
                  <div className="table-grid__copy">
                    <span className="table-grid__subtitle"><Skeleton width={180} height={14} /></span>
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
                      <path d="M5 15C4.06812 15 3.60218 15 3.23463 14.8478C2.74458 14.6448 2.35523 14.2554 2.15224 13.7654C2 13.3978 2 12.9319 2 12V5.2C2 4.0799 2 3.51984 2.21799 3.09202C2.40973 2.71569 2.71569 2.40973 3.09202 2.21799C3.51984 2 4.0799 2 5.2 2H12C12.9319 2 13.3978 2 13.7654 2.15224C14.2554 2.35523 14.6448 2.74458 14.8478 3.23463C15 3.60218 15 4.06812 15 5M12.2 22H18.8C19.9201 22 20.4802 22 20.908 21.782C21.2843 21.5903 21.5903 21.2843 21.782 20.908C22 20.4802 22 19.9201 22 18.8V12.2C22 11.0799 22 10.5198 21.782 10.092C21.5903 9.71569 21.2843 9.40973 20.908 9.21799C20.4802 9 19.9201 9 18.8 9H12.2C11.0799 9 10.5198 9 10.092 9.21799C9.71569 9.40973 9.40973 9.71569 9.21799 10.092C9 10.5198 9 11.0799 9 12.2V18.8C9 19.9201 9 20.4802 9.21799 20.908C9.40973 21.2843 9.71569 21.5903 10.092 21.782C10.5198 22 11.0799 22 12.2 22Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                </div>
              </div>
            </td>
            <td>
              <span className="table-grid__subtitle"><Skeleton width={100} height={14} /></span>
            </td>
            <td>
              <div className="table-grid__actions">
                <Skeleton width={80} height={14} />
              </div>
            </td>
          </tr>
        )
      })
    }
    else if (!tokens.length) {
      return (
        <tr>
          <td colSpan={100}>
            <div className="table-empty">
              <div className="table-empty__icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path d="M21 21L17.5001 17.5M20 11.5C20 16.1944 16.1944 20 11.5 20C6.80558 20 3 16.1944 3 11.5C3 6.80558 6.80558 3 11.5 3C16.1944 3 20 6.80558 20 11.5Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <div className="table-empty__bg">
                  <img src={circlesMd} alt="empty" />
                </div>
              </div>
              <span className="table-empty__title">No items found</span>
            </div>
          </td>
        </tr>
      )
    }
    else {
      return tokens?.map((token: TokenBalance) => {
        return (
          <tr className="table-grid__row" key={token.tokenAddress}>
            <td>
              <div className="table-grid__flex">
                <img src={token.logo ?? '/chains/ethereum.svg'} className="table-grid__img" alt={token.logo} />
                <div className="table-grid__block">
                  <p className="table-grid__title">{token.name}</p>
                  <button type="button" className="table-grid__copy" onClick={e => onClickCopy(e, token.tokenAddress)}>
                    <span className="table-grid__subtitle">{formatAddress(token.tokenAddress)}</span>
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
                      <path d="M5 15C4.06812 15 3.60218 15 3.23463 14.8478C2.74458 14.6448 2.35523 14.2554 2.15224 13.7654C2 13.3978 2 12.9319 2 12V5.2C2 4.0799 2 3.51984 2.21799 3.09202C2.40973 2.71569 2.71569 2.40973 3.09202 2.21799C3.51984 2 4.0799 2 5.2 2H12C12.9319 2 13.3978 2 13.7654 2.15224C14.2554 2.35523 14.6448 2.74458 14.8478 3.23463C15 3.60218 15 4.06812 15 5M12.2 22H18.8C19.9201 22 20.4802 22 20.908 21.782C21.2843 21.5903 21.5903 21.2843 21.782 20.908C22 20.4802 22 19.9201 22 18.8V12.2C22 11.0799 22 10.5198 21.782 10.092C21.5903 9.71569 21.2843 9.40973 20.908 9.21799C20.4802 9 19.9201 9 18.8 9H12.2C11.0799 9 10.5198 9 10.092 9.21799C9.71569 9.40973 9.40973 9.71569 9.21799 10.092C9 10.5198 9 11.0799 9 12.2V18.8C9 19.9201 9 20.4802 9.21799 20.908C9.40973 21.2843 9.71569 21.5903 10.092 21.782C10.5198 22 11.0799 22 12.2 22Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </button>
                </div>
              </div>
            </td>
            <td>
              <span className="table-grid__subtitle">{token.balance.toFixed(6)} {token.symbol}</span>
            </td>
            <td>
              <div className="table-grid__actions">
                <button className="btn btn--borderless" onClick={() => openModal('TransferTokenModal', token)}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                    <path d="M20 17H4M4 17L8 13M4 17L8 21M4 7H20M20 7L16 3M20 7L16 11" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  Transfer
                </button>
              </div>
            </td>
          </tr>
        )
      })
    }
  }

  return (
    <div className="table">
      <div className="table__header">
        <div className="table__block">
          <h2 className="table__title">
            Tokens 
            {isLoading && 
              <svg className="table__loading" width="20" height="20" viewBox="0 0 24 24" fill="none">
                <path d="M17 5.12537C19.1213 6.67091 20.5 9.17444 20.5 12C20.5 16.6944 16.6944 20.5 12 20.5H11.5M7 18.8746C4.87867 17.329 3.5 14.8255 3.5 12C3.5 7.30555 7.30558 3.49998 12 3.49998H12.5M13 22.4L11 20.4L13 18.4M11 5.59998L13 3.59998L11 1.59998" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            }
          </h2>
        </div>
      </div>

      <table className="table-grid table-grid--border" cellSpacing={0}>
        <thead>
          <tr>
            <th>Token</th>
            <th>Balance</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {renderTableBody()}
        </tbody>
      </table>
    </div>
  )
}
