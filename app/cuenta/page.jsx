import Link from 'next/link'
import React from 'react'

const cuenta = () => {
  return (
    <div>
        <h1>Cuenta</h1>
        <Link href='/cuenta/informacion'>Información de la cuenta</Link>
    </div>
  )
}

export default cuenta