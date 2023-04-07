'use client'

import Link from 'next/link'
import React from 'react'

import { addRemove } from './AddRemove'
import { Item } from './ItemClass'

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
                    {item.hasOwnProperty('variations_data') ?
                        <Link href={'/cat/[categories]/[product]'} as={'/cat/' + params.categories + '/' + item.id}>
                            <button onClick={() => {}}>Ver opciones</button>
                        </Link>
                    :
                        <button onClick={() => addRemove(new Item(item.id))}>Agregar a Favoritos</button>
                    }
            </ul>
        </article>
    )
}

export default ItemCard