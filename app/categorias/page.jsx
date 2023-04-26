import React from 'react'
import Link from 'next/link'

import { mlConstants } from '../../constants/mlConstants'
import arrowCircleRight from '../../public/arrowCircleRight.svg'
import Image from 'next/image'


const Categorias = () => {
  return (
    <div className='w-full'>
        <h1>Categorías</h1>
        <ul className=''>
            {mlConstants.mlCategories.map((item) => (
                <Link 
                    href={`items/?cat=${item.id}`} 
                    as={`items/?cat=${item.id}`}
                >
                    <li key={item.id} className='my-1 mx-2 py-5 px-6 rounded bg-white hover:bg-grey flex flex-row justify-between content-center'>
                        <div className='flex flex-row content-center gap-3'>
                            <Image src={item.img} height={25} alt={item.name} />
                            <p>{item.name}</p>
                        </div>
                    <Image src={arrowCircleRight} height={25} alt={item.name} />
                    </li>
                </Link>
            ))}
        </ul>
    </div>
  )
}

export default Categorias
