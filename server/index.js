import express from "express"
import cors from "cors" // Cross-Origin Resource Sharing CORS allows your server to accept requests from different domains.
import dotenv from "dotenv" //dotenv is a zero-dependency module that loads environment variables from a .env file into process.env.
import AuthRoutes from "./routes/AuthRoutes.js"; 
import MessageRoutes from "./routes/MessageRoutes.js";
import {Server} from "socket.io";

dotenv.config() //This will load the environment variables from the .env file into process.env.
const app = express();

app.use(cors())
app.use(express.json()) //This will parse the incoming request body and make it available under req.body.   


app.get('/', (req, res) => { //This is a simple route that sends a response to the client when the client makes a GET request to the root URL.
    res.send('Happy Journey');
})

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
});