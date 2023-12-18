import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import "dotenv/config";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function signIn(req, res) {
  try {
    const { username, password } = req.body;
    if (!(username && password)) {
      return res.status(400).send("All inputs are required");
    }
    const user = await prisma.User.findUnique({
      where: { userName: username },
    });
    if (!user) {
      res.status(404).json({ message: "User Not Found!" });
    } else {
      const isValidPassword = await bcrypt.compare(password, user.password);
      if (user && isValidPassword) {
        const token = jwt.sign(
          { role: user.role, userId: user.id },
          process.env.TOKEN,
          { expiresIn: "24h" }
        );
        res.status(200).json({ token });
      } else {
        res.status(403).json({ message: "Wrong credentials" });
      }
    }
  } catch (error) {
    console.log(error);
  }
}
