


import "dotenv/config"
import mongoose from "mongoose";

async function dbConnect() {
    try {
        await mongoose.connect(process.env.URL)
    } catch (err) {
        console.log(err)
    }
}




export default dbConnect;

