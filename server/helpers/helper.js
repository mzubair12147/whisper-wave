import mongoose from "mongoose";
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

export function connectMongodb() {
    mongoose
        .connect(process.env.DB_CONNECTION_STRING)
        .then(() => {
            console.log("connected with mongoDB");
        })
        .catch((error) => {
            console.log(
                "Failed to connect with mongoDB. error: " + error.message
            );
        });
}

export async function isLoggedIn(req, res, next) {
    const token = req.cookies.token || req.header("auth-token");
    if (!token && req.cookies.token) {
        res.send({
            success: false,
            error: "Please authenticate using valid token",
        });
    } else {
        try {
            const data = jwt.decode(token, process.env.JWT_SECRET);
            req.user = data.user;

        } catch (error) {
            res.send({ success: false, error: error.message });
        }
    }
    next();
}
