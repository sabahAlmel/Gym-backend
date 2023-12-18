import jwt from "jsonwebtoken";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const authenticate = async (req, res, next) => {
  try {
    const token = req.headers["authorization"]?.split(" ")[1];
    if (!token) {
      return res.status(403).send("Forbidden");
    } else {
      const decoded = jwt.verify(token, process.env.TOKEN);
      req.user = decoded;
      next();
    }
  } catch (error) {
    console.log(error);
  }
};

const checkRoles = (req, res, next) => {
  if (req.user && req.user.role === "admin") {
    next();
  } else {
    res.status(403).json({
      message: "Forbidden: You do not have the required permissions.",
    });
  }
};

export { authenticate, checkRoles };
