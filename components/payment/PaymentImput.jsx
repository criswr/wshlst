import React from 'react'

const PaymentImput = ( {name, label, type, value, bottom, onChange, maxLength} ) => {

    return (
        <div className={`w-full max-w-xl`}>
            <label htmlFor={name} className='pl-2'>{label}</label>
            <input type={type} id={name} value={value} onChange={onChange} maxLength={maxLength} className={`border border-muted rounded h-10 w-full p-2`} />
            <p className='pl-2 text-sm text-muted'>{bottom}</p>
        </div>
    )
}

export default PaymentImput