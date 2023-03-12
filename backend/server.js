// DEFAULT MODULE IMPORTS
import express from "express";
import cors from "cors"
import dotenv from "dotenv"
import morgan from "morgan";
import helmet from "helmet";
import multer from "multer";
import path from "path"
import { fileURLToPath } from "url";
// FILE IMPORTS
import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js"
import postRoutes from "./routes/postRoutes.js"
import { registerUser } from "./controllers/authController.js";
import {createPost} from "./controllers/postController.js"
import connectionToDB from "./config/connectionToDB.js";
import verifyToken from "./middleware/tokenAuth.js";


// CONFIGURATION
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


const app = express();
app.use(express.json());
dotenv.config()

app.use(cors({
    origin:"http://localhost:5173",
}))
app.use('/public', express.static(path.join(__dirname, "public")));
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        console.log(req.files)
        cb(null,"./public")
    },
    filename: (req, file, cb) => {
        cb(null,file.originalname)
    },
})
const upload = multer(storage)
console.log(upload)

// ROUTES WITH FILES
app.post("/register", upload.single("image"), registerUser);
app.post("/post", verifyToken, upload.single("picture"), createPost)

// ROUTES WITHOUT FILES

app.use("/auth", authRoutes)
app.use("/user", userRoutes)
app.use("/posts", postRoutes);


connectionToDB();
app.listen(process.env.PORT,(req, res) => {
    console.log(`SERVER IS RUNNING AT PORT ${process.env.PORT}`)
})