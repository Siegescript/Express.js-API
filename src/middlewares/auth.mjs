const requireAuth = (request, response, next) => {
    if(request.session && request.session.user){
        return next();
    }

    return response.status(401).send({ error: "Unauthorized access" }); 
};

export { requireAuth };