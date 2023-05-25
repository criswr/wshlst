import React, { useEffect, useState } from 'react'

const UserCount = ({ user }) => {
    const [count, setCount] = useState()

    useEffect(() => {
        if (user && !user.isAdmin) router.push('/cuenta')

        fetch('/api/admin/usercount', {
            method: 'GET',
            headers: {'Content-Type': 'application/json'},
        }).then(res => res.json())
        .then(data => setCount(data.count))
    }, [user])
  return (
    <div>
        <h2>Usuarios totales</h2>
        <h2>{count}</h2>
    </div>
  )
}

export default UserCount