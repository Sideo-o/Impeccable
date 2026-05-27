'use client'

import { Search, Filter } from 'lucide-react'
import { OrderStatus, statusLabels } from '@/lib/types'
import { useState } from 'react'

interface OrderFilterProps {
  onSearchChange: (value: string) => void
  onStatusChange: (status: OrderStatus | 'all') => void
  activeStatus: OrderStatus | 'all'
}

export function OrderFilter({
  onSearchChange,
  onStatusChange,
  activeStatus,
}: OrderFilterProps) {
  const [searchTerm, setSearchTerm] = useState('')

  const statuses: (OrderStatus | 'all')[] = ['all', 'pending', 'in-progress', 'ready-for-pickup', 'claimed']

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setSearchTerm(value)
    onSearchChange(value)
  }

  return (
    <div className="bg-white rounded-xl p-6 shadow-soft border border-sneaker-dark/5 mb-6">
      <div className="space-y-4">
        {/* Search Bar */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-sneaker-dark/40 pointer-events-none" />
          <input
            type="text"
            placeholder="Search by customer name or phone..."
            className="input-field pl-10"
            value={searchTerm}
            onChange={handleSearchChange}
          />
        </div>

        {/* Status Filter */}
        <div>
          <div className="flex items-center gap-2 mb-3">
            <Filter className="w-4 h-4 text-sneaker-dark/60" />
            <label className="text-sm font-semibold text-sneaker-dark">Filter by Status</label>
          </div>
          <div className="flex flex-wrap gap-2">
            {statuses.map((status) => (
              <button
                key={status}
                onClick={() => onStatusChange(status)}
                className={`px-4 py-2 rounded-lg font-medium transition-all text-sm ${
                  activeStatus === status
                    ? 'bg-black text-white shadow-soft'
                    : 'bg-gray-100 text-sneaker-dark hover:bg-gray-200'
                }`}
              >
                {status === 'all' ? 'All Orders' : statusLabels[status as OrderStatus]}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
