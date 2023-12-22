import db from "../../models/index.js";
const { categoriesModel, productModel } = db;

export const createProd = async (req, res) => {
  const { prodName, prodPrice, categoryName, prodDescription } = req.body;
  const prodImage = req.file.path;

  if (!categoryName) {
    return res
      .status(404)
      .send(`Category ${categoryName} is empty or not found!`);
  }

  try {
    const category = await categoriesModel.findOne({
      where: {
        name: categoryName,
      },
    });

    if (!category) {
      return res.status(404).send(`Category ${categoryName} is not found!`);
    }

    const newProd = await productModel.create({
      prodName,
      prodPrice: parseInt(prodPrice),
      prodImage,
      categoryId: category.id,
      prodDescription,
    });

    res.status(201).json({ data: newProd });
  } catch (error) {
    console.log("Error in saving data: ", error);
    res.status(500).send("Internal Server Error!");
  }
};

export const getAllProds = async (req, res) => {
  try {
    const prods = await productModel.findAll({
      include: categoriesModel,
    });
    res.status(200).send(prods);
  } catch (error) {
    console.log("Error in displaying data: ", error);
    res.status(500).send("Internal Server Error!" + error.message);
  }
};

export const getOneProd = async (req, res) => {
  const prodId = req.params.id;
  try {
    const prod = await productModel.findByPk(
      { where: { id: prodId } },
      {
        include: { model: Category },
      }
    );
    if (prod) res.status(200).send(prod);
    else res.status(404).send(`Product ${prodId} is not found!`);
  } catch (error) {
    console.log("Error in displaying data: ", error);
    res.status(500).send("Internal Server Error!");
  }
};

// Remove a product
export const removeProd = async (req, res) => {
  const { id } = req.body;

  try {
    const deleteProd = await productModel.destroy({ where: { id: id } });
    if (deleteProd)
      res.status(200).send(`Product ${id} is removed successfully!`);
    else res.status(404).send(`Product ${id} is not found!`);
  } catch (error) {
    console.log("Error in removing data: ", error);
    res.status(500).send("Internal Server Error!");
  }
};

// Update a product
export const editProd = async (req, res) => {
  const { prodName, prodPrice, categoryName, prodDescription } = req.body;
  const prodId = req.body.id;
  const prodImage = req.file.path;

  if (
    !prodName ||
    !prodPrice ||
    !prodImage.length ||
    !categoryName ||
    !prodDescription
  )
    return res.status(400).send("All fields are required!");

  try {
    const category = await categoriesModel.findOne({
      where: { name: categoryName },
    });
    if (!category)
      return res.status(404).send(`Category ${categoryName} is not found!`);

    const updateProd = await productModel.update(
      {
        prodName,
        prodPrice: parseInt(prodPrice),
        prodImage,
        categoryId: category.id,
        prodDescription,
      },
      { where: { id: parseInt(prodId) } }
    );

    if (!updateProd) res.status(404).send(`Product ${prodId} is not found!`);
    else res.status(200).send(`Product ${prodId} is edited successfully!`);
  } catch (error) {
    console.log("Error in editing data: ", error);
    res.status(500).send("Internal Server Error!");
  }
};

export const getProdsByCategory = async (req, res) => {
  try {
    const data = await productModel.findAll({
      where: {
        categoryId: parseInt(req.params.id),
      },
    });
    res.status(200).json({ data });
  } catch (error) {
    console.error("Error in displaying data: ", error);
    res.status(500).json({ message: "Internal Server Error!" });
  }
};
