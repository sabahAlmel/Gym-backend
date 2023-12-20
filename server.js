import express, { urlencoded } from "express";
import dbConnect from "./src/config/dbConnection.js";

import trainingRouter from "./src/routes/trainingRouter.js";
import regimeRouter from "./src/routes/regimeRouter.js";
import productsRouter from "./src/routes/productsRouter.js";
import socialsRouter from "./src/routes/socialsRouter.js";
import gymPlansRouter from "./src/routes/gymPlansRouter.js";
import cors from "cors";
import "dotenv/config";
import "./src/associations.js";
import sequelize from "./src/config/sequelizeConnections.js";
import { signIn } from "./src/controllers/signIn.contorller.js";
import categoriesRouter from "./src/routes/categoriesRouter.js";
import { userRouter } from "./src/routes/user.router.js";

const app = express();
app.use(cors());
const port = process.env.PORT;
dbConnect();

app.use(express.json());

try {
  await sequelize.authenticate();
  console.log("Connection established");
} catch (error) {
  console.log("Unable to connect to database");
}

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

app.use("/images", express.static("images"));

app.use(urlencoded({ extended: true }));
app.use("/training", trainingRouter);
app.use("/regime", regimeRouter);
app.use("/products", productsRouter);
app.use("/socials", socialsRouter);
app.use("/gymPlans", gymPlansRouter);
app.use("/categories", categoriesRouter);
app.use("/users", userRouter);
app.post("/signin", signIn);
