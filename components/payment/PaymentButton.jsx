'use client'

import { useEffect, useState } from "react"
import { initMercadoPago, Wallet } from '@mercadopago/sdk-react'

initMercadoPago(process.env.NEXT_PUBLIC_MP_PUBLIC_KEY)

const PaymentButton = ({item, shipping, recipient, fee, metadata}) => {
    const [globalId, setGlobalId] = useState()

    const fetchPreference = () => {
        fetch('/api/payment', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                item,
                shipping,
                recipient,
                fee,
                metadata,
            }),
        })
        .then(res => res.json())
        .then(data => {
            console.log('dataresponse', data);
            data.global && setGlobalId(data.global)
        })
    }

    useEffect(() => {
        if (item) {
            fetchPreference()
        }
    }, [item])
    
    useEffect(() => {
      console.log('global', globalId);
    }, [globalId])
    
    return (
        <>
            { globalId &&
                <Wallet initialization={{ preferenceId: globalId }} />
            }
        </>
    )
}

export default PaymentButton