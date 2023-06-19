'use client'

import React, { useContext } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'

import giftIcon from '../../public/giftIcon.svg'
import { UserContext } from '../context/context'

const GiftButton = ({ user, item }) => {
    const { handleOnSetGift, handleOnSetRecipient } = useContext(UserContext)
    const router = useRouter()


    const handleOnClick = () => {
        handleOnSetGift(item)
        handleOnSetRecipient(user)
        router.push('/regalar')
    }

    return (
        <button onClick={handleOnClick} className='font-semibold text-lg py-1 pl-2 pr-3 border border-muted rounded shadow hover:bg-primary flex items-center justify-center gap-2 w-full md:max-w-md mx-auto'>
            <Image src={giftIcon} alt='Regalar' width={30}/>
            <p>Regalar</p>
        </button>
    )
}

export default GiftButton