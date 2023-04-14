import express from 'express'
const router = express.Router()
import {getOne, getAll, updateUser, deleteUser} from '../controllers/userControl.js'
import {auth} from '../middleware/auth.js'



router.get('/:id',auth, getOne)
router.get('/all',auth, getAll)
router.put('/:id',auth, updateUser)
router.delete('/:id',auth, deleteUser)


export default router