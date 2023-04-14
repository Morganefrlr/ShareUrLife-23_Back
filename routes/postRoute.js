import express from 'express'
const router = express.Router()
import {getOne, getAll, updatePost, deletePost, addPost} from '../controllers/postControl.js'
import {auth} from '../middleware/auth.js'


router.post('/add',auth, addPost)
router.get('/:id',auth, getOne)
router.get('/',auth, getAll)
router.put('/:id',auth, updatePost)
router.delete('/:id',auth, deletePost)


export default router