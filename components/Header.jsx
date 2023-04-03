'use client'

import { SessionProvider} from 'next-auth/react'
import Link from 'next/link'
import React from 'react'
import AccountSnippet from './AccountSnippet'


const links = [
    {
        label: 'Inicio',
        route: '/',
    },
    {
        label: 'Nosotros',
        route: '/nosotros',
    },
    {
        label: 'Categorías',
        route: '/MLC1368',
    },
    {
        label: 'Login',
        route: '/login',
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
            <SessionProvider>
                <AccountSnippet />
            </SessionProvider>
        </header>
    )
}

export default Header