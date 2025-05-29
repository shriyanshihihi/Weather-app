import React from 'react'

export const Button = ({children , className='',disabled=false,...props}) => {
    return (
        <button
            className={'mt-4 w-[500px] bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed ${className}'}
            disabled={disabled}
            {...props}
            >
                {children}
        </button>
    )
}
