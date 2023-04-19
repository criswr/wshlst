'use client'

import React, { useEffect, useRef, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { getSession } from 'next-auth/react'
import { useInView } from 'react-intersection-observer'

import ItemCard from '../../components/ItemCard'
import { mlConstants } from '../../constants/mlConstants'


const Items = () => {
  const dataFetchedRef = useRef(false)
  
  const [currPage, setCurrPage] = useState(0)
  const [prevPage, setPrevPage] = useState(0)
  const [itemsList, setItemsList] = useState([])
  const [wasLastList, setWasLastList] = useState(false)

  const [wishlist, setWishlist] = useState()
  
  const [searchKey, setSearchKey] = useState('')
  const [searchQuery, setSearchQuery] = useState('')

  const searchParams = useSearchParams()
  const catSearch = searchParams.get('cat')

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
}, [])
  
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

    setCurrPage(0)
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
      <h1>
        {
          searchKey === 'cat' ?
          mlConstants.mlCategories.find(elem => elem.id === searchQuery).name :
          `Búsqueda: "${searchQuery}"`
        }
      </h1>

      <div className='flex flex-wrap justify-around'>
      {itemsList.length ?
        itemsList.map((item) => (
          <ItemCard item={ item } key={ item.id } wishlist={wishlist} />
          ))
          :
          <p>Cargandooo</p>
        }
      </div>

      <div ref={ref}>
        <h2>Más productos?</h2>
      </div>
    </div>
  )
}

export default Items