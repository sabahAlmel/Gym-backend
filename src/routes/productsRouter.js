import express from 'express'

import upload from '../middlewares/upload.js'
import { createProd } from '../controllers/productController.js'
import { getAllProds } from '../controllers/productController.js'
import { getOneProd } from '../controllers/productController.js'
import { removeProd } from '../controllers/productController.js'
import { editProd } from '../controllers/productController.js'


const productRouter = express.Router()

productRouter.post('/add', upload.array('prodImage'), createProd)
productRouter.get('/read', getAllProds)
productRouter.get('/show-one/:id', getOneProd)
productRouter.patch('/update', upload.array('prodImage'), editProd)
productRouter.delete('/delete', removeProd)

export default productRouter

