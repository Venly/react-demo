import { useEffect, useState } from 'react'
import { TokenBalance } from '@venly/connect'
import { venlyConnect } from '../libs/venlyConnect'

export function useTokens(walletId: string) {
  const [tokens, setTokens] = useState<TokenBalance[]|null>(null)
  const [isLoading, setIsLoading] = useState(false)
  
  useEffect(() => {
    getTokens()
  }, [])
  
  async function getTokens() {
    if (isLoading) return
    setIsLoading(true)
    try {
      const res = await venlyConnect.api.getTokenBalances(walletId)
      setTokens(res)
    }
    catch (error) {
      console.error(error)
      setTokens([])
    }
    setIsLoading(false)
  }

  return { 
    tokens,
    isLoading,
    getTokens,
  }
}
