import React, { useState } from "react";
import Input from "../components/Input";
import Button from "../components/Button";
import { Link, useNavigate } from "react-router-dom";
import {ToastContainer, toast} from 'react-toastify'
import axios from 'axios'

function Register() {
  const [email, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()

  const generateError = (err) => {
    toast.error(err, {
      position:"bottom-right"
    })
  }

  const handleRegister = (e) => {
    e.preventDefault()
    axios.post('http://localhost:3000/api/v1/register', {email, password}, {withCredentials: true})
      .then((res) => {
        if(res.data){
          console.log('ERR',res.data.errors);
          if(res.data.errors){
            const { email, password } = res.data.errors
            if(email) generateError(email)
            else if(password) generateError(password)
            
          }else{
            navigate('/')
          }
        }
      })
      .catch((err) => {
        console.log(err);
      })

  }

  return (
    <div className=" p-5 bg-gray-300 rounded-md w-[300px] mx-auto mt-5 border-t-4 border-t-blue-600">
      <form
        onSubmit={handleRegister}
        className=" flex flex-col justify-center items-center"
      >
        <h2 className=" mb-3 font-bold">RegisterLogin Account</h2>
        <Input
          label="Enter Username or Email"
          type="text"
          value={email}
          onChange={(e) => setUsername(e.currentTarget.value)}
        />

        <Input
          label="Enter Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.currentTarget.value)}
        />

        <Button
          type="submit"
          className=" bg-blue-600 text-white w-[100px] hover:bg-blue-500 mb-2"
        >
          {"Register"}
        </Button>
        <span>
          Alredy Have An account{" "}
          <Link
            to="/login"
            className=" text-blue-500 font-semibold hover:underline"
          >
            Login
          </Link>
        </span>
      </form>
      <ToastContainer />
    </div>
  );
}

export default Register;
