import {db} from '../config/connect.js'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'




export const register = (req, res) =>{
    const q = 'SELECT * FROM user WHERE email = ?'
    db.query(q,[req.body.email], (err,data) =>{
        if (err) return res.status(500).json(err)
        if(data.length){
            return res.status(409).json('Utilisateur déjà enregistré!')
        }
        bcrypt.hash(req.body.password, 10)
        .then(hash =>{
            const q = 'INSERT INTO user (`email`,`password`,`username`, `profilPic`) VALUE (?)'
            const values = [req.body.email, hash, req.body.username, req.body.profilPic]
            db.query(q, [values], (err, data) =>{
                if(err) return res.status(500).json(err)
                return res.status(200).json('Utilisateur créé correctement!')
            })
        })
        
    })
}


export const login = (req, res) =>{
    const q = 'SELECT * FROM user WHERE email = ?'
    db.query(q,[req.body.email], (err,data) =>{
        if (err) return res.status(500).json(err)
        if(data.length === 0){
            return res.status(409).json('Mot de passe ou Email invalide!')
        } 
        bcrypt.compare(req.body.password, data[0].password)
        .then(valid =>{
            if(!valid){
                return res.status(401).json('Paire Email/Mot de passe éronnée!')
            } else{
                const token = jwt.sign(
                    {userId : data[0].id},
                    process.env.TOKEN_SECRET,
                    {expiresIn: '24h'}
                )
                res.cookie('accessToken', token,{
                    httpOnly : true,
                    secure : true,
                    sameSite : 'none'
                })
                res.status(200).json(data[0])
            }
        })

    })    
}


export const logout = (req, res) =>{
    res.clearCookie('accessToken', {
        secure : true,
        sameSite:'none'
    }).status(200).json("L'utilisateur a bien été déconnecté!")
}