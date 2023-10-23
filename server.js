import express, { urlencoded } from "express";
import dbConnect from "./src/config/dbConnection.js";
// import userRouter from "./src/routes/userRoutes.js";
import 'dotenv/config'
import socialmediaRouter from "./src/routes/socialRouter.js";
const app = express()
dbConnect()
const port = process.env.PORT

app.listen(5000, () => {
    console.log(`Listening on port 500`)
})

app.use(express.json()); 
app.use(urlencoded({extended: true}))
// app.use('/users', userRouter)
app.use('/socialmedia',socialmediaRouter)

