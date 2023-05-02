import React from 'react'
import Link from 'next/link'

import { mlConstants } from '../../constants/mlConstants'
import arrowCircleRight from '../../public/arrowCircleRight.svg'
import Image from 'next/image'


const Categorias = () => {
  return (
    <div className='w-full'>
        <h1 className='m-2'>Categorías</h1>
        <ul className='md:flex md:flex-wrap md:justify-center'>
            {mlConstants.mlCategories.map((item) => (
                <Link 
                    href={`items/?cat=${item.id}`} 
                    as={`items/?cat=${item.id}`}
                    key={item.id}
                >
                    <li className='my-1 mx-2 py-5 px-6 rounded bg-white hover:bg-grey flex flex-row justify-between content-center md:h-52 md:w-52'>
                        <div className='flex flex-row content-center gap-3 md:flex-col md:items-center md:justify-around md:w-full md:text-center'>
                            <Image src={item.img} height={25} alt={item.name} className='md:w-20' />
                            <p>{item.name}</p>
                        </div>
                    <Image src={arrowCircleRight} height={25} alt={item.name} className='md:hidden' />
                    </li>
                </Link>
            ))}
        </ul>
    </div>
  )
}

export default Categorias
