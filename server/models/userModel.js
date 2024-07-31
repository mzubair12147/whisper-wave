import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {
        fullName: {
            type: String,
            required: true,
        },
        username: {
            type: String,
            required: true,
            unique: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        password: {
            type: String,
            required: true,
        },
        profileImage: {
            data: Buffer,
            contentType: String,
        },
        status: {
            type: String,
            default: "offline",
        },
        lastLogin: {
            type: Date,
            default: Date.now,
        },
        date: {
            type: Date,
            default: Date.now,
        },
    },
    { timestamps: true }
);

const UserModel = mongoose.model("User", userSchema);

export default UserModel;
