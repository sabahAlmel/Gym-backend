import db from '../../models/index.js'
import Sequelize from 'sequelize'
import Training from '../../models/training.js';

const {trainingModel} =db;

export const getTrainingServices = async (req, res) => {
  try {
    const trainingServices = await trainingModel.findAll();

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
  try {
    console.log('Request body:', req.body);
    console.log('Request file:', req.file);

    const { name, description } = req.body;
    let image;

    if (req.file && req.file.path) {
      image = req.file.path;
    } else {
      console.log('No file provided in the request. Using default image path.');
      image = "images/default-image.png";
    }

    console.log('Image path:', image);

    const newTraining = await trainingModel.create({
      name: name,
      description: description,
      image: image,
    });

    res.json({ message: "Created new training service", data: newTraining });
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


// export const createTraining = async (req, res) => {
//   const { name, description } = req.body;
//   const image = req.file.path;
//   if (!name || !description || !image)
//     return res.status(400).send("All fields are required!");

//   try {
//     const newTraining = await training.create({
//       name: name,
//       description: description,
//       image: image,
//     });
//     res.status(201).json({ data: newTraining });
//   } catch (error) {
//     console.log("Error in saving data: ", error);
//     res.status(500).send("Internal Server Error!");
//   }
// };

export const createTrai = async (req, res) => {
  const { name, description } = req.body;
  const image = req.file.path;
try{

    const newTrai = await trainingModel.create({
      name,
      description,
      image
    });

    res.status(201).json({ data: newTrai });
  } catch (error) {
    console.log("Error in saving data: ", error);
    res.status(500).send("Internal Server Error!");
  }
};