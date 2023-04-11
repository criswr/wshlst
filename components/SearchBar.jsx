'use client'

import { useRouter } from 'next/navigation'
import React, { useState } from 'react'


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
    <div>
        <input 
            type='search' 
            name='search' 
            value={query}
            onChange={(e) => {
                setQuery(e.target.value)
              }}
            onSubmit={onSearch}
            onKeyDown={handleKeyDown}
        />

        <button onClick={onSearch}>Buscar</button>
    </div>
  )
}

export default SearchBar