import express from "express";
import cors from "cors";
import { ENV } from "./lib/ENV.ts";
import developerRoutes from  "./routes/developerRoutes.ts";
import { connectDB } from "./config/db.ts";

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

// Checking GET request
app.get("/", (req, res) => {
    void req;
    res.status(200).send("Server is running...");
});

// Developer Routes
app.use("/api/developers", developerRoutes);

// Start the server and connect to the database
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

runServer();