import {db} from '../config/connect.js'

export const addLike = (req,res) =>{
    if(!req.auth.userId){
        res.status(401).json({message : 'Non Autorisé!'})
    }
    const q = 'INSERT INTO likes (`userId`, `postId`) VALUES (?) '
    const values = [req.auth.userId, req.body.postId]
    
    db.query(q,[values],(err,data) =>{
        if(err) return res.status(500).json(err)
        return res.status(200).json('Le post a été liké!')
    })
}


export const getLikes = (req,res) =>{
    if(!req.auth.userId){
        res.status(401).json({message : 'Non Autorisé!'})
    }
    const q = 'SELECT userId FROM likes WHERE postId=?'
    db.query(q,[req.params.id], (err, data) =>{
        if(err) res.status(500).json(err)
        return res.status(200).json(data.map(like=>like.userId))
    })
}


export const deleteLike = (req,res) =>{
    if(!req.auth.userId){
        res.status(401).json({message : 'Non Autorisé!'})
    }
    const q = 'DELETE FROM likes WHERE `userId` =? AND `postId` =?'
    db.query(q,[req.auth.userId, req.params.id], (err,data) =>{
        if(err) res.status(500).json(err)
        return res.status(200).json('like supprimé!')
    })
}