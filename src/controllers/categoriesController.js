import Categories from "../models/categories.js";

export async function addCategory(req, res) {
  const { name } = req.body;
  const existingCategory = await Categories.findOne({ name: name });
  if (existingCategory) {
    return res.json({ message: "Category Already exists" });
  }
  const newCategory = new Categories({
    name: name,
  });
  try {
    await newCategory.save();
    res.json({ message: "Added New Category", data: newCategory });
  } catch (error) {
    console.log(error);
  }
}

export async function getCategories(req, res) {
  try {
    const data = await Categories.find();
    res.json({ data: data });
  } catch (error) {
    console.log(error);
  }
}
export async function getOneCategories(req, res){
  const id = req.params.id
  try {
    const data = await Categories.findById(id)
    res.json({data: data})
  } catch (error) {
    console.log(error)
  }
}
export async function deleteCategory(req, res) {
  const id = req.body.id;
  try {
    const deletedData = await Categories.findOneAndDelet({ _id: id });
    res.json({ message: "deleted successfuly" });
  } catch (error) {
    console.log(error);
  }
}

export async function updateCategory(req, res) {
  const { id, name } = req.body;
    console.log(id, name)
  try {
    const target = await Categories.findByIdAndUpdate(
      id,
      { name: name },
      {new: true}
    );
    res.json({ message: "Updated successfuly", data: target });
  } catch (error) {
    console.log(error);
  }
}
