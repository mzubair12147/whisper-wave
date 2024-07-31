import express from 'express';
import { upload } from "../helpers/upload.js";
import userModel from '../models/userModel.js';
import {isLoggedIn} from '../helpers/helper.js'

const router = express.Router();

router.post("/upload", isLoggedIn, upload.single("profileImage"), async (req, res) => {
    try {
        const userId = req.user.id;
        const user = await userModel.findById(userId);

        if (!user) {
            return res.status(404).send("user not found");
        }   

        user.profileImage.data = req.file.buffer;
        user.profileImage.contentType = req.file.mimetype;

        await user.save();
        res.status(200).send("Profile image uploaded successfully");
    } catch (error) {
        res.status(500).send(error.message);
    }
});

router.get("/profile-image/:userId", async (req, res) => {
    try {
        const user = await userModel.findById(req.params.userId);

        if (!user || !user.profileImage.data) {
            return res.status(404).send("Image not found");
        }

        res.set("Content-Type", user.profileImage.contentType);
        res.send(user.profileImage.data);
    } catch (error) {
        res.status(500).send(error.message);
    }
});


export default router;
