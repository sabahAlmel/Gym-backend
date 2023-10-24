import { Router } from "express";
import { addRegimePlan, getAllRegimePlans, removeRegimePlan, updateRegimePlan } from "../controllers/regimeControllers.js";

const regimeRouter = Router()

regimeRouter.get('/read', getAllRegimePlans)
regimeRouter.post('/add', addRegimePlan)
regimeRouter.patch('/update', updateRegimePlan)
regimeRouter.delete('/delete', removeRegimePlan)


export default regimeRouter;