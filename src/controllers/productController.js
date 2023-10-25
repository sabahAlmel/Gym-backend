
import product from '../models/productModel.js'

//create product
const createProd = async (req, res) => {
    const { prodName, prodPrice } = req.body
    const files = req.files
    const prodImage = files.map(item => item.path)

    if (!prodName || !prodPrice || !prodImage)
        return res.status(400).send('All fields are required!')

    try {
        const newProd = await product.create({
            prodName,
            prodPrice,
            prodImage
        })
        res.status(201).json({ data: newProd })

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
    const {id} = req.body
    
    try {
        const deleteProd = await product.findByIdAndDelete(id)
        if (deleteProd)
            res.status(200).send(`Product ${id} is removed successfully!`)
        else
            res.status(404).send(`Product ${id} is not found!`)
    }
    catch(error) {
        console.log('Error in removing data: ', error)
        res.status(500).send('Internal Server Error!')
    }
}

//update a product
const editProd = async (req, res) => {
    const { prodName, prodPrice } = req.body
    const files = req.files
    const prodId = req.body.id
    const prodImage = files.map(item=> item.path)
    console.log(prodImage)
    // console.log(prodName, prodPrice, prodImage)
    if (!prodName || !prodPrice || !prodImage)
        return res.status(400).send('All fields are required!')

    try {
        const updateProd = await product.findOneAndUpdate({ _id: prodId }, { prodName: req.body.prodName }, { prodPrice: req.body.prodPrice }, { prodImage: req.body.prodImage })
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