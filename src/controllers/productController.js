import product from '../models/productModel'

//create product
const createProd = async (req, res) => {
    const { prodName, prodPrice, prodImage } = req.body
    if (!prodName || !prodPrice || !prodImage)
        return res.status(400).send('All fields are required!')

    try {
        const newProd = await product.create({
            prodName,
            prodPrice,
            prodImage
        })
        res.status(201).send(newProd)
    }
    catch(error) {
        console.log('Error in saving data: ', error)
        res.status(500).send('Internal Server Error!')
    }
}

//display all the products
const getAllProds = async (req, res) => {
    try {
        const prods = await product.find()
        res.status(200).send(prods)
    }
    catch(error) {
        console.log('Error in displaying data: ', error)
        res.status(500).send('Internal Server Error!')
    }
}

//display one product by ID
const getOneProd = async (req, res) => {
    const prodId = req.params.id
    try {
        const prod = await product.findById(prodId)
        if (prod)
            res.status(200).send(prod)
        else
            res.status(404).send(`Product ${prodId} is not found!`)
    }
    catch(error) {
        console.log('Error in displaying data: ', error)
        res.status(500).send('Internal Server Error!')
    }
}

//remove a product
const removeProd = async (req, res) => {
    const prodId = req.params.id
    try {
        const deleteProd = await product.findByIdAndDelete(prodId)
        if (deleteProd)
            res.status(200).send(`Product ${prodId} is removed successfully!`)
        else
            res.status(404).send(`Product ${prodId} is not found!`)
    }
    catch(error) {
        console.log('Error in removing data: ', error)
        res.status(500).send('Internal Server Error!')
    }
}

//update a product
const editProd = async (req, res) => {
    const prodId = req.body.id
    if (!prodName || !prodPrice || !prodImage)
        return res.status(400).send('All fields are required!')

    try {
        const updateProd = await product.findOneAndUpdate({ prodId: prodId }, { prodName: req.body.prodName }, { prodPrice: req.body.prodPrice }, { prodImage: req.body.prodImage })
        if (!updateProd)
            res.status(404).send(`Product ${prodId} is not found!`)
        else
            res.status(200).send(`Product ${prodId} is edited successfully!`)

    }
    catch(error) {
        console.log('Error in editing data: ', error)
        res.status(500).send('Internal Server Error!')
    }
}

//exporting functions to use in other files
export { createProd, getAllProds, getOneProd, removeProd, editProd }