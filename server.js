import express from "express";
import dbConnect from "./src/config/dbConnection.js";
import userRouter from "./src/routes/userRoutes.js";
const app = express()

dbConnect()
app.listen(5000, () => {
    console.log(`Listening on port 5000`)
})
app.use(express.json()); 
app.use('/users', userRouter)