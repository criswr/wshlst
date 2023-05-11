'use client'

import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import AddButton from './AddButton'
import { price } from './Price'



const ItemCard = ({item, wishlist}) => {
    const image = item.thumbnail.replace(/I.jpg/g, 'O.jpg') // Replaces ML thumbnail with high res picture

    const title = (str) => {
        const max = 55
        if (str.length > max) return str.substring(0, max) + '...'
        return str
    }

    const isVariable = item.hasOwnProperty('variations_data')

    return (
        <article className='bg-white mx-2 my-4 group relative flex flex-wrap items-center justify-center w-80 rounded drop-shadow'>
            <div className='relative'>
                <Link href='/item/[product]' as={'/item/' + item.id}>
                    <div className='relative z-20 w-full sm:w-80 aspect-square flex items-center overflow-hidden'>
                        <Image src={image} alt={item.title} width={0} height={0} sizes='100vh' className='w-full h-full object-contain transition-all duration-300 ease-in-out transform group-hover:scale-125' />       
                    </div>
                </Link>
                
                <div className='absolute top-0 right-0 z-40 w-16 h-16 pl-4 pb-2 bg-secondary flex items-center justify-center text-grey rounded-bl-full'>
                    {
                        isVariable 
                    ?
                        <Link href='/item/[product]' as={'/item/' + item.id} className='w-full h-full flex justify-center items-center'>
                            <div className='flex justify-center items-center gap-x-2 h-12 py-3 px-1'>
                                <svg className='fill-grey' width="30px" height="30px" viewBox="0 0 800 800" xmlns="http://www.w3.org/2000/svg"><path d="M123,570.4c66.3,0,120,51.2,120,114.3S189.3,799,123,799S3,747.8,3,684.7S56.7,570.4,123,570.4L123,570.4z M123,646.6c-22,0-40,17.1-40,38.1c0,21,18,38.1,40,38.1s40-17.1,40-38.1C163,663.7,145,646.6,123,646.6L123,646.6z M123,37c66.3,0,120,51.2,120,114.3s-53.7,114.3-120,114.3S3,214.5,3,151.3S56.7,37,123,37L123,37z M123,113.2c-22,0-40,17.1-40,38.1s18,38.1,40,38.1s40-17.1,40-38.1S145,113.2,123,113.2L123,113.2z M123,303.7c66.3,0,120,51.2,120,114.3s-53.7,114.3-120,114.3S3,481.1,3,418S56.7,303.7,123,303.7L123,303.7z M123,379.9c-22,0-40,17.1-40,38.1c0,21,18,38.1,40,38.1s40-17.1,40-38.1C163,397,145,379.9,123,379.9L123,379.9z M323,722.8h480v-76.2H323V722.8z M323,189.4h480v-76.2H323V189.4z M323,456.1h480v-76.2H323V456.1z" /></svg>
                            </div>
                        </Link>
                    :
                    <div className='w-full h-full flex justify-center items-center'>
                        <AddButton product={item} uniqueVaris={{}} selectedVari={{}} wishlist={wishlist} />
                    </div>
                    }
                </div>

                <Link href='/item/[product]' as={'/item/' + item.id}>
                    <div className='relative z-30 w-full bg-secondary px-4 py-2'>
                        <p className='text-lg text-primary'>{price(item.price)}</p>
                        <h2 className='text-lg font-semibold text-grey leading-normal min-h-min whitespace-pre-wrap'>{title(item.title)}</h2>
                    </div>
                </Link>
            </div>
        </article>
    )
}

export default ItemCard