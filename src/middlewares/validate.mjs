import { validationResult } from "express-validator";

const handleValidationErrors = (request, response, next) => {
    const result = validationResult(request);
    if(!result.isEmpty()){
        return response.status(200).send({ errors: result.array() });
    }
    next();
};

export { handleValidationErrors };