import express from "express";
// import {
//   addCategory,
//   deleteCategory,
//   getCategories,
//   getOneCategories,
//   updateCategory,
// } from "../controllers/categoriesController.js";

import {
  addCategory,
  deleteCategory,
  getCategories,
  getOneCategories,
  updateCategory,
} from "../controllers/categoriesControllerPrisma.js";

const categoriesRouter = express.Router();

categoriesRouter.post("/add", addCategory);
categoriesRouter.get("/read", getCategories);
categoriesRouter.get("/readOne/:id/", getOneCategories);
categoriesRouter.delete("/delete", deleteCategory);
categoriesRouter.patch("/update", updateCategory);

export default categoriesRouter;
