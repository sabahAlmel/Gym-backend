import express from 'express'
import upload from '../middlewares/upload.js'
import { createProd } from '../controllers/productController.js'
import { getAllProds } from '../controllers/productController.js'
import { getOneProd } from '../controllers/productController.js'
import { removeProd } from '../controllers/productController.js'
import { editProd } from '../controllers/productController.js'

const router = express.Router()

router.post('/create', upload.single('prodImage'), createProd)
router.get('/show-all', getAllProds)
router.get('/show-one/:id', getOneProd)
router.put('/edit/:id', editProd)
router.delete('/delete/:id', removeProd)

export default router