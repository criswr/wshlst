import React from 'react'

const AccountImput = ( {name, label, type, value, bottom, onChange, halfL, halfR, saveClicked} ) => {
    const invalid = saveClicked && value === ''

    return (
        <div className={`w-full max-w-2xl ${ halfL && 'md:pr-1 md:w-1/2' } ${ halfR && 'md:pl-1 md:w-1/2' }`}>
            <label htmlFor={name} className='pl-2'>{label}</label>
            <input type={type} id={name} value={value} onChange={onChange} className={`border border-muted rounded h-10 w-full p-2 ${invalid &&'border-accent'}`} />
            <p className='pl-2 text-sm text-muted'>{bottom}</p>
        </div>
    )
}

export default AccountImput