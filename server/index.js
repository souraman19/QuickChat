import express from "express"
import cors from "cors"
import dotenv from "dotenv"

dotenv.config()
const app = express()

app.use(cors())
app.use(express.json())


app.get('/', (req, res) => {
    res.send('Happy Journey');
})

const server = app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
})