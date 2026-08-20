import { Router } from "express";
import { checkSchema } from "express-validator";
import { resolveIndexById } from "../middlewares/resolveUser.mjs";
import { requireAuth } from "../middlewares/auth.mjs";
import { 
    createUserValidationSchema, 
    filterUserValidationSchema, 
    updateUserValidationSchema, 
    patchUserValidationSchema 
} from "../utils/validationSchemas.mjs";
import { 
    getUsers,
    getUserById,
    createUser,
    updateUser,
    patchUser,
    deleteUser
} from "../controllers/userController.mjs";

const router = Router();

router.get("/", checkSchema(filterUserValidationSchema), getUsers);
router.post("/", checkSchema(createUserValidationSchema), createUser);

router.get("/:id", resolveIndexById, getUserById);

router.put("/:id", resolveIndexById, checkSchema(updateUserValidationSchema), updateUser);
router.patch("/:id", resolveIndexById, checkSchema(patchUserValidationSchema), patchUser);

router.delete("/:id", requireAuth, resolveIndexById, deleteUser);

export default router;