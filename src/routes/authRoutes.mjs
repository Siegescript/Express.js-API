import { Router } from "express";
import { 
    loginUser,
    logoutUser,
    getAuthStatus 
} from "../controllers/authController.mjs";

const router = Router();

router.post("/login", loginUser);
router.post("/logout", logoutUser);
router.get("/status", getAuthStatus);

export default router;