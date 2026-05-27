// Utility functions for the application

/**
 * Format date to readable string
 */
export function formatDate(date: string | Date): string {
  const dateObj = typeof date === 'string' ? new Date(date) : date
  if (isNaN(dateObj.getTime())) return 'Invalid date'
  
  return dateObj.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })
}

/**
 * Format date to short format (MM/DD/YYYY)
 */
export function formatDateShort(date: string | Date): string {
  const dateObj = typeof date === 'string' ? new Date(date) : date
  if (isNaN(dateObj.getTime())) return 'Invalid date'
  
  return dateObj.toLocaleDateString('en-US', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  })
}

/**
 * Format currency to PHP pesos
 */
export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-PH', {
    style: 'currency',
    currency: 'PHP',
    currencyDisplay: 'symbol',
  }).format(amount)
}

/**
 * Format phone number
 */
export function formatPhoneNumber(phone: string): string {
  // Remove non-digits
  const digitsOnly = phone.replace(/\D/g, '')
  
  // Format as (XXX) X-XXXX-XXXX or XXX-XXXX-XXXX
  if (digitsOnly.length === 10) {
    return `(${digitsOnly.slice(0, 3)}) ${digitsOnly.slice(3, 6)}-${digitsOnly.slice(6)}`
  } else if (digitsOnly.length === 11 && digitsOnly.startsWith('0')) {
    // Philippine format
    return `0${digitsOnly.slice(1, 4)}-${digitsOnly.slice(4, 7)}-${digitsOnly.slice(7)}`
  }
  
  return phone
}

/**
 * Calculate days since date
 */
export function daysSince(date: string | Date): number {
  const dateObj = typeof date === 'string' ? new Date(date) : date
  const today = new Date()
  const diffTime = Math.abs(today.getTime() - dateObj.getTime())
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
  return diffDays
}

/**
 * Generate unique filename for file uploads
 */
export function generateUploadFilename(prefix: string, extension: string): string {
  const timestamp = Date.now()
  const random = Math.random().toString(36).substring(2, 8)
  return `${prefix}-${timestamp}-${random}.${extension}`
}

/**
 * Get file extension from file
 */
export function getFileExtension(file: File): string {
  return file.name.split('.').pop()?.toLowerCase() || 'bin'
}

/**
 * Validate image file
 */
export function isValidImageFile(file: File): boolean {
  const validTypes = ['image/jpeg', 'image/png', 'image/webp']
  const maxSize = 5 * 1024 * 1024 // 5MB
  
  return validTypes.includes(file.type) && file.size <= maxSize
}

/**
 * Validate PDF file for receipts
 */
export function isValidPdfFile(file: File): boolean {
  const maxSize = 5 * 1024 * 1024 // 5MB
  return file.type === 'application/pdf' && file.size <= maxSize
}

/**
 * Calculate daily/monthly revenue from orders
 */
export function calculateRevenue(orders: any[], period: 'daily' | 'monthly' = 'daily'): number {
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  
  return orders.reduce((total, order) => {
    const orderDate = new Date(order.date_availed)
    orderDate.setHours(0, 0, 0, 0)
    
    let isInPeriod = false
    
    if (period === 'daily') {
      isInPeriod = orderDate.getTime() === today.getTime()
    } else if (period === 'monthly') {
      isInPeriod =
        orderDate.getMonth() === today.getMonth() &&
        orderDate.getFullYear() === today.getFullYear()
    }
    
    return isInPeriod ? total + (order.total_price || 0) : total
  }, 0)
}
