'use client'

import Image from 'next/image'
import { Order, statusLabels, statusColors, serviceLabels, paymentLabels } from '@/lib/types'
import { formatDate, formatCurrency, formatPhoneNumber } from '@/lib/utils'
import { Phone } from 'lucide-react'
import Link from 'next/link'

interface OrderCardProps {
  order: Order
}

export function OrderCard({ order }: OrderCardProps) {
  const statusColor = statusColors[order.status]

  return (
    <div className="card hover:shadow-warm transition-shadow duration-300">
      {/* Images Section */}
      <div className="grid grid-cols-2 gap-3 mb-4">
        {order.image_before_url && (
          <div className="relative h-32 bg-cream-100 rounded-lg overflow-hidden">
            <Image
              src={order.image_before_url}
              alt="Before"
              fill
              className="object-cover"
            />
            <div className="absolute bottom-2 left-2 bg-black/70 text-white px-2 py-1 rounded text-xs font-medium">
              Before
            </div>
          </div>
        )}
        {order.image_after_url && (
          <div className="relative h-32 bg-cream-100 rounded-lg overflow-hidden">
            <Image
              src={order.image_after_url}
              alt="After"
              fill
              className="object-cover"
            />
            <div className="absolute bottom-2 left-2 bg-black/70 text-white px-2 py-1 rounded text-xs font-medium">
              After
            </div>
          </div>
        )}
        {!order.image_before_url && (
          <div className="h-32 bg-cream-100 rounded-lg flex items-center justify-center text-sneaker-dark/40">
            <span className="text-sm">No image</span>
          </div>
        )}
        {!order.image_after_url && (
          <div className="h-32 bg-cream-100 rounded-lg flex items-center justify-center text-sneaker-dark/40">
            <span className="text-sm">Pending</span>
          </div>
        )}
      </div>

      {/* Status Badge */}
      <div className="mb-3">
        <span className={`badge-status ${statusColor}`}>
          {statusLabels[order.status]}
        </span>
      </div>

      {/* Customer Info */}
      <div className="space-y-2 mb-4 pb-4 border-b border-sneaker-dark/5">
        <h3 className="font-bold text-sneaker-dark text-lg">{order.customer_name}</h3>
        <div className="flex items-center gap-2 text-sm text-sneaker-dark/70">
          <Phone className="w-4 h-4 text-black" />
          {formatPhoneNumber(order.customer_phone)}
        </div>
      </div>

      {/* Order Details */}
      <div className="space-y-3 mb-4 text-sm">
        <div className="flex justify-between items-start">
          <span className="text-sneaker-dark/60">Service:</span>
          <span className="font-medium text-sneaker-dark">{serviceLabels[order.service_availed]}</span>
        </div>
        <div className="flex justify-between items-start">
          <span className="text-sneaker-dark/60">Payment:</span>
          <span className="font-medium text-sneaker-dark">{paymentLabels[order.payment_mode]}</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-sneaker-dark/60">Price:</span>
          <span className="text-lg font-bold text-black">{formatCurrency(order.total_price)}</span>
        </div>
        <div className="flex justify-between items-start text-xs text-sneaker-dark/50">
          <span>Availed: {formatDate(order.date_availed)}</span>
        </div>
        {order.date_claimed && (
          <div className="flex justify-between items-start text-xs text-sneaker-dark/50">
            <span>Claimed: {formatDate(order.date_claimed)}</span>
          </div>
        )}
      </div>

      {/* Action Link */}
      <Link href={`/orders/${order.id}`}>
        <button className="w-full btn-primary text-sm">
          View Details
        </button>
      </Link>
    </div>
  )
}
