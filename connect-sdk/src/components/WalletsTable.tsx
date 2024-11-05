import { useNavigate } from 'react-router-dom'
import { useSetAtom } from 'jotai'
import { Wallet } from '@venly/connect'
import Skeleton from 'react-loading-skeleton'
import { venlyConnect } from '../libs/venlyConnect'
import { chains } from '../libs/chains'
import { modalAtom, selectedWalletAtom } from '../libs/atoms'
import { copyAddress, formatAddress } from '../libs/utils'
import { useWallets } from '../hooks/useWallets'
import circlesMd from '../assets/circles-md.svg'
import DropdownBtn from './DropdownBtn'

export default function Wallets() {
  const navigate = useNavigate()
  const { wallets, isLoading, getWallets } = useWallets(true)
  const setModal = useSetAtom(modalAtom)
  const setSelectedWallet = useSetAtom(selectedWalletAtom)

  async function addWallets() {
    const res = await venlyConnect.linkWallets()
    if (res?.status == 'SUCCESS')
      getWallets()
  }

  function openModal(modal: string, wallet: Wallet) {
    setSelectedWallet(wallet)
    setModal(modal)
  }

  function onClickCopy(event: React.MouseEvent, address: string) {
    event.stopPropagation()
    copyAddress(address)
  }

  function onClickRow(id: string) {
    navigate(`/wallets/${id}`)
  }

  function renderTableBody() {
    if (!wallets) {
      return [0, 1, 2].map(index => {
        return (
          <tr className="table-grid__row clickable" key={index}>
            <td>
              <div className="table-grid__flex">
                <Skeleton width={40} height={38} circle />
                <div className="table-grid__block">
                  <p className="table-grid__title"><Skeleton width={100} height={14} /></p>
                  <p className="table-grid__subtitle"><Skeleton width={70} height={14} /></p>
                </div>
              </div>
            </td>
            <td>
              <div className="table-grid__copy">
                <span className="table-grid__subtitle"><Skeleton width={180} height={14} /></span>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
                  <path d="M5 15C4.06812 15 3.60218 15 3.23463 14.8478C2.74458 14.6448 2.35523 14.2554 2.15224 13.7654C2 13.3978 2 12.9319 2 12V5.2C2 4.0799 2 3.51984 2.21799 3.09202C2.40973 2.71569 2.71569 2.40973 3.09202 2.21799C3.51984 2 4.0799 2 5.2 2H12C12.9319 2 13.3978 2 13.7654 2.15224C14.2554 2.35523 14.6448 2.74458 14.8478 3.23463C15 3.60218 15 4.06812 15 5M12.2 22H18.8C19.9201 22 20.4802 22 20.908 21.782C21.2843 21.5903 21.5903 21.2843 21.782 20.908C22 20.4802 22 19.9201 22 18.8V12.2C22 11.0799 22 10.5198 21.782 10.092C21.5903 9.71569 21.2843 9.40973 20.908 9.21799C20.4802 9 19.9201 9 18.8 9H12.2C11.0799 9 10.5198 9 10.092 9.21799C9.71569 9.40973 9.40973 9.71569 9.21799 10.092C9 10.5198 9 11.0799 9 12.2V18.8C9 19.9201 9 20.4802 9.21799 20.908C9.40973 21.2843 9.71569 21.5903 10.092 21.782C10.5198 22 11.0799 22 12.2 22Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
            </td>
            <td>
              <span className="table-grid__subtitle"><Skeleton width={80} height={14} /></span>
            </td>
            <td>
              <span className="table-grid__subtitle"><Skeleton width={100} height={14} /></span>
            </td>
            <td>
              <div className="table-grid__actions">
                <Skeleton width={20} height={14} />
              </div>
            </td>
          </tr>
        )
      })
    }
    else if (!wallets.length) {
      return (
        <tr>
          <td colSpan={100}>
            <div className="table-empty">
              <div className="table-empty__icon">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                  <path d="M16 7.99983V4.50048C16 3.66874 16 3.25287 15.8248 2.9973C15.6717 2.77401 15.4346 2.62232 15.1678 2.57691C14.8623 2.52493 14.4847 2.6992 13.7295 3.04775L4.85901 7.14182C4.18551 7.45267 3.84875 7.6081 3.60211 7.84915C3.38406 8.06225 3.21762 8.32238 3.1155 8.60966C3 8.93462 3 9.30551 3 10.0473V14.9998M16.5 14.4998H16.51M3 11.1998L3 17.7998C3 18.9199 3 19.48 3.21799 19.9078C3.40973 20.2841 3.71569 20.5901 4.09202 20.7818C4.51984 20.9998 5.07989 20.9998 6.2 20.9998H17.8C18.9201 20.9998 19.4802 20.9998 19.908 20.7818C20.2843 20.5901 20.5903 20.2841 20.782 19.9078C21 19.48 21 18.9199 21 17.7998V11.1998C21 10.0797 21 9.51967 20.782 9.09185C20.5903 8.71552 20.2843 8.40956 19.908 8.21782C19.4802 7.99983 18.9201 7.99983 17.8 7.99983L6.2 7.99983C5.0799 7.99983 4.51984 7.99983 4.09202 8.21781C3.7157 8.40956 3.40973 8.71552 3.21799 9.09185C3 9.51967 3 10.0797 3 11.1998ZM17 14.4998C17 14.776 16.7761 14.9998 16.5 14.9998C16.2239 14.9998 16 14.776 16 14.4998C16 14.2237 16.2239 13.9998 16.5 13.9998C16.7761 13.9998 17 14.2237 17 14.4998Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <div className="table-empty__bg">
                  <img src={circlesMd} alt="empty" />
                </div>
              </div>
              <span className="table-empty__title">No wallets found</span>
              <p className="table-empty__text">Connect your existing Venly wallets or create new ones.</p>
              <div className="table-empty__actions">
                <button className="btn" onClick={() => getWallets()}>
                  Refresh
                </button>
                <button className="btn btn--primary" onClick={() => addWallets()}>
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <path d="M7.00008 1.16675V12.8334M1.16675 7.00008H12.8334" stroke="currentColor" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  Add
                </button>
              </div>
            </div>
          </td>
        </tr>
      )
    }
    else {
      return (
        wallets?.map((wallet: Wallet) => {
          return (
            <tr className="table-grid__row clickable" key={wallet.id} onClick={() => onClickRow(wallet.id)}>
              <td>
                <div className="table-grid__flex">
                  <img src={`/chains/${wallet.secretType.toLowerCase()}.svg`} className="table-grid__img" alt={wallet.secretType} />
                  <div className="table-grid__block">
                    <p className="table-grid__title">{wallet.description}</p>
                    <p className="table-grid__subtitle">{chains[wallet.secretType]?.name}</p>
                  </div>
                </div>
              </td>
              <td>
                <button type="button" className="table-grid__copy" onClick={e => onClickCopy(e, wallet.address)}>
                  <span className="table-grid__subtitle">{formatAddress(wallet.address)}</span>
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
                    <path d="M5 15C4.06812 15 3.60218 15 3.23463 14.8478C2.74458 14.6448 2.35523 14.2554 2.15224 13.7654C2 13.3978 2 12.9319 2 12V5.2C2 4.0799 2 3.51984 2.21799 3.09202C2.40973 2.71569 2.71569 2.40973 3.09202 2.21799C3.51984 2 4.0799 2 5.2 2H12C12.9319 2 13.3978 2 13.7654 2.15224C14.2554 2.35523 14.6448 2.74458 14.8478 3.23463C15 3.60218 15 4.06812 15 5M12.2 22H18.8C19.9201 22 20.4802 22 20.908 21.782C21.2843 21.5903 21.5903 21.2843 21.782 20.908C22 20.4802 22 19.9201 22 18.8V12.2C22 11.0799 22 10.5198 21.782 10.092C21.5903 9.71569 21.2843 9.40973 20.908 9.21799C20.4802 9 19.9201 9 18.8 9H12.2C11.0799 9 10.5198 9 10.092 9.21799C9.71569 9.40973 9.40973 9.71569 9.21799 10.092C9 10.5198 9 11.0799 9 12.2V18.8C9 19.9201 9 20.4802 9.21799 20.908C9.40973 21.2843 9.71569 21.5903 10.092 21.782C10.5198 22 11.0799 22 12.2 22Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>
              </td>
              <td>
                <span className="table-grid__subtitle">{new Date(wallet.createdAt ?? '').toLocaleDateString('en-us', { year: 'numeric', month: 'short', day: 'numeric' })}</span>
              </td>
              <td>
                <span className="table-grid__subtitle">{wallet.balance?.balance.toFixed(6)} {wallet.balance?.symbol}</span>
              </td>
              <td>
                <div className="table-grid__actions">
                  <DropdownBtn className="btn btn--borderless">
                    <div className="dropdown-menu__item" onClick={() => openModal('SendTransactionModal', wallet)}>
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                        <path d="M20 17H4M4 17L8 13M4 17L8 21M4 7H20M20 7L16 3M20 7L16 11" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                      Send transaction
                    </div>
                    <div className="dropdown-menu__item" onClick={() => openModal('SignMessageModal', wallet)}>
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                        <path d="M7 8.5H12M7 12H15M7 18V20.3355C7 20.8684 7 21.1348 7.10923 21.2716C7.20422 21.3906 7.34827 21.4599 7.50054 21.4597C7.67563 21.4595 7.88367 21.2931 8.29976 20.9602L10.6852 19.0518C11.1725 18.662 11.4162 18.4671 11.6875 18.3285C11.9282 18.2055 12.1844 18.1156 12.4492 18.0613C12.7477 18 13.0597 18 13.6837 18H16.2C17.8802 18 18.7202 18 19.362 17.673C19.9265 17.3854 20.3854 16.9265 20.673 16.362C21 15.7202 21 14.8802 21 13.2V7.8C21 6.11984 21 5.27976 20.673 4.63803C20.3854 4.07354 19.9265 3.6146 19.362 3.32698C18.7202 3 17.8802 3 16.2 3H7.8C6.11984 3 5.27976 3 4.63803 3.32698C4.07354 3.6146 3.6146 4.07354 3.32698 4.63803C3 5.27976 3 6.11984 3 7.8V14C3 14.93 3 15.395 3.10222 15.7765C3.37962 16.8117 4.18827 17.6204 5.22354 17.8978C5.60504 18 6.07003 18 7 18Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                      Sign message
                    </div>
                    {wallet.secretType != 'SOLANA' &&
                      <div className="dropdown-menu__item" onClick={() => openModal('SignEip712Modal', wallet)}>
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                          <path d="M18.5708 20C19.8328 20 20.8568 18.977 20.8568 17.714V13.143L21.9998 12L20.8568 10.857V6.286C20.8568 5.023 19.8338 4 18.5708 4M5.429 4C4.166 4 3.143 5.023 3.143 6.286V10.857L2 12L3.143 13.143V17.714C3.143 18.977 4.166 20 5.429 20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                        Sign EIP712
                      </div>
                    }
                    <div className="dropdown-menu__item" onClick={() => openModal('ExecuteContractModal', wallet)}>
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                        <path d="M14 2.26953V6.40007C14 6.96012 14 7.24015 14.109 7.45406C14.2049 7.64222 14.3578 7.7952 14.546 7.89108C14.7599 8.00007 15.0399 8.00007 15.6 8.00007H19.7305M14 17.5L16.5 15L14 12.5M10 12.5L7.5 15L10 17.5M20 9.98822V17.2C20 18.8802 20 19.7202 19.673 20.362C19.3854 20.9265 18.9265 21.3854 18.362 21.673C17.7202 22 16.8802 22 15.2 22H8.8C7.11984 22 6.27976 22 5.63803 21.673C5.07354 21.3854 4.6146 20.9265 4.32698 20.362C4 19.7202 4 18.8802 4 17.2V6.8C4 5.11984 4 4.27976 4.32698 3.63803C4.6146 3.07354 5.07354 2.6146 5.63803 2.32698C6.27976 2 7.11984 2 8.8 2H12.0118C12.7455 2 13.1124 2 13.4577 2.08289C13.7638 2.15638 14.0564 2.27759 14.3249 2.44208C14.6276 2.6276 14.887 2.88703 15.4059 3.40589L18.5941 6.59411C19.113 7.11297 19.3724 7.3724 19.5579 7.67515C19.7224 7.94356 19.8436 8.2362 19.9171 8.5423C20 8.88757 20 9.25445 20 9.98822Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                      Execute contract
                    </div>
                  </DropdownBtn>
                </div>
              </td>
            </tr>
          )
        })
      )
    }
  }

  return (
    <div className="table">
      <div className="table__header">
        <div className="table__block">
          <h2 className="table__title">
            Wallets 
            {isLoading && 
              <svg className="table__loading" width="20" height="20" viewBox="0 0 24 24" fill="none">
                <path d="M17 5.12537C19.1213 6.67091 20.5 9.17444 20.5 12C20.5 16.6944 16.6944 20.5 12 20.5H11.5M7 18.8746C4.87867 17.329 3.5 14.8255 3.5 12C3.5 7.30555 7.30558 3.49998 12 3.49998H12.5M13 22.4L11 20.4L13 18.4M11 5.59998L13 3.59998L11 1.59998" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            }
          </h2>
          <p className="table__subtitle">View and manage your Venly wallets.</p>
        </div>
        <div className="table__actions">
          <button className="btn btn--primary" onClick={() => addWallets()}>
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M7.00008 1.16675V12.8334M1.16675 7.00008H12.8334" stroke="currentColor" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Add
          </button>
          <button className="btn" onClick={() => setModal('ImportWalletModal')}>
            <svg width="18" height="16" viewBox="0 0 20 18" fill="none">
              <path d="M6.66699 13.1667L10.0003 16.5M10.0003 16.5L13.3337 13.1667M10.0003 16.5V9M16.667 12.9524C17.6849 12.1117 18.3337 10.8399 18.3337 9.41667C18.3337 6.88536 16.2816 4.83333 13.7503 4.83333C13.5682 4.83333 13.3979 4.73833 13.3054 4.58145C12.2187 2.73736 10.2124 1.5 7.91699 1.5C4.46521 1.5 1.66699 4.29822 1.66699 7.75C1.66699 9.47175 2.3632 11.0309 3.48945 12.1613" stroke="currentColor" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Import
          </button>
          <button className="btn" onClick={() => getWallets()}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <path d="M22 10C22 10 19.995 7.26822 18.3662 5.63824C16.7373 4.00827 14.4864 3 12 3C7.02944 3 3 7.02944 3 12C3 16.9706 7.02944 21 12 21C16.1031 21 19.5649 18.2543 20.6482 14.5M22 10V4M22 10H16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Refresh
          </button>
        </div>
      </div>

      <table className="table-grid" cellSpacing={0}>
        <thead>
          <tr>
            <th>Description</th>
            <th>Address</th>
            <th>Created on</th>
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
