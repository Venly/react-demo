import { useSetAtom } from 'jotai'
import Skeleton from 'react-loading-skeleton'
import { Wallet } from '@venly/connect'
import { chains } from '../libs/chains'
import { copyAddress } from '../libs/utils'
import { modalAtom } from '../libs/atoms'
import DropdownBtn from './DropdownBtn'

export default function WalletInfo({
  wallet, refresh
}: {
  wallet: Wallet|null
  refresh: () => void
}) {
  const setModal = useSetAtom(modalAtom)

  return <>
    <div className="wallet-info">
      {!wallet ?
        <LoadingWallet />
        :
        <>
          <div className="wallet-header">
            <img className="wallet-header__img" src={`/chains/${wallet.secretType.toLowerCase()}.svg`} alt={wallet.secretType} />
            <div className="wallet-header__block">
              <p className="wallet-header__title">{wallet.description}</p>
              <p className="wallet-header__subtitle">{chains[wallet.secretType]?.name}</p>
            </div>
          </div>

          <div className="wallet-info__grid">
            <div className="wallet-info__block">
              <p className="wallet-info__label">Address</p>
              <button type="button" className="wallet-info__address" onClick={() => copyAddress(wallet.address)}>
                <span className="wallet-info__text">{wallet.address}</span>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
                  <path d="M5 15C4.06812 15 3.60218 15 3.23463 14.8478C2.74458 14.6448 2.35523 14.2554 2.15224 13.7654C2 13.3978 2 12.9319 2 12V5.2C2 4.0799 2 3.51984 2.21799 3.09202C2.40973 2.71569 2.71569 2.40973 3.09202 2.21799C3.51984 2 4.0799 2 5.2 2H12C12.9319 2 13.3978 2 13.7654 2.15224C14.2554 2.35523 14.6448 2.74458 14.8478 3.23463C15 3.60218 15 4.06812 15 5M12.2 22H18.8C19.9201 22 20.4802 22 20.908 21.782C21.2843 21.5903 21.5903 21.2843 21.782 20.908C22 20.4802 22 19.9201 22 18.8V12.2C22 11.0799 22 10.5198 21.782 10.092C21.5903 9.71569 21.2843 9.40973 20.908 9.21799C20.4802 9 19.9201 9 18.8 9H12.2C11.0799 9 10.5198 9 10.092 9.21799C9.71569 9.40973 9.40973 9.71569 9.21799 10.092C9 10.5198 9 11.0799 9 12.2V18.8C9 19.9201 9 20.4802 9.21799 20.908C9.40973 21.2843 9.71569 21.5903 10.092 21.782C10.5198 22 11.0799 22 12.2 22Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
            </div>
            <div className="wallet-info__block">
              <p className="wallet-info__label">Created on</p>
              <p className="wallet-info__text">{new Date(wallet.createdAt ?? '').toLocaleDateString('en-us', { year: 'numeric', month: 'short', day: 'numeric' })}</p>
            </div>
            <div className="wallet-info__block">
              <p className="wallet-info__label">Balance</p>
              <p className="wallet-info__text">{wallet.balance?.balance?.toFixed(6)} {wallet.balance?.symbol}</p>
            </div>
          </div>
        </>
      }

      <div className="wallet-info__actions">
        <button className="btn btn--primary" onClick={() => setModal('SendTransactionModal')}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
            <path d="M20 17H4M4 17L8 13M4 17L8 21M4 7H20M20 7L16 3M20 7L16 11" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          Send transaction
        </button>
        <button className="btn" onClick={() => refresh()}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <path d="M22 10C22 10 19.995 7.26822 18.3662 5.63824C16.7373 4.00827 14.4864 3 12 3C7.02944 3 3 7.02944 3 12C3 16.9706 7.02944 21 12 21C16.1031 21 19.5649 18.2543 20.6482 14.5M22 10V4M22 10H16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Refresh
        </button>
        <DropdownBtn className="btn btn--icon">
          <div className="dropdown-menu__item" onClick={() => setModal('SignMessageModal')}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path d="M7 8.5H12M7 12H15M7 18V20.3355C7 20.8684 7 21.1348 7.10923 21.2716C7.20422 21.3906 7.34827 21.4599 7.50054 21.4597C7.67563 21.4595 7.88367 21.2931 8.29976 20.9602L10.6852 19.0518C11.1725 18.662 11.4162 18.4671 11.6875 18.3285C11.9282 18.2055 12.1844 18.1156 12.4492 18.0613C12.7477 18 13.0597 18 13.6837 18H16.2C17.8802 18 18.7202 18 19.362 17.673C19.9265 17.3854 20.3854 16.9265 20.673 16.362C21 15.7202 21 14.8802 21 13.2V7.8C21 6.11984 21 5.27976 20.673 4.63803C20.3854 4.07354 19.9265 3.6146 19.362 3.32698C18.7202 3 17.8802 3 16.2 3H7.8C6.11984 3 5.27976 3 4.63803 3.32698C4.07354 3.6146 3.6146 4.07354 3.32698 4.63803C3 5.27976 3 6.11984 3 7.8V14C3 14.93 3 15.395 3.10222 15.7765C3.37962 16.8117 4.18827 17.6204 5.22354 17.8978C5.60504 18 6.07003 18 7 18Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Sign message
          </div>
          {wallet?.secretType != 'SOLANA' &&
            <div className="dropdown-menu__item" onClick={() => setModal('SignEip712Modal')}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <path d="M18.5708 20C19.8328 20 20.8568 18.977 20.8568 17.714V13.143L21.9998 12L20.8568 10.857V6.286C20.8568 5.023 19.8338 4 18.5708 4M5.429 4C4.166 4 3.143 5.023 3.143 6.286V10.857L2 12L3.143 13.143V17.714C3.143 18.977 4.166 20 5.429 20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              Sign EIP712
            </div>
          }
          <div className="dropdown-menu__item" onClick={() => setModal('ExecuteContractModal')}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path d="M14 2.26953V6.40007C14 6.96012 14 7.24015 14.109 7.45406C14.2049 7.64222 14.3578 7.7952 14.546 7.89108C14.7599 8.00007 15.0399 8.00007 15.6 8.00007H19.7305M14 17.5L16.5 15L14 12.5M10 12.5L7.5 15L10 17.5M20 9.98822V17.2C20 18.8802 20 19.7202 19.673 20.362C19.3854 20.9265 18.9265 21.3854 18.362 21.673C17.7202 22 16.8802 22 15.2 22H8.8C7.11984 22 6.27976 22 5.63803 21.673C5.07354 21.3854 4.6146 20.9265 4.32698 20.362C4 19.7202 4 18.8802 4 17.2V6.8C4 5.11984 4 4.27976 4.32698 3.63803C4.6146 3.07354 5.07354 2.6146 5.63803 2.32698C6.27976 2 7.11984 2 8.8 2H12.0118C12.7455 2 13.1124 2 13.4577 2.08289C13.7638 2.15638 14.0564 2.27759 14.3249 2.44208C14.6276 2.6276 14.887 2.88703 15.4059 3.40589L18.5941 6.59411C19.113 7.11297 19.3724 7.3724 19.5579 7.67515C19.7224 7.94356 19.8436 8.2362 19.9171 8.5423C20 8.88757 20 9.25445 20 9.98822Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Execute contract
          </div>
        </DropdownBtn>
      </div>
    </div>
  </>
}

function LoadingWallet() {
  return <>
    <div className="wallet-header">
      <Skeleton width={56} height={54} circle />
      <div className="wallet-header__block">
        <p className="wallet-header__title"><Skeleton width={100} height={18} /></p>
        <p className="wallet-header__subtitle"><Skeleton width={70} height={14} /></p>
      </div>
    </div>

    <div className="wallet-info__grid">
      <div className="wallet-info__block">
        <p className="wallet-info__label">Address</p>
        <div className="wallet-info__address">
          <span className="wallet-info__text"><Skeleton width={350} height={14} /></span>
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
            <path d="M5 15C4.06812 15 3.60218 15 3.23463 14.8478C2.74458 14.6448 2.35523 14.2554 2.15224 13.7654C2 13.3978 2 12.9319 2 12V5.2C2 4.0799 2 3.51984 2.21799 3.09202C2.40973 2.71569 2.71569 2.40973 3.09202 2.21799C3.51984 2 4.0799 2 5.2 2H12C12.9319 2 13.3978 2 13.7654 2.15224C14.2554 2.35523 14.6448 2.74458 14.8478 3.23463C15 3.60218 15 4.06812 15 5M12.2 22H18.8C19.9201 22 20.4802 22 20.908 21.782C21.2843 21.5903 21.5903 21.2843 21.782 20.908C22 20.4802 22 19.9201 22 18.8V12.2C22 11.0799 22 10.5198 21.782 10.092C21.5903 9.71569 21.2843 9.40973 20.908 9.21799C20.4802 9 19.9201 9 18.8 9H12.2C11.0799 9 10.5198 9 10.092 9.21799C9.71569 9.40973 9.40973 9.71569 9.21799 10.092C9 10.5198 9 11.0799 9 12.2V18.8C9 19.9201 9 20.4802 9.21799 20.908C9.40973 21.2843 9.71569 21.5903 10.092 21.782C10.5198 22 11.0799 22 12.2 22Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
      </div>
      <div className="wallet-info__block">
        <p className="wallet-info__label">Created on</p>
        <p className="wallet-info__text"><Skeleton width={80} height={14} /></p>
      </div>
      <div className="wallet-info__block">
        <p className="wallet-info__label">Balance</p>
        <p className="wallet-info__text"><Skeleton width={100} height={14} /></p>
      </div>
    </div>
  </>
}
