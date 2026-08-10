export const createDataValidationSchema = {
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