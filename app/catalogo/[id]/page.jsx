import React from 'react'

import { mlConstants } from '../../../constants/mlConstants'


const Product = async ({params}) => {
    const fetchMlProduct = () => (
        fetch(mlConstants.mlApiUrl + '/items?ids=' + params.id)
        .then(res => res.json())
    )  

    const productRes = await fetchMlProduct()
    const product = productRes[0].body

    return (
        <div>
            <h1>
                {product.title}
            </h1>
            <img src={product.secure_thumbnail} alt={product.title} />
        </div>
    )
}

export default Product