import express from "express";
import dbConnect from "./src/config/dbConnection.js";


const app = express()

app.listen(5000, () => {
    console.log(`Listening on port 5000`)
})
dbConnect()
