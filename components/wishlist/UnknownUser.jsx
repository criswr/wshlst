import React from 'react'

import noUser from '../../public/noUser.svg'

const UnknownUser = ({ userName }) => {
  return (
    <div className='w-full rounded py-10 px-2 flex flex-col items-center gap-5'>
    <Image src={noUser} alt='No hay usuario' width='auto' height={400} />
    <h2>No encontramos al usuario {userName}</h2>
    <p className='text-center max-w-screen-sm'>Seguramente sufrió combustión espontánea, es decir que ya no existe debido a fuego originado sin una fuente externa aparente de ignición, que probablemente comenzó dentro del cuerpo de la persona. Eso o el nombre de usuario está mal escrito.</p>
    <Link href='/'>
        <button className='bg-grey font-semibold py-2 px-4 mr-2 mb-2 border border-muted rounded shadow hover:bg-white'>Volver</button>
    </Link>
</div>
  )
}

export default UnknownUser