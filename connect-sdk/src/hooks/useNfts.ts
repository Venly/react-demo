import { useEffect, useState } from 'react'
import { NFT } from '@venly/connect'
import { venlyConnect } from '../libs/venlyConnect'

export function useNfts(walletId: string) {
  const [nfts, setNfts] = useState<NFT[]|null>(null)
  const [isLoading, setIsLoading] = useState(false)
  
  useEffect(() => {
    getNfts()
  }, [])
  
  async function getNfts() {
    if (isLoading) return
    setIsLoading(true)
    try {
      const res = await venlyConnect.api.getNonfungibles(walletId)
      setNfts(res)
    }
    catch (error) {
      console.error(error)
      setNfts([])
    }
    setIsLoading(false)
  }

  return { 
    nfts,
    isLoading,
    getNfts,
  }
}
