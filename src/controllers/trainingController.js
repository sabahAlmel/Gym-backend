import Training from "../models/trainingModel.js";

export async function getTrainingServices(req, res) {
  try {
    const data = await Training.find();
    res.json({ data: data });
  } catch (err) {
    console.log(err);
  }
}
export async function addTrainingService(req, res) {
  const { name, description } = req.body;
  const trainingImg = req.file?.path || "";

  try {
    await Training.create({
      name: name,
      description: description,
      image: trainingImg,
    });
    res.json({ message: "Created new training " });
  } catch (error) {
    console.log(error);
  }
}
export async function deleteTraining(req, res) {
  const id = req.body.id;
  if (id) {
    try {
      const target = await Training.findOne({ _id: id });
      if (target) {
        await Training.deleteOne(target);
      } else {
        res.json({ message: `No element with the id ${id}` });
      }
      res.json({ message: "Deleted successfuly" });
    } catch (error) {
      console.log(error);
      res.json({message: `No Training service with the id ${id}`})
    }
  } else {
    res.json({ message: "Provide and id" });
  }
}

export async function updateTraining(req, res) {
  const id = req.body.id;
  if (id) {
    const target = await Training.findOne({ _id: id });
    const { name = target.name, description = target.description } = req.body;
    const trainingImg = req.file?.path || target.image;

    try {
      const data = await Training.findOneAndUpdate(
        { _id: id },
        { name: name, description: description, image: trainingImg },
        {new: true}
      );
      res.json({ data: data });
    } catch (error) {
      console.log(error);
    }
  } else {
    res.json({ message: "Id is not provided" });
  }
}
