import React from 'react'
import Image from 'next/image'

import { mlConstants } from '../../../constants/mlConstants'


const Product = async ({params}) => {
    const fetchMlProduct = () => (
        fetch(mlConstants.mlApiUrl + '/items?ids=' + params.product)
        .then(res => res.json())
    )  

    const productRes = await fetchMlProduct()
    const product = productRes[0].body

    return (
        <div>
            <h1>
                {product.title}
            </h1>
            <Image src={product.secure_thumbnail} alt={product.title} width='100' height='100'/>
        </div>
    )
}

export default Product