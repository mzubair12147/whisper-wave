import express from "express";
import User from "../models/userModel.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const router = express.Router();

router.post("/register", async (req, res) => {
    try {
        let check = await User.findOne({ email: req.body.email },{profileImage:0});
        if (check) {
            res.status(400).send({
                success: false,
                message: "An account with this email is already exists",
                error: "Existing User",
            });
        }

        const user = new User({ ...req.body });
        await user.save();

        const data = {
            user: {
                id: user.id,
            },
        };

        const token = jwt.sign(data, process.env.JWT_SECRET, {
            expiresIn: "2h",
        });
        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            maxAge: 3600000,
            sameSite: "strict",
        });

        const resData = {
            fullName: user.fullName,
            username: user.username,
            email: user.email,
            id: user.id,
        };
        res.send({ success: true, token, resData });
    } catch (error) {
        res.send({ success: false, message: error.message });
    }
});

router.post("/login", async (req, res) => {
    try {
        let user = await User.findOne({ email: req.body.email },{profileImage:0});
        if (user) {
            const pass = req.body.password === user.password;
            if (pass) {
                const data = {
                    user: {
                        id: user.id,
                    },
                };
                const token = jwt.sign(data, process.env.JWT_SECRET);
                res.cookie("token", token);
                const resData = {
                    fullName: user.fullName,
                    username: user.username,
                    email: user.email,
                    id: user.id,
                };
                res.send({ success: true, token, resData });
            } else {
                res.status(400).send({
                    success: false,
                    message: "invalid credentials",
                    error: "user not found",
                });
            }
        } else {
            res.send({
                success: false,
                error: "There is no account with this email ID",
            });
        }
    } catch (error) {
        res.send({ success: false, message: error.message });
    }
});

export default router;
