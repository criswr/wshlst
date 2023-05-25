'use client'

import React, { useContext, useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { UserContext } from '../../components/context/context'
import LastUsers from '../../components/adminComponents/LastUsers'
import UserCount from '../../components/adminComponents/UserCount'

const Adm = () => {
    const {user} = useContext(UserContext)
    
    if (!user) return (
        <h1>Cargando</h1>
    )
        
    if (user?.isAdmin) return (
        <div className='p-2'>
            <h1>Admin</h1>
            <LastUsers user={user} />
            <UserCount user={user} />
        </div>
    )

    return (
        <h1>No autorizado</h1>
    )
}

export default Adm