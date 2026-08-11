import express from "express";
import { validationResult, matchedData, checkSchema } from "express-validator";
import { createUserValidationSchema, filterUserValidationSchema } from "./utils/validationSchemas.mjs";

const app = express();
const PORT = process.env.PORT || 3000;

// GLOBAL MIDDLEWARE
app.use(express.json());

const loggingMiddleware = (request, response, next) => {
    console.log(`${request.method} - ${request.url}`);
    next();
};

app.use(loggingMiddleware);

// HELPER MIDDLEWARE
const resolveIndexById = (request, response, next) => {
    const { params: { id } } = request;
    const parsedId = parseInt(id, 10);
    if(isNaN(parsedId)) return response.status(400).send({ error: "Invalid ID format" });

    const userIndex = mockData.findIndex((user) => user.id === parsedId);
    if(userIndex === -1) return response.status(404).send({ error: "User not found" });

    request.userIndex = userIndex
    request.userId = parsedId;
    next();
};

// GET REQUESTS
app.get("/", (request, response) => {
    response.status(200).send({msg: "Hello World!"});
});

app.get(
    "/api/users", 
    checkSchema(filterUserValidationSchema), 
    (request, response) => {
        const result = validationResult(request);
        if(!result.isEmpty()){
            return response.status(400).send({ errors: result.array() });
        }

        const { filter, val } = request.query;

        if(filter && val){
            const filtered = mockData.filter(
                (user) => user[filter] && user[filter].toLowerCase().includes(val.toLowerCase())
            );
            return response.send(filtered);
        }

        return response.send(mockData);
    }
);

app.get("/api/users/:id", resolveIndexById, (request, response) => {
    return response.send(mockData[request.userIndex]);
});

// POST REQUESTS
app.post(
    "/api/users",
    checkSchema(createUserValidationSchema), 
    (request, response) => {
        const result = validationResult(request);
        if (!result.isEmpty()) {
            return response.status(400).send({ errors: result.array() });
        }
        
        const user = matchedData(request);
        const maxId = mockData.reduce((max, user) => (user.id > max ? user.id : max), 0);
        const newData = { id: maxId + 1, ...user};

        mockData.push(newData);
        return response.status(201).send(newData);
    }
);

// PUT REQUESTS
app.put("/api/users/:id", resolveIndexById, (request, response) => {
    const { body, userIndex, userId } = request;
    
    mockData[userIndex] = { id: userId, ...body };
    
    return response.status(200).send(mockData[userIndex]);
});

// PATCH REQUESTS
app.patch("/api/users/:id", resolveIndexById, (request, response) => {
    const { body, userIndex } = request;
    
    mockData[userIndex] = { ...mockData[userIndex], ...body };
    
    return response.send(200).send(mockData[userIndex]);
});

// DELETE REQUESTS
app.delete("/api/users/:id", resolveIndexById, (request, response) => {
    const { userIndex } = request;
    
    mockData.splice(userIndex, 1);
    
    return response.sendStatus(204);
});

// START SERVER
app.listen(PORT, () => {
    console.log(`
        [OMNISSIAH BLESSING] 
        > Machine Spirit status : AWAKENED & SANCTIFIED
        > Sacred Vox-Port      : ${PORT}
        > Incantation          : Complete
        
        "There is no certainty in flesh, only in the Machine."
    `);
});