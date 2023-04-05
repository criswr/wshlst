'use client'

import React, { useEffect, useRef, useState } from 'react'
import { useInView } from 'react-intersection-observer'
import ItemCard from '../../../components/ItemCard'

const Categories = ({ params }) => {
  const [products, setProducts] = useState()
  const listInnerRef = useRef()
  const dataFetchedRef = useRef(false)

  const [currPage, setCurrPage] = useState(1); // storing current page number
  const [prevPage, setPrevPage] = useState(0); // storing prev page number
  const [userList, setUserList] = useState([]); // storing list
  const [wasLastList, setWasLastList] = useState(false); // setting a flag to know the last list

  useEffect(() => {
    const fetchMlProducts = (cat, offset) => fetch('/api/products', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
        body: JSON.stringify({
        category: cat,
        offset: offset
      }),
    })
    .then(res => res.json())
    .then(data => {
      if (!data.length) {
        setWasLastList(true)
      }else{
        setPrevPage(currPage)
        setUserList([...userList, ...data])
        dataFetchedRef.current = false
      }
    })

    if (!wasLastList && prevPage !== currPage) {
      fetchMlProducts(params.categories, currPage)
      

    }
    
  }, [currPage])
  
  const { ref, inView, entry } = useInView({
    threshold: 0,
  })


  const handleOnScroll = () => {
      setCurrPage(currPage + 1)
  }

  if (inView) {
    /* setCurrPage(currPage + 1) */
    if (dataFetchedRef.current) return
    dataFetchedRef.current = true
    handleOnScroll()
  }
  return (
    <div>
      {userList.length ?
        userList.map((item) => (
            <ItemCard item={ item } params={ params } key={item.id} />
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

export default Categories