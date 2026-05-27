'use client'

import { ReactNode } from 'react'

interface StatCardProps {
  title: string
  value: string | number
  subtitle?: string
  icon?: ReactNode
  variant?: 'default' | 'accent' | 'success'
}

export function StatCard({
  title,
  value,
  subtitle,
  icon,
  variant = 'default',
}: StatCardProps) {
  const variantStyles = {
    default: 'bg-white border-sneaker-dark/5',
    accent: 'bg-gradient-to-br from-orange-50 to-cream-100 border-sneaker-orange/20',
    success: 'bg-gradient-to-br from-green-50 to-emerald-50 border-green-200',
  }

  return (
    <div className={`card border ${variantStyles[variant]}`}>
      <div className="flex items-start justify-between mb-2">
        <div>
          <p className="text-sneaker-dark/60 text-sm font-medium">{title}</p>
          <p className="text-3xl font-bold text-sneaker-dark mt-1">{value}</p>
          {subtitle && <p className="text-xs text-sneaker-dark/50 mt-1">{subtitle}</p>}
        </div>
        {icon && <div className="text-sneaker-orange">{icon}</div>}
      </div>
    </div>
  )
}
