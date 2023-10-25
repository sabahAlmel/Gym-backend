import Regime from "../models/regimeModel.js";

export async function getAllRegimePlans(req, res) {
  try {
    const data = await Regime.find({});
    res.json({ data: data });
  } catch (error) {
    console.log(error);
  }
}
export async function addRegimePlan(req, res) {
  const { name, description } = req.body;
  const regimeImage = req.file.path
  const newPlan = new Regime({
    name: name,
    description: description,
    image:regimeImage
  });
  try {
    await newPlan.save();
    res.json({ message: "New plan have been created", data: newPlan });
  } catch (error) {
    console.log(error);
  }
}
  export async function updateRegimePlan(req, res) {
    const id = req.body.id;
    if (id) {
      const target = await Regime.findOne({ _id: id });
      const { name = target.name, description = target.description } = req.body;
      const regimeImage = req.file?.path || target.image;
  
      try {
        await Regime.updateOne(
          { _id: id },
          { name: name, description: description, image: regimeImage }
        );
        res.json({ message:"Updated Successfuly" });
      } catch (error) {
        console.log(error);
      }
    } else {
      res.json({ message: "Id is not provided" });
    }
  }
  
export async function removeRegimePlan(req,res){
    const id = req.body.id
    if(id){

      try {
        const regimePlan = await Regime.findOneAndDelete({_id: id})
        regimePlan? res.json({message: 'Deleted Successfuly'}) : res.json({message: `No regime plan with the id ${id}`})
      } catch (error) {
        console.log(error)

      }
    }else{
      res.json({message: "Provide an id"})
    }
}
