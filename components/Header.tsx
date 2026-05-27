'use client'

import Link from 'next/link'
import { Sparkles } from 'lucide-react'

export function Header() {
  return (
    <header className="bg-white border-b border-sneaker-dark/5 sticky top-0 z-40 shadow-soft">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition">
            <div className="bg-black p-2 rounded-lg">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-sneaker-dark">Impeccable</h1>
              <p className="text-xs text-sneaker-dark/60">Professional Shoe Cleaning</p>
            </div>
          </Link>
          
          <nav className="hidden md:flex items-center gap-8">
            <Link
              href="/"
              className="text-sneaker-dark hover:text-gray-600 transition font-medium"
            >
              Dashboard
            </Link>
            <Link
              href="/orders"
              className="text-sneaker-dark hover:text-gray-600 transition font-medium"
            >
              Orders
            </Link>
          </nav>

          <div className="flex items-center gap-2">
            <div className="text-right">
              <p className="text-sm font-semibold text-sneaker-dark">Admin</p>
              <p className="text-xs text-sneaker-dark/60">Order Manager</p>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}
