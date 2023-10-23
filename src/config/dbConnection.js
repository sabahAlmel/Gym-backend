


import "dotenv/config"
import mongoose from "mongoose";

async function dbConnect() {
    try {
        await mongoose.connect(process.env.URL)
        
    } catch (err) {
        console.log(err)
        await mongoose.connect(process.env.URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log("Connected to MongoDB");
    }
    }
    







//database connection 
// const url = process.env.URL

// console.log(url)

// async function dbConnect() {
//     await mongoose.connect(url, { useNewUrlParser: true, useCreateIndex: true });
// }


export default dbConnect;

