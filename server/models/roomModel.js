import mongoose from "mongoose";

const roomSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            unique:true
        },
        description: {
            type: String,
            required: true,
        },
        createdBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        createdAt: {
            type: Date,
            default: Date.now,
        },
    },
    { timestamps: true }
);

const roomModel = mongoose.model("Room", roomSchema);

export default roomModel;