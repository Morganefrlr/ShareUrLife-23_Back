import express from 'express'
const router = express.Router()
import {addComment, getComments, deleteComment, updateComment} from '../controllers/commentControl.js'
import {auth} from '../middleware/auth.js'

router.post('/',auth, addComment)
router.get('/:id',auth, getComments)
router.put('/:id',auth, updateComment)
router.delete('/:id',auth, deleteComment)


export default router