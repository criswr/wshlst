'use client'

import { useSession } from 'next-auth/react'
import React, { useEffect, useState } from 'react'

import { forbiddenUsernames } from './ForbiddenUsernames'

const informacion = () => {
  const { data } = useSession()

  const [user, setUser] = useState()

  const [changeUsername, setChangeUsername] = useState(false)
  const [usernameErr, setUsernameErr] = useState(false)
  const [usernameTaken, setUsernameTaken] = useState(false)
  const [newUsername, setNewUsername] = useState('')

  const validUsername = new RegExp ('^(?=.{5,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$')
  

  const validate = (value) => {
    setUsernameErr(!validUsername.test(value) || (forbiddenUsernames.includes(value)))
  }

  const handleOnChangeUsername = () => {
    setChangeUsername(true)
  }

  const handleOnSaveUsername = () => {
    if (newUsername === '') return setUsernameErr(true)

    fetch('/api/username', {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            email: user.email,
            newUsername: newUsername,
        }),
    })
    .then(res => res.json())
    .then(data => {
      if (data.response){
        setUser({...user, username: newUsername})
        setChangeUsername(false)
      }

      if (data.error) setUsernameTaken(true)
    })
  }
  
  useEffect(() => {
    if (data){
      const findUser = (email) => {
        fetch('/api/user', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: email,
            }),
        })
        .then(res => res.json())
        .then(data => {
          setUser(data.user)
          setNewUsername(data.user.username)
        })
      }
      findUser(data.user.email)
    }
  }, [data])

  useEffect(() => {
    if (user) !user.username && setChangeUsername(true)
  }, [user])
  
  


  return (
    <div>
      <h1>Mi cuenta</h1>
        <div>
          {!changeUsername ?

            <div>
              {user?.username && 
                <p>Nombre de usuario: {user.username} <button onClick={handleOnChangeUsername}>Cambiar nombre de usuario</button></p> 
              }
            </div>

          :
            <div>
              <p>Nuevo nombre de usuario:</p>
              <input type="text" 
              value={newUsername} 
              autoFocus={true}
              onChange={(e) => {
                validate(e.target.value)
                setNewUsername(e.target.value)
                setUsernameTaken(false)
              }} 
              />

              <button onClick={handleOnSaveUsername} disabled={usernameErr}>Guardar</button>
              <button onClick={() => setChangeUsername(false)}>Cancelar</button>
            </div>
          }

          {usernameErr && <p>Usuario no válido</p>}
          {usernameTaken && <p>Usuario no disponible</p>}
        </div>

    </div>

  )
}

export default informacion