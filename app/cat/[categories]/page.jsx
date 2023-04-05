'use client'

import React, { useEffect, useState } from 'react'
import ItemCard from '../../../components/ItemCard'

const Categories = ({ params }) => {
  const [products, setProducts] = useState()

  useEffect(() => {
    const fetchMlProducts = (cat) => fetch('/api/products', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
        body: JSON.stringify({
        category: cat,
      }),
    })
    .then(res => res.json())
    .then(data => setProducts(data))
  fetchMlProducts(params.categories)
  }, [])
  
  return (
    <div>
      {Array.isArray(products) ?
        products.map((item) => (
            <ItemCard item={ item } params={ params } key={item.id} />
        ))
      :
          <p>Cargandooo</p>
      }
    </div>
  )
}

export default Categories