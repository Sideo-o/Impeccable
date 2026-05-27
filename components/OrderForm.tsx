'use client'

import { useState } from 'react'
import { Order, ServiceType, PaymentMode, OrderStatus, serviceLabels, paymentLabels, statusLabels } from '@/lib/types'
import { Upload, X } from 'lucide-react'
import Image from 'next/image'

interface OrderFormProps {
  initialData?: Order
  onSubmit: (data: any) => Promise<void>
  isLoading?: boolean
}

export function OrderForm({ initialData, onSubmit, isLoading }: OrderFormProps) {
  const [formData, setFormData] = useState({
    customer_name: initialData?.customer_name || '',
    customer_phone: initialData?.customer_phone || '',
    service_availed: initialData?.service_availed || ('deep-clean' as ServiceType),
    status: initialData?.status || ('pending' as OrderStatus),
    date_availed: initialData?.date_availed?.split('T')[0] || new Date().toISOString().split('T')[0],
    payment_mode: initialData?.payment_mode || ('cash' as PaymentMode),
    total_price: initialData?.total_price || 0,
  })

  const [imageBefore, setImageBefore] = useState<File | null>(null)
  const [imageAfter, setImageAfter] = useState<File | null>(null)
  const [previewBefore, setPreviewBefore] = useState<string>(initialData?.image_before_url || '')
  const [previewAfter, setPreviewAfter] = useState<string>(initialData?.image_after_url || '')

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'number' ? (value === '' ? 0 : parseFloat(value)) : value,
    }))
  }

  const handleImageChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    type: 'before' | 'after'
  ) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        if (type === 'before') {
          setImageBefore(file)
          setPreviewBefore(reader.result as string)
        } else {
          setImageAfter(file)
          setPreviewAfter(reader.result as string)
        }
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const submitData = {
      ...formData,
      image_before: imageBefore,
      image_after: imageAfter,
      image_before_url: previewBefore,
      image_after_url: previewAfter,
    }
    await onSubmit(submitData)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Customer Information Section */}
      <div className="card">
        <h3 className="heading-sm mb-4">Customer Information</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-sneaker-dark mb-2">
              Customer Name *
            </label>
            <input
              type="text"
              name="customer_name"
              value={formData.customer_name}
              onChange={handleInputChange}
              required
              className="input-field"
              placeholder="Full name"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-sneaker-dark mb-2">
              Phone Number *
            </label>
            <input
              type="tel"
              name="customer_phone"
              value={formData.customer_phone}
              onChange={handleInputChange}
              required
              className="input-field"
              placeholder="+63 123 456 7890"
            />
          </div>
        </div>
      </div>

      {/* Service & Status Section */}
      <div className="card">
        <h3 className="heading-sm mb-4">Service Details</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-sneaker-dark mb-2">
              Service Type *
            </label>
            <select
              name="service_availed"
              value={formData.service_availed}
              onChange={handleInputChange}
              className="input-field"
            >
              {Object.entries(serviceLabels).map(([key, label]) => (
                <option key={key} value={key}>
                  {label}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-sneaker-dark mb-2">
              Status *
            </label>
            <select
              name="status"
              value={formData.status}
              onChange={handleInputChange}
              className="input-field"
            >
              {Object.entries(statusLabels).map(([key, label]) => (
                <option key={key} value={key}>
                  {label}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-sneaker-dark mb-2">
              Date Availed *
            </label>
            <input
              type="date"
              name="date_availed"
              value={formData.date_availed}
              onChange={handleInputChange}
              required
              className="input-field"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-sneaker-dark mb-2">
              Payment Mode *
            </label>
            <select
              name="payment_mode"
              value={formData.payment_mode}
              onChange={handleInputChange}
              className="input-field"
            >
              {Object.entries(paymentLabels).map(([key, label]) => (
                <option key={key} value={key}>
                  {label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Images Section */}
      <div className="card">
        <h3 className="heading-sm mb-4">Shoe Images</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Before Image */}
          <div>
            <label className="block text-sm font-medium text-sneaker-dark mb-2">
              Before Photo *
            </label>
            <div className="relative">
              {previewBefore ? (
                <div className="relative h-40 bg-cream-100 rounded-lg overflow-hidden mb-2">
                  <Image
                    src={previewBefore}
                    alt="Before preview"
                    fill
                    className="object-cover"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      setPreviewBefore('')
                      setImageBefore(null)
                    }}
                    className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded hover:bg-red-600"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <label className="flex flex-col items-center justify-center h-40 bg-cream-100 rounded-lg border-2 border-dashed border-sneaker-dark/20 cursor-pointer hover:border-sneaker-orange transition">
                  <Upload className="w-8 h-8 text-sneaker-dark/40 mb-2" />
                  <span className="text-sm text-sneaker-dark/60 text-center">
                    Click to upload
                  </span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleImageChange(e, 'before')}
                    className="hidden"
                    required={!initialData}
                  />
                </label>
              )}
            </div>
          </div>

          {/* After Image */}
          <div>
            <label className="block text-sm font-medium text-sneaker-dark mb-2">
              After Photo
            </label>
            <div className="relative">
              {previewAfter ? (
                <div className="relative h-40 bg-cream-100 rounded-lg overflow-hidden mb-2">
                  <Image
                    src={previewAfter}
                    alt="After preview"
                    fill
                    className="object-cover"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      setPreviewAfter('')
                      setImageAfter(null)
                    }}
                    className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded hover:bg-red-600"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <label className="flex flex-col items-center justify-center h-40 bg-cream-100 rounded-lg border-2 border-dashed border-sneaker-dark/20 cursor-pointer hover:border-sneaker-orange transition">
                  <Upload className="w-8 h-8 text-sneaker-dark/40 mb-2" />
                  <span className="text-sm text-sneaker-dark/60 text-center">
                    Click to upload
                  </span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleImageChange(e, 'after')}
                    className="hidden"
                  />
                </label>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Pricing Section */}
      <div className="card">
        <h3 className="heading-sm mb-4">Pricing</h3>
        <div>
          <label className="block text-sm font-medium text-sneaker-dark mb-2">
            Total Price (PHP) *
          </label>
          <div className="relative">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-sneaker-dark/60">
              ₱
            </span>
            <input
              type="number"
              name="total_price"
              value={formData.total_price}
              onChange={handleInputChange}
              required
              step="0.01"
              min="0"
              className="input-field pl-8"
              placeholder="0.00"
            />
          </div>
        </div>
      </div>

      {/* Submit Button */}
      <div className="flex gap-4">
        <button
          type="submit"
          disabled={isLoading}
          className="btn-primary flex-1"
        >
          {isLoading ? 'Saving...' : initialData ? 'Update Order' : 'Create Order'}
        </button>
        <button
          type="button"
          onClick={() => window.history.back()}
          className="btn-secondary flex-1"
        >
          Cancel
        </button>
      </div>
    </form>
  )
}
