'use client'

import React, { useEffect, useState } from 'react'
import { mlConstants } from '../../constants/mlConstants'
import ItemCard from '../../components/ItemCard'

const Wishlist = ({ params }) => {
    const [user, setUser] = useState()
    const [items, setItems] = useState()

    useEffect(() => {
        const findUser = (query) => {
            fetch('/api/user', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username: query,
                }),
            })
            .then(res => res.json())
            .then(data => setUser(data.user))
        }
        findUser(params.wishlist)
    }, [])

    useEffect(() => {
        if (user){
            const idArr = user.wishlist.map((elem) => (elem.id))

            const fetchFavedMlProducts = (user) => (
                fetch(mlConstants.mlApiUrl + 'items?ids=' + idArr.toString())
                .then(res => res.json())
                .then(data => setItems(data))
                )
                fetchFavedMlProducts(user)
            }
    }, [user])
    
    return (
        <div>
            <h1>{user?.email}</h1>
            <div>
                {items?.map((item) => (
                    <ItemCard item={ item.body } params={ params } key={item.body.id} />
                ))}
            </div>
        </div>
    )
}

export default Wishlist