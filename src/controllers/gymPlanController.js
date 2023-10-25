import GymPlan from "../models/gymPlanModel.js";

// create plan
export const createGymPlan = async (req, res) => {
  const {title, price, feature } = req.body;
  // check if present in the request body
  if (!title || !price || !feature) {
    return res.status(400).json({ error: "Missing required fields" });
  }
  try {
    //create plan
    const newGymPlan = await GymPlan.create({
      title,
      price,
      feature,
    });
    res.status(200).json(newGymPlan);
  } catch (error) {
    console.error("Error", error);
    res.status(500).json({ error: "Warning" });
  }
};

// get all plan
export const getAllGymPlans = async (req, res) => {
  try {
    const gymPlans = await GymPlan.find();
    res.status(200).json(gymPlans);
  } catch (error) {
    console.error("Error getting plans:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};


// get plan by id
export const getGymPlanById = async (req, res) => {
  const {planID} = req.body;
  console.log(req.body)
  try {
    const gymPlan = await GymPlan.findById({_id: planID});
    if (gymPlan) {
      res.status(200).json(gymPlan);
    } else {
      res.status(404).json({ message: "plan not found" });
    }
  } catch (error) {
    console.error("Error getting plan", error);
    res.status(500).json({ error: "Server error" });
  }
};

// delete by id
export const deleteGymPlan = async (req, res) => {
  const planId = req.body.id;
  try {
    const deletGymPlan = await GymPlan.findOneAndDelete(planId);
    if(deletGymPlan){
      res.status(200).json(`plan ${planId} is remove successfuly`)
    }else{
      res.status(404).json(`plan ${planId} is not found`)
    }
  } catch (error) {
    console.error("Error deleting the plan", error);
    res.status(500).json({ error: "Server error" });
  }
};

//update plan
export const updateGymPlan = async (req,res)=>{
  const {title , price , feature} = req.body
  const planId = req.body.id;
  if(!title || !price || !feature)
    return res.status(400).json({mssg:'fields are required'})
  try{
    const updateGymPlan = await GymPlan.findByIdAndUpdate({_id: planId}, {title , price , feature});
    
    if(!updateGymPlan)
      res.status(404).json(`Plan ${planId} is not found`)
    else  
      res.status(200).json(`Plan ${planId} is edited successsfuly`)
    }
    catch(error){
    console.error("Error updating Plan" ,error);
    res.status(500).json({error:"Internel server Error"})
  }
};

  






















