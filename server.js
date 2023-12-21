import express, { urlencoded } from "express";
// import dbConnect from "./src/config/dbConnection.js";
import trainingRouter from "./src/routes/trainingRouter.js";
import regimeRouter from "./src/routes/regimeRouter.js";
import productsRouter from "./src/routes/productsRouter.js";
import socialsRouter from "./src/routes/socialsRouter.js";
import gymPlansRouter from "./src/routes/gymPlansRouter.js";
// import userRouter from "./src/routes/userRouter.js";
import cors from "cors";
import cookieParser from "cookie-parser";
import db from "./models/index.js"
import "dotenv/config";
import categoriesRouter from "./src/routes/categoriesRouter.js";

const app = express();
app.use(cors());
app.use(express.json());
app.use(cookieParser())
app.use(express.urlencoded({ extended: true }));
const PORT = process.env.PORT || 3001;// dbConnect();
try {
  app.listen(PORT, () => {    
      console.log(`Server is running on port ${PORT}`);
  });

  await db.sequelize.authenticate();
  console.log('Connection has been established successfully.');
  
  // await db.sequelize.sync({ alter: true });
  console.log('Database synced!');
} catch (error) {
  console.error(error);
}




// app.listen(port, () => {
//   console.log(`Listening on port ${port}`);
// });

app.use("/images", express.static("images"));

app.use(express.json());
app.use(urlencoded({ extended: true }));
app.use("/training", trainingRouter);
app.use("/regime", regimeRouter);
app.use("/products", productsRouter);
app.use("/socials", socialsRouter);
app.use("/gymPlans", gymPlansRouter);
app.use("/categories", categoriesRouter);
