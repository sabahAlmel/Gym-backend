import express from 'express'
import dbconnect from './src/config/dbConnection'
import router from './src/routes/productRoutes'

const app = express()

dbconnect()

app.use(express.json())
app.use('/dashboard/product', router)

app.listen(5000, ()=>{
    console.log(`Listening on port 5000`)
})
