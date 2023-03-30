import React from 'react'
import Link from 'next/link'

import { mlConstants } from '../../constants/mlConstants'



const CategoriesLayout = async ({ params, children }) => {
    const mlCategory = params

    const fetchMlProducts = () => (
        fetch(mlConstants.mlApiUrl + 'sites/'  + mlConstants.mlSite + '/search?category=' + mlCategory + '&logistic_type=fulfillment')
        .then(res => res.json())
    )

    const products = await fetchMlProducts()

    return (
        <div>
            <section>
                <ul>
                    {mlConstants.mlCategories.map((item) => (
                        <li key={item.id}><Link href={'[categories]'} as={`${item.id}`}>{item.name}</Link></li>
                    ))}
                </ul>
            </section>
            {children}
        </div>
    )
}

export default CategoriesLayout