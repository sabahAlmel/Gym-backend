import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import "dotenv/config";
import db from "../../models/index.js";
const { userModel } = db;

export async function signIn(req, res) {
  try {
    const { email, password } = req.body;
    if (!(email && password)) {
      return res.status(400).send("All inputs are required");
    }
    const user = await userModel.findOne({
      where: { email: email },
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
        const { lastName, firstName, role, image, email } = user;
        let newUser = { firstName, lastName, email, role, image };
        res.status(200).json({ token, newUser });
      } else {
        res.status(403).json({ message: "Wrong credentials" });
      }
    }
  } catch (error) {
    console.log(error);
  }
}
