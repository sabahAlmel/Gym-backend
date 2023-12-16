import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function addCategory(req, res) {
  const { name } = req.body;
  try {
    const newCategory = await prisma.Categories.create({
      data: {
        name: name,
      },
    });
    res.json({ message: "Added New Category", data: newCategory });
  } catch (error) {
    console.log(error);
  } finally {
    await prisma.$disconnect();
  }
}

export async function getCategories(req, res) {
  try {
    const data = await prisma.Categories.findMany();
    res.json({ data: data });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  } finally {
    await prisma.$disconnect();
  }
}

export async function getOneCategories(req, res) {
  const id = req.params.id;
  console.log(id);
  try {
    const data = await prisma.Categories.findUnique({
      where: {
        id: id,
      },
    });
    if (!data) {
      return res.status(404).json({ message: "Category not found" });
    }
    res.json({ data: data });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  } finally {
    await prisma.$disconnect();
  }
}

export async function deleteCategory(req, res) {
  const id = req.body.id;
  try {
    const deletedData = await prisma.Categories.delete({ where: { id: id } });
    if (!deletedData) {
      return res.status(404).json({ message: "Category not found" });
    }
    res.json({ message: "deleted successfuly" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  } finally {
    await prisma.$disconnect();
  }
}

export async function updateCategory(req, res) {
  const { id, name } = req.body;
  console.log(id, name);
  try {
    const target = await prisma.Categories.findUnique({ where: { id: id } });
    if (!target) {
      return res.status(404).json({ message: "Category not found" });
    }
    const updatedCategory = await prisma.Categories.update({
      where: {
        id: id,
      },
      data: {
        name: name,
      },
    });
    res.json({ message: "Updated successfuly", data: updatedCategory });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  } finally {
    await prisma.$disconnect();
  }
}
