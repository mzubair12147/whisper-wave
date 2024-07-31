import { Router } from "express";
import { isLoggedIn } from "../helpers/helper.js";
import Room from "../models/roomModel.js";

const router = Router();

router.post("/create-room", isLoggedIn, async (req, res) => {

    try {
        if (!req.body.name || !req.body.description) {
            return res.status(409).send({
                success: false,
                message: "All the required information is not provided",
                error: "Missing information",   
            });
        }

        const check = await Room.findOne({ name: req.body.name });
        if (check) {
            return res.status(409).send({
                success: false,
                message: "A room with this name already exists",
                error: "Already exists",
            });
        }
        const room = new Room({
            name: req.body.name,
            description: req.body.description,
            createdBy: req.user.id,
        });
        await room.save();
        return res.status(201).send({
            success: true,
            message: "Room is successfully created",
        });
    } catch (error) {
        console.log(error.message);
        return res.status(500).send({
            success: false,
            error: error.message,
            message: "Internal server error",
        });
    }
});

router.get("/room/:roomId", isLoggedIn, async (req, res) => {
    try {
        const room = await Room.findById(req.params.roomId).populate({path: 'createdBy',select:'-profileImage'});
        if (!room) {
            res.send({
                success: false,
                message: "This room do not exists",
                error: "Not found",
            });
        } else {
            return res.send({
                success: true,
                message: "Successfully fetched room data",
                data:room
            });
        }
    } catch (error) {
        res.send({
            success: false,
            error: error.message,
            status: 500,
            message: "Internal server error",
        });
    }
});

router.get("/all-rooms", async (req, res) => {
    try {
        const rooms = await Room.find({}).populate({path: 'createdBy',select:'-profileImage'});;
        console.log('all rooms request');
        if (rooms.length === 0) {
            res.status(200).send({
                success: true,
                data: null,
                message: "There are currently no rooms in the server",
            });
        } else {
            res.status(200).send({
                success: true,
                data: rooms,
                message: "Successfully retrieved all rooms",
            });
        }
    } catch (error) {
        res.send({
            success: false,
            status: 500,
            error: error.message,
            message: "Internal server error",
        });
    }
});

router.delete("/delete-room/:roomId", isLoggedIn, async (req, res) => {
    try {
        const room = await Room.findByIdAndDelete(req.params.roomId);
        if (!room) {
            res.status(404).send({
                success: false,
                error: "Not found!",
                message: "There is not room with this ID on the server.",
            });
        } else {
            res.status(200).send({
                success: true,
                message: "Room is deleted successfully",
                data: room,
            });
        }
    } catch (error) {
        res.send({
            success: false,
            status: 500,
            error: error.message,
            message: "Internal server error",
        });
    }
});

export default router;
