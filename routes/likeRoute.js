import express from 'express'
const router = express.Router()
import { addLike, deleteLike, getLikes } from '../controllers/likeControl.js'
import {auth} from '../middleware/auth.js'


router.post('/',auth, addLike)
router.get('/:id',auth, getLikes)
router.delete('/:id',auth, deleteLike)


export default router