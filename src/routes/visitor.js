import express from "express";
import { createvisitor } from "../controllers/visitorcontroller.js";
import { getallvisitors } from "../controllers/visitorcontroller.js";
import { getsinglevisitor } from "../controllers/visitorcontroller.js";
import { deletevisitor } from "../controllers/visitorcontroller.js";

const visitorRouter = express.Router();

// get all visitor

visitorRouter.get("/", getallvisitors);

// get single visitor

visitorRouter.get("/:id", getsinglevisitor);

//post a new visitor
visitorRouter.post("/", createvisitor);

//delete visitor

visitorRouter.delete("/:id", deletevisitor);

// module.exports =visitorRouter;
export default visitorRouter;
