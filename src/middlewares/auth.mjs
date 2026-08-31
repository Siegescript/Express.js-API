const requireAuth = (request, response, next) => {
    if(request.isAuthenticated()){
        return next();
    }

    return response.status(401).send({ error: "Unauthorized access" }); 
};

export { requireAuth };