import express from "express";
import cors from "cors";
import { ENV } from "./lib/ENV.js";
import developerRoutes from  "./routes/developerRoutes.js";
import authRoutes from "./routes/authRoutes.js"
import { connectDB } from "./config/db.js";
import { requireAuth } from "./middleware/requireAuth.js";
import { checkHealthOfCloudinary, checkHealthofServer } from "./routes/healthCheckRoutes.js";

const app = express();
const PORT = ENV.PORT || 5000;

app.use(cors(
    {
        origin: [
            "http://localhost:3000",
            ENV.FRONTEND_ORIGIN,
        ],
        methods: ["GET", "POST", "PUT", "DELETE"],
    }
));
app.use(express.json());

// Checking Server Healths
app.get("/", checkHealthofServer);
app.get("/test-cloud", checkHealthOfCloudinary);


// Auth Routes
app.use("/api/auth", authRoutes);

// Developer Routes
app.use("/api/developers", requireAuth , developerRoutes);

// Function to start the server and connect to the database
const runServer = async (): Promise<void> => {
    try{
        await connectDB();

        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        })

    } catch(err:any) {
        console.error("Failed to start server:", err.message);
    }
};

// Run the server
runServer();