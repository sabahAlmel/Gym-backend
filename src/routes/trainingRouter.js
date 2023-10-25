import express from "express";
import {
  addTrainingService,
  deleteTraining,
  getTrainingServices,
  updateTraining,
} from "../controllers/trainingController.js";
import upload from "../middlewares/upload.js";

const trainingRouter = express.Router();

trainingRouter.get("/read", getTrainingServices);
trainingRouter.post("/add", upload.single("trainingImg"), addTrainingService);
trainingRouter.delete("/delete", deleteTraining);
trainingRouter.patch("/update", upload.single("trainingImg"), updateTraining);

export default trainingRouter;
