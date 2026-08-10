import e from "express";
import { query, validationResult, body, matchedData } from "express-validator";

const app = e();

app.use(e.json());

const loggingMiddleware = (req, res, next) => {
    console.log(`${req.method} - ${req.url}`);
    next();
};

const resolveIndexById = (req, res, next) => {
    const { params: { id } } = req;
    const parsedId = parseInt(id);
    if(isNaN(parsedId)) return res.sendStatus(400);
    const findData = mockData.findIndex((data) => data.id === parsedId);
    if(findData === -1) return res.sendStatus(404);
    req.findData = findData;
    next();
};

const PORT = process.env.PORT || 3000;

const mockData = [
    {id: 1, first_name: "john", last_name: "doe", email: "johndoe@example.com"},
    {id: 2, fisrt_name: "jane", last_name: "doe", email: "janedoe@example.com"},
    {id: 3, fisrt_name: "max", last_name: "mustermann", email: "mmustermann@example.com"},
    {id: 4, fisrt_name: "erika", last_name: "mustermann", email: "emustermann@example.com"},
    {id: 5, fisrt_name: "jeandupont", last_name: "mustermann", email: "jdupont@example.com"},
    {id: 6, fisrt_name: "mario", last_name: "rossi", email: "mrossi@example.com"},
    {id: 7, fisrt_name: "jan", last_name: "kowalski", email: "jkowalski@example.com"},
    {id: 8, fisrt_name: "juan", last_name: "perez", email: "jperez@example.com"},
    {id: 9, fisrt_name: "john", last_name: "smith", email: "jsmith@example.com"}
];

app.listen(PORT, () => {
    console.log(`Running on Port ${PORT}`);
})

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

app.get("/api/users/:id", resolveIndexById, (req, res) => {
    const { findData } = req;
    const data = mockData[findData]

    if(!data){
        return res.sendStatus(404);
    }
    
    return res.send(data);
});

// POST REQUESTS
app.post(
    "/api/users",
    [
        body("first_name")
            .optional({ checkFalsy: true })
            .isString().withMessage("First name must be a string")
            .custom(value => !/\d/.test(value)).withMessage("First name cannot contain numbers"),
        body("last_name")
            .optional({ checkFalsy: true })
            .isString().withMessage("Last name must be a string")
            .custom(value => !/\d/.test(value)).withMessage("First name cannot contain numbers"),
        body("email")
            .notEmpty().withMessage("Email must not be empty")
            .isEmail().withMessage("Invalid email") 
    ], 
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
app.put("/api/users/:id", resolveIndexById, (req, res) => {
    const { body, findData } = req;
    
    mockData[findData] = { id: parsedId, ...body};

    return res.sendStatus(200);
});

// PATCH REQUESTS
app.patch("/api/users/:id", resolveIndexById, (req, res) => {
    const { body, findData } = req;

    mockData[findData] = { ...mockData[findData], ...body };

    return res.sendStatus(200);
});

// DELETE REQUESTS
app.delete("/api/users/:id", (req, res) => {
    const { findData } = req;

    mockData.splice(findData, 1);

    return res.sendStatus(200);
});