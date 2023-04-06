import React from 'react'
import Image from 'next/image'

import { mlConstants } from '../../../../constants/mlConstants'
import Variations from '../../../../components/Variations'

//https://api.mercadolibre.com/items/MLC973984805?attributes=variations 

const Product = async ({params}) => {
    const productApiUrl = mlConstants.mlApiUrl + '/items?ids=' + params.product
    const fetchMlProduct = () => (
        fetch(productApiUrl)
        .then(res => res.json())
    )

    const fetchMlProductVariations = () => (
        fetch(productApiUrl + '&attributes=variations')
        .then(res => res.json())
    )

    const productRes = await fetchMlProduct()
    const product = productRes[0].body
    const variationsRes = await fetchMlProductVariations()
    const variations = variationsRes[0].body.variations

    return (
        <div>
            <h1>
                {product.title}
            </h1>
            <Image src={product.secure_thumbnail} alt={product.title} width='100' height='100'/>
            {variations.length ? <Variations variations={variations}/> : <p>No hay variaciones</p>}
        </div>
    )
}

export default Product