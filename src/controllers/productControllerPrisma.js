import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
//create product
const createProd = async (req, res) => {
  const { prodName, prodPrice, categoryName, prodDescription } = req.body;
  const prodImage = req.file.path;
  if (!categoryName) {
    return res
      .status(404)
      .send(`Category ${categoryName} is empty or not found!`);
  }

  try {
    const category = await prisma.Categories.findUnique({
      where: {
        name: categoryName,
      },
    });

    if (!category) {
      return res.status(404).send(`Category ${categoryName} is not found!`);
    }
    const newProd = await prisma.Product.create({
      data: {
        prodName,
        prodPrice: parseInt(prodPrice),
        prodImage,
        prodCategoryId: category.id,
        prodDescription,
      },
    });
    res.status(201).json({ data: newProd });
  } catch (error) {
    console.log("Error in saving data: ", error);
    res.status(500).send("Internal Server Error!");
  } finally {
    await prisma.$disconnect();
  }
};

//display all the products
const getAllProds = async (req, res) => {
  try {
    const prods = await prisma.product.findMany({
      include: {
        prodCategory: true,
      },
    });
    res.status(200).send(prods);
  } catch (error) {
    console.log("Error in displaying data: ", error);
    res.status(500).send("Internal Server Error!");
  } finally {
    await prisma.$disconnect();
  }
};

//display one product by ID
const getOneProd = async (req, res) => {
  const prodId = req.params.id;
  try {
    const prod = await prisma.Product.findUnique({
      where: { prodidd: prodId },
    });
    if (prod) res.status(200).send(prod);
    else res.status(404).send(`Product ${prodId} is not found!`);
  } catch (error) {
    console.log("Error in displaying data: ", error);
    res.status(500).send("Internal Server Error!");
  } finally {
    await prisma.$disconnect();
  }
};

//remove a product
const removeProd = async (req, res) => {
  const { id } = req.body;

  try {
    const deleteProd = await prisma.Product.delete({ where: { id: id } });
    if (deleteProd)
      res.status(200).send(`Product ${id} is removed successfully!`);
    else res.status(404).send(`Product ${id} is not found!`);
  } catch (error) {
    console.log("Error in removing data: ", error);
    res.status(500).send("Internal Server Error!");
  } finally {
    await prisma.$disconnect();
  }
};

//update a product
const editProd = async (req, res) => {
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
    const category = await prisma.Categories.findUnique({
      where: { name: categoryName },
    });
    if (!category)
      return res.status(404).send(`Category ${categoryName} is not found!`);

    const updateProd = await prisma.Product.update({
      where: {
        id: parseInt(prodId),
      },
      data: {
        prodName: prodName,
        prodPrice: parseInt(prodPrice),
        prodImage: prodImage,
        prodCategoryId: category.id,
        prodDescription: prodDescription,
      },
    });
    if (!updateProd) res.status(404).send(`Product ${prodId} is not found!`);
    else res.status(200).send(`Product ${prodId} is edited successfully!`);
  } catch (error) {
    console.log("Error in editing data: ", error);
    res.status(500).send("Internal Server Error!");
  } finally {
    await prisma.$disconnect();
  }
};

const getProdsByCategory = async (req, res) => {
  try {
    const data = await prisma.Product.findMany({
      where: {
        prodCategoryId: parseInt(req.params.id),
      },
    });
    res.status(200).json({ data: data });
  } catch (error) {
    console.error("Error in displaying data: ", error);
    res.status(500).json({ message: "Internal Server Error!" });
  } finally {
    await prisma.$disconnect();
  }
};

export {
  createProd,
  getAllProds,
  getOneProd,
  removeProd,
  editProd,
  getProdsByCategory,
};
