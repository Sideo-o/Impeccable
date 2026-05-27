'use client'

import { useEffect, useState } from 'react'
import { Header } from '@/components/Header'
import { StatCard } from '@/components/StatCard'
import { OrderCard } from '@/components/OrderCard'
import { Order } from '@/lib/types'
import { formatCurrency, calculateRevenue } from '@/lib/utils'
import { ShoppingCart, TrendingUp, CheckCircle2, AlertCircle } from 'lucide-react'
import Link from 'next/link'

export default function Dashboard() {
  const [orders, setOrders] = useState<Order[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchOrders()
  }, [])

  const fetchOrders = async () => {
    try {
      const response = await fetch('/api/orders')
      const result = await response.json()
      setOrders(result.data || [])
    } catch (error) {
      console.error('Failed to fetch orders:', error)
    } finally {
      setLoading(false)
    }
  }

  // Calculate statistics
  const totalOrders = orders.length
  const pendingOrders = orders.filter(o => o.status === 'pending').length
  const completedOrders = orders.filter(o => o.status === 'claimed').length
  const dailyRevenue = calculateRevenue(orders, 'daily')
  const monthlyRevenue = calculateRevenue(orders, 'monthly')

  // Get recent orders
  const recentOrders = orders.slice(0, 3)

  return (
    <>
      <Header />
      <main className="min-h-screen bg-white pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Welcome Section */}
          <div className="mb-8">
            <h1 className="heading-lg mb-2">Welcome Back! 👟</h1>
            <p className="text-sneaker-dark/60">
              Track and manage your premium shoe cleaning orders efficiently.
            </p>
          </div>

          {/* Stats Grid */}
          <div className="grid-cols-responsive mb-8">
            <StatCard
              title="Total Orders"
              value={totalOrders}
              subtitle="All time"
              icon={<ShoppingCart className="w-6 h-6" />}
              variant="accent"
            />
            <StatCard
              title="Daily Revenue"
              value={formatCurrency(dailyRevenue)}
              subtitle="Today"
              icon={<TrendingUp className="w-6 h-6" />}
              variant="success"
            />
            <StatCard
              title="Monthly Revenue"
              value={formatCurrency(monthlyRevenue)}
              subtitle="This month"
              icon={<CheckCircle2 className="w-6 h-6" />}
              variant="default"
            />
          </div>

          {/* Status Overview */}
          <div className="grid-cols-responsive mb-8">
            <StatCard
              title="Pending Orders"
              value={pendingOrders}
              subtitle="Awaiting processing"
              icon={<AlertCircle className="w-6 h-6" />}
            />
            <StatCard
              title="Completed"
              value={completedOrders}
              subtitle="Successfully claimed"
              icon={<CheckCircle2 className="w-6 h-6" />}
            />
            <div className="card">
              <Link href="/orders/new" className="block h-full">
                <button className="btn-primary w-full h-full flex items-center justify-center text-lg font-semibold">
                  + New Order
                </button>
              </Link>
            </div>
          </div>

          {/* Recent Orders */}
          <section className="mb-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="heading-md">Recent Orders</h2>
              <Link href="/orders">
                <button className="text-black hover:text-gray-600 font-medium transition">
                  View All →
                </button>
              </Link>
            </div>

            {loading ? (
              <div className="grid-cols-responsive">
                {[1, 2, 3].map(i => (
                  <div key={i} className="card h-96 bg-gradient-to-r from-cream-100 to-cream-200 animate-pulse" />
                ))}
              </div>
            ) : recentOrders.length > 0 ? (
              <div className="grid-cols-responsive">
                {recentOrders.map(order => (
                  <OrderCard key={order.id} order={order} />
                ))}
              </div>
            ) : (
              <div className="card text-center py-12">
                <ShoppingCart className="w-12 h-12 text-sneaker-dark/20 mx-auto mb-4" />
                <p className="text-sneaker-dark/60 mb-4">No orders yet</p>
                <Link href="/orders/new">
                  <button className="btn-primary">Create Your First Order</button>
                </Link>
              </div>
            )}
          </section>

          {/* Quick Stats Table */}
          {orders.length > 0 && (
            <section>
              <h2 className="heading-md mb-6">Order Summary by Status</h2>
              <div className="card overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-sneaker-dark/10">
                      <th className="text-left py-3 px-4 font-semibold text-sneaker-dark">Status</th>
                      <th className="text-right py-3 px-4 font-semibold text-sneaker-dark">Count</th>
                      <th className="text-right py-3 px-4 font-semibold text-sneaker-dark">Percentage</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      { status: 'Pending', count: pendingOrders },
                      { status: 'In Progress', count: orders.filter(o => o.status === 'in-progress').length },
                      { status: 'Ready for Pickup', count: orders.filter(o => o.status === 'ready-for-pickup').length },
                      { status: 'Claimed', count: completedOrders },
                    ].map(({ status, count }) => (
                      <tr key={status} className="border-b border-sneaker-dark/5">
                        <td className="py-3 px-4 text-sneaker-dark">{status}</td>
                        <td className="text-right py-3 px-4 font-semibold text-sneaker-dark">{count}</td>
                        <td className="text-right py-3 px-4 text-sneaker-dark/60">
                          {((count / totalOrders) * 100).toFixed(1)}%
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>
          )}
        </div>
      </main>
    </>
  )
}
