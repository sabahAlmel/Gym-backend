import express, { urlencoded } from "express";
import dbConnect from "./src/config/dbConnection.js";
import userRouter from "./src/routes/userRoutes.js";
import 'dotenv/config'
import visitorRouter from "./src/routes/visitor.js";
const app = express()
dbConnect()
const port = process.env.PORT

app.listen(port, () => {
    console.log(`Listening on port ${port}`)
})

app.use(express.json()); 
app.use(urlencoded({extended: true}))
app.use('/users', userRouter)
app.use('/visitor', visitorRouter)
