import { NextResponse } from 'next/server'

type WooLineItem = {
  name: string
}

type WooMeta = {
  key: string
  value: string
}

type WooBilling = {
  first_name: string
  last_name: string
  email: string
  phone: string
}

type WooOrder = {
  id: number
  status: string
  billing: WooBilling
  line_items: WooLineItem[]
  meta_data: WooMeta[]
}

type CustomerItem = {
  id: number
  name: string
  email: string
  phone: string
  lastProduct: string
  status: string
  trackingNumber: string
}

export async function GET() {
  try {
    const res = await fetch(`${process.env.WOOCOMMERCE_URL}/orders`, {
      headers: {
        Authorization:
          'Basic ' +
          Buffer.from(
            `${process.env.WOOCOMMERCE_CONSUMER_KEY}:${process.env.WOOCOMMERCE_CONSUMER_SECRET}`
          ).toString('base64'),
      },
      cache: 'no-store',
    })

    if (!res.ok) {
      throw new Error('Failed to fetch orders')
    }

    const orders = (await res.json()) as WooOrder[]

    const customers: CustomerItem[] = orders.map((order) => {
      const trackingMeta = order.meta_data.find(
        (meta) => meta.key === '_tracking_number'
      )

      return {
        id: order.id,
        name: `${order.billing?.first_name ?? ''} ${order.billing?.last_name ?? ''}`.trim(),
        email: order.billing?.email ?? '',
        phone: order.billing?.phone ?? '',
        lastProduct: order.line_items?.[0]?.name ?? 'N/A',
        status: order.status,
        trackingNumber: trackingMeta?.value || 'Pending',
      }
    })

    return NextResponse.json({ success: true, customers })
  } catch (error) {
    console.error('[customers API] Unexpected error', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch customers' },
      { status: 500 }
    )
  }
}
