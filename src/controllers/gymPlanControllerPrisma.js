import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
// create plan
export const createGymPlan = async (req, res) => {
  const { title, price, feature } = req.body;
  if (!title || !price || !feature) {
    return res.status(400).json({ error: "Missing required fields" });
  }
  try {
    const newGymPlan = await prisma.GymPlan.create({
      data: {
        title,
        price: parseInt(price),
        feature: {
          create: feature.map((feature) => ({ name: feature })),
        },
      },
    });
    res.status(200).json(newGymPlan);
  } catch (error) {
    console.error("Error", error);
    res.status(500).json({ error: "Internal Server Error" });
  } finally {
    await prisma.$disconnect();
  }
};

// get all plan
export const getAllGymPlans = async (req, res) => {
  try {
    const gymPlans = await prisma.GymPlan.findMany({
      include: { feature: true },
    });
    res.status(200).json(gymPlans);
  } catch (error) {
    console.error("Error getting plans:", error);
    res.status(500).json({ error: "Internal Server Error" });
  } finally {
    await prisma.$disconnect();
  }
};

// get plan by id
export const getGymPlanById = async (req, res) => {
  const { planId } = req.body;
  console.log(req.body);
  try {
    const gymPlan = await prisma.GymPlan.findUnique({
      where: { id: parseInt(planId) },
      include: {
        feature: true,
      },
    });
    if (gymPlan) {
      res.status(200).json(gymPlan);
    } else {
      res.status(404).json({ message: "plan not found" });
    }
  } catch (error) {
    console.error("Error getting plan", error);
    res.status(500).json({ error: "Server error" });
  } finally {
    await prisma.$disconnect();
  }
};

// delete by id
export const deleteGymPlan = async (req, res) => {
  const planId = req.body.id;
  try {
    const deletGymPlan = await prisma.GymPlan.delete({
      where: { id: planId },
    });
    if (deletGymPlan) {
      res.status(200).json(`plan ${planId} is remove successfuly`);
    } else {
      res.status(404).json(`plan ${planId} is not found`);
    }
  } catch (error) {
    console.error("Error deleting the plan", error);
    res.status(500).json({ error: "Server error" });
  } finally {
    await prisma.$disconnect();
  }
};
//update plan
export const updateGymPlan = async (req, res) => {
  const { title, price, feature } = req.body;
  const planId = req.body.id;
  if (!title || !price || !feature)
    return res.status(400).json({ mssg: "fields are required" });
  try {
    const updateGymPlan = await prisma.GymPlan.update({
      where: {
        id: parseInt(planId),
      },
      data: {
        title,
        price: parseInt(price),
        feature: {
          update: feature.map((feature) => ({
            where: { id: feature.id },
            data: { name: feature.name },
          })),
        },
      },
    });

    if (!updateGymPlan) res.status(404).json(`Plan ${planId} is not found`);
    else res.status(200).json(`Plan ${planId} is edited successsfuly`);
  } catch (error) {
    console.error("Error updating Plan", error);
    res.status(500).json({ error: "Internel server Error" });
  } finally {
    await prisma.$disconnect();
  }
};
