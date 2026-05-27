'use client'

import { useEffect, useState } from 'react'
import { Header } from '@/components/Header'
import { OrderCard } from '@/components/OrderCard'
import { OrderFilter } from '@/components/OrderFilter'
import { Order, OrderStatus } from '@/lib/types'
import { ShoppingCart } from 'lucide-react'
import Link from 'next/link'

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([])
  const [filteredOrders, setFilteredOrders] = useState<Order[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [activeStatus, setActiveStatus] = useState<OrderStatus | 'all'>('all')

  useEffect(() => {
    fetchOrders()
  }, [])

  useEffect(() => {
    applyFilters()
  }, [orders, searchTerm, activeStatus])

  const fetchOrders = async () => {
    try {
      setLoading(true)
      const response = await fetch('/api/orders')
      const result = await response.json()
      setOrders(result.data || [])
    } catch (error) {
      console.error('Failed to fetch orders:', error)
    } finally {
      setLoading(false)
    }
  }

  const applyFilters = () => {
    let filtered = [...orders]

    // Filter by status
    if (activeStatus !== 'all') {
      filtered = filtered.filter(order => order.status === activeStatus)
    }

    // Filter by search term
    if (searchTerm) {
      const search = searchTerm.toLowerCase()
      filtered = filtered.filter(order =>
        order.customer_name.toLowerCase().includes(search) ||
        order.customer_phone.includes(searchTerm)
      )
    }

    setFilteredOrders(filtered)
  }

  const handleSearchChange = (value: string) => {
    setSearchTerm(value)
  }

  const handleStatusChange = (status: OrderStatus | 'all') => {
    setActiveStatus(status)
  }

  return (
    <>
      <Header />
      <main className="min-h-screen bg-white pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Header Section */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="heading-lg mb-2">Order Management</h1>
              <p className="text-sneaker-dark/60">
                Manage all shoe cleaning orders in one place
              </p>
            </div>
            <Link href="/orders/new">
              <button className="btn-primary">+ New Order</button>
            </Link>
          </div>

          {/* Filter Component */}
          <OrderFilter
            onSearchChange={handleSearchChange}
            onStatusChange={handleStatusChange}
            activeStatus={activeStatus}
          />

          {/* Results Count */}
          <div className="mb-4 text-sm text-sneaker-dark/60">
            Showing {filteredOrders.length} of {orders.length} orders
          </div>

          {/* Orders Grid */}
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3, 4, 5, 6].map(i => (
                <div key={i} className="card h-96 bg-gradient-to-r from-cream-100 to-cream-200 animate-pulse" />
              ))}
            </div>
          ) : filteredOrders.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredOrders.map(order => (
                <OrderCard key={order.id} order={order} />
              ))}
            </div>
          ) : (
            <div className="card text-center py-16">
              <ShoppingCart className="w-16 h-16 text-sneaker-dark/20 mx-auto mb-4" />
              <h3 className="heading-sm mb-2">No orders found</h3>
              {searchTerm ? (
                <>
                  <p className="text-sneaker-dark/60 mb-6">
                    No orders match your search criteria. Try adjusting your filters.
                  </p>
                  <button
                    onClick={() => {
                      setSearchTerm('')
                      setActiveStatus('all')
                    }}
                    className="btn-secondary"
                  >
                    Clear Filters
                  </button>
                </>
              ) : (
                <>
                  <p className="text-sneaker-dark/60 mb-6">
                    Start by creating your first shoe cleaning order.
                  </p>
                  <Link href="/orders/new">
                    <button className="btn-primary">Create Order</button>
                  </Link>
                </>
              )}
            </div>
          )}
        </div>
      </main>
    </>
  )
}
