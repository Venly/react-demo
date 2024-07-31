import { useEffect } from 'react'
import { useAtom } from 'jotai'
import { venlyConnect } from '../libs/venlyConnect'
import { profileAtom, profileLoadingAtom } from '../libs/atoms'
import { useAlerts } from './useAlerts'

export function useProfile(fetch?: boolean) {
  const { showAlert } = useAlerts()
  const [profile, setProfile] = useAtom(profileAtom)
  const [isLoading, setIsLoading] = useAtom(profileLoadingAtom)
  
  useEffect(() => {
    if (fetch)
      getProfile()
  }, [])
  
  async function getProfile() {
    if (isLoading) return
    setIsLoading(true)
    try {
      const profile = await venlyConnect.api.getProfile()
      setProfile(profile)
    }
    catch (error) {
      showAlert('Failed to fetch profile', error)
    }
    setIsLoading(false)
  }

  return { 
    profile,
    setProfile,
    isLoading,
    getProfile,
  }
}
