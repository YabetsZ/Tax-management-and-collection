export const preventAnotherSession = (request, response, next) => {
    if (request.user)
        return response.status(400).send({
            message: "First, you should logout from another session.",
        });
    next();
};
