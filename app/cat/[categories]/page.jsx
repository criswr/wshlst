import React from 'react'
import { mlConstants } from '../../../constants/mlConstants'
import ItemCard from '../../../components/ItemCard'

const Categories = async ({ params }) => {
    /* const fetchMlProducts = () => (
        fetch(mlConstants.mlApiUrl + 'sites/'  + mlConstants.mlSite + '/search?category=' + params.categories + '&logistic_type=fulfillment')
        .then(res => res.json())
    ) */

    const fetchMlProducts = (cat) => fetch(process.env.BASE_FETCH_URL + '/api/products', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
          category: cat,
      }),
  }).then(res => res.json())
   

    const products = await fetchMlProducts(params.categories)


  return (
    <div>
      {Array.isArray(products) &&
        products.map((item) => (
            <ItemCard item={ item } params={ params } key={item.id} />
        ))
      }
    </div>
  )
}

export default Categories