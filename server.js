import express from "express";

const app = express()

app.listen(port, () => {
    console.log(`Listening on port ${port}`)
})

app.use(express.json()); 
app.use(urlencoded({extended: true}))
app.use('/training',trainingRouter)
app.use('/regime', regimeRouter)
app.use('/products',productsRouter)
app.use('/socials',socialsRouter)
app.use('/gymPlans',gymPlansRouter)
