import toast from 'react-hot-toast'

export function formatAddress(address: string, length: number = 10) {
  return `${address.slice(0, length)}...${address.slice(-length)}`
}

export function copyAddress(address: string = '') {
  navigator.clipboard.writeText(address)
  toast('Address copied to clipboard', { 
    id: 'clipboard',
    duration: 3000,
  })
}
