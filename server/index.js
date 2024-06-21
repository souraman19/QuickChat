import express from "express"
import cors from "cors" // Cross-Origin Resource Sharing CORS allows your server to accept requests from different domains.
import dotenv from "dotenv" //dotenv is a zero-dependency module that loads environment variables from a .env file into process.env.
import AuthRoutes from "./routes/AuthRoutes.js"; 

dotenv.config() //This will load the environment variables from the .env file into process.env.
const app = express() 

app.use(cors()) 
app.use(express.json()) //This will parse the incoming request body and make it available under req.body.   


app.get('/', (req, res) => { //This is a simple route that sends a response to the client when the client makes a GET request to the root URL.
    res.send('Happy Journey');
})

app.use("/api/auth", AuthRoutes); //This will use the AuthRoutes for any request that starts with /api/auth.

const server = app.listen(process.env.PORT, () => { //This will start the server on the port specified in the .env file.
    console.log(`Server is running on port ${process.env.PORT}`);
})