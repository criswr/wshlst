'use client'

import React, { useEffect, useState } from 'react'
import { getSession } from 'next-auth/react'
import Image from 'next/image'

import { mlConstants } from '../../constants/mlConstants'
import WishlistItemCard from '../../components/WishlistItemCard'
import profileIcon from '../../public/profileIcon.svg'
import { siteConstants } from '../../constants/siteConstants'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import Link from 'next/link'
import empty from '../../public/empty.svg'
import noUser from '../../public/noUser.svg'
import { LoadingUser, LoadingWishlistCard } from '../../components/LoadingPlaceholders'


const Wishlist = ({ params }) => {
    const [user, setUser] = useState()
    const [items, setItems] = useState([])
    const [loggedUser, setLoggedUser] = useState()
    const [isOwner, setIsOwner] = useState(false)

    const [userLoaded, setUserLoaded] = useState(false)
    const [itemsLoaded, setItemsLoaded] = useState(false)

    useEffect(() => {
        const findUser = (query) => {
            fetch('/api/user', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username: query,
                }),
            })
            .then(res => res.json())
            .then(data => {
                setUser(data.user)
                setUserLoaded(true)
            })

        }
        findUser(params.wishlist)
    }, [])

    useEffect(() => {
        if (user && user.wishlist.length){
            const idArr = user.wishlist.map((elem) => (elem.id))
                const fetchFavedMlProducts = () => {
                    fetch(mlConstants.mlApiUrl + 'items?ids=' + idArr.toString())
                    .then(res => res.json())
                    .then(data => {
                        setItems(data)
                        setItemsLoaded(true)
                    })
                }
                fetchFavedMlProducts(user)
            

            const findLoggedUser = async() => {
                const session = await getSession()
                if (session){
                    fetch('/api/user', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                            email: session.user.email,
                        }),
                    })
                    .then(res => res.json())
                    .then(data => setLoggedUser(data.user))
                }
            }
            findLoggedUser()
        }
    }, [user])

    useEffect(() => {
        if (user && loggedUser){
            user.email === loggedUser.email && setIsOwner(true)
        }
    }, [loggedUser])

    
    const daysToBirthday = date => {
        const birthdate = new Date(date)
        const today = new Date()
        const month = birthdate.getUTCMonth()
        const day = birthdate.getUTCDate()
        const birthday = new Date(today.getFullYear(), month, day)
        
        const diff = birthday - today
        const days = Math.floor(diff / (1000 * 60 * 60 * 24)) + 1

        if (days === 0) return '¡Hoy es su cumpleaños!'
        if (days === 1) return '¡Mañana es su cumpleaños!'
        if (days > 1 && days < 8) return `¡Faltan solamente ${days} días para su cumpleaños!`
        if (days < 0) return `Faltan ${days + 365} días para su cumpleaños`
        return `Faltan ${days} días para su cumpleaños`
    }

    const userSince = date => {
        const timestamp = new Date(date)
        const options = { year: 'numeric', month: 'long', day: 'numeric' }
        return timestamp.toLocaleDateString('es-ES', options)
    }


    const handleOnShare = text => {
        const MySwal = withReactContent(Swal)

        const Toast = MySwal.mixin({
            toast: true,
            position: 'bottom-end',
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: false,
            didOpen: (toast) => {
              toast.addEventListener('mouseenter', Swal.stopTimer)
              toast.addEventListener('mouseleave', Swal.resumeTimer)
            }
        })
          
        Toast.fire({
            icon: 'success',
            title: 'Enlace copiado!'
        })
        
        navigator.clipboard.writeText(siteConstants.baseUrl + text)
    }
    
    return (
        <>
            {
                user &&

                <div className='p-2 md:flex md:gap-5 md:pt-5 w-full'>
                    <div className='md:w-1/3'>
                        <div className='flex flex-col items-center justify-center'>
                            <Image src={user.img ? user.img : profileIcon } alt={user.name} width={100} height={100} className='rounded-full' />
                            <h1>{user.name}</h1>
                            
                            <div className='flex gap-2'>
                                <button onClick={() => handleOnShare(user.username)} className='font-semibold py-1 px-2 border border-muted rounded shadow hover:bg-primary'>Compartir perfil</button>
                                <Link href='/cuenta/informacion'>
                                    <button className='font-semibold py-1 px-2 border border-muted rounded shadow hover:bg-primary'>Editar perfil</button>
                                </Link>
                            </div>
                        </div>

                        <div className='py-3 text-center md:text-left'>
                            <p className='font-bold'>{daysToBirthday(user.birthdate)}</p>
                            <p>Usuario desde el {userSince(user.timestamp)}</p>
                        </div>
                    </div>
                    <div className='flex flex-col gap-5 grow md:w-2/3'>
                    {
                        items.length
                    ?
                        items?.map((item) => (
                            <WishlistItemCard item={ item.body } key={item.body.id} wishlist={user.wishlist} isOwner={isOwner}/>
                        ))
                    :
                        itemsLoaded ?
                        <div className='w-full bg-white rounded py-20 flex flex-col items-center gap-5'>
                            <Image src={empty} alt='Lista vacía' width={'auto'} height={400}></Image>
                            <h2>Aún no hay nada por aquí</h2>
                            <Link href={'/categorias'}>
                                <button className='bg-grey font-semibold py-2 px-4 mr-2 mb-2 border border-muted rounded shadow hover:bg-white'>Explorar productos</button>
                            </Link>
                        </div> :
                        <LoadingWishlistCard />
                    }
                    </div>
                </div>                
            }

            {
                !userLoaded && !user &&
                <LoadingUser />
            }

            {
            userLoaded && !user && 

                <div className='w-full rounded py-10 px-2 flex flex-col items-center gap-5'>
                    <Image src={noUser} alt='No hay usuario' width={'auto'} height={400}></Image>
                    <h2>No encontramos al usuario {params.wishlist}</h2>
                    <p className='text-center max-w-screen-sm'>Seguramente sufrió combustión espontánea, es decir que ya no existe debido a fuego originado sin una fuente externa aparente de ignición, que probablemente comenzó dentro del cuerpo de la persona. Eso o el nombre de usuario está mal escrito.</p>
                    <Link href={'/'}>
                        <button className='bg-grey font-semibold py-2 px-4 mr-2 mb-2 border border-muted rounded shadow hover:bg-white'>Volver</button>
                    </Link>
                </div>
            }
        </>
    )
}

export default Wishlist