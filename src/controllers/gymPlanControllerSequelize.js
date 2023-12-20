import GymPlan from "../models/gymPlanSequelize.js";
export const createGymPlan = async (req, res) => {
  const { title, price, feature } = req.body;
  if (!title || !price || !feature) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  try {
    const newGymPlan = await GymPlan.create({
      title,
      price: parseInt(price),
      feature,
    });

    res.status(200).json(newGymPlan);
  } catch (error) {
    console.error("Error", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const getAllGymPlans = async (req, res) => {
  try {
    const gymPlans = await GymPlan.findAll();
    res.status(200).json(gymPlans);
  } catch (error) {
    console.error("Error getting plans:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const getGymPlanById = async (req, res) => {
  const { planId } = req.body;
  console.log(req.body);
  try {
    const gymPlan = await GymPlan.findByPk({ id: planId });
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

export const deleteGymPlan = async (req, res) => {
  const planId = req.body.id;
  try {
    const deleteGymPlan = await GymPlan.destroy({ where: { id: planId } });
    if (deleteGymPlan) {
      res.status(200).json(`Plan ${planId} is removed successfully`);
    } else {
      res.status(404).json(`Plan ${planId} is not found`);
    }
  } catch (error) {
    console.error("Error deleting the plan", error);
    res.status(500).json({ error: "Server error" });
  }
};

export const updateGymPlan = async (req, res) => {
  const { title, price, feature } = req.body;
  const planId = req.body.id;
  if (!title || !price || !feature)
    return res.status(400).json({ mssg: "fields are required" });
  try {
    const updateGymPlan = await GymPlan.update(
      { title, price: parseInt(price), feature },
      { where: { id: planId } }
    );

    if (!updateGymPlan) res.status(404).json(`Plan ${planId} is not found`);
    else res.status(200).json(`Plan ${planId} is edited successsfuly`);
  } catch (error) {
    console.error("Error updating Plan", error);
    res.status(500).json({ error: "Internel server Error" });
  }
};
