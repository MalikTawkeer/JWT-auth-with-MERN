import React, { useState } from 'react'
import Button from '../components/Button'
import Input from '../components/Input'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import {ToastContainer ,toast} from 'react-toastify'

function Login() {
    const [email, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate()

    const  generateError = (err) => {
      toast.error(err, {
        position: 'bottom-right'
      })
    }
    const handleLogin = async (e) => {
      e.preventDefault()
      const {data} = await axios.post('http://localhost:3000/api/v1/login', {email, password}, {
        withCredentials: true
      })
      console.log(data);
      
        if(data.errors){
          const {email, password} = data.errors
          if(email) generateError(email)
          else if (password) generateError(password)
        }else{
      navigate('/')
      }

    }
  return (
    <div className=' p-5 bg-gray-300 rounded-md w-[300px] mx-auto mt-5 border-t-4 border-t-blue-600'>

        <form onSubmit={handleLogin} className=' flex flex-col justify-center items-center'>
            <h2 className=' mb-3 font-bold'>Login Account</h2>
            <Input
            label='Enter Username or Email'
            type='text'
            value={email}
            onChange={(e) => setUsername(e.currentTarget.value)}
            />
            
            <Input
            label='Enter Password'
            type='password'
            value={password}
            onChange={(e) => setPassword(e.currentTarget.value)}
            />

            <Button type='submit' className=' bg-blue-600 text-white w-[100px] hover:bg-blue-500 mb-2'>
                {'Login'}
            </Button>
            <span>Dont Have An account <Link to='/register' className=' text-blue-500 font-semibold hover:underline'>Register</Link></span>
        </form>
        <ToastContainer />
    </div>
  )
}

export default Login