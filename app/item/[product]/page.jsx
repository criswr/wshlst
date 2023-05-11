'use client'

import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import { getSession } from 'next-auth/react'
import Link from 'next/link'

import { mlConstants } from '../../../constants/mlConstants'
import Variations from '../../../components/Variations'
import AddButton from '../../../components/AddButton'
import externalLink from '../../../public/externalLink.svg'
import { price } from '../../../components/Price'
import { LoadingPrice, LoadingTitle } from '../../../components/LoadingPlaceholders'

const Product =  ({params}) => {
    const [wishlist, setWishlist] = useState()
    const [product, setProduct] = useState({})
    const [variations, setVariations] = useState([])

    useEffect(() => {
        const findUser = async() => {
          const session = await getSession()
          if (session){
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
            .then(data => setWishlist(data.user.wishlist))
          }
        }
        findUser()

        const productApiUrl = mlConstants.mlApiUrl + '/items?ids=' + params.product
        const fetchMlProduct = () => (
            fetch(productApiUrl)
            .then(res => res.json())
            .then (data => setProduct(data[0].body))
        )
        fetchMlProduct()

        const fetchMlProductVariations = () => (
            fetch(productApiUrl + '&attributes=variations')
            .then(res => res.json())
            .then(data => setVariations(data[0].body.variations))
        )
        fetchMlProductVariations()
    }, [])

    return (
        <div className='p-2 mt-2'>
            {
                product.title ?
                <h1 className='mb-2 md:hidden'>{product.title}</h1> :
                <LoadingTitle />
            }

            <div className='flex flex-col md:flex-row gap-4'>
                <div className='w-full rounded aspect-square flex items-center justify-center bg-white md:w-3/6'>
                {
                    product.pictures &&
                    <Image src={product.pictures[0].secure_url} alt={product.title} width={0} height={0} sizes='100vh' className='w-full h-full object-contain' />
                }
                </div>

                <div className='border border-muted shadow p-4 rounded bg-white relative md:w-3/6 flex flex-col gap-8 h-full'>
                    <h1 className='hidden md:block'>
                        {product.title}
                    </h1>

                    <div className='text-muted text-3xl'>
                        {
                            product.price ?
                            price(product.price) :
                            <LoadingPrice />
                        }

                        {product.permalink &&
                            <Link href={product.permalink} target='_blank' className='text-base	ml-3'>Ver en MercadoLibre <Image src={externalLink} alt='Ver en MercadoLibre' width={15} height={15} className='inline'/></Link>
                        }
                    </div>

                    {
                        product.title &&
                        <div>
                            {
                                variations.length 
                                ? 
                                <Variations variations={variations} product={product} wishlist={wishlist} /> 
                                : 
                                <AddButton product={product} wishlist={wishlist} single/>
                            }
                        </div>
                    }
                </div>
            </div>
        </div>
    )
}

export default Product