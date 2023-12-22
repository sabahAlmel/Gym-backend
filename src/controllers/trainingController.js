import db from '../../models/index.js'
import Sequelize from 'sequelize'
import training from '../../models/training.js';

const {trainingModel} =db;

export const getTrainingServices = async (req, res) => {
  try {
    const trainingServices = await trainingModel.findAll({
      order: [['createdAt', 'DESC']],
    });

    return res.status(200).json({
      msg: 'Fetched all training services successfully',
      data: trainingServices
    });
  } catch (error) {
    console.error('Failed to fetch training services:', error); // Log the complete error object
    return res.status(500).json({
      msg: 'Failed to fetch training services',
      error: error.message // Send the error message in the response
    });
  }
};
export const addTrainingService = async (req, res) => {
  const { name, description } = req.body;
  let trainingImage
  if(req.file){
    trainingImage=req.file.path
  }else{
    trainingImage="images/1698229764637.png"
  }

  try {
    const newTraining=
    await trainingModel.create({
      name: name,
      description: description,
      image: trainingImage,
    });

    res.json({ message: "Created new training service" ,data:newTraining});
  } catch (error) {
    console.error('Failed to create training service:', error.message);
    res.status(500).json({ message: 'Failed', error: error.message });
  }
};

export const deleteTraining = async (req, res) => {
  const id = req.body.id;

  if (id) {
    try {
      const target = await trainingModel.findByPk(id);

      if (target) {
        await target.destroy();
        res.json({ message: "Deleted successfully" });
      } else {
        res.json({ message: `No element with the id ${id}` });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: `Error deleting Training service with id ${id}` });
    }
  } else {
    res.status(400).json({ message: "Provide an id" });
  }
};

export const updateTraining = async (req, res) => {
  const id = req.body.id;

  if (id) {
    try {
      const target = await trainingModel.findByPk(id);

      if (target) {
        const { name = target.name, description = target.description } = req.body;
        const trainingImage = req.file?.path || target.image;

        await target.update({
          name: name,
          description: description,
          image: trainingImage,
        });

        res.json({ data: target });
      } else {
        res.json({ message: `No element with the id ${id}` });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: `Error updating Training service with id ${id}` });
    }
  } else {
    res.status(400).json({ message: "Id is not provided" });
  }
};
