import express from "express";
import { query, validationResult, body, matchedData, checkSchema } from "express-validator";
import { createDataValidationSchema, filterDataValidationSchema } from "./utils/validationSchemas.mjs";

const app = express();
const PORT = process.env.PORT || 3000;

// GLOBAL MIDDLEWARE
app.use(express.json());

const loggingMiddleware = (req, res, next) => {
    console.log(`${req.method} - ${req.url}`);
    next();
};

app.use(loggingMiddleware);

// MOCK Database
const mockData = [
    {id: 1, first_name: "john", last_name: "doe", email: "johndoe@example.com"},
    {id: 2, first_name: "jane", last_name: "doe", email: "janedoe@example.com"},
    {id: 3, first_name: "max", last_name: "mustermann", email: "mmustermann@example.com"},
    {id: 4, first_name: "erika", last_name: "mustermann", email: "emustermann@example.com"},
    {id: 5, first_name: "jean", last_name: "dupont", email: "jdupont@example.com"},
    {id: 6, first_name: "mario", last_name: "rossi", email: "mrossi@example.com"},
    {id: 7, first_name: "jan", last_name: "kowalski", email: "jkowalski@example.com"},
    {id: 8, first_name: "juan", last_name: "perez", email: "jperez@example.com"},
    {id: 9, first_name: "john", last_name: "smith", email: "jsmith@example.com"}
];

// HELPER MIDDLEWARE
const resolveIndexById = (req, res, next) => {
    const { params: { id } } = req;
    const parsedId = parseInt(id, 10);
    if(isNaN(parsedId)) return res.sendStatus(400).send({ error: "Invalid ID format" });

    const dataIndex = mockData.findIndex((data) => data.id === parsedId);
    if(dataIndex === -1) return res.sendStatus(404).send({ error: "User not found" });

    req.dataIndex = dataIndex
    req.dataId = parsedId;
    next();
};

// GET REQUESTS
app.get("/", (req, res) => {
    res.status(200).send({msg: "Hello World!"});
});

app.get(
    "/api/users", 
    checkSchema(filterDataValidationSchema), 
    (req, res) => {
        const result = validationResult(req);
        if(!result.isEmpty()){
            return res.status(400).send({ errors: result.array() });
        }

        const { filter, val } = req.query;

        if(filter && val){
            const filtered = mockData.filter(
                (data) => data[filter] && data[filter].toLowerCase().includes(val.toLowerCase())
            );
            return res.send(filtered);
        }

        return res.send(mockData);
    }
);

app.get("/api/users/:id", resolveIndexById, (req, res) => {
    return res.send(mockData[req.dataIndex]);
});

// POST REQUESTS
app.post(
    "/api/users",
    checkSchema(createDataValidationSchema), 
    (req, res) => {
        const result = validationResult(req);
        if (!result.isEmpty()) {
            return res.status(400).send({ errors: result.array() });
        }
        
        const data = matchedData(req);
        const maxId = mockData.reduce((max, data) => (data.id > max ? data.id : max), 0);
        const newData = { id: maxId + 1, ...data};

        mockData.push(newData);
        return res.status(201).send(newData);
    }
);

// PUT REQUESTS
app.put("/api/users/:id", resolveIndexById, (req, res) => {
    const { body, dataIndex, dataId } = req;
    
    mockData[dataIndex] = { id: dataId, ...body };
    
    return res.status(200).send(mockData[dataIndex]);
});

// PATCH REQUESTS
app.patch("/api/users/:id", resolveIndexById, (req, res) => {
    const { body, dataIndex } = req;
    
    mockData[dataIndex] = { ...mockData[dataIndex], ...body };
    
    return res.send(200).send(mockData[dataIndex]);
});

// DELETE REQUESTS
app.delete("/api/users/:id", resolveIndexById, (req, res) => {
    const { dataIndex } = req;
    
    mockData.splice(dataIndex, 1);
    
    return res.sendStatus(204);
});

// START SERVER
app.listen(PORT, () => {
    console.log(`Running on Port ${PORT}`);
})