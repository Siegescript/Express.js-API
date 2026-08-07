import e from "express";

const app = e();

app.use(e.json());

const PORT = process.env.PORT || 3000;

const mockData = [
    {id: 1, name: "johndoe"},
    {id: 2, name: "janedoe"},
    {id: 3, name: "maxmustermann"},
    {id: 4, name: "erikamustermann"},
    {id: 5, name: "jeandupont"},
    {id: 6, name: "mariorossi"},
    {id: 7, name: "jankowalski"},
    {id: 8, name: "juanperez"},
    {id: 9, name: "johnsmith"},
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

app.get("/api/users/:id", (req, res) => {
    console.log(req.params);
    const parsedId = parseInt(req.params.id);
    console.log(parsedId);
    if (isNaN(parsedId)) return res.status(400).send({msg: "Bad Request."});

    const findData = mockData.find((data) => data.id === parsedId);
    if(!findData) return res.sendStatus(404);
    return res.send(findData);
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
app.put("/api/users/:id", (req, res) => {
    const {
        body,
        params: { id },
    } = req;
    const parsedId = parseInt(id);
    if(isNaN(parsedId)) return res.sendStatus(400);

    const findData = mockData.findIndex((data) => data.id === parsedId);

    if(findData === -1) return res.sendStatus(404);
    mockData[findData] = { id: parsedId, ...body};
    return res.sendStatus(200);
});

// PATCH REQUESTS
app.patch("/api/users/:id", (req, res) => {
    const {
        body,
        params: { id },
    } = req;
    const parsedId = parseInt(id);
    if(isNaN(parsedId)) return res.sendStatus(400);

    const findData = mockData.findIndex((data) => data.id === parsedId);
    if(findData === -1) return res.sendStatus(404);
    mockData[findData] = { ...mockData[findData], ...body };
    
    return res.sendStatus(200);
});