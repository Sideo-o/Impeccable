'use client'

import { useEffect, useState } from 'react'
import { useRouter, useParams } from 'next/navigation'
import { Header } from '@/components/Header'
import { OrderForm } from '@/components/OrderForm'
import { Order } from '@/lib/types'
import { uploadFile } from '@/utils/supabase/queries'
import { generateUploadFilename, getFileExtension, isValidImageFile } from '@/lib/utils'
import { Trash2 } from 'lucide-react'

export default function OrderDetailPage() {
  const router = useRouter()
  const params = useParams()
  const orderId = params.id as string
  
  const [order, setOrder] = useState<Order | null>(null)
  const [loading, setLoading] = useState(true)
  const [updating, setUpdating] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchOrder()
  }, [orderId])

  const fetchOrder = async () => {
    try {
      const response = await fetch(`/api/orders/${orderId}`)
      if (!response.ok) throw new Error('Order not found')
      const result = await response.json()
      setOrder(result.data)
    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (formData: any) => {
    try {
      setUpdating(true)
      setError(null)

      let imageBefore_url = formData.image_before_url
      let imageAfter_url = formData.image_after_url

      // Upload before image if changed
      if (formData.image_before && isValidImageFile(formData.image_before)) {
        const filename = generateUploadFilename(
          'order-before',
          getFileExtension(formData.image_before)
        )
        const uploadedUrl = await uploadFile('shoe-images', filename, formData.image_before)
        if (uploadedUrl) imageBefore_url = uploadedUrl
      }

      // Upload after image if changed
      if (formData.image_after && isValidImageFile(formData.image_after)) {
        const filename = generateUploadFilename(
          'order-after',
          getFileExtension(formData.image_after)
        )
        const uploadedUrl = await uploadFile('shoe-images', filename, formData.image_after)
        if (uploadedUrl) imageAfter_url = uploadedUrl
      }

      // Update order
      const response = await fetch(`/api/orders/${orderId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          customer_name: formData.customer_name,
          customer_phone: formData.customer_phone,
          service_availed: formData.service_availed,
          status: formData.status,
          image_before_url: imageBefore_url,
          image_after_url: imageAfter_url,
          date_availed: formData.date_availed,
          payment_mode: formData.payment_mode,
          total_price: formData.total_price,
        }),
      })

      if (!response.ok) throw new Error('Failed to update order')

      const result = await response.json()
      setOrder(result.data)
      router.push('/orders')
    } catch (err: any) {
      setError(err.message)
    } finally {
      setUpdating(false)
    }
  }

  const handleDelete = async () => {
    if (!confirm('Are you sure you want to delete this order?')) return

    try {
      const response = await fetch(`/api/orders/${orderId}`, {
        method: 'DELETE',
      })

      if (!response.ok) throw new Error('Failed to delete order')

      router.push('/orders')
    } catch (err: any) {
      setError(err.message)
    }
  }

  if (loading) {
    return (
      <>
        <Header />
        <main className="min-h-screen bg-cream-50 pb-12">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="card h-96 bg-gradient-to-r from-cream-100 to-cream-200 animate-pulse" />
          </div>
        </main>
      </>
    )
  }

  if (!order) {
    return (
      <>
        <Header />
        <main className="min-h-screen bg-cream-50 pb-12">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="card text-center py-12">
              <h2 className="heading-md mb-2">Order Not Found</h2>
              <p className="text-sneaker-dark/60 mb-6">
                The order you're looking for doesn't exist or has been deleted.
              </p>
              <button
                onClick={() => router.push('/orders')}
                className="btn-primary"
              >
                Go Back to Orders
              </button>
            </div>
          </div>
        </main>
      </>
    )
  }

  return (
    <>
      <Header />
      <main className="min-h-screen bg-cream-50 pb-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="heading-lg mb-2">Edit Order</h1>
              <p className="text-sneaker-dark/60">
                Order ID: {orderId}
              </p>
            </div>
            <button
              onClick={handleDelete}
              className="flex items-center gap-2 px-4 py-2 bg-red-50 hover:bg-red-100 text-red-600 rounded-lg transition font-medium"
            >
              <Trash2 className="w-4 h-4" />
              Delete
            </button>
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6 text-red-700">
              {error}
            </div>
          )}

          <OrderForm 
            initialData={order}
            onSubmit={handleSubmit}
            isLoading={updating}
          />
        </div>
      </main>
    </>
  )
}
