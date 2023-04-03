import React from 'react'
import { mlConstants } from '../../constants/mlConstants'
import ItemCard from '../../components/ItemCard'

const Categories = async ({ params }) => {
    const fetchMlProducts = () => (
        fetch(mlConstants.mlApiUrl + 'sites/'  + mlConstants.mlSite + '/search?category=' + params.categories + '&logistic_type=fulfillment')
        .then(res => res.json())
    )

    const products = await fetchMlProducts()


  return (
    <div>
        {products.results.map((item) => (
            <ItemCard item={ item } params={ params } key={item.id} />
        ))}
    </div>
  )
}

export default Categories