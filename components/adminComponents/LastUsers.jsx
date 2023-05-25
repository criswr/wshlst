import React, { useEffect, useState } from 'react'

const LastUsers = ({ user }) => {
    const [last, setLast] = useState()

    useEffect(() => {
        fetch('/api/admin/lastusers', {
            method: 'GET',
            headers: {'Content-Type': 'application/json'},
        }).then(res => res.json())
        .then(data => setLast(data.users))
    }, [user])

  return (
    <div>
        <h2>Últimos usuarios registrados</h2>
            <div>
                {last?.map(usr => {
                    const date = new Date(usr.timestamp)
                    return (
                        <div key={usr.email} className='border-b'>
                            <p>Email: {usr.email}</p>
                            <p>Registro: {date.toLocaleDateString()}</p>
                        </div>
                    )
                })}
            </div>
    </div>
  )
}

export default LastUsers