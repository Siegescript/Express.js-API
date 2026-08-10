import e from "express";

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

app.get("/api/users", (req, res) => {
    console.log(req.query);
    const { 
        query: {filter,val},
    } = req;

    if(filter && val){
        return res.send(
            mockData.filter((data) => data[filter].includes(val))
        );
    }

    return res.send(mockData);
});

app.get("/api/users/:id", resolveIndexById, (req, res) => {
    const { findData } = req;
    const data = mockData[findData]

    if(!data){
        return res.sendStatus(404);
    }
    
    return res.send(data);
});

// POST REQUESTS
app.post("/api/users", (req, res) => {
    console.log(req.body)
    const { body } = req;
    const newData = { id: mockData.length + 1, ...body};
    mockData.push(newData)

    return res.status(201).send(newData);
});

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