'use client'

import React, { useContext, useEffect} from 'react'
import { UserContext } from '../../components/context/context'
import LastUsers from '../../components/adminComponents/LastUsers'
import UserCount from '../../components/adminComponents/UserCount'
import { useRouter } from 'next/navigation'

const Adm = () => {
    const {user} = useContext(UserContext)
    const router = useRouter()

    useEffect(() => {
        if (user && !user.isAdmin) router.push('/cuenta')
    }, [user])
    
    
    if (!user) return (
        <h1>Cargando</h1>
    )
        
    if (user?.isAdmin) return (
        <div className='p-2'>
            <h1>Admin</h1>
            <div className='flex gap-5 flex-wrap'>
                <LastUsers user={user} />
                <UserCount user={user} />
            </div>
        </div>
    )

    return (
        <h1>No autorizado</h1>
    )
}

export default Adm