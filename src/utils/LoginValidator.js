export const adminLogin = {
    email: {
        notEmpty: {
            errorMessage: "should not be empty!",
        },
        isEmail: {
            errorMessage: "should be email!",
        },
    },
    password: {
        notEmpty: {
            errorMessage: "should not be empty!",
        },
    },
};

export const authLogin = {
    email: {
        notEmpty: {
            errorMessage: "should not be empty!",
        },
        isEmail: {
            errorMessage: "should be email!",
        },
    },
    password: {
        notEmpty: {
            errorMessage: "should not be empty!",
        },
    },
};

export const payerLogin = {
    tin: {
        notEmpty: {
            errorMessage: "should not be empty!",
        },
        isInt: {
            errorMessage: "should be Integer!",
        },
    },
    password: {
        notEmpty: {
            errorMessage: "should not be empty!",
        },
    },
};
