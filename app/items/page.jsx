'use client'

import React, { useEffect, useRef, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { useInView } from 'react-intersection-observer'
import ItemCard from '../../components/ItemCard'


const Items = () => {
  const dataFetchedRef = useRef(false)
  
  const [currPage, setCurrPage] = useState(1)
  const [prevPage, setPrevPage] = useState(0)
  const [itemsList, setItemsList] = useState([])
  const [wasLastList, setWasLastList] = useState(false)
  
  const [searchKey, setSearchKey] = useState('')
  const [searchQuery, setSearchQuery] = useState('')

  const searchParams = useSearchParams()
  const catSearch = searchParams.get('cat')
  
  useEffect(() => {
    

    const fetchMlProducts = (type, query, offset) => fetch(`/api/products/?${type}=${query}&offset=${offset}`, 
    { 
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
    })
    .then(res => res.json())
    .then(data => {
      if (!data.length) {
        setWasLastList(true)
      }else{
        setPrevPage(currPage)
        setItemsList([...itemsList, ...data])
        dataFetchedRef.current = false
      }
    })

    if (!wasLastList && prevPage !== currPage) {
      fetchMlProducts(searchKey, searchQuery, currPage)
    }
    
  }, [currPage])

  useEffect(() => {
    setSearchKey(catSearch ? 'cat' : 'q')
    setSearchQuery(catSearch ? catSearch : searchParams.get('q'))

    setCurrPage(1)
    setPrevPage(0)
    setWasLastList(false)
    setItemsList([])
  }, [searchParams])
  
  
  const { ref, inView } = useInView({
    threshold: 0,
  })


  const handleOnScroll = () => {
      setCurrPage(currPage + 1)
  }

  if (inView) {
    if (dataFetchedRef.current) return
    dataFetchedRef.current = true
    handleOnScroll()
  }
  return (
    <div>
      {itemsList.length ?
        itemsList.map((item) => (
            <ItemCard item={ item } key={ item.id } />
        ))
      :
          <p>Cargandooo</p>
      }

      <div ref={ref}>
        <h2>Más productos?</h2>
      </div>
    </div>
  )
}

export default Items