import { Schema, model} from "mongoose";

const gymPlanSchema = new Schema({

    title:{
        type : String,
        required :true,
    },
    price:{
        type:Number,
        required:true,
    },
    feature:{
        type: [String],
        required:true
    }
    
})

const GymPlan = model("GymPlan",gymPlanSchema)
export default GymPlan

