'use client'

import React, { useEffect, useState } from 'react'
import { getSession } from 'next-auth/react'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { useRouter } from 'next/navigation'

import { addRemove } from './AddRemove'
import { Item } from './ItemClass'


const AddButton = ({ product, uniqueVaris, selectedVari, wishlist, single }) => {
    const [isOnWishlist, setIsOnWishlist] = useState(false)
    const [recentlyAdded, setRecentlyAdded] = useState(false)

    const router = useRouter()
    
    useEffect(() => {
        if (wishlist) {
            const idInWishlist = wishlist.some((el) => (el.id === product.id))
            setIsOnWishlist(idInWishlist)
        }
    }, [wishlist, product])

    const handleToast = (str) => {
        const MySwal = withReactContent(Swal)

        const Toast = MySwal.mixin({
            toast: true,
            position: 'bottom-end',
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: false,
            didOpen: (toast) => {
              toast.addEventListener('mouseenter', Swal.stopTimer)
              toast.addEventListener('mouseleave', Swal.resumeTimer)
            }
        })
          
        Toast.fire({
            icon: 'success',
            title: str
        })
    }

    const handleOnAdd = async () => {
        const session = await getSession()
        if (!session) return router.push('/login')
        
        addRemove(new Item(product.id, selectedVari))
        setIsOnWishlist(true)
        setRecentlyAdded(true)
        handleToast('Agregado a favoritos')
    }

    const handleOnRemove = () => {
        addRemove({id: product.id})
        setIsOnWishlist(false)
        setRecentlyAdded(false)
        handleToast('Eliminado de favoritos')
    }

    const isDisabled = () => {
        if (isOnWishlist) return false

        return uniqueVaris && Object.keys(uniqueVaris).length !== Object.keys(selectedVari).length
    }


    return (
        <button 
            onClick={isOnWishlist ? handleOnRemove : handleOnAdd }
            disabled={isDisabled()}
            className={`flex justify-center items-center gap-x-2 disabled:opacity-40 disabled:cursor-default ${single && 'bg-grey hover:bg-white font-semibold py-2 px-4 mr-2 mb-2 mt-6 border border-muted rounded shadow group w-full md:w-fit'}`}
        >
            {single && <span>{isOnWishlist ? 'Quitar de favoritos' : 'Agregar a favoritos'}</span> }
            <svg className={`translate-y-px hover:fill-accent ${recentlyAdded && 'like'} ${isOnWishlist ? 'fill-accent' : 'fill-grey'} ${single && `group-hover:fill-accent ${isOnWishlist ? 'fill-accent' : 'fill-muted'}`}`} width="40px" height="40px" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M12.39 20.87a.696.696 0 0 1-.78 0C9.764 19.637 2 14.15 2 8.973c0-6.68 7.85-7.75 10-3.25 2.15-4.5 10-3.43 10 3.25 0 5.178-7.764 10.664-9.61 11.895z" /></svg>
        </button>
    )
}

export default AddButton