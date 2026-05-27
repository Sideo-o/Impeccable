// Order type definitions
export type OrderStatus = 'pending' | 'in-progress' | 'ready-for-pickup' | 'claimed'
export type ServiceType = 'deep-clean' | 'sole-whitening' | 'repaint' | 'leather-conditioning'
export type PaymentMode = 'cash' | 'bank-transfer' | 'e-wallet'

export interface Order {
  id: string
  customer_name: string
  customer_phone: string
  service_availed: ServiceType
  status: OrderStatus
  image_before_url: string | null
  image_after_url: string | null
  date_availed: string // ISO timestamp
  date_claimed: string | null // ISO timestamp
  payment_mode: PaymentMode
  payment_receipt_url: string | null
  total_price: number
  created_at: string
  updated_at: string
}

export type CreateOrderInput = Omit<Order, 'id' | 'created_at' | 'updated_at'>
export type UpdateOrderInput = Partial<Omit<Order, 'id' | 'created_at' | 'updated_at'>>

// Helper functions for status and service labels
export const statusLabels: Record<OrderStatus, string> = {
  'pending': 'Pending',
  'in-progress': 'In Progress',
  'ready-for-pickup': 'Ready for Pickup',
  'claimed': 'Claimed',
}

export const serviceLabels: Record<ServiceType, string> = {
  'deep-clean': 'Deep Clean',
  'sole-whitening': 'Sole Whitening',
  'repaint': 'Repaint',
  'leather-conditioning': 'Leather Conditioning',
}

export const paymentLabels: Record<PaymentMode, string> = {
  'cash': 'Cash',
  'bank-transfer': 'Bank Transfer',
  'e-wallet': 'E-Wallet',
}

// Status colors for UI
export const statusColors: Record<OrderStatus, string> = {
  'pending': 'status-pending',
  'in-progress': 'status-in-progress',
  'ready-for-pickup': 'status-ready',
  'claimed': 'status-claimed',
}
