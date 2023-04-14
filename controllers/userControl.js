import {db} from '../config/connect.js'




export const getOne = (req,res) =>{
    const q = 'SELECT * FROM user WHERE id = ?'
    db.query(q,[req.params.id],(err, data) =>{
        if(err) return res.status(500).json(err)
        return res.json(data[0])
    })
}


export const getAll = (req,res) =>{
    const q = 'SELECT * FROM user'
    db.query(q,(err, data) =>{
        if(err) return res.status(500).json(err)
        return res.json(data)
    })
}

export const updateUser = (req,res) =>{
    const id = parseInt(req.params.id)
    if(id !== req.auth.userId){
        console.log('ok')
        res.status(401).json({message : 'Non Autorisé!'})
    }
    else {
        const q = 'UPDATE user SET `email`=?, `username`=?,`location`=?,`from`=?,`occupation`=?, `profilPic`=?,`coverPic`=?, `birthday`=?, `facebook`=?, `instagram`=?, `tiktok`=? WHERE id=?'
        const values = [req.body.email, req.body.username,req.body.location,req.body.from,req.body.occupation, req.body.profilPic,req.body.coverPic, req.body.birthday, req.body.facebook, req.body.instagram, req.body.tiktok, req.auth.userId]
        db.query(q, values, (err,data) =>{
            if(err) return res.status(500).json(err)
            if(data.affectedRows > 0) return res.json('Profil mis à jour')
        })
    }
}
export const deleteUser = (req,res) =>{
    const id = parseInt(req.params.id)
    if(id !== req.auth.userId){
        res.status(401).json({message : 'Non Autorisé!'})
    }
    else{
        const q = 'DELETE FROM user WHERE id=?'

        db.query(q, req.auth.userId, (err, data) =>{
            if(err) return res.status(500).json(err)
            if(data.affectedRows > 0) return res.json('Profil supprimé!')
        })
    }
}