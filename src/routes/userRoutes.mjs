import { Router } from "express";
import { checkSchema } from "express-validator";
import { resolveIndexById } from "../middlewares/resolveUser.mjs";
import { requireAuth } from "../middlewares/auth.mjs";
import { handleValidationErrors } from "../middlewares/validate.mjs";
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

router.get("/",
    checkSchema(filterUserValidationSchema),
    handleValidationErrors, 
    getUsers
);
router.post("/",
    checkSchema(createUserValidationSchema),
    handleValidationErrors,
    createUser
);

router.get("/:id",
    resolveIndexById, 
    getUserById
);

router.put("/:id",
    resolveIndexById,
    checkSchema(updateUserValidationSchema),
    handleValidationErrors,
    updateUser
);
router.patch("/:id",
    resolveIndexById,
    checkSchema(patchUserValidationSchema),
    handleValidationErrors,
    patchUser
);

router.delete("/:id",
    requireAuth,
    resolveIndexById,
    deleteUser
);

export default router;