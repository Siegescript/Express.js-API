import e from "express";

const app = e();

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

app.get("/", (req, res) => {
    res.status(201).send({msg: "Hello World!"});
});

app.get("/api/users", (req, res) => {
    res.send(mockData);
});

app.get("/api/users/:id", (req, res) => {
    console.log(req.params);
    const parsedId = parseInt(req.params.id);
    console.log(parsedId);
    if (isNaN(parsedId)) return res.status(400).send({msg: "Bad Request."});

    const findUser = mockData.find((user) => user.id === parsedId);
    if(!findUser) return res.sendStatus(404);
    return res.send(findUser);
});

app.listen(PORT, () => {
    console.log(`Running on Port ${PORT}`);
})