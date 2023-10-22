import express from 'express'
import { createProd } from '../controllers/productController'
import { getAllProds } from '../controllers/productController'
import { getOneProd } from '../controllers/productController'
import { removeProd } from '../controllers/productController'
import { editProd } from '../controllers/productController'

const productRouter = express.Router()

router.post('/create', createProd)
router.get('/show-all', getAllProds)
router.get('/show-one/:id', getOneProd)
router.patch('/edit/:id', editProd)
router.delete('/delete/:id', removeProd)

export default productRouter