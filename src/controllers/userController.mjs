import { validationResult, matchedData } from "express-validator";
import { users } from "../models/userModel.mjs";

const getUsers = (request, response) => {
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

    return response.send(users);
}

const getUserById = (request, response) => {
    return response.send(users[request.userIndex]);
}

const createUser = (request, response) => {
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

const updateUser = (request, response) => {
    const { body, userIndex, userId } = request;
    
    users[userIndex] = { id: userId, ...body };
    return response.status(200).send(users[userIndex]);
}

const patchUser = (request, response) => {
    const { body, userIndex } = request;
    
    users[userIndex] = { ...users[userIndex], ...body };
    return response.status(200).send(users[userIndex]);
}

const deleteUser = (request, response) => {
    const { userIndex } = request;
    
    users.splice(userIndex, 1);
    return response.sendStatus(204);
}

export {
    getUsers,
    getUserById,
    createUser,
    updateUser,
    patchUser,
    deleteUser
};