import { NextRequest, NextResponse } from 'next/server'
import { supabaseClient } from '@/utils/supabase/queries'

// GET /api/orders/[id] - Fetch a specific order
export async function GET(
  _request: NextRequest,
  context: { params: { id: string } }
) {
  try {
    const { id } = await context.params

    const { data, error } = await supabaseClient
      .from('orders')
      .select('*')
      .eq('id', id)
      .single()

    if (error) {
      return NextResponse.json(
        { error: 'Order not found' },
        { status: 404 }
      )
    }

    return NextResponse.json({
      success: true,
      data,
    })
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || 'Failed to fetch order' },
      { status: 500 }
    )
  }
}

// PUT /api/orders/[id] - Update an order
export async function PUT(
  request: NextRequest,
  context: { params: { id: string } }
) {
  try {
    const { id } = await context.params
    const body = await request.json()

    const { data, error } = await supabaseClient
      .from('orders')
      .update({
        customer_name: body.customer_name,
        customer_phone: body.customer_phone,
        service_availed: body.service_availed,
        status: body.status,
        image_before_url: body.image_before_url,
        image_after_url: body.image_after_url,
        date_availed: body.date_availed,
        date_claimed: body.date_claimed,
        payment_mode: body.payment_mode,
        payment_receipt_url: body.payment_receipt_url,
        total_price: body.total_price,
      })
      .eq('id', id)
      .select()

    if (error) {
      return NextResponse.json(
        { error: error.message },
        { status: 400 }
      )
    }

    return NextResponse.json({
      success: true,
      data: data?.[0],
    })
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || 'Failed to update order' },
      { status: 500 }
    )
  }
}

// DELETE /api/orders/[id] - Delete an order
export async function DELETE(
  _request: NextRequest,
  context: { params: { id: string } }
) {
  try {
    const { id } = await context.params

    const { error } = await supabaseClient
      .from('orders')
      .delete()
      .eq('id', id)

    if (error) {
      return NextResponse.json(
        { error: error.message },
        { status: 400 }
      )
    }

    return NextResponse.json({
      success: true,
      message: 'Order deleted successfully',
    })
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || 'Failed to delete order' },
      { status: 500 }
    )
  }
}
