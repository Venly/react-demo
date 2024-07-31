import { useAlerts } from '../hooks/useAlerts'

export default function Alerts() {
  const { alerts, setAlerts } = useAlerts()

  function dismissAlert(index: number) {
    const alertsCopy = [...alerts]
    alertsCopy.splice(index, 1)
    setAlerts(alertsCopy)
  }

  return (
    <div className="alert-container">
      {alerts.map((alert, index) => {
        return (
          <div className="alert" key={index}>
            <button className="btn btn--close" onClick={() => dismissAlert(index)}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
            {alert.body.status == 'SUCCESS' ?
              <div className="alert__icon">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <path d="M7.5 12L10.5 15L16.5 9M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              :
              <div className="alert__icon alert__icon--error">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <path d="M12 8V12M12 16H12.01M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
            }
            <h3 className="alert__title">{alert.title}</h3>
            <p className="alert__text">{JSON.stringify(alert.body, null, 4)}</p>
            <div className="alert__footer">
              <button className="btn btn--borderless" onClick={() => dismissAlert(index)}>Dismiss</button>
            </div>
          </div>
        )
      })}
    </div>
  )
}
