import express from "express";
import { createSocialMedia} from "../controllers/SocialMediacontroller.js";
import { getsocialmedia } from "../controllers/SocialMediacontroller.js";
import { getSingleSocialmedia } from "../controllers/SocialMediacontroller.js";
import { deletesocialMedia } from "../controllers/SocialMediacontroller.js";

const socialmediaRouter = express.Router();

// get all visitor

socialmediaRouter.get("/read", getsocialmedia);

// get single visitor

socialmediaRouter.get("/:id", getSingleSocialmedia);

//post a new visitor
socialmediaRouter.post("/add", createSocialMedia);

//delete visitor

socialmediaRouter.delete("/:id", deletesocialMedia);

// module.exports =visitorRouter;
export default socialmediaRouter;
