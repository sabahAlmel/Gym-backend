import { Router } from "express";
import { addRegimePlan, getAllRegimePlans, getRegimePlanByCategory, removeRegimePlan, updateRegimePlan } from "../controllers/regimeControllers.js";
import upload from "../middlewares/upload.js";

const regimeRouter = Router()

regimeRouter.get('/read', getAllRegimePlans)
regimeRouter.post('/add', upload.single('regimeImage'), addRegimePlan)
regimeRouter.patch('/update',upload.single('regimeImage'), updateRegimePlan)
regimeRouter.delete('/delete', removeRegimePlan)
regimeRouter.get('/read/category', getRegimePlanByCategory)


export default regimeRouter;