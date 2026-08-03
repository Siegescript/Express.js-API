import e from "express";

const app = e();

const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
    res.status(201).send({msg: "Hello World!"});
});

app.get("/api/users", (req, res) => {
    res.send([
        {id: 1, name: "johndoe"},
        {id: 2, name: "janedoe"},
        {id: 3, name: "maxmustermann"},
        {id: 4, name: "erikamustermann"},
        {id: 5, name: "jeandupont"},
        {id: 6, name: "mariorossi"},
        {id: 7, name: "jankowalski"},
        {id: 8, name: "juanperez"},
        {id: 9, name: "johnsmith"},
    ])
});

app.listen(PORT, () => {
    console.log(`Running on Port ${PORT}`);
})