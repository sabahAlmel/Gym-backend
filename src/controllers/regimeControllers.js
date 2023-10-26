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
  const { name, description, categoryName } = req.body;

  const regimeImage = req.file?.path
  const category = await Categories.findOne({name: categoryName})
 
  
  const data = new Regime({
    name: name,
    description: description,
    image:regimeImage,
    category: category._id
  });
  try {
    await data.save()
    const newPlanId = data._id
    await Categories.updateOne({_id: category._id}, {$push: {regime: newPlanId}})
    res.json({ message: "New plan have been created", data: data });
  } catch (error) {
    console.log(error);
  }
}
  export async function updateRegimePlan(req, res) {
    const id = req.body.id;
    if (id) {
      const target = await Regime.findOne({ _id: id });

      const { name = target.name, description = target.description, categoryName } = req.body;
      const regimeImage = req.file?.path || target.image;
      const category = categoryName ? await Categories.findOne({name: categoryName}) : target 
      try {
       const data =  await Regime.findOneAndUpdate(
          { _id: id },
          { name: name, description: description, image: regimeImage, category: category._id },{new: true}
        );
        
        
        await Categories.updateOne({_id: category._id}, {$push: {regime: id}})
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