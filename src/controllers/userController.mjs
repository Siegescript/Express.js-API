import { validationResult, matchedData } from "express-validator";
import { Op } from "sequelize";
import { User } from "../models/userModel.mjs";

const getUsers = async (request, response) => {
    const result = validationResult(request);
    if(!result.isEmpty()){
        return response.status(400).send({ errors: result.array() });
    }

    const query = matchedData(request, { locations: ['query'] });

    const whereClause = {};
    const filterableFields = ['first_name', 'last_name', 'email'];

    filterableFields.forEach((field) => {
        if(query[field]){
            whereClause[field]={[Op.like]: `%${query[field]}%`};
        }
    });

    const page = query.page || 1;
    const limit = query.limit || 10;
    const offset = (page - 1) * limit;

    const { count, rows } = await User.findAndCountAll({
        where: whereClause,
        limit: limit,
        offset: offset
    });

    return response.status(200).send({total: count, page, limit, data: rows});
};

const getUserById = async (request, response) => {
    return response.status(200).send(request.user);
};

const createUser = async (request, response) => {
    const result = validationResult(request);
    if (!result.isEmpty()){
        return response.status(400).send({ errors: result.array() });
    }
        
    const data = matchedData(request);

    try{
        const newUser = await User.create(data);
        return response.status(201).send(newUser);
    } catch (error) {
        return response.status(400).send({ error: error.message });
    }
};

const updateUser = async (request, response) => {
    const result = validationResult(request);
    if (!result.isEmpty()){
        return response.status(400).send({ errors: result.array() });
    }

    const data = matchedData(request);
    await request.user.update(data);

    return response.status(200).send(request.user);
};

const patchUser = async (request, response) => {
    const result = validationResult(request);
    if (!result.isEmpty()){
        return response.status(400).send({ errors: result.array() });
    }

    const data = matchedData(request);
    await request.user.update(data);

    return response.status(200).send(request.user);
};

const deleteUser = async (request, response) => {
    await request.user.destroy

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