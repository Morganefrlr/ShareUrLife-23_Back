import express from 'express'
const app = express()
import {cors} from "./middleware/cors.js"
import cookieParser from 'cookie-parser'
import dotenv from 'dotenv'
dotenv.config({path:'config/.env'})
import {db} from './config/connect.js'
import multer from 'multer'
const PORT = process.env.PORT || 8800



app.use((req,res, next) =>{
  res.header('Access-Control-Allow-Credentials', true)
  next()
})
app.use(cookieParser())
app.use(cors)
app.use(express.json())



import path from 'path'
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


app.use("/images", express.static(path.join(__dirname, "/images")));
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "images");
    },
    filename: (req, file, cb) => {
      cb(null, req.body.name);
    },
  });
  
  const upload = multer({ storage: storage });
  app.post("/api/upload", upload.single("file"), (req, res) => {
    res.status(200).json("File has been uploaded");
  });


import testRoutes from './routes/test.js'
import authRoute from './routes/authRoute.js'
import userRoute from './routes/userRoute.js'
import postRoute from './routes/postRoute.js'
import commentRoute from './routes/commentRoute.js'
import relationRoute from './routes/relationRoute.js'
import likeRoute from './routes/likeRoute.js'




app.use('/api/', testRoutes)
app.use('/api/auth', authRoute)
app.use('/api/user', userRoute)
app.use('/api/post', postRoute)
app.use('/api/comment', commentRoute)
app.use('/api/relation', relationRoute)
app.use('/api/like', likeRoute)



app.listen(PORT, () => {
    console.log(`Connecté sur le port ${PORT}!`)
})



