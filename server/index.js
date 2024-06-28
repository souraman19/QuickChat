import express from "express"
import cors from "cors" // Cross-Origin Resource Sharing CORS allows your server to accept requests from different domains.
import dotenv from "dotenv" //dotenv is a zero-dependency module that loads environment variables from a .env file into process.env.
import AuthRoutes from "./routes/AuthRoutes.js"; 
import MessageRoutes from "./routes/MessageRoutes.js";
import {Server} from "socket.io";
import path from 'path';
import { fileURLToPath } from 'url';
import multer from 'multer';


// Define __dirname for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config() //This will load the environment variables from the .env file into process.env.
const app = express();

app.use(cors())
app.use(express.json()) //This will parse the incoming request body and make it available under req.body.   


app.get('/', (req, res) => { //This is a simple route that sends a response to the client when the client makes a GET request to the root URL.
    res.send('Happy Journey');
})



const uploadImage = multer({ dest: path.join(__dirname, "uploads/images/") });

app.use("/uploads/images", express.static(path.join(__dirname, 'uploads/images')));


const uploadAudio = multer({ dest: path.join(__dirname, "uploads/recordings/") });

app.use("/uploads/recordings", express.static(path.join(__dirname, 'uploads/recordings')));



//app.use("/uploads/images", express.static(path.join(__dirname, 'uploads/images')));
    // app.use("/uploads/images/", express.static("/uploads/images/"));

app.use("/api/auth", AuthRoutes); //This will use the AuthRoutes for any request that starts with /api/auth.
app.use("/api/messages", MessageRoutes); 

const server = app.listen(process.env.PORT, () => { //This will start the server on the port specified in the .env file.
    console.log(`Server is running on port ${process.env.PORT}`);
})


const io = new Server(server, {
    cors: {
        origin: "http://localhost:3000", 
    },
});

global.onlineUsers = new Map(); 

io.on("connection", (socket) => {
    global.chatSocket = socket;

    socket.on("add-user", (userId) => { //This event is triggered when a new user connects to the socket.
        onlineUsers.set(userId, socket.id); //This will add the user to the onlineUsers map with the user id as the key and the socket id as the value.
    });

    socket.on("send-msg", (data) => { 
        const sendUserSocket = onlineUsers.get(data.toUser); 
        if(sendUserSocket){ 
            socket.to(sendUserSocket).emit("msg-receive", {
                message: data.message, 
                fromUser: data.fromUser,
            });
        }
    })

    socket.on("outgoing-voice-call", (data) => {
        const sendUserSocket = onlineUsers.get(data.to);
        if(sendUserSocket){
            socket.to(sendUserSocket).emit("incoming-voice-call", {
                from: data.from,
                roomId: data.roomId,
                callType: data.callType,
            });
        }
    });

    socket.on("outgoing-video-call", (data) => {
        const sendUserSocket = onlineUsers.get(data.to);
        if(sendUserSocket){
            socket.to(sendUserSocket).emit("incoming-video-call", {
                from: data.from,
                roomId: data.roomId,
                callType: data.callType,
            });
        }
    });

    socket.on("reject-voice-call", (data) => {
        const sendUserSocket = onlineUsers.get(data.from);
        if(sendUserSocket){
            socket.to(sendUserSocket).emit("voice-call-rejected");
        }
    })

    socket.on("reject-video-call", (data) => {
        const sendUserSocket = onlineUsers.get(data.from);
        if(sendUserSocket){
            socket.to(sendUserSocket).emit("video-call-rejected");
        }
    })

    socket.on("accept-incoming-call", ({id}) => {
        const sendUserSocket = onlineUsers.get(id);
        socket.to(sendUserSocket).emit("accept-call"); //use "call-accepted" instead of "accept-call"
    })

    
    
});