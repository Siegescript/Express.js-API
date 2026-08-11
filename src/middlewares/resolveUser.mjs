import { users } from "../models/userModel.mjs";

export const resolveIndexById = (request, response, next) => {
    const { params: { id } } = request;
    const parsedId = parseInt(id, 10);
    if(isNaN(parsedId)) return response.status(400).send({ error: "Invalid ID format" });

    const userIndex = users.findIndex((user) => user.id === parsedId);
    if(userIndex === -1) return response.status(404).send({ error: "User not found" });

    request.userIndex = userIndex
    request.userId = parsedId;
    next();
};