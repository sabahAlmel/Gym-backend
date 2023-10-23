import express from 'express'
import dbconnect from './src/config/dbConnection.js'
import router from './src/routes/productRoutes.js'


const app = express()

dbconnect()

app.use(express.json())
app.use('/product', router)

app.listen(5000, ()=>{
    console.log(`Listening on port 5000`)
})
