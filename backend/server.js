// DEFAULT MODULE IMPORTS
import express from "express";
import cors from "cors"
import dotenv from "dotenv"
import fileupload from "express-fileupload"

// FILE IMPORTS
import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js"
import postRoutes from "./routes/postRoutes.js"
import { registerUser } from "./controllers/authController.js";
import {createPost} from "./controllers/postController.js"
import connectionToDB from "./config/connectionToDB.js";
import verifyToken from "./middleware/tokenAuth.js";
import cloudinaryConfig from "./config/cloudinary.js"

// CONFIGURATION

const app = express();
app.use(express.json({limit: '50mb'}));
app.use(fileupload());
dotenv.config()

app.use(cors({
    origin:"http://localhost:5173",
}))

cloudinaryConfig();
// ROUTES WITH FILES
app.post("/register", registerUser);
app.post("/post", verifyToken, createPost)

// ROUTES WITHOUT FILES

app.use("/auth", authRoutes)
app.use("/user", userRoutes)
app.use("/posts", postRoutes)


connectionToDB();

app.listen(process.env.PORT,(req, res) => {
    console.log(`SERVER IS RUNNING AT PORT ${process.env.PORT}`)
})