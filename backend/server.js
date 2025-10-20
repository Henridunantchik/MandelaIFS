import express from "express"
import dotenv from "dotenv"
import connectDB from "./database/db.js"
import userRoute from "./routes/user.route.js"
import blogRoute from "./routes/blog.route.js"
import commentRoute from "./routes/comment.route.js"
import cookieParser from 'cookie-parser';
import cors from 'cors'
import path from "path"

dotenv.config()
const app = express()

const DEFAULT_PORT = Number(process.env.PORT) || 3000

// Connect to database
connectDB()

// default middleware
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({extended:true}));

// CORS configuration for production
app.use(cors({
    origin: process.env.CLIENT_ORIGIN || true, // Allow all origins for now, will be restricted after deployment
    credentials: true
}))

// Health check endpoint
app.get("/", (req, res) => {
    res.json({ 
        message: "Mandela International School API is running!",
        timestamp: new Date().toISOString(),
        environment: process.env.NODE_ENV || 'development'
    });
});

// APIs
app.use("/api/v1/user", userRoute)
app.use("/api/v1/blog", blogRoute)
app.use("/api/v1/comment", commentRoute)

// Serve static files from frontend build
const _dirname = path.resolve()
app.use(express.static(path.join(_dirname, "/frontend/dist")));

// Catch-all handler: send back React's index.html file for client-side routing
app.get("*", (req, res) => {
    res.sendFile(path.resolve(_dirname, "frontend", "dist", "index.html"))
});

function start(port){
    const server = app.listen(port, ()=>{
        console.log(`Server listening at port ${port}`);
    })
    server.on('error', (err)=>{
        if(err && err.code === 'EADDRINUSE'){
            const nextPort = port + 1;
            console.warn(`Port ${port} in use, trying ${nextPort}...`);
            start(nextPort)
        } else {
            console.error('Server error:', err);
        }
    })
}

start(DEFAULT_PORT)