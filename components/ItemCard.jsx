'use client'

import Link from 'next/link'
import React from 'react'



const ItemCard = ({item, params}) => {

    return (
        <article>
            <ul>
                <Link href={'/cat/[categories]/[product]'} as={'/cat/' + params.categories + '/' + item.id}>
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