'use client'

import { getSession } from 'next-auth/react'
import Link from 'next/link'
import React from 'react'

const ItemCard = ({item, params}) => {
    const addRemove = async (item) => {
        const session = await getSession()
        if (session){
            const favItem = (email, item) => fetch('/api/wishlist', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email,
                    item
                }),
            })

            favItem(session.user.email, item)
        }
    }

    return (
    <article>
        <ul>
            <Link href={'/[categories]/[product]'} as={params.categories + '/' + item.id}>
                <li>{item.title}</li>
                <li>${item.price}</li>
                <li>{item.permalink}</li>
                <li>Shipping: {item.shipping.logistic_type}</li>
            </Link>
                <button onClick={() => addRemove(item.id)}>Fav</button>
        </ul>
    </article>
  )
}

export default ItemCard