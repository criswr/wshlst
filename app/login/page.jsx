'use client'

import React, { useEffect, useRef } from 'react'
import { getSession, signIn } from 'next-auth/react'


const Login = () => {
    const dataFetchedRef = useRef(false)
    
    useEffect(() => {
        const getUserSession = async () => {
            const session = await getSession()
            if (session){
                const newUser = (email, name) => fetch('/api/user', {
                    method: 'POST',
                    headers: {
                      'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        email,
                        name
                    }),
                })

                newUser(session.user.email, session.user.name)
            }
        }

        if (dataFetchedRef.current) return
        dataFetchedRef.current = true

        getUserSession()
    }, [])
    
    
    const handleLogin = async () => {
        try {
            const data = await signIn('google', {
                redirect: false
            })

        } catch (error) {
            throw new Error(error)
        }
    }

  return (
    <div>
        <button onClick={handleLogin}>Google</button>
    </div>
  )
  
}

export default Login