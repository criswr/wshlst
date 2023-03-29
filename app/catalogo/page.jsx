import React from 'react'
import Link from 'next/link'

import { mlConstants } from '../../constants/mlConstants'


const mlCategory = 'MLC1051'

const Catalog = async () => {
    const fetchMlProducts = () => (
        fetch(mlConstants.mlApiUrl + 'sites/'  + mlConstants.mlSite + '/search?category=' + mlCategory)
        .then(res => res.json())
    )

    const products = await fetchMlProducts()

    return (
        <div>
            {products.results.map((item) => (
                <article key={item.id}>
                    <ul>
                        <Link href='/catalogo/[id]' as={'/catalogo/' + item.id}>
                            <li>{item.title}</li>
                            <li>${item.price}</li>
                            <li>{item.permalink}</li>
                        </Link>
                    </ul>
                </article>
            ))}
        </div>
    )
}

export default Catalog