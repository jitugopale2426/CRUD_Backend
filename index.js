import express from "express"
import dotenv from "dotenv"
import rootRouter from "./routes/index.js";
dotenv.config();
import cors from "cors"

const app = express();

app.use(express.json())

app.use(cors({
    origin:"*",
    methods:["GET","PUT","POST","DELETE"],
    allowedHeaders:["Content-Type","auth-token"]
}))

const PORT=process.env.PORT;

app.get('/',(req,res)=>{
    res.send("Backend is running")
})

app.use('/api',rootRouter)

app.listen(PORT,()=>{
    console.log(`Server running on PORT no ${PORT}`)
})