import { User } from "../models/userModel.mjs";

const resolveIndexById = async (request, response, next) => {
    const { params: { id } } = request;
    const parsedId = parseInt(id, 10);
    if(isNaN(parsedId)) return response.status(400).send({ error: "Invalid ID format" });

    const user = await User.findByPk(parsedId);
    if(!user) return response.status(404).send({ error: "User not found" });

    request.user = user;
    next();
};

export { resolveIndexById };