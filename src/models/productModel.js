import mongoose from "mongoose"



const {Schema , model} =mongoose

const prodSchema = new Schema({
        prodName: {
            type: String,
            required: true
        },
        prodPrice: {
            type: Number,
            required: true
        },
        prodImage: {
            type: [String],
            required: true
        }
    }
)


 const prod = model("Product", prodSchema)

export default model('Product', prodSchema)

