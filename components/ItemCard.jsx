'use client'

import Link from 'next/link'
import React from 'react'
import { addRemove } from './AddRemove'

const ItemCard = ({item, params}) => {
    class Item {
        constructor(id){
            this.id = id
            this.status = true
            this.timestamp = Date.now()
        }
    }
    return (
        <article>
            <ul>
                <Link href={'/cat/[categories]/[product]'} as={'/cat/' + params.categories + '/' + item.id}>
                    <li>{item.title}</li>
                    <li>${item.price}</li>
                    <li>{item.permalink}</li>
                    <li>Shipping: {item.shipping.logistic_type}</li>
                </Link>
                    <button onClick={() => addRemove(new Item(item.id))}>Fav</button>
            </ul>
        </article>
    )
}

export default ItemCard