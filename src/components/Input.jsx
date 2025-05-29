import React from 'react'

const Input = ({ className = "", ...props }) => {
    return (
        <input type="text"
            className={'w-[500px] align-center border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none ${className}'}

            {...props}
        />
    )
}

export default Input