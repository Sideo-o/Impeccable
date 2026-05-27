import { NextRequest, NextResponse } from 'next/server'
import { supabaseClient } from '@/utils/supabase/queries'

// GET /api/orders - Fetch all orders with optional filtering
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const status = searchParams.get('status')
    const search = searchParams.get('search')

    let query = supabaseClient
      .from('orders')
      .select('*')
      .order('date_availed', { ascending: false })

    // Apply status filter
    if (status && status !== 'all') {
      query = query.eq('status', status)
    }

    const { data: orders, error } = await query

    if (error) {
      return NextResponse.json(
        { error: error.message },
        { status: 500 }
      )
    }

    // Apply search filter (client-side for now)
    let filteredOrders = orders || []
    if (search) {
      const searchLower = search.toLowerCase()
      filteredOrders = filteredOrders.filter(order =>
        order.customer_name.toLowerCase().includes(searchLower) ||
        order.customer_phone.includes(search)
      )
    }

    return NextResponse.json({
      success: true,
      data: filteredOrders,
      count: filteredOrders.length,
    })
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || 'Failed to fetch orders' },
      { status: 500 }
    )
  }
}

// POST /api/orders - Create a new order
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    const { data, error } = await supabaseClient
      .from('orders')
      .insert([
        {
          customer_name: body.customer_name,
          customer_phone: body.customer_phone,
          service_availed: body.service_availed,
          status: body.status || 'pending',
          image_before_url: body.image_before_url,
          image_after_url: body.image_after_url,
          date_availed: body.date_availed,
          date_claimed: body.date_claimed || null,
          payment_mode: body.payment_mode,
          payment_receipt_url: body.payment_receipt_url || null,
          total_price: body.total_price,
        },
      ])
      .select()

    if (error) {
      return NextResponse.json(
        { error: error.message },
        { status: 400 }
      )
    }

    return NextResponse.json(
      { success: true, data: data?.[0] },
      { status: 201 }
    )
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || 'Failed to create order' },
      { status: 500 }
    )
  }
}
