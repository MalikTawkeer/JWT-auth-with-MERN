import React from 'react'
import {useNavigate} from 'react-router-dom'
import { useEffect } from 'react'
import axios from 'axios'
import {Cookies, useCookies} from 'react-cookie'
import {ToastContainer, toast} from 'react-toastify'

function Secret() {
  const navigate = useNavigate()
  const [cookies, setCookie, removeCookie] = useCookies([])
  
  useEffect(()=>{
    const verifyUser = async ()=>{
      if(!cookies.jwt){
        navigate('/login')
      }else{
        const {data} = await axios.get("http://localhost:3000/api/v1/", {
          withCredentials: true
        });
        console.log(data);
        if(!data.status){
          removeCookie('jwt')
          navigate('/login')
        }else{
          console.log(data.user);
          toast(`HI, ${data.email}`, {theme: 'dark'})
        }

      }
    }
    verifyUser();
  }, [cookies, navigate, removeCookie])
  const handleLogout = () => {
    removeCookie('jwt')
    navigate('/login')
  }
  return (
    <div className=' bg-blue-600 flex justify-center items-center h-96'>
      <button onClick={handleLogout} className=' w-fit bg-gray-200 rounded-lg px-3 py-2'>
        logout
      </button>
      <ToastContainer />
    </div>
  )
}

export default Secret