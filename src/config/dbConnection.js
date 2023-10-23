


// import "dotenv/config"
// import mongoose from "mongoose";



// mongoose.connect(process.env.URL, { useNewUrlParser: true, useUnifiedTopology: true });
// const db = mongoose.connection;
// db.on("error", console.error.bind(console, "MongoDB connection error:"));
// db.once("open", () => {
//   console.log("Connected to MongoDB");
// });

// dbConnection.js
import mongoose from "mongoose";
import "dotenv/config";

async function dbConnect() {
    try {
<<<<<<< HEAD
        await mongoose.connect(process.env.URL)
        
    } catch (err) {
        console.log(err)
=======
>>>>>>> origin
        await mongoose.connect(process.env.URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log("Connected to MongoDB");
<<<<<<< HEAD
=======
    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
>>>>>>> origin
    }
    }
    




export default dbConnect;
