'use client'

import { SessionProvider} from 'next-auth/react'
import Link from 'next/link'
import React, { useState } from 'react'

import AccountSnippet from './AccountSnippet'
import SearchBar from './SearchBar'
import Image from 'next/image'

import thirteen from '../public/thirteen.svg'
import menu from '../public/menu.svg'


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
]


const Header = () => {
    const [menuVisible, setMenuVisible] = useState(false)

    return (
        <header className=''>
            <div className={`bg-secondary flex flex-row space-x-4 px-4 py-2 z-50 relative ${ menuVisible && 'drop-shadow-lg' }`}>
                <Image src={thirteen} alt='Wishlist' height={50} width={'auto'} />
                <SearchBar/>
                <button onClick={() => setMenuVisible(!menuVisible)}>
                    <div className={`burger burger-rotate ${ menuVisible && 'open'}`}>

                    {/* <Image src={menu} alt='Menu' height={20} width={20} /> */}
                    <div class="burger-lines"></div>
                    </div>
                </button>

            </div>

            <div className={`${ menuVisible ? 'max-h-96 drop-shadow-lg' : 'max-h-0' } bg-grey z-40 relative transition-all ease-out duration-500`}>
                <div className={`${ menuVisible ? ' translate-y-0' : ' -translate-y-full ' } transition-transform ease-out duration-500`}>
                    <ul className='md:flex md:flex-row md:space-x-4'>
                        {links.map(({ label, route }) => (
                            <Link href={route} key={route}><li className='py-4 px-20 hover:px-28 active:px-28 hover:bg-white active:bg-white transition-all'>{label}</li></Link>
                            ))}
                    </ul>
                </div>
                
            </div>
{/*             <SessionProvider>
                <AccountSnippet />
            </SessionProvider> */}
            
        </header>
    )
}

export default Header