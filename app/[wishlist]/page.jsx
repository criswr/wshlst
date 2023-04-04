'use client'

import React, { useEffect, useState } from 'react'

const Wishlist = ({ params }) => {
    const [user, setUser] = useState()

    useEffect(() => {
        const findUser = (username) => {
            fetch('/api/user', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username: username,
                }),
            })
            .then(res => res.json())
            .then(data => {
                setUser(data.user)
                console.log(data.user)
            })
        }
        findUser(params.wishlist)
        console.log('user:', user)
    }, [])
    
    return (
        <div>
            <h1>{user?.email}</h1>
        </div>
    )
}

export default Wishlist