import { Router } from "express";
import { login, signUp } from "../controllers/authController.ts";
import { validateForm } from "../middleware/validateForm.ts";
import { loginValidate, signupValidate } from "../lib/validation.ts";

const router = Router();

// SIGNUP route
router.post("/signup", validateForm(signupValidate), signUp);

// LOGIN route
router.post("/login", validateForm(loginValidate), login);

export default router;