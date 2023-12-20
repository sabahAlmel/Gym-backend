import fs from "fs";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import Users from "../models/userSequelize.js";

function removeImage(image) {
  fs.unlink(image, (err) => {
    if (err) {
      console.log(`we can't delete the image`);
    } else {
      console.log("image deleted");
    }
  });
}

async function getAllUsers(req, res) {
  try {
    let getAll = await Users.findAll();
    return res.status(200).json(getAll);
  } catch (error) {
    console.error("Error", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

async function addNewUser(req, res) {
  let user = req.body;
  user.role = req.body.role || "visitor";
  let image;
  if (!req.file) {
    image = "images/user.jpg";
  } else {
    image = req.file.path;
  }

  try {
    if (
      !user.firstName ||
      !user.lastName ||
      !user.email ||
      !user.password ||
      !req.body.verifyPassword
    ) {
      return res.status(400).json({ error: "missing required property" });
    } else {
      let passExpression = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/;
      let emailExpression = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
      if (!user.password.match(passExpression)) {
        return res.status(400).json({
          error:
            "password should start with letter and has 6 to 20 characters which contain at least one numeric digit, one uppercase and one lowercase letter",
        });
      }
      if (!user.email.match(emailExpression)) {
        return res.status(400).json({
          error: "Invalid email. it should be like test12@gmail.com",
        });
      }
      if (user.password !== req.body.verifyPassword) {
        return res.status(400).json({ error: "Passwords do not match" });
      } else {
        let findUser = await Users.findOne({
          where: { email: user.email },
        });
        if (findUser) {
          return res.status(400).json({ error: "email is already exist" });
        }
        user.image = image;
        try {
          const hashedPass = await bcrypt.hash(user.password, 10);
          const newUser = await Users.create({
            ...user,
            password: hashedPass,
            role: user.role,
          });
          const token = jwt.sign(
            { role: newUser.role, userId: newUser.id },
            process.env.TOKEN,
            { expiresIn: "24h" }
          );
          return res.status(200).json({ newUser, token });
        } catch (error) {
          console.error(error);
          return res.status(500).json({ error: "Error creating user" });
        }
      }
    }
  } catch (error) {
    console.log(error);
    return res.status(400).json(error);
  }
}

async function updateUser(req, res) {
  const user = req.body;

  let newImage;
  user.id = req.user.userId;

  const found = await User.findOne({ where: { id: user.id } });
  if (!req.file) {
    newImage = found.image;
  } else if (req.file) {
    const oldImage = found.image;
    newImage = req.file.path;
    removeImage(oldImage);
  }
  if (!found) {
    if (newImage) {
      removeImage(newImage);
    }
    return res.status(400).json({ error: "user not found" });
  }
  if (user.email) {
    return res.status(400).json({ error: "you can't update your email" });
  }
  if (req.user.role !== "admin") {
    if (user.role) {
      return res.status(400).json({ error: "you can't change your role" });
    }
  }
  try {
    user.image = newImage;
    if (user.password) {
      const hashedPass = await bcrypt.hash(user.password, 10);
      user.password = hashedPass;
    }
    await Users.update({ ...user }, { where: { id: user.id } });
    return res.status(200).json(user);
  } catch (err) {
    console.error("could not update user " + err);
    if (newImage) {
      removeImage(newImage);
    }
    return res.status(500).json({ error: "Server error while updating user" });
  }
}

async function deleteUser(req, res) {
  let id = req.user.userId;
  try {
    const user = await Users.findOne({ where: { id: id } });
    if (!user) {
      return res.status(404).json({ error: "user not found" });
    }
    const image = user.image;
    await user.destroy();

    removeImage(image);
    console.log("Successfully deleted record.");
    return res.status(200).json("deleted");
  } catch (error) {
    console.error("Failed to delete record:", error);
    return res.status(400).json("not deleted");
  }
}

async function getOneUser(req, res) {
  try {
    const data = await Users.findOne({
      where: { id: req.user.userId },
    });
    console.log(data);
    if (!data) {
      return res.status(404).json({ error: "User not found" });
    }
    res.json({ user: data });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Internal server error" });
  }
}
export { getAllUsers, addNewUser, updateUser, deleteUser, getOneUser };
