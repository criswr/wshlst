'use client'

import React, { useContext, useEffect, useState } from 'react'
import Image from 'next/image'
import withReactContent from 'sweetalert2-react-content'
import Swal from 'sweetalert2'

import { mlConstants } from '../../../constants/mlConstants'
import AccountImput from '../../../components/account/AccountImput'
import formHome from '../../../public/formHome.svg'
import formWork from '../../../public/formWork.svg'
import BackButton from '../../../components/BackButton'
import WhiteButton from '../../../components/WhiteButton'
import { UserContext } from '../../../components/context/context'
import { bottomRight } from '../../../constants/sweetAlertContants'
import InfoBox from '../../../components/InfoBox'

/* 
https://api.mercadolibre.com/classified_locations/countries/CL
https://api.mercadolibre.com/classified_locations/states/TUxDUE1FVEExM2JlYg
https://api.mercadolibre.com/items/MLC552551723/shipping_options?city_to=TUxDQ0NPTGNkMWZj
*/

const Direccion = () => {
  const { user } = useContext(UserContext)
  const MySwal = withReactContent(Swal)

  const defaultOption = [{id: 'select', name: 'Seleccionar...'}]

  const [selectedState, setSelectedState] = useState(...defaultOption)
  const [selectedCity, setSelectedCity] = useState(...defaultOption)
  const [cities, setCities] = useState(defaultOption)
  const [name, setName] = useState('')
  const [street, setStreet] = useState('')
  const [streetNumber, setStreetNumber] = useState('')
  const [extraInfo, setExtraInfo] = useState('')
  const [isCommercial, setIsCommercial] = useState()
  const [phone, setPhone] = useState('')
  const [saveClicked, setSaveClicked] = useState(false)

  const Toast = MySwal.mixin(bottomRight)

  useEffect(() => {
    if (selectedState.id !== 'select'){
      const citiesApiUrl = mlConstants.mlApiUrl + '/classified_locations/states/' + selectedState.id
      const fetchMlCities = () => (
        fetch(citiesApiUrl)
        .then(res => res.json())
        .then(data => setCities([...defaultOption, ...data.cities]))
      )
      fetchMlCities()
    }
  }, [selectedState])
  
  const handleOnChangeState = e => {
    const stateObj = mlConstants.states.find(elem => elem.id === e.target.value)
    setSelectedCity(...defaultOption)
    setSelectedState(stateObj)
  }

  const handleOnChangeCity = e => {
    const cityObj = cities.find(elem => elem.id === e.target.value)
    setSelectedCity(cityObj)
  }

  const handleOnChangeName = e => {
    setName(e.target.value)
  }

  const handleOnChangeStreet = e => {
    setStreet(e.target.value)
  }

  const handleOnChangeStreetNumber = e => {
    setStreetNumber(e.target.value)
  }

  const handleOnChangeExtraInfo = e => {
    setExtraInfo(e.target.value)
  }
  const handleOnChangeIsCommercial = e => {
    setIsCommercial(e.target.value)
  }

  const handleOnChangePhone = e => {
    setPhone(e.target.value)
  }

  const handleOnSave = () => {
    setSaveClicked(true)

    if (!name || !selectedState || !selectedCity || !street || !streetNumber || !phone) return Toast.fire({icon: 'error', title: 'Ingresa los datos faltantes' })

    const isCommercialBool = isCommercial === 'true'
    const newAddress = {
      user: user.uuid,
      state: selectedState,
      city: selectedCity,
      name,
      street,
      streetNumber,
      extraInfo,
      isCommercial: isCommercialBool,
      phone,
    }
    console.log('datos', newAddress)

    fetch('/api/settings/address', {
      method: 'PUT',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(newAddress),
    })
    .then(res => res.json())
    .then(data => {
      if (data.response){
        Toast.fire({
          icon: 'success',
          title: 'Ajustes guardados!'
        })
      }

      if (data.error) {
        Toast.fire({
          icon: 'error',
          title: data.error
        })
        console.log(data.error)
      }
    })
  }

  useEffect(() => {
    const findAddress = () => {
      fetch('/api/settings/address', {
          method: 'GET',
          headers: {'Content-Type': 'application/json'}
      })
      .then(res => res.json())
      .then(data => {
        const response = data.response
        if (response.name){
          setName(response.name)
          setSelectedState(response.state)
          setSelectedCity(response.city)
          setStreet(response.street)
          setStreetNumber(response.streetNumber)
          setExtraInfo(response.extraInfo)
          setIsCommercial(response.isCommercial)
          setPhone(response.phone)
        }
      })
    }
    findAddress()
  }, [])

  return (
    <div className='w-full p-2 flex flex-col gap-4 flex-wrap items-center'>
      <div className='w-full'>
        <BackButton />
        <h1>Dirección de despacho</h1>
      </div>

      <InfoBox text='La dirección de despacho completa es totalmente privada y jamás se revelará a quienes te envíen regalos.' />
  
      <AccountImput 
        name='name'
        label='Nombre y apellidos:'
        type='text'
        value={name}
        bottom='Igual como está en la cédula de identidad'
        onChange={e => handleOnChangeName(e)}
        saveClicked={saveClicked}
      />

      <div className='w-full flex flex-col md:flex-row gap-4 md:gap-0 flex-wrap max-w-2xl'>
        <div className='md:w-1/2 md:pr-1'>
          <label htmlFor='state' className='pl-2'>Región:</label>
          <select name='state' id='state' value={selectedState.id} onChange={e => handleOnChangeState(e)} className={`bg-white border border-muted rounded h-10 w-full p-2 ${saveClicked && selectedState.id === 'select' && 'border-accent'} disabled:bg-grey`}>
            {
              mlConstants.states.map(state => (
                <option key={state.id} value={state.id} disabled={state.id === 'select'}>{state.name}</option>
              ))
            }
          </select>
        </div>

        <div className='md:w-1/2 md:pl-1 md:pb-4'>
          <label htmlFor='city' className='pl-2'>Comuna:</label>
          <select name='city' id='city' disabled={selectedState.id === 'select'} value={selectedCity.id} onChange={e => handleOnChangeCity(e)} className={`bg-white border border-muted rounded h-10 w-full p-2 ${saveClicked && selectedCity.id === 'select' && 'border-accent'} disabled:bg-grey`}>
            {
              cities && cities.map(city => (
                <option key={city.id} value={city.id} title={city.name} label={city.name} disabled={city.id === 'select'} >{city.name}</option>
              ))
            }
          </select>
        </div>

      <AccountImput 
        name='street'
        label='Calle:'
        type='text'
        value={street}
        bottom='Solamente el nombre de la calle o avenida'
        onChange={e => handleOnChangeStreet(e)}
        halfL
        saveClicked={saveClicked}
      />

      <AccountImput 
        name='number'
        label='Número:'
        type='text'
        value={streetNumber}
        onChange={e => handleOnChangeStreetNumber(e)}
        halfR
        saveClicked={saveClicked}
      />

      </div>

      <AccountImput 
        name='extraInfo'
        label='Referencias adicionales:'
        type='text'
        value={extraInfo}
        onChange={e => handleOnChangeExtraInfo(e)}
        bottom='Número de departamento, puntos de referencia o indicaciones de seguridad'
        saveClicked={saveClicked}
      />

      <div className='w-full max-w-2xl'>
        <label htmlFor='commercial' className='pl-2'>Tipo de domicilio:</label>
        <fieldset className='flex gap-7 p-2' onChange={e => handleOnChangeIsCommercial(e)}>
          <div className='flex gap-2'>
            <input type='radio' id='home' name='isCommercial' value={false} defaultChecked={!isCommercial} />
            <label htmlFor='home' className='flex items-center gap-2'><Image src={formHome} width={20} height={20} alt='Casa' />Casa</label>
          </div>
          <div className='flex gap-2'>
            <input type='radio' id='commercial' name='isCommercial' value={true} />
            <label htmlFor='commercial' className='flex items-center gap-2'><Image src={formWork} width={20} height={20} alt='Trabajo' />Trabajo</label>
          </div>
        </fieldset>
      </div>

      <AccountImput 
        name='phone'
        label='Teléfono:'
        type='text'
        value={phone}
        onChange={e => handleOnChangePhone(e)}
        saveClicked={saveClicked}
      />

      <div className='w-full max-w-2xl flex justify-end py-5'>
        <WhiteButton label='Guardar' onClick={handleOnSave} />
      </div>
    </div>
  )
}

export default Direccion