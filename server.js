<<<<<<< HEAD
import express from "express";
import dbConnect from "./src/config/dbConnection";

=======
import express, { urlencoded } from "express";
import dbConnect from "./src/config/dbConnection.js";
import userRouter from "./src/routes/userRoutes.js";
import 'dotenv/config'
import visitorRouter from "./src/routes/visitor.js";
>>>>>>> origin
const app = express()
dbConnect()
const port = process.env.PORT

<<<<<<< HEAD


app.listen(5000, () => {
    console.log(`Listening on port 5000`)
=======
app.listen(port, () => {
    console.log(`Listening on port ${port}`)
>>>>>>> origin
})

app.use(express.json()); 
app.use(urlencoded({extended: true}))
app.use('/users', userRouter)
app.use('/visitor', visitorRouter)
