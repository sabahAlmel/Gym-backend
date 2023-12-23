import { where } from "sequelize";
import db from "../models/index.js";


const {regimeModel, categoriesModel}= db


export async function getAllRegimePlans(req, res) {
  try {
    const data = await regimeModel.findAll();
    res.json({ data: data });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message});
  }
}

export async function addRegimePlan(req, res) {
  const { name, description } = req.body;
  let regimeImage 
  if(req.file){
    regimeImage=req.file.path
  }else{
    regimeImage="images/regime.png"
  }

  try {
    const newRegimePlan = await regimeModel.create({
      name: name,
      description: description,
      image: regimeImage
    });

    res.json({ message: "Regime Plan added successfully", data: newRegimePlan });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message:error.message});
  }
}

export async function updateRegimePlan(req, res) {
    const id = req.body.id;
  
    if (id) {
      try {
        const target = await regimeModel.findByPk(id);
  
        if (!target) {
          return res.status(404).json({ message: "Regime plan not found" });
        }
  
        const { name = target.name, description = target.description } = req.body;
        const regimeImage = req.file?.path;
  
        const updatedRegimePlan = await target.update({
          name: name,
          description: description,
          image: regimeImage
        });
  
        res.json({ message: "Updated successfully", data: updatedRegimePlan });
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error updating regime plan" });
      }
    } else {
      res.status(400).json({ message: "Id is not provided" });
    }
  }


export async function removeRegimePlan(req, res) {
  const id = req.body.id;

  if (id) {
    try {
      const regimePlan = await regimeModel.findOne({where:{
        id:id
      }})

      if (regimePlan) {
        await regimePlan.destroy();
        res.json({ message: 'Deleted Successfully' });
      } else {
        res.json({ message: `No regime plan with the id ${id}` });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error deleting regime plan' });
    }
  } else {
    res.status(400).json({ message: 'Provide an id' });
  }
}

