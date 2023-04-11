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
        label: 'Items',
        route: '/items/?cat=MLC1368',
    },
    {
        label: 'Login',
        route: '/login',
    },
    {
        label: 'Cuenta',
        route: '/cuenta',
    },
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