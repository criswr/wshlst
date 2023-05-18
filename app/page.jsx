'use client'

import React, { useEffect, useState } from 'react'
import Image from 'next/image'

import mainBanner from '../public/mainBanner.svg'
import SearchBar from '../components/SearchBar'
import { mlConstants } from '../constants/mlConstants'
import ItemCard from '../components/ItemCard'
import { featuredArr } from '../components/Featured'
import { LoadingCardPlaceholder } from '../components/LoadingPlaceholders'

const Main = () => {
  const [featured, setFeatured] = useState()

  useEffect(() => {
    const fetchFavedMlProducts = () => {
      fetch(mlConstants.mlApiUrl + 'items?ids=' + featuredArr.toString())
      .then(res => res.json())
      .then(data => {
        setFeatured(data)
        console.log(data);
      })
    }
    fetchFavedMlProducts()
  }, [featuredArr])


  return (
    <div className='container flex flex-col items-center justify-start p-2 gap-7'>
      <Image src={mainBanner} alt='Comparte tu lista de deseados' width='100%' />

      <div className='bg-white w-full p-10 pt-8 rounded-lg max-w-5xl shadow'>
        <h1 className='text-xl text-muted mb-4 ml-2'>Busca, agrega y comparte tus productos favoritos...</h1>
        <div className='border-2 border-muted rounded-full'>
          <SearchBar />
        </div>
        
      </div>

      <div>
        <h2 className='mb-0 font-bold text-muted'>Productos destacados</h2>
        <div className='flex flex-wrap justify-around'>
          {featured?.length ?
          featured.map((item) => (
            <ItemCard item={ item.body } key={ item.body.id } />
            ))
            :
            <LoadingCardPlaceholder />
          }
        </div>
      </div>
    </div>
  )
}

export default Main