import mongoose from "mongoose"

const prodSchema = mongoose.Schema(
    {
        prodName: {
            type: String,
            required: true
        },
        prodPrice: {
            type: Number,
            required: true
        },
        prodImage: {
            type: Blob,
            required: true
        }
    }
)

export const prod = mongoose.model()