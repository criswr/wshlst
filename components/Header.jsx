import Link from 'next/link'
import React from 'react'


const links = [
    {
        label: 'Inicio',
        route: '/'
    },
    {
        label: 'Nosotros',
        route: '/nosotros'
    },
    {
        label: 'Categorías',
        route: '/MLC1368'
    }
]


const Header = () => {
    return (
        <header>
            <ul>
                {links.map(({ label, route }) => (
                    <li key={route}><Link href={route}>{label}</Link></li>
                ))}
            </ul>
        </header>
    )
}

export default Header