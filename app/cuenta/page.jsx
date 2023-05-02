'use client'

import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { signOut } from 'next-auth/react'

import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

import arrowCircleRight from '../../public/arrowCircleRight.svg'
import iconInformation from '../../public/iconInformation.svg'
import iconProfile from '../../public/iconProfile.svg'
import iconSupport from '../../public/iconSupport.svg'
import { useRouter } from 'next/navigation'


const cuenta = () => {
  const MySwal = withReactContent(Swal)
  const router = useRouter()

  const links = [
    {
      label: 'Información de la cuenta',
      route: '/cuenta/informacion',
      img: iconInformation,
    },
    {
      label: 'Editar perfil',
      route: '/cuenta/informacion',
      img: iconProfile,
    },
    {
      label: 'Soporte',
      route: '/cuenta/informacion',
      img: iconSupport,
    },
  ]

  const handleSignOut = () => {
    MySwal.fire({
    title: '¿Quieres cerrar tu sesión?',
    icon: 'warning',
    showCancelButton: true,
    cancelButtonText: 'No, volver',
    confirmButtonColor: '#959492',
    cancelButtonColor: '#cf456c',
    confirmButtonText: 'Sí',
    showClass: {popup: 'animate_animated animate_fadeInUp'},
    hideClass: {popup: 'animate_animated animate_fadeOutDown'}
    }).then((result) => {
        if (result.isConfirmed) {
          signOut()
          router.push('/login')
        }
    })
 }


  return (
    <div className='mx-2 flex flex-col w-full'>
        <h1>Ajustes</h1>
        <div className='flex flex-col flex-1'>
          <ul>
              {links.map((item) => (
                <Link href={item.route} key={item.label}>
                      <li className='my-4 py-5 px-6 rounded bg-white hover:bg-grey flex flex-row justify-between content-center'>
                          <div className='flex flex-row content-center gap-3'>
                              <Image src={item.img} height={25} alt={item.label} />
                              <p>{item.label}</p>
                          </div>
                      <Image src={arrowCircleRight} height={25} alt={item.label} />
                      </li>
                  </Link>
              ))}
          </ul>
        </div>

        <button onClick={handleSignOut} className='text-muted font-semibold my-5 py-1 w-full border border-muted rounded shadow hover:bg-white hover:text-black'>Cerrar sesión</button>
    </div>
  )
}

export default cuenta