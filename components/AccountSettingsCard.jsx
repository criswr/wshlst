import React from 'react'

import edit from '../public/edit.svg'
import Image from 'next/image'

const Toggle = ({id, checked, handleOnToggle}) => {
    return (
        <div className='translate-y-0.5'>
            <input className="hidden" type="checkbox" id={id} value="1" defaultChecked={checked} onChange={handleOnToggle}  />
            <label className="flex items-center w-10 border border-muted h-6 p-1 rounded-full cursor-pointer" htmlFor={id}>
                <span className="w-4 h-4 rounded-full" />
            </label>
        </div>
    )
}

const AccountSettingsCard = ({label, value, onClick, toggle}) => {
    return (
        <div className='bg-white rounded shadow py-2 px-4 mb-4'>
            <p className='font-bold text-lg'>{label}</p>

            <div className='text-muted flex gap-2 items-baseline'>
                {
                    value ||
                    <div className='animate-pulse'>
                        <div className='rounded-full bg-muted h-3 w-48 my-1.5' />
                    </div>
                }
                {
                    onClick && value &&
                    <button onClick={onClick} className='translate-y-0.5'>
                        <Image src={edit} height={15} width='auto' alt='Editar' />
                    </button>
                }
            </div>

            {
                value && toggle &&
                <div className='flex justify-between'>
                    <p className='text-muted'>{toggle.label}</p>
                    <Toggle id={label} checked={toggle.checked} handleOnToggle={toggle.onToggle}/>
                </div>
            }
        </div>
    )
}

export default AccountSettingsCard