'use client'

import Link from 'next/link'
import React from 'react'



const ItemCard = ({item}) => {

    return (
        <article>
            <ul>
                <Link href={'/item/[product]'} as={'/item/' + item.id}>
                    <li>{item.title}</li>
                    <li>${item.price}</li>
                    <li>{item.permalink}</li>
                    <li>Shipping: {item.shipping.logistic_type}</li>
                </Link>
            </ul>
        </article>
    )
}

export default ItemCard