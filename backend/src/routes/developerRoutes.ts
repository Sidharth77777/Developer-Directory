import { Router} from "express";
import { createDeveloper, deleteDeveloper, getAllDevelopers, getDeveloperById, getDevelopersByQuery, updateDeveloper } from "../controllers/developerController.ts";
import { validateForm } from "../middleware/validateForm.ts";
import { developerValidate, developerUpdateValidate } from "../lib/validation.ts";
import upload from "../config/multer.ts";

const router = Router();

// Fetch all developers
router.get("/", getAllDevelopers);

// Create a new developer
router.post("/", upload.single("photo"), validateForm(developerValidate), createDeveloper);

// Fetch developers by query
router.get("/q", getDevelopersByQuery);

// GET devloper by ID
router.get("/:id", getDeveloperById);

// UPDATE each entries of developer by ID
router.put("/:id", upload.single("photo"), validateForm(developerUpdateValidate), updateDeveloper);

// DELETE each entries of developer by ID
router.delete("/:id", deleteDeveloper);

export default router;