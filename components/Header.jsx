'use client'

import { SessionProvider} from 'next-auth/react'
import Link from 'next/link'
import React, { useState } from 'react'

import AccountSnippet from './AccountSnippet'
import SearchBar from './SearchBar'
import Image from 'next/image'

import thirteen from '../public/thirteen.svg'


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
        route: '/categorias',
    },
    {
        label: 'Login',
        route: '/login',
    },
]


const Header = () => {
    const [menuVisible, setMenuVisible] = useState(false)

    return (
        <header className='container-fluid bg-secondary'>
            <div className='container mx-auto'>

            <div className={`bg-secondary flex flex-row space-x-4 px-4 py-2 z-50 relative ${ menuVisible && 'drop-shadow-lg' }`}>
                <Image src={thirteen} alt='Wishlist' height={40} width={'auto'} />
                <SearchBar/>
                <button onClick={() => setMenuVisible(!menuVisible)} className='md:hidden'>
                    <div className={`burger burger-rotate ${ menuVisible && 'open'}`}>
                        <div className="burger-lines"></div>
                    </div>
                </button>

            </div>

            <div className={`${ menuVisible ? 'max-h-96 drop-shadow-lg' : 'max-h-0' } bg-grey md:bg-secondary md:text-grey z-40 relative transition-all ease-out duration-500 md:max-h-96`}>
                <div className={`${ menuVisible ? ' translate-y-0' : ' -translate-y-full ' } transition-transform ease-out duration-500 md:translate-y-0 md:flex md:justify-center`}>
                    <ul className='md:flex md:flex-row md:space-x-4'>
                        {links.map(({ label, route }) => (
                            <Link href={route} key={route}><li className='py-4 md:py-1 px-20 md:px-10 hover:px-28 active:px-28 active:md:px-10 hover:md:px-10 hover:bg-white active:bg-white transition-all hover:md:text-secondary active:md:text-secondary md:mb-2'>{label}</li></Link>
                            ))}
                    </ul>
                </div>
                
            </div>
{/*             <SessionProvider>
                <AccountSnippet />
            </SessionProvider> */}
            
            </div>
        </header>
    )
}

export default Header