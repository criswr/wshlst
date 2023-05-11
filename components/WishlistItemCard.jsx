'use client'

import Image from 'next/image'
import Link from 'next/link'
import React, { useState } from 'react'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

import { price } from './Price'
import { addRemove } from './AddRemove'
import externalLink from '../public/externalLink.svg'


const WishlistItemCard = ({item, wishlist, isOwner}) => {
    const [isDeleted, setIsDeleted] = useState(false)

    const MySwal = withReactContent(Swal)
    const image = item.thumbnail.replace(/I.jpg/g, 'O.jpg') // Replaces ML thumbnail with high res picture
    const title = (str) => {
        const max = 60
        if (str.length > max) return str.substring(0, max) + '...'
        return str
    }
    const isVariable = item.variations.length > 0
    const wishlistItem = wishlist.find(el => el.id === item.id)

    const DeleteHtml = () => (
        <div className='flex items-center gap-4'>
            <div className='w-20 h-20 aspect-square'>
                    <Image src={image} alt={item.title} width={0} height={0} sizes='100vh' className='w-full h-full object-contain' />
            </div>
            <p className='text-left'>Vas a eliminar {item.title}</p>
        </div>
    )

    const deleteConfirmation = () => {
        MySwal.fire({
        title: '¿Eliminar de favoritos?',
        html: <DeleteHtml />,
        icon: 'question',
        showCancelButton: true,
        cancelButtonText: 'Cancelar',
        confirmButtonColor: '#959492',
        cancelButtonColor: '#cf456c',
        confirmButtonText: 'Sí, eliminar!',
        showClass: {popup: 'animate_animated animate_fadeInUp'},
        hideClass: {popup: 'animate_animated animate_fadeOutDown'}
        }).then((result) => {
            if (result.isConfirmed) {
                addRemove({id: item.id})
                setIsDeleted(true)
            }
        })
    }

    const handleOnClick = () => {
       if (!isDeleted) deleteConfirmation()
    }

    return (
        <article className={`bg-white p-2 flex gap-5 ${isDeleted && 'opacity-50'}`}>
            <div className='flex gap-5 grow'>

                <Link href='/item/[product]' as={'/item/' + item.id}>
                    <div className='w-40 h-40 rounded shadow-lg aspect-square'>
                        <Image src={image} alt={item.title} width={0} height={0} sizes='100vh' className='w-full h-full object-contain' />
                    </div>
                </Link>

                <div>
                    <Link href='/item/[product]' as={'/item/' + item.id}>
                        <h2 className='leading-5 text-lg'>{title(item.title)}</h2>
                        {
                            isVariable &&
                            Object.keys(wishlistItem.variation).map(key => <p key={key} className='leading-5 text-muted'>{key}: {wishlistItem.variation[key]}</p>)
                        }
                        <p className=''>{price(item.price)}</p>
                    </Link>

                    <Link href={item.permalink} target='_blank' className='text-base text-muted'>Ver en MercadoLibre <Image src={externalLink} alt='Ver en MercadoLibre' width={15} height={15} className='inline'/></Link>
                </div>
            </div>
            {
                isOwner &&
                <button className='flex' onClick={handleOnClick}>
                    <svg className={`stroke-2 stroke-muted ${isDeleted ? 'hidden' : 'fill-muted hover:fill-white'}`} width="25px" height="25px" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M12.39 20.87a.696.696 0 0 1-.78 0C9.764 19.637 2 14.15 2 8.973c0-6.68 7.85-7.75 10-3.25 2.15-4.5 10-3.43 10 3.25 0 5.178-7.764 10.664-9.61 11.895z" /></svg>
                </button>
            }
        </article>
    )
}

export default WishlistItemCard