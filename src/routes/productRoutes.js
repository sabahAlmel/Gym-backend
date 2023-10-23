import express from 'express'

import upload from '../middlewares/upload.js'
import { createProd } from '../controllers/productController.js'
import { getAllProds } from '../controllers/productController.js'
import { getOneProd } from '../controllers/productController.js'
import { removeProd } from '../controllers/productController.js'
import { editProd } from '../controllers/productController.js'


const productRouter = express.Router()

productRouter.post('/create', upload.single('prodImage'), createProd)
productRouter.get('/show-all', getAllProds)
productRouter.get('/show-one/:id', getOneProd)
productRouter.patch('/edit/:id', editProd)
productRouter.delete('/delete/:id', removeProd)

export default productRouter

