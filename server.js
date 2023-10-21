
import express from "express";
import dbConnect from "./src/config/dbConnection.js";
import router from "./src/routes/visitor.js";

const app = express();

//Establish database connection

dbConnect();


app.use(express.json());

app.use('/ContactUs',router)


app.listen(5000, () => {
    console.log(`Listening on port 5000`)
})   






