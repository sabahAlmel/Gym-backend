import express from "express";
import Visitor from "../../src/models/visitormodel.js";
import { createvisitor } from "../controllers/visitorcontroller.js";
import { getallvisitors } from "../controllers/visitorcontroller.js";
import { getsinglevisitor } from "../controllers/visitorcontroller.js";
import { deletevisitor } from "../controllers/visitorcontroller.js";

const router = express.Router()

// get all visitor 

router.get('/',getallvisitors)


// get single visitor 

router.get('/:id', getsinglevisitor)


//post a new visitor 
router.post('/', createvisitor )


//delete visitor 

router.delete('/:id',deletevisitor)

// module.exports =router;
export default router ;