import { Router} from "express";
import { createDeveloper, getAllDevelopers, getDevelopersByQuery } from "../controllers/developerController.js";

const router = Router();

// Fetch all developers
router.get("/", getAllDevelopers);

// Create a new developer
router.post("/", createDeveloper);

// Fetch developers by query
router.get("/q", getDevelopersByQuery);

export default router;