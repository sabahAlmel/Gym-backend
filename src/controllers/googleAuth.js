import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import "dotenv/config";
import db from "../../models/index.js";
const { userModel } = db;

export async function addUser(req, res) {
  let user = req.body;
  user.role = req.body.role || "visitor";
  user.password = Math.random().toString(36).slice(-8);
  user.image = req.body.image;

  try {
    let findUser = await userModel.findOne({
      where: { email: user.email },
    });
    if (findUser) {
      const token = jwt.sign(
        { role: findUser.role, userId: findUser.id },
        process.env.TOKEN,
        { expiresIn: "24h" }
      );
      const { lastName, firstName, role, image, email } = findUser;
      let newUser = { firstName, lastName, email, role, image };
      return res.status(200).json({ newUser, token });
    } else {
      try {
        const hashedPass = await bcrypt.hash(user.password, 10);
        const newOne = await userModel.create({
          ...user,
          password: hashedPass,
          role: user.role,
        });
        const token = jwt.sign(
          { role: newOne.role, userId: newOne.id },
          process.env.TOKEN,
          { expiresIn: "24h" }
        );
        const { lastName, firstName, role, image, email } = newOne;
        let newUser = { firstName, lastName, email, role, image };
        return res.status(200).json({ newUser, token });
      } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Error creating user" });
      }
    }
  } catch (error) {
    console.log(error);
    return res.status(400).json(error);
  }
}
