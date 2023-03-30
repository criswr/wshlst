import Link from 'next/link'
import React from 'react'
import { mlConstants } from '../../constants/mlConstants'

const Categories = async ({ params }) => {
    const fetchMlProducts = () => (
        fetch(mlConstants.mlApiUrl + 'sites/'  + mlConstants.mlSite + '/search?category=' + params.categories + '&logistic_type=fulfillment')
        .then(res => res.json())
    )

    const products = await fetchMlProducts()
  return (
    <div>
        {products.results.map((item) => (
            <article key={item.id}>
                <ul>
                    <Link href={'/[categories]/[product]'} as={params.categories + '/' + item.id}>
                        <li>{item.title}</li>
                        <li>${item.price}</li>
                        <li>{item.permalink}</li>
                        <li>Shipping: {item.shipping.logistic_type}</li>
                    </Link>
                </ul>
            </article>
        ))}
    </div>
  )
}

export default Categories