'use client'

import React, { useEffect, useRef } from 'react'
import { getSession, signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'

import signInImage from '../../public/signInImage.svg'
import Link from 'next/link'

const Login = () => {
    const dataFetchedRef = useRef(false)
    const router = useRouter()
    
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
                }).then(res => res.json())
                .then(data => !data.username && router.push('/cuenta/informacion'))

                newUser(session.user.email, session.user.name)
                
                router.push('/cuenta')
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
            console.log(data)

        } catch (error) {
            throw new Error(error)
        }
    }

  return (
    <div className='p-2 mx-auto'>
        <div className='p-5 my-10 shadow-lg rounded-lg flex flex-col items-center text-center w-full'>
            <h1>Bienvenido!</h1>
            <h2 className='text-lg text-muted'>Ingresa y empieza a compartir tu lista de deseos</h2>
            <Image src={signInImage} alt='Ingresa a MGTA' width={400} className='my-7 md:mx-10'/>
            <button onClick={handleLogin} className="text-white w-full md:w-fit bg-[#4285F4] hover:bg-[#4285F4]/90 focus:ring-4 focus:outline-none focus:ring-[#4285F4]/50 rounded-lg px-5 py-2.5 text-center inline-flex items-center justify-center dark:focus:ring-[#4285F4]/55 mr-2 mb-2"><svg className="mr-2 -ml-1 w-4 h-4" aria-hidden="true" focusable="false" data-prefix="fab" data-icon="google" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 488 512"><path fill="currentColor" d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z" /></svg>Ingresa con Google</button>
            <Link href='https://locu.cl/soporte/' target='_blank'>
                <p className='text-muted text-sm'>Necesitas ayuda?</p>
            </Link>
        </div>
    </div>
  )
  
}

export default Login