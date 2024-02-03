import express from 'express'
import {login, register} from '../Controllers/AuthController.js'
import {checkUser} from '../Middlewares/AuthMiddlewares.js'

const router = express.Router()

router.get('/', checkUser)
router.post('/login', login)
router.post('/register', register)

export default router;

