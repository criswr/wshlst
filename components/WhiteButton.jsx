import React from 'react'

const WhiteButton = ({ label, onClick }) => {
    return (
        <button onClick={onClick} className='font-semibold text-lg py-1 pl-2 pr-3 border border-muted rounded-xl shadow bg-white hover:bg-primary flex items-center justify-center gap-2 w-full md:max-w-xs min-w-sm'>
            <p>{label}</p>
        </button>
    )
}

export default WhiteButton