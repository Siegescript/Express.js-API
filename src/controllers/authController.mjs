const loginUser = (request, response) => {
    response.status(200).send({ message: "Logged in successfully", user: request.user });
};

const logoutUser = (request, response) => {
    request.logout((err) => {
        if(err){
            return response.status(500).send({ error: "Could not log out" });
        }
        response.clearCookie("connect.sid");

        return response.status(200).send({ message: "Logged out successfully" });
    });
};

const getAuthStatus = (request, response) => {
    if(request.isAuthenticated()){
        return response.status(200).send(request.user);
    }

    return response.status(401).send({ error: "Not authenticated" });
};

export {
    loginUser,
    logoutUser,
    getAuthStatus
};