import mongoose from "mongoose"
import 'dotenv/config'

async function dbconnect() {
    try {
        await mongoose.connect(process.env.URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
        console.log("Connected to MongoDB")
    }
    catch (error) {
        console.log("Error conntecting to Database: ", error)
    }
}

export default dbconnect