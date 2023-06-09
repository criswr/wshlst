'use client'

import { useEffect, useState } from "react"
import { initMercadoPago, Wallet } from '@mercadopago/sdk-react'

initMercadoPago(process.env.NEXT_PUBLIC_MP_PUBLIC_KEY)

const PaymentButton = ({item, shipping}) => {
    const [globalId, setGlobalId] = useState()

    const fetchPreference = (item) => {
        fetch('/api/payment', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                item,
                shipping: 1000,
                recipient: null,
            }),
        })
        .then(res => res.json())
        .then(data => data.global && setGlobalId(data.global))
    }

    useEffect(() => {
        fetchPreference(item)
    }, [item])
    
    useEffect(() => {
      console.log('global', globalId);
    }, [globalId])
    
    return (
        <Wallet initialization={{ preferenceId: globalId }} />
    )
}

export default PaymentButton