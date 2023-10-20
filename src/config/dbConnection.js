


import "dotenv/config"
import mongoose from "mongoose";

async function dbConnect() {
    try {
        await mongoose.connect(process.env.URL)
    } catch (err) {
        console.log(err)
    }
}







//database connection 
// const url = process.env.URL

// console.log(url)

// async function dbConnect() {
//     await mongoose.connect(url, { useNewUrlParser: true, useCreateIndex: true });
// }


export default dbConnect;

