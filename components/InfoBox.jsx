import React from 'react'
import Image from 'next/image'

import iconInformation from '../public/iconInformation.svg'

const InfoBox = ({ text }) => {
  return (
    <div className='w-full bg-white rounded p-5 text-sm flex justify-center gap-5'>
        <Image src={iconInformation} width={20} alt='Información' />
        <p>{text}</p>
    </div>
  )
}

export default InfoBox