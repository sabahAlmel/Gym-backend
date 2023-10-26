import { Schema, model } from "mongoose";

const categorySchema = new Schema({
    name: {type: String, required : true},
    products: {type: [Schema.Types.ObjectId], ref:'Product'},
    regime: {type: [Schema.Types.ObjectId], ref: "Regime Plans"}
})

export default model('Categories', categorySchema)