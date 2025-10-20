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
const allowedOrigins = [
    process.env.CLIENT_ORIGIN || "http://localhost:5173",
    "https://mandela-ifs-git-master-henri-dunants-projects.vercel.app",
    "https://mandela-ipem6oqbx-henri-dunants-projects.vercel.app"
];

app.use(cors({
    origin: function (origin, callback) {
        // Allow requests with no origin (like mobile apps or curl requests)
        if (!origin) return callback(null, true);
        
        if (allowedOrigins.indexOf(origin) !== -1) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true
}))

// Health check endpoint
app.get("/", (req, res) => {
    res.json({ message: "Mandela International School API is running!" });
});

// APIs
app.use("/api/v1/user", userRoute)
app.use("/api/v1/blog", blogRoute)
app.use("/api/v1/comment", commentRoute)

// For local development
if (process.env.NODE_ENV !== 'production') {
    const _dirname = path.resolve()
    app.use(express.static(path.join(_dirname,"/frontend/dist")));
    app.get("*", (_, res)=>{
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
}

// Export for Vercel
export default app;