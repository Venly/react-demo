import { useEffect } from 'react'
import { useAtom } from 'jotai'
import { venlyConnect } from '../libs/venlyConnect'
import { walletsAtom, walletsLoadingAtom } from '../libs/atoms'
import { useAlerts } from './useAlerts'

export function useWallets(fetch?: boolean) {
  const { showAlert } = useAlerts()
  const [wallets, setWallets] = useAtom(walletsAtom)
  const [isLoading, setIsLoading] = useAtom(walletsLoadingAtom)
  
  useEffect(() => {
    if (fetch) 
      getWallets()
  }, [])

  async function getWallets() {
    if (isLoading) return
    setIsLoading(true)
    try {
      const res = await venlyConnect.api.getWallets()
      res.sort((a, b) => a.secretType.localeCompare(b.secretType))
      setWallets(res)
    }
    catch (error) {
      showAlert('Failed to fetch wallets', error)
    }
    setIsLoading(false)
  }

  return { 
    wallets,
    setWallets,
    isLoading,
    getWallets,
  }
}
