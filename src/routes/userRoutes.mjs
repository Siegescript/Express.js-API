import { Router } from "express";
import { checkSchema } from "express-validator";
import { createUserValidationSchema, filterUserValidationSchema } from "../utils/validationSchemas.mjs";
import { resolveIndexById } from "../middlewares/resolveUser.mjs";
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
router.put("/:id", resolveIndexById, updateUser);
router.patch("/:id", resolveIndexById, patchUser);
router.delete("/:id", resolveIndexById, deleteUser);

export default router;