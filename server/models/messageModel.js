import mongoose from "mongoose";

const messageSchema = new mongoose.Schema(
    {
        roomId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Room",
            required: true,
        },
        sender: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        content: {
            type: String,
            required: true,
        },
        sendAt: {
            type: Date,
            default: Date.now,
        },
    },
    { timestamps: true }
);

const messageModel = mongoose.model("Message", messageSchema);

export default messageModel;
