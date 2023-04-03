'use client'

import React, { useEffect } from 'react'
import { getSession, signIn } from 'next-auth/react'


const Login = () => {
    
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
        getUserSession()
    }, [])
    


        /*       if (data.user){
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
                newUser(data.user.email, data.user.name)
              } */

    

    
    const handleLogin = async () => {
        try {
            const data = await signIn('google', {
                redirect: false
            })
            

            
        } catch (error) {
            console.log(error)
        }
    }

  return (
    <div>
        <button onClick={handleLogin}>Google</button>
    </div>
  )
  
}

export default Login