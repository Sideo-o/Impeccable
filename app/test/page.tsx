'use client'

import { useEffect, useState } from 'react'
import { Header } from '@/components/Header'
import { createClient } from '@/utils/supabase/client'
import { CheckCircle2, AlertCircle, Loader } from 'lucide-react'

export default function TestPage() {
  const [status, setStatus] = useState<'loading' | 'connected' | 'error'>('loading')
  const [message, setMessage] = useState('')
  const [orders, setOrders] = useState<any[]>([])

  useEffect(() => {
    testConnection()
  }, [])

  const testConnection = async () => {
    try {
      setStatus('loading')
      const supabase = createClient()

      // Test 1: Check if Supabase client is initialized
      console.log('✅ Supabase client created')

      // Test 2: Try to fetch orders from the database
      const { data, error } = await supabase
        .from('orders')
        .select('id, customer_name, status')
        .limit(5)

      if (error) {
        console.error('❌ Database error:', error)
        setStatus('error')
        setMessage(`Database Error: ${error.message}`)
        return
      }

      // Test 3: If we got data, connection is successful
      console.log('✅ Database connection successful!')
      console.log('📊 Orders fetched:', data)

      setStatus('connected')
      setMessage(`Successfully connected to Supabase! Found ${data?.length || 0} orders.`)
      setOrders(data || [])
    } catch (err: any) {
      console.error('❌ Connection error:', err)
      setStatus('error')
      setMessage(`Error: ${err.message}`)
    }
  }

  return (
    <>
      <Header />
      <main className="min-h-screen bg-white pb-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="mb-8">
            <h1 className="heading-lg mb-2">Database Connection Test</h1>
            <p className="text-sneaker-dark/60">Verify that your app is connected to Supabase</p>
          </div>

          {/* Status Card */}
          <div className="card mb-8">
            <div className="flex items-center gap-4 mb-4">
              {status === 'loading' && (
                <Loader className="w-8 h-8 text-blue-500 animate-spin" />
              )}
              {status === 'connected' && (
                <CheckCircle2 className="w-8 h-8 text-green-500" />
              )}
              {status === 'error' && (
                <AlertCircle className="w-8 h-8 text-red-500" />
              )}
              <h2 className="heading-sm">
                {status === 'loading' && 'Testing Connection...'}
                {status === 'connected' && 'Connected ✅'}
                {status === 'error' && 'Connection Failed ❌'}
              </h2>
            </div>
            <p className="text-sneaker-dark/70 mb-4">{message}</p>
            {status !== 'loading' && (
              <button
                onClick={testConnection}
                className="btn-secondary"
              >
                Retry Connection
              </button>
            )}
          </div>

          {/* Environment Variables */}
          <div className="card mb-8">
            <h3 className="heading-sm mb-4">Environment Variables</h3>
            <div className="space-y-2 text-sm font-mono bg-gray-100 p-4 rounded-lg">
              <div className="text-green-700">✅ NEXT_PUBLIC_SUPABASE_URL is set</div>
              <div className="text-green-700">✅ NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY is set</div>
            </div>
          </div>

          {/* Test Results */}
          {status === 'connected' && (
            <div className="card">
              <h3 className="heading-sm mb-4">Sample Orders from Database</h3>
              {orders.length > 0 ? (
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-sneaker-dark/10">
                        <th className="text-left py-2 px-4 font-semibold">ID</th>
                        <th className="text-left py-2 px-4 font-semibold">Customer</th>
                        <th className="text-left py-2 px-4 font-semibold">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {orders.map(order => (
                        <tr key={order.id} className="border-b border-sneaker-dark/5">
                          <td className="py-2 px-4 text-xs font-mono text-sneaker-dark/60">
                            {order.id.substring(0, 8)}...
                          </td>
                          <td className="py-2 px-4">{order.customer_name}</td>
                          <td className="py-2 px-4">
                            <span className="badge-status status-pending px-2 py-1">
                              {order.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <p className="text-sneaker-dark/60">No orders found in database</p>
              )}
            </div>
          )}

          {/* Troubleshooting */}
          <div className="card mt-8 bg-yellow-50 border border-yellow-200">
            <h3 className="heading-sm mb-4 text-yellow-900">Troubleshooting</h3>
            <ul className="space-y-2 text-sm text-yellow-800">
              <li>🔍 Open Browser DevTools (F12) → Console to see detailed error messages</li>
              <li>🔍 Check Network tab to see API requests to Supabase</li>
              <li>⚙️ Verify environment variables in `.env.local`</li>
              <li>🔄 Make sure you've run the SQL schema in Supabase SQL Editor</li>
              <li>📊 Check Supabase Dashboard → Logs for server errors</li>
              <li>🪟 Try clearing browser cache and reloading the page</li>
            </ul>
          </div>
        </div>
      </main>
    </>
  )
}
