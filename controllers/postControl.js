import {db} from '../config/connect.js'
import moment from 'moment'




export const getOne = (req, res) =>{
    if(!req.auth.userId){
        res.status(401).json({message : 'Non Autorisé!'})
    } else {
       const q = 'SELECT p.*, u.id AS userId, username, profilPic FROM post AS p JOIN user AS u ON (u.id = p.userId) WHERE userId = ?'
        db.query(q,[req.params.id],(err, data) =>{
            if(err) return res.status(500).json(err)
            return res.json(data)
        }) 
    }
}


export const getAll = (req, res) =>{
    if(!req.auth.userId){
        res.status(401).json({message : 'Non Autorisé!'})
    } else {
        const q = 'SELECT p.*, u.id AS userId, username, profilPic FROM post AS p JOIN user AS u ON (u.id = p.userId)'
            db.query(q,(err, data) =>{
                if(err) return res.status(500).json(err)
                return res.json(data)
        }) 
    }
}


export const addPost = (req, res) =>{
    
        const q = 'INSERT INTO post(`desc`, `img`, `createdAt`, `userId`) VALUES (?) '
        const values = [
            req.body.desc,
            req.body.img,
            moment(Date.now()).format('YYYY-MM-DD HH:mm:ss'),
            req.auth.userId
        ]

        db.query(q, [values], (err, data) =>{
            if(err) return res.status(500).json(err)
            return res.status(200).json('Votre post a bien été crée!')
        })
    
}


export const updatePost = (req, res) =>{
    const q = 'SELECT * FROM post WHERE id = ?'
    db.query(q,[req.params.id],(err, data) =>{
        if(err) return res.status(500).json(err)
        if(data[0].userId !== req.auth.userId){
            res.status(401).json({message : 'Non Autorisé!'})
        }
        else {
            const q = 'UPDATE post SET `desc`=?, `img`=? WHERE id=?'
            const values = [req.body.desc, req.body.img, req.params.id]
            db.query(q, values, (err,data) =>{
                if(err) return res.status(500).json(err)
                if(data.affectedRows > 0) return res.json('Post mis à jour')
            })
        }
    })
}


export const deletePost = (req, res) =>{
    const q = 'SELECT * FROM post WHERE id = ?'
    db.query(q,[req.params.id],(err, data) =>{
        if(err) return res.status(500).json(err)
        if(data[0].userId !== req.auth.userId){
            res.status(401).json({message : 'Non Autorisé!'})
        }
        else {
            const q = 'DELETE FROM post WHERE id=?'
            db.query(q, req.params.id, (err,data) =>{
                if(err) return res.status(500).json(err)
                if(data.affectedRows > 0) return res.json('Post supprimé!')
            })
        }
    })
}