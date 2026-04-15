require("dotenv").config();
const app = require("./src/app");
const http = require("http");
const httpServer = http.createServer(app);
// const { server } = require("socket.io");
const socketio = require("socket.io");
const cors = require("cors");
const connectDB = require("./src/db/db");
// const cacheClient = require("./src/services/cache.services");
const MessageModel = require("./src/models/message.Model");


// -----------------
// mongodb fuction
// ------------------
connectDB()

const io = socketio(httpServer, {
    cors: {
        origin: process.env.CORS_ORIGIN,
        methods: ["GET", "POST"],
        credentials: true,
    }
})

// ---------------------------
// socket conections
// -----------------------------

const onlineUser = [];

io.on("connection", (socket) => {
    console.log("socket is connected", socket.id)

    socket.emit("take_SID", socket.id);

    socket.on("join-room", async (chatUser) => {

        socket.join(chatUser.roomId);

        if (chatUser.socket_id) {
            onlineUser.push(chatUser.socket_id)
        }

        const restMessage = await MessageModel.find({ room_id: chatUser.roomId });

        console.log("this is the chat user room id--", chatUser.roomId);

        socket.emit("load-old-msg", restMessage);
    });

    socket.on("send-msg", async (newMesg) => {
        console.log("this is the new message ", newMesg);

        const newMessages = await MessageModel.create({
            room_id: newMesg.roomId,
            sender_id: newMesg.sender_id,
            receiver_id: newMesg.receiver_id,
            content: newMesg.text
        });

        io.to(newMesg.roomId).emit("receive-msg", newMessages);
        socket.emit("receive-msg", newMessages)

    });

    socket.on("disconnect", () => {
        console.log("user disconnected");
    });
});

// --------------------------
// Redis connections
// --------------------------

// cacheClient.on("connect", () => {
//     console.log("Redis is connected successfully")
// });

// cacheClient.on("error", (error) => {
//     console.log("error in redis", error)
// });

httpServer.listen(3000, () => {
    console.log("Server + Socket.io running on port 3000");
});