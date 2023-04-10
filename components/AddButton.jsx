'use client'

import React, { useEffect, useState } from 'react'
import { addRemove } from './AddRemove'
import { getSession } from 'next-auth/react'
import { Item } from './ItemClass'

const AddButton = ({ product, uniqueVaris, selectedVari }) => {
    const [user, setUser] = useState()
    const [isOnWishlist, setIsOnWishlist] = useState()
    
    useEffect(() => {
        const findUser = async() => {
            const session = await getSession()
            fetch('/api/user', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: session.user.email,
                }),
            })
            .then(res => res.json())
            .then(data => {
                setUser(data.user)
                setIsOnWishlist(data.user.wishlist.some((el) => (el.id ===product.id)))
            })
        }
        findUser()
        
    }, [])
    const handleOnAdd = () => {
        if (uniqueVaris && Object.keys(uniqueVaris).length !== Object.keys(selectedVari).length) return
        
        addRemove(new Item(product.id, selectedVari))
        setIsOnWishlist(true)
    }

    const handleOnRemove = () => {
        addRemove({id: product.id})
        setIsOnWishlist(false)
    }


    return (
        <button 
            onClick={  
                isOnWishlist ? 
                handleOnRemove :
                handleOnAdd
            }
        >{  
            isOnWishlist ? 
            'Quitar de favoritos' :
            'Agregar a Favoritos'
        }
        </button>
    )
}

export default AddButton