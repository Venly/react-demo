import { VenlyConnect } from '@venly/connect'

export const venlyConnect = new VenlyConnect(import.meta.env.VITE_CLIENT_ID, { environment: import.meta.env.VITE_ENV })
