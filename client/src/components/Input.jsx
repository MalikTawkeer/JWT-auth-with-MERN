import React from 'react'

const Input = React.forwardRef(function Input({label, className='', type, ...props  }, ref) {
    return (
      <div className=' flex flex-col m-2'>
        {label && <label className=' mb-1 ml-1'>{label}</label>}
        <input
        type={type}
        ref={ref}
        {...props}
        className={`${className} bg-blue-300 outline-none px-3 py-2 border border-gray-400 rounded-lg hover:border-gray-500`}
        />
      </div>
    )
  })

export default Input