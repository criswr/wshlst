import React from 'react'
import Link from 'next/link'
import Image from 'next/image'

import arrowCircleRight from '../../public/arrowCircleRight.svg'
import iconInformation from '../../public/iconInformation.svg'
import iconProfile from '../../public/iconProfile.svg'


const cuenta = () => {
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
      img: iconProfile,
    },
  ]
  return (
    <div className='mx-2 flex flex-col w-full'>
        <h1>Ajustes</h1>
        <div className='flex flex-col flex-1'>
          <ul>
              {links.map((item) => (
                <Link href={item.route} key={item.route}>
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

        <button className='text-muted font-semibold my-5 py-1 w-full border border-muted rounded shadow hover:bg-white hover:text-black'>Cerrar sesión</button>
    </div>
  )
}

export default cuenta