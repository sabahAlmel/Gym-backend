import express from "express";
import { createSocialMedia} from "../controllers/SocialMediacontroller.js";
import { getsocialmedia } from "../controllers/SocialMediacontroller.js";
import { getSingleSocialmedia } from "../controllers/SocialMediacontroller.js";
import { deletesocialMedia } from "../controllers/SocialMediacontroller.js";
import  {updatesocialmedia} from "../controllers/SocialMediacontroller.js"

const socialRouter = express.Router();

// get all visitor

socialRouter.get("/read", getsocialmedia);

// get single visitor

socialRouter.get("/:id", getSingleSocialmedia);

//post a new visitor
socialRouter.post("/add", createSocialMedia);

//delete visitor

socialRouter.delete("/:id", deletesocialMedia);

socialRouter.patch('/:id', updatesocialmedia)

// module.exports =visitorRouter;
export default socialRouter;