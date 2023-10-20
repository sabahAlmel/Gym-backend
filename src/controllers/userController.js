import User from "../models/userModel.js";

export async function getUsers(req, res) {
  try {
    const users = await User.find();
    res.json({ users: users });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Bad Request! " });
  }
}
export async function addUser(req, res) {
  const { username, password } = req.body;
  const user = new User({ username: username, password: password });
  await user.save();
  res.json({ message: "New User Have Been Added" });
}

export async function deleteUser(req, res) {
  const { userID } = req.body;

  try {
    await User.deleteOne({ _id: userID });
    res.json({ message: "User has been deleted succesfully" });
  } catch (error) {
    console.log(error);
  }
}
export async function updateUser(req, res) {
    const userID = req.body.userID;
    const initalUser = await User.find({ _id: userID })
    console.log("UPDATE USER")
    const userData = initalUser[0]
  const {
    password = userData.password,
    sub_plan = userData.sub_plan,
    role = userData.role,
  } = req.body;

  try {
    await User.updateOne(
      { _id: userID },
      { password: password, sub_plan: sub_plan, role: role }
    );
    res.json({ message: "User has been updated" });
  } catch (error) {
    console.log(error);
  }
}
