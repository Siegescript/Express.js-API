import express from "express";
import { query, validationResult, body, matchedData, checkSchema } from "express-validator";
import { createDataValidationSchema } from "./utils/validationSchemas.mjs";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

const loggingMiddleware = (req, res, next) => {
    console.log(`${req.method} - ${req.url}`);
    next();
};

const resolveDataIndexById = (req, res, next) => {
    const { params: { id } } = req;
    const parsedId = parseInt(id);
    if(isNaN(parsedId)) return res.sendStatus(400);
    const findDataIndex = mockData.findIndex((data) => data.id === parsedId);
    if(findDataIndex === -1) return res.sendStatus(404);
    req.findDataIndex = findDataIndex;
    next();
};

// MOCK Database
const mockData = [
    {id: 1, first_name: "john", last_name: "doe", email: "johndoe@example.com"},
    {id: 2, first_name: "jane", last_name: "doe", email: "janedoe@example.com"},
    {id: 3, first_name: "max", last_name: "mustermann", email: "mmustermann@example.com"},
    {id: 4, first_name: "erika", last_name: "mustermann", email: "emustermann@example.com"},
    {id: 5, first_name: "jeandupont", last_name: "mustermann", email: "jdupont@example.com"},
    {id: 6, first_name: "mario", last_name: "rossi", email: "mrossi@example.com"},
    {id: 7, first_name: "jan", last_name: "kowalski", email: "jkowalski@example.com"},
    {id: 8, first_name: "juan", last_name: "perez", email: "jperez@example.com"},
    {id: 9, first_name: "john", last_name: "smith", email: "jsmith@example.com"}
];

// GET REQUESTS
app.get("/", (req, res) => {
    res.status(201).send({msg: "Hello World!"});
});

app.get(
    "/api/users", 
    query("filter")
    .isString()
    .notEmpty().withMessage("Must not be empty")
    .isLength({ min: 3, max: 10 }).withMessage("must be at least 3-10 characters"), 
    (req, res) => {
        const result = validationResult(req);
        console.log(result);
        const { 
            query: { filter, val }
        } = req;
        
        if(filter && val){
            return res.send(mockData.filter((data) => data[filter].includes(val)));
        }
        
        return res.send(mockData);
    }
);

app.get("/api/users/:id", resolveDataIndexById, (req, res) => {
    const { findDataIndex } = req;
    const data = mockData[findDataIndex]
    
    if(!data){
        return res.sendStatus(404);
    }
    
    return res.send(data);
});

// POST REQUESTS
app.post(
    "/api/users",
    checkSchema(createDataValidationSchema), 
    (req, res) => {
        const result = validationResult(req);
        console.log(result);
        
        if(result.isEmpty()){
            const data = matchedData(req);
            const newData = { id: mockData.length + 1, ...data};
            
            mockData.push(newData)
            
            return res.status(201).send(newData);
        }else{
            return res.status(400).send({ errors: result.array() });
        }
    }
);

// PUT REQUESTS
app.put("/api/users/:id", resolveDataIndexById, (req, res) => {
    const { body, findDataIndex } = req;
    
    mockData[findDataIndex] = { id: mockData[findDataIndex], ...body};
    
    return res.sendStatus(200);
});

// PATCH REQUESTS
app.patch("/api/users/:id", resolveDataIndexById, (req, res) => {
    const { body, findDataIndex } = req;
    
    mockData[findDataIndex] = { ...mockData[findDataIndex], ...body };
    
    return res.sendStatus(200);
});

// DELETE REQUESTS
app.delete("/api/users/:id", resolveDataIndexById, (req, res) => {
    const { findDataIndex } = req;
    
    mockData.splice(findDataIndex, 1);
    
    return res.sendStatus(200);
});

app.listen(PORT, () => {
    console.log(`Running on Port ${PORT}`);
})