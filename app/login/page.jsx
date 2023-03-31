'use client'

import React from 'react'
import { signIn } from 'next-auth/react'

const Login = () => {
    
    const handleLogin = async () => {
        try {
            const data = await signIn('google', {
                redirect: false
            })
            
            console.log(data)
            
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