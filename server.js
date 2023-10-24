
import express, { urlencoded } from "express";
import dbConnect from "./src/config/dbConnection.js";
// import trainingRouter from "./src/routes/trainingRouter.js";

// import regimeRouter from "./src/routes/regimeRouter.js";
import productsRouter from "./src/routes/productsRouter.js";
import socialsRouter from "./src/routes/socialsRouter.js";
// import gymPlansRouter from "./src/routes/gymplansRouter.js";

import 'dotenv/config'


const app = express()


dbConnect()

app.use(express.json())

const port = process.env.PORT




app.listen(port, () => {
    console.log(`Listening on port ${port}`)


})

app.use(express.json()); 
app.use(urlencoded({extended: true}))
// app.use('/training',trainingRouter)
// app.use('/regime', regimeRouter)
app.use('/products',productsRouter)
app.use('/socials',socialsRouter)
// app.use('/gymPlans',gymPlansRouter)
