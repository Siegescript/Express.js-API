import { users } from "../models/userModel.mjs";

const loginUser = (request, response) => {
    const { email } = request.body;
    const user = users.find((user) => user.email === email);

    if(!user){
        return response.status(401).send({ error: "Invalid credentials" });
    }

    request.session.user = { id: user.id, email: user.email };
    return response.status(200).send({ message: "Logged in successfully", user:  request.session.user });
};

const logoutUser = (request, response) => {
    if (!request.session.user) {
        return response.status(400).send({ error: "No active session" });
    }

    request.session.destroy((err) => {
        if (err) return response.status(500).send({ error: "Could not log out" });
        response.clearCookie("connect.sid");

        return response.status(200).send({ message: "Logged out successfully" });
    });
};

const getAuthStatus = (request, response) => {
    if (request.session.user) {
        return response.status(200).send(request.session.user);
    }

    return response.status(401).send({ error: "Not authenticated" });
};

export {
    loginUser,
    logoutUser,
    getAuthStatus
};