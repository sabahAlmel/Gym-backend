import Categories from "../models/categories.js";
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
  const regimeImage = req.file?.path;

  try {
    const newRegimePlan = new Regime({
      name: name,
      description: description,
      image: regimeImage
    });

    const savedRegimePlan = await newRegimePlan.save();
    res.json({ message: "Regime Plan added successfully", data: savedRegimePlan });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error adding regime plan" });
  }
}



export async function updateRegimePlan(req, res) {
  const id = req.body.id;
  if (id) {
    const target = await Regime.findOne({ _id: id });

    const { name = target.name, description = target.description } = req.body;
    const regimeImage = req.file?.path
    try {
     const data =  await Regime.findOneAndUpdate(
        { _id: id },
        { name: name, description: description, image: regimeImage},{new: true}
      );
      res.json({ message:"Updated Successfuly", data: data });
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
export async function getRegimePlanByCategory(req, res){
  const {categoryId} = req.body
  const category = await Categories.findOne({_id: categoryId})
  const data = await Regime.find({_id: {$in: category.regime}})
  res.json({data: data})

}