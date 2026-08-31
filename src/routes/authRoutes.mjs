import passport from "passport";
import { Router } from "express";
import { checkSchema } from "express-validator";
import { loginValidationSchema } from "../utils/validationSchemas.mjs";
import { handleValidationErrors } from "../middlewares/validate.mjs";
import { 
    loginUser,
    logoutUser,
    getAuthStatus 
} from "../controllers/authController.mjs";

const router = Router();

router.post("/login", 
    checkSchema(loginValidationSchema),
    handleValidationErrors, 
    passport.authenticate("local"),
    loginUser
);
router.post("/logout", logoutUser);
router.get("/status", getAuthStatus);

export default router;