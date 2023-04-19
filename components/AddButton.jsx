'use client'

import React, { useEffect, useState } from 'react'
import { getSession } from 'next-auth/react'

import { addRemove } from './AddRemove'
import { Item } from './ItemClass'


const AddButton = ({ product, uniqueVaris, selectedVari, wishlist, view }) => {
    const [isOnWishlist, setIsOnWishlist] = useState(false)
    
    useEffect(() => {
        if (wishlist) {
            const idInWishlist = wishlist.some((el) => (el.id === product.id))
            setIsOnWishlist(idInWishlist)
        }
    }, [wishlist, product])


    const handleOnAdd = async () => {
        const session = await getSession()
        if (!session) router.push('/login')
        
        addRemove(new Item(product.id, selectedVari))
        setIsOnWishlist(true)
    }

    const handleOnRemove = () => {
        addRemove({id: product.id})
        setIsOnWishlist(false)
    }

    const isDisabled = () => {
        if (isOnWishlist) return false

        return uniqueVaris && Object.keys(uniqueVaris).length !== Object.keys(selectedVari).length
    }


    return (
        <button 
            onClick={  
                isOnWishlist ? 
                handleOnRemove :
                handleOnAdd
            }

            disabled={isDisabled()}

            className={`flex justify-center items-center gap-x-2 disabled:opacity-40 disabled:cursor-default transition-all duration-300 ease-in-out transform ${isOnWishlist ? 'bg-accent hover:bg-muted hover:border-accent hover:border-4 rounded-full' : ''} ${view === 'single' ? 'w-full h-20 my-4 hover:bg-accent disabled:hover:bg-white' : 'h-12 py-3 px-1 hover:border-0'}`}
        >
            {view === 'single' ?
            <div className={`w-full h-full flex justify-center items-center text-gray font-semibold rounded shadow ${isOnWishlist ? ' shadow-none' : ''}`}>
                <svg className={`translate-y-px ${isOnWishlist ? '' : 'fill-secondary'}`} width="40px" height="40px" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M12.39 20.87a.696.696 0 0 1-.78 0C9.764 19.637 2 14.15 2 8.973c0-6.68 7.85-7.75 10-3.25 2.15-4.5 10-3.43 10 3.25 0 5.178-7.764 10.664-9.61 11.895z" /></svg>
                <span className={`transition-all duration-200 ease-in-out transform text-secondary ${isOnWishlist ? 'hidden' : ''}`}>Agregar a favoritos</span>

                <div className={`absolute bg-accent rounded-full ${isOnWishlist ? 'like' : 'unlike'}`}></div>
            </div>
            :
            <div className='flex justify-center items-center'>
                <svg className={`translate-y-px ${isOnWishlist ? 'fill-secondary' : 'fill-grey'}`} width="40px" height="40px" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M12.39 20.87a.696.696 0 0 1-.78 0C9.764 19.637 2 14.15 2 8.973c0-6.68 7.85-7.75 10-3.25 2.15-4.5 10-3.43 10 3.25 0 5.178-7.764 10.664-9.61 11.895z" /></svg>
                <span className={`transition-all duration-200 ease-in-out transform ${isOnWishlist ? 'absolute translate-x-80' : 'translate-x-0'}`}>Agregar a favoritos</span>

                <div className={`absolute bg-accent rounded-full ${isOnWishlist ? 'like' : 'unlike'}`}></div>
            </div>
            }

        </button>
    )
}

export default AddButton