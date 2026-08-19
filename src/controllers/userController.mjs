import { validationResult, matchedData } from "express-validator";
import { users } from "../models/userModel.mjs";

const getUsers = (request, response) => {
    const result = validationResult(request);
    if(!result.isEmpty()){
        return response.status(400).send({ errors: result.array() });
    }

    const query = matchedData(request, { locations: ['query'] });

    let filteredUsers = [...users];

    const filterableFields = ['first_name', 'last_name', 'email'];
    filterableFields.forEach((field) => {
        if (query[field]) {
            const searchVal = query[field].toLowerCase();
            filteredUsers = filteredUsers.filter((user) =>
                user[field] && user[field].toLowerCase().includes(searchVal)
            );
        }
    });

    const page = query.page || 1;
    const limit = query.limit || 10;
    const startIndex = (page - 1) * limit;
    const paginatedUsers = filteredUsers.slice(startIndex, startIndex + limit);

    return response.status(200).send(paginatedUsers);
};

const getUserById = (request, response) => {
    return response.send(users[request.userIndex]);
};

const createUser = (request, response) => {
    const result = validationResult(request);
    if (!result.isEmpty()) {
        return response.status(400).send({ errors: result.array() });
    }
        
    const user = matchedData(request);
    const maxId = users.reduce((max, user) => (user.id > max ? user.id : max), 0);
    const newData = { id: maxId + 1, ...user};

    users.push(newData);
    return response.status(201).send(newData);
};

const updateUser = (request, response) => {
    const result = validationResult(request);
    if (!result.isEmpty()) {
        return response.status(400).send({ errors: result.array() });
    }

    const { userIndex, userId } = request;
    const data = matchedData(request);
    
    users[userIndex] = { id: userId, ...data };
    return response.status(200).send(users[userIndex]);
};

const patchUser = (request, response) => {
    const { body, userIndex } = request;
    
    users[userIndex] = { ...users[userIndex], ...body };
    return response.status(200).send(users[userIndex]);
};

const deleteUser = (request, response) => {
    const { userIndex } = request;
    
    users.splice(userIndex, 1);
    return response.sendStatus(204);
};

export {
    getUsers,
    getUserById,
    createUser,
    updateUser,
    patchUser,
    deleteUser
};