'use client'

import React from 'react'
import { useRouter } from 'next/navigation'

import arrowCircleRight from '../public/arrowCircleRight.svg'
import Image from 'next/image'


const BackButton = () => {
    const router = useRouter()
    
    const handleOnClick = () => {
        router.push('/cuenta')
    }

  return (
    <button onClick={handleOnClick} className='flex justify-center gap-2 text-muted font-semibold my-5 py-1 w-28 border border-muted rounded shadow hover:bg-white hover:text-black'>
        <Image src={arrowCircleRight} height={25} width='auto' alt='Volver' className='rotate-180	' />
        Volver
    </button>
  )
}

export default BackButton