import React from 'react'
import Link from 'next/link'

import { mlConstants } from '../../constants/mlConstants'



const CategoriesLayout = async ({ children }) => {
    return (
        <div>
            <section>
                <ul>
                    {mlConstants.mlCategories.map((item) => (
                        <li key={item.id}><Link href={`items/?cat=${item.id}`} as={`items/?cat=${item.id}`}>{item.name}</Link></li>
                    ))}
                </ul>
            </section>
            {children}
        </div>
    )
}

export default CategoriesLayout