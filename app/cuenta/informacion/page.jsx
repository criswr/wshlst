'use client'

import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'

import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

import { forbiddenUsernames } from './ForbiddenUsernames'
import BackButton from '../../../components/BackButton'
import AccountSettingsCard from '../../../components/AccountSettingsCard'
import UploadProfilePicture from '../../../components/UploadProfilePicture'

const Informacion = () => {
  const MySwal = withReactContent(Swal)
  const { data } = useSession()
  const router = useRouter()
  const [user, setUser] = useState()
  
  useEffect(() => {
    if (data === null) router.push('/login')
  }, [data])
  

  const Toast = MySwal.mixin({
    toast: true,
    position: 'bottom-end',
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: false,
    didOpen: (toast) => {
      toast.addEventListener('mouseenter', Swal.stopTimer)
      toast.addEventListener('mouseleave', Swal.resumeTimer)
    }
  })

  const swalConfig = {
    showCancelButton: true,
    confirmButtonText: 'Guardar',
    cancelButtonText: 'No, cancelar',
    confirmButtonColor: '#959492',
    cancelButtonColor: '#cf456c',
    showClass: {popup: 'animate_animated animate_fadeInUp'},
    hideClass: {popup: 'animate_animated animate_fadeOutDown'},
  }

  const handleOnChangeUsername = async () => {
    const validUsername = /^(?=.{5,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/
  
    const { value: data } = await MySwal.fire({
      ... swalConfig,
      title: 'Ingresa un nombre de usuario',
      input: 'text',
      inputValue: user.username,
      inputValidator: (value) => {
        const un = value.toLowerCase()
        if (un === user.username.toLowerCase()) MySwal.close()
        if (un.length < 5) return 'El nombre de usuario es muy corto'
        if (!validUsername.test(un) || forbiddenUsernames.includes(un)) return 'Esto no es válido como nombre de usuario'
      }
    })
    
    if (data) {
      const un = data.toLowerCase()
      handleOnSave({newUsername: un})
    }
  }

  const handleOnChangeName = async () => {
    const validName = /^[a-zA-Z0-9~$^_?¿!¡. -]*$/

    const { value: data } = await MySwal.fire({
      ... swalConfig,
      title: 'Ingresa un nombre',
      input: 'text',
      inputValue: user.name,
      inputValidator: (value) => {
        if (value === user.username) MySwal.close()
        if (value.length > 50) return 'El nombre de usuario es muy largo'
        if (!validName.test(value)) return 'El nombre contiene carácteres extraños'
        if (forbiddenUsernames.includes(value.toLowerCase())) return 'Este nombre está prohibido'
      }
    })
    
    if (data) {
      handleOnSave({newName: data})
    }
  }

  const handleOnChangeBirthdate = async () => {
    const { value: data } = await MySwal.fire({
      ... swalConfig,
      title: 'Ingresa tu fecha de nacimiento',
      html: '<input type="date" id="birthdate-input" min="1900-01-01" max="2023-12-31" class="swal2-input"/>',
      preConfirm: () => document.getElementById('birthdate-input').value
    })
    
    if (data) {
      handleOnSave({newBirthdate: data + 'T00:00-0800'})
    }
  }

  const handleOnChangeConfig = ({config}) => {
    if (config === 'birthday'){
      if (!user.birthdate) return handleOnChangeBirthdate()
      handleOnSave({newConfig: {...user.config, showBirthday: !user.config.showBirthday}})
    }
  }


  const handleOnSave = ({newName, newImg, newUsername, newBirthdate, newConfig}) => {
    fetch('/api/settings', {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            email: user.email,
            ... newName ? {newName: newName} : {},
            ... newImg ? {newImg: newImg} : {},
            ... newUsername ? {newUsername: newUsername} : {},
            ... newBirthdate ? {newBirthdate: newBirthdate} : {},
            ... newConfig ? {newConfig: newConfig} : {},
        }),
    })
    .then(res => res.json())
    .then(data => {
      if (data.response){
        setUser({...user, 
          ... newName ? {name: newName} : {},
          ... newImg ? {img: newImg} : {},
          ... newUsername ? {username: newUsername} : {},
          ... newBirthdate ? {birthdate: newBirthdate} : {},
          ... newConfig ? {config: {
            ... user.config,
            showBirthday: !user.config.showBirthday
          }} : {},
        })
        Toast.fire({
          icon: 'success',
          title: 'Ajustes guardados!'
        })
      }

      if (data.error) {
        handleOnChangeUsername()
        Toast.fire({
          icon: 'error',
          title: data.error
        })
        console.log(data.error);
      }
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
        })
      }
      findUser(data.user.email)
    }
  }, [data])

  useEffect(() => {
    if (user) !user.username && handleOnChangeUsername()
  }, [user])
  
  const birthdate = date => {
    if (!date) return null
    const birthday = new Date(date)
    return birthday.toLocaleDateString('es-ES')
}

  return (
    <div className='w-full p-2'>
      <BackButton />
      <h1>Información de la cuenta</h1>
      <div className='flex flex-col items-center'>
        <div className='w-full max-w-4xl md:space-y-7'>
          <UploadProfilePicture img={user?.img} email={user?.email} uuid={user?.uuid} onSave={handleOnSave}/>
          <AccountSettingsCard label='Nombre' value={user?.name} onClick={handleOnChangeName} />
          <AccountSettingsCard label='Nombre de usuario' value={user?.username || 'Sin información'} onClick={handleOnChangeUsername} />
          <AccountSettingsCard label='Email' value={user?.email}  />
          <AccountSettingsCard label='Cumpleaños' value={birthdate(user?.birthdate) || 'Sin información'} onClick={handleOnChangeBirthdate} 
            toggle={{
              label: 'Mostrar cuenta regresiva en el perfil',
              checked: user?.config.showBirthday,
              onToggle: () => {handleOnChangeConfig({config: 'birthday'})},
            }} 
          />
        </div>
      </div>
    </div>
  )
}

export default Informacion