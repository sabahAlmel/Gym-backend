import express from "express";

import upload from "../middlewares/upload.js";
// import { createProd } from '../controllers/productController.js'
// import { getAllProds } from '../controllers/productController.js'
// import { getOneProd } from '../controllers/productController.js'
// import { removeProd } from '../controllers/productController.js'
// import { editProd } from '../controllers/productController.js'
// import { getProdsByCategory } from '../controllers/productController.js'

import {
  createProd,
  getAllProds,
  getOneProd,
  removeProd,
  editProd,
  getProdsByCategory,
} from "../controllers/productContorllerSequelize.js";

const productRouter = express.Router();

productRouter.post("/add", upload.single("prodImage"), createProd);
productRouter.get("/read", getAllProds);
productRouter.get("/show-one/:id", getOneProd);
productRouter.patch("/update", upload.single("prodImage"), editProd);
productRouter.delete("/delete", removeProd);
productRouter.get("/read/category/:id", getProdsByCategory);

export default productRouter;
