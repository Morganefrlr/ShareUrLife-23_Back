import {db} from '../config/connect.js'

export const addRelation = (req, res) =>{
    if(!req.auth.userId){
        res.status(401).json({message : 'Non Autorisé!'})
    }
    const q = 'INSERT INTO relation (`followerUserId`, `followedUserId`) VALUES (?)'
    const values = [req.auth.userId, req.body.followedUserId]

    db.query(q, [values], (err,data) =>{
        if(err) return res.status(500).json(err)
        return res.status(200).json('Relation bien ajouté')
    })
}

export const deleteRelation = (req, res) =>{
    if(!req.auth.userId){
        res.status(401).json({message : 'Non Autorisé!'})
    }
    const q = 'DELETE FROM relation WHERE `followerUserId` =? AND `followedUserId` =?'
    db.query(q,[req.auth.userId, req.params.id], (err,data) =>{
        if(err) res.status(500).json(err)
        return res.status(200).json('Relation supprimé!')
    })
}


export const getFollower = (req, res) =>{
    if(!req.auth.userId){
        res.status(401).json({message : 'Non Autorisé!'})
    }
    const q = 'SELECT r.*, username, profilPic, occupation FROM relation AS r JOIN user AS u ON(u.id = r.followerUserId) WHERE followedUserId =?'

    db.query(q,[req.params.id], (err,data) =>{
        if(err) res.status(500).json(err)
        return res.status(200).json(data)
    })
}


export const getFollowed = (req, res) =>{
    if(!req.auth.userId){
        res.status(401).json({message : 'Non Autorisé!'})
    }
    const q = 'SELECT r.*, username, profilPic, occupation FROM relation AS r JOIN user AS u ON(u.id = r.followedUserId) WHERE followerUserId =?'

db.query(q,[req.params.id], (err,data) =>{
    if(err) res.status(500).json(err)
    return res.status(200).json(data)
})
}


export const getIdFollowed = (req, res) =>{
    if(!req.auth.userId){
        res.status(401).json({message : 'Non Autorisé!'})
    }
    const q = 'SELECT followedUserId FROM relation WHERE followerUserId =?'

db.query(q,[req.params.id], (err,data) =>{
    if(err) res.status(500).json(err)
    return res.status(200).json(data)
})
}