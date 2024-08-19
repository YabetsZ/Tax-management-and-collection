export const newTIN = {
    ssn: {
        notEmpty: {
            errorMessage: "ssn is required!",
        },
        isInt: {
            errorMessage: "ssn should be a number",
        },
    },
};

// data.tin, data.user_id
