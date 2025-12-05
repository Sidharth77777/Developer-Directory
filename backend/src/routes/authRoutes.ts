import { Router } from "express";
import { login, signUp } from "../controllers/authController.js";
import { validateForm } from "../middleware/validateForm.js";
import { loginValidate, signupValidate } from "../lib/validation.js";

const router = Router();

// SIGNUP route
router.post("/signup", validateForm(signupValidate), signUp);

// LOGIN route
router.post("/login", validateForm(loginValidate), login);

export default router;