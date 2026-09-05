// --- BASE DEFINITIONS ---
const baseName = {
    in: ['body'],
    isString: { errorMessage: "Name must be a string" },
    trim: true,
    custom: { 
        options: (val) => !/\d/.test(val), 
        errorMessage: "Name cannot contain numbers" 
    }
};

const baseEmail = {
    in: ['body'],
    isEmail: { errorMessage: "Invalid email format" },
    trim: true,
    normalizeEmail: true
};

const basePassword = {
    in: ['body'],
    isString: { errorMessage: "Password must be a string" },
    isLength: {
        options: { min: 8 },
        errorMessage: "Password must be at least 8 characters"
    }
};

// --- ROUTE SCHEMAS ---
const createUserValidationSchema = {
    first_name: { ...baseName, optional: { options: { checkFalsy: true } } },
    last_name:  { ...baseName, optional: { options: { checkFalsy: true } } },
    email:      { ...baseEmail, notEmpty: { errorMessage: "Email must not be empty" } },
    password:   { ...basePassword, notEmpty: { errorMessage: "Password must not be empty" } }
};

const filterUserValidationSchema = {
    first_name: { in: ['query'], optional: true, isString: true, trim: true },
    last_name:  { in: ['query'], optional: true, isString: true, trim: true },
    email:      { in: ['query'], optional: true, isString: true, trim: true },
    page:  { in: ['query'], optional: true, isInt: { options: { min: 1 } }, toInt: true },
    limit: { in: ['query'], optional: true, isInt: { options: { min: 1, max: 100 } }, toInt: true }
};

const updateUserValidationSchema = {
    first_name: { ...baseName, notEmpty: { errorMessage: "First name is required for full replacement" } },
    last_name:  { ...baseName, notEmpty: { errorMessage: "Last name is required for full replacement" } },
    email:      { ...baseEmail, notEmpty: { errorMessage: "Email is required for full replacement" } },
    password:   { ...basePassword, notEmpty: { errorMessage: "Password is required for full replacement" } }
};

const patchUserValidationSchema = {
    first_name: { ...baseName, optional: true },
    last_name:  { ...baseName, optional: true },
    email:      { ...baseEmail, optional: true },
    password:   { ...basePassword, optional: true }
};

const loginValidationSchema = {
    email:    { ...baseEmail, notEmpty: { errorMessage: "Email is required" } },
    password: { ...basePassword, notEmpty: { errorMessage: "Password is required" } }
};

export { 
    createUserValidationSchema, 
    filterUserValidationSchema,
    updateUserValidationSchema,
    patchUserValidationSchema,
    loginValidationSchema
};