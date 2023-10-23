import Training from "../models/trainingModel.js";

export async function getTrainingServices(req, res) {
  try {
    const data = await Training.find();
    res.json({data:data})
  } catch (err) {
    console.log(err);
  }
}
export async function addTrainingService(req,res){
    const {name, description} = req.body
    try{await Training.create({
        name: name,
        description: description
    })
    res.json({message: 'Created new training '})
}catch(error){
    console.log(error)
}
}
export async function deleteTraining(req, res){
    const id = req.body.id
    try {
        await Training.findOneAndDelete({_id: id})
        res.json({message: 'Deleted successfuly'})
    } catch (error) {
        console.log(error)
    }
}
