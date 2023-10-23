import express from 'express'
import { addTrainingService, deleteTraining, getTrainingServices } from '../controllers/trainingController.js'

const trainingRouter = express.Router()

trainingRouter.get('/get', getTrainingServices)
trainingRouter.post('/add', addTrainingService)
trainingRouter.delete('/delete', deleteTraining)

export default trainingRouter;