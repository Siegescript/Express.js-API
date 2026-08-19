const createUserValidationSchema = {
    first_name: {
        in: ['body'],
        optional: {
            options: { checkFalsy: true }
        },
        isString: {
            errorMessage: "First name must be a string"
        },
        custom: {
            options: (value) => !/\d/.test(value),
            errorMessage: "First name cannot contain numbers"
        }
    },
    last_name: {
        in: ['body'],
        optional: {
            options: { checkFalsy: true }
        },
        isString: {
            errorMessage: "Last name must be a string"
        },
        custom: {
            options: (value) => !/\d/.test(value),
            errorMessage: "Last name cannot contain numbers"
        }
    },
    email: {
        in: ['body'],
        notEmpty: {
            errorMessage: "Email must not be empty"
        },
        isEmail: {
            errorMessage: "Invalid email"
        }
    }
};

const filterUserValidationSchema = {
    first_name: {
        in: ['query'],
        optional: true,
        isString: { errorMessage: "First name must be a string" },
        trim: true,
    },
    last_name: {
        in: ['query'],
        optional: true,
        isString: { errorMessage: "Last name must be a string" },
        trim: true,
    },
    email: {
        in: ['query'],
        optional: true,
        isString: { errorMessage: "Email must be a string" },
        trim: true,
    },
    page: {
        in: ['query'],
        optional: true,
        isInt: { options: { min: 1 }, errorMessage: "Page must be a positive integer" },
        toInt: true,
    },
    limit: {
        in: ['query'],
        optional: true,
        isInt: { options: { min: 1, max: 100 }, errorMessage: "Limit must be between 1 and 100" },
        toInt: true,
    }
};

const updateUserValidationSchema = {
    first_name: {
        in: ['body'],
        notEmpty: { errorMessage: "First name is required for full replacement" },
        isString: { errorMessage: "First name must be a string" },
        custom: { options: (val) => !/\d/.test(val), errorMessage: "First name cannot contain numbers" }
    },
    last_name: {
        in: ['body'],
        notEmpty: { errorMessage: "Last name is required for full replacement" },
        isString: { errorMessage: "Last name must be a string" },
        custom: { options: (val) => !/\d/.test(val), errorMessage: "Last name cannot contain numbers" }
    },
    email: {
        in: ['body'],
        notEmpty: { errorMessage: "Email is required for full replacement" },
        isEmail: { errorMessage: "Invalid email" }
    }
};

const patchUserValidationSchema = {
    first_name: {
        in: ['body'],
        optional: true,
        isString: { errorMessage: "First name must be a string" },
        custom: { options: (val) => !/\d/.test(val), errorMessage: "First name cannot contain numbers" }
    },
    last_name: {
        in: ['body'],
        optional: true,
        isString: { errorMessage: "Last name must be a string" },
        custom: { options: (val) => !/\d/.test(val), errorMessage: "Last name cannot contain numbers" }
    },
    email: {
        in: ['body'],
        optional: true,
        isEmail: { errorMessage: "Invalid email" }
    }
};

export { 
    createUserValidationSchema, 
    filterUserValidationSchema,
    updateUserValidationSchema,
    patchUserValidationSchema
};