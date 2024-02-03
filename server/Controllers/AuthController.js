import { User } from "../Models/UserModel.js";
import bcryptjs from "bcryptjs";
import jsonwebtoken from 'jsonwebtoken'

const maxAge = 3 * 24 * 60 * 60 
const key = 'maliktowkeerulislam'

const createToken = (id) => {
    return jsonwebtoken.sign({id}, key, {
        expiresIn: maxAge
    })
}

const handleError = (err) => {
  const errors = {
    email: '',
    password: ''
  };

  if(err.message === 'incorrect email'){
    errors.email = 'Email id is not correct'
  }
  if(err.message === 'incorrect password'){
    errors.password = 'Password is incorrect'
  }

  if(err.code === 11000){
    errors.email = 'Email is Alredy Registered'
    return errors
  }

  if(err.message.includes("User validation failed")){
    Object.values(err.errors).forEach(({properties}) => {
      errors[properties.path] = properties.message;
      console.log(properties.path);
    })
  }

  return errors;
};

//login
export async function login(req, res) {
  try {
    const { email, password } = req.body;
    const user = await User.login(email, password)
    if(user){
      res.cookie('jwt', createToken(user._id))
      return res.status(200).json({user})
    }
  } catch (error) {
    console.log(error);
    const errors = handleError(error)
    res.json({errors})
  }
}

//register
export async function register(req, res) {
  try {
    const {email, password} = req.body;
    const newUser = await User.create({email, password})
    if(newUser){
        res.cookie('jwt', createToken(newUser._id), {
            maxAge: maxAge * 100,
            withCrediantels: true,
            httpOnly: true
        })
        res.status(200).json({user: newUser._id, created: true})

    }

  } catch (error) {
    console.log(error);
    const errors = handleError(error)
    res.json({errors, created: false})
  }
}
