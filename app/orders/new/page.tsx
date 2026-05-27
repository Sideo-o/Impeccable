'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Header } from '@/components/Header'
import { OrderForm } from '@/components/OrderForm'
import { uploadFile } from '@/utils/supabase/queries'
import { generateUploadFilename, getFileExtension, isValidImageFile } from '@/lib/utils'

export default function NewOrderPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (formData: any) => {
    try {
      setLoading(true)
      setError(null)

      let imageBefore_url = formData.image_before_url
      let imageAfter_url = formData.image_after_url

      // Upload before image
      if (formData.image_before && isValidImageFile(formData.image_before)) {
        const filename = generateUploadFilename(
          'order-before',
          getFileExtension(formData.image_before)
        )
        const uploadedUrl = await uploadFile('shoe-images', filename, formData.image_before)
        if (uploadedUrl) imageBefore_url = uploadedUrl
      }

      // Upload after image
      if (formData.image_after && isValidImageFile(formData.image_after)) {
        const filename = generateUploadFilename(
          'order-after',
          getFileExtension(formData.image_after)
        )
        const uploadedUrl = await uploadFile('shoe-images', filename, formData.image_after)
        if (uploadedUrl) imageAfter_url = uploadedUrl
      }

      // Submit order
      const response = await fetch('/api/orders', {
        method: 'POST',
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

      if (!response.ok) {
        throw new Error('Failed to create order')
      }

      const result = await response.json()
      router.push(`/orders/${result.data.id}`)
    } catch (err: any) {
      setError(err.message || 'An error occurred')
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <Header />
      <main className="min-h-screen bg-white pb-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="mb-8">
            <h1 className="heading-lg mb-2">Create New Order</h1>
            <p className="text-sneaker-dark/60">
              Add a new shoe cleaning order to the system
            </p>
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6 text-red-700">
              {error}
            </div>
          )}

          <OrderForm onSubmit={handleSubmit} isLoading={loading} />
        </div>
      </main>
    </>
  )
}
