'use client'

import { useRouter } from 'next/navigation'
import React, { useState } from 'react'

import search from '../public/search.svg'
import Image from 'next/image'


const SearchBar = () => {
    const [query, setQuery] = useState('')
    const router = useRouter()

    const onSearch = () => {
        router.push('/items/?q=' + query)
    }

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
          onSearch()
        }
    }
    
  return (
    <div className='w-full relative'>
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          <Image src={search} width={16} alt='search'/>
        </div>
        <input 
            type='search' 
            name='search' 
            value={query}
            placeholder='Busca productos para agregar...'
            onChange={(e) => { setQuery(e.target.value) }}
            onSubmit={onSearch}
            onKeyDown={handleKeyDown}
            className='block w-full p-2 pl-10 text-md rounded-sm bg-grey outline-none hover:bg-white focus:bg-white'
        />

        <button 
          onClick={onSearch} 
          className='hidden sm:inline'
        >Buscar</button>

    </div>
  )
}

export default SearchBar