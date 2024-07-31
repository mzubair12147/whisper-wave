import express from "express";
import cookieParser from "cookie-parser";
import http from "http";
import { Server } from "socket.io";
import cors from "cors";

import { connectMongodb } from "./helpers/helper.js";

import userRouter from "./routes/userRoute.js";
import uploadRouter from "./routes/uploadRoute.js";
import roomRouter from "./routes/roomRoute.js";

const app = express();
const server = http.createServer(app);
const io = new Server({
    cors: {
        origin: "http://localhost:5173",
    },
});

const usersInRoom = {};
const userRoom = {};

io.on("connection", (socket) => {
    console.log(`User ${socket.id} connected`);

    socket.on("join", (data) => {
        const { room, fullName, token } = data;
        if (!token) {
            return;
        }
        socket.join(room);
        userRoom[socket.id] = room;
        if (!(room in usersInRoom)) {
            usersInRoom[room] = [];
        }
        usersInRoom[room].push({ room, fullName, user: socket.id });
        // console.log(`User ${socket.id} joined room ${room}`);

        io.to(room).emit("take-users", usersInRoom[room]);

        socket.on("get-users", () => {
            socket.emit("take-users", usersInRoom[room]);
        });
    });

    socket.on("leave", (room) => {
        socket.leave(room);
        if (usersInRoom[userRoom[socket.id]])
            usersInRoom[userRoom[socket.id]] = usersInRoom[
                userRoom[socket.id]
            ].filter((user) => user.user !== socket.id);
        delete userRoom[socket.id];
        io.to(room).emit("take-users", usersInRoom[room]);
    });

    socket.on("message", (data) => {
        const { room, message, fullName } = data;
        // console.log(
        //     `User ${socket.id} sent message "${message}" in room ${room}`
        // );

        io.to(room).emit("message", {
            user: socket.id,
            message,
            name: fullName,
        });
    });

    socket.on("disconnect", () => {
        if (usersInRoom[userRoom[socket.id]])
            usersInRoom[userRoom[socket.id]] = usersInRoom[
                userRoom[socket.id]
            ].filter((user) => user.user !== socket.id);
        // console.log(`User ${socket.id} disconnected`);
    });
});

connectMongodb();

app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors());

app.use("/user", userRouter);
app.use("/file", uploadRouter);
app.use("/room", roomRouter);

app.get("/", (req, res) => {
    res.sendFile("index.html");
});

const PORT = process.env.PORT || 4000;
io.listen(5000);
app.listen(PORT, () => {
    console.log(`server is running at port: ${PORT}`);
});
