// import Category from "../models/categoriesSequelize.js";
import db from "../../models/index.js";
const { categoriesModel } = db;

export async function addCategory(req, res) {
  const { name } = req.body;
  try {
    const newCategory = await categoriesModel.create({ name });
    res.json({ message: "Added New Category", data: newCategory });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

export async function getCategories(req, res) {
  try {
    const data = await categoriesModel.findAll();
    res.json({ data });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

export async function getOneCategories(req, res) {
  const id = req.params.id;
  console.log(id);
  try {
    const data = await categoriesModel.findByPk(id);
    if (!data) {
      return res.status(404).json({ message: "Category not found" });
    }
    res.json({ data });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

export async function deleteCategory(req, res) {
  const id = req.body.id;
  try {
    const deletedData = await categoriesModel.destroy({ where: { id } });
    if (!deletedData) {
      return res.status(404).json({ message: "Category not found" });
    }
    res.json({ message: "Deleted successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

export async function updateCategory(req, res) {
  const { id, name } = req.body;
  console.log(id, name);
  try {
    const target = await categoriesModel.findByPk(id);
    if (!target) {
      return res.status(404).json({ message: "Category not found" });
    }
    const updatedCategory = await categoriesModel.update(
      { name },
      { where: { id } }
    );
    res.json({ message: "Updated successfully", data: updatedCategory });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}
