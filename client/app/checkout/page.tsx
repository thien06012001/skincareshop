import Checkout from '@/components/Checkout/Checkout'
import CheckoutSteps from '@/components/Checkout/CheckoutSteps'
import React from 'react'

type Props = {}

function page({}: Props) {
  return (
    <div>
        <CheckoutSteps active={1} />
        <Checkout />
    </div>
  )
}

export default page