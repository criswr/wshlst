'use client'

import Link from 'next/link'
import React from 'react'
import { addRemove } from './AddRemove'

const ItemCard = ({item, params}) => {
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