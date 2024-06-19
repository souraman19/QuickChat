import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import AuthRoutes from "./routes/AuthRoutes.js";

dotenv.config()
const app = express()

app.use(cors())
app.use(express.json())


app.get('/', (req, res) => {
    res.send('Happy Journey');
})

app.use("/api/auth", AuthRoutes);

const server = app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
})