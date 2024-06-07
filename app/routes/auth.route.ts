import { Router } from "express";
import authController from "../Http/controller/api/authController";
import { Authenticate } from "../middlewares/authentication";

const router = Router();

router.post("/register", authController.signUp);
router.post("/login", authController.signIn);
router.get("/whoami", Authenticate, authController.getProfile);

export default router;