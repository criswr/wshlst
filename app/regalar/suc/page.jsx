'use client'

import React, { useEffect } from 'react'
import { useSearchParams } from 'next/navigation'

import getPayment from '../../../lib/utils/getPayment'

const Success = () => {
  const searchParams = useSearchParams()
  const paymentId = searchParams.get('payment_id')
  const { payment } = getPayment(paymentId)

  useEffect(() => {
    console.log('payment', payment)
  }, [payment])
  
  return (
    <div>Success</div>
  )
}

export default Success