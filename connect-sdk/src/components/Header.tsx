import Skeleton from 'react-loading-skeleton'
import { useProfile } from '../hooks/useProfile'

export default function Header() {
  const { profile } = useProfile()

  return (
    <div className="header">
      <div className="header__block">
        <p className="header__title">Welcome back, {profile?.firstName ?? <Skeleton width={80} height={30} />}</p>
      </div>
    </div>
  )
}
