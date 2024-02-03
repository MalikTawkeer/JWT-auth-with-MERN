import React from 'react'

function Button({children, className='', type=''}) {
  return (
    <button
    type={type}
    className={`${className} border border-gray-300 rounded-lg px-2 py-1`}
    >
        {children}
    </button>
  )
}

export default Button