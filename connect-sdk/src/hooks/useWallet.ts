import { useEffect, useState } from 'react'
import {  useSetAtom } from 'jotai'
import { Wallet } from '@venly/connect'
import { venlyConnect } from '../libs/venlyConnect'
import { useAlerts } from './useAlerts'
import { selectedWalletAtom } from '../libs/atoms'

export function useWallet(id: string) {
  const { showAlert } = useAlerts()
  const [wallet, setWallet] = useState<Wallet|null>(null)
  const setSelectedWallet = useSetAtom(selectedWalletAtom)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    getWallet()
  }, [])

  async function getWallet() {
    if (isLoading) return
    setIsLoading(true)
    try {
      const res = await venlyConnect.api.getWallet(id)
      setWallet(res)
      setSelectedWallet(res)
    }
    catch (error) {
      showAlert('Failed to fetch wallet', error)
    }
    setIsLoading(false)
  }

  return { 
    wallet,
    setWallet,
    isLoading,
    getWallet,
  }
}
