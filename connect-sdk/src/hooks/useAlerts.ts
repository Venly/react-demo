import { useAtom } from 'jotai'
import { alertsAtom } from '../libs/atoms'

export function useAlerts() {
  const [alerts, setAlerts] = useAtom(alertsAtom)
  
  function showAlert(title: string, body: any) {
    setAlerts([...alerts, { title, body }])
  }

  return { 
    alerts,
    setAlerts,
    showAlert,
  }
}
