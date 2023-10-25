import { Router } from "express";
import { addRegimePlan, getAllRegimePlans, removeRegimePlan, updateRegimePlan } from "../controllers/regimeControllers.js";
import upload from "../middlewares/upload.js";

const regimeRouter = Router()

regimeRouter.get('/read', getAllRegimePlans)
regimeRouter.post('/add', upload.single('regimeImage'), addRegimePlan)
regimeRouter.patch('/update',upload.single('regimeImage'), updateRegimePlan)
regimeRouter.delete('/delete', removeRegimePlan)


export default regimeRouter;