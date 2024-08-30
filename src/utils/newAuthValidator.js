export const newAuthValidator = {
    ssn: {
        notEmpty: {
            errorMessage: "ssn is required!",
        },
        isInt: {
            errorMessage: "ssn should be a number",
        },
    },
    name: {
        notEmpty: {
            errorMessage: "name is required!",
        },
        isString: {
            errorMessage: "name should be a string",
        },
    },
    email: {
        notEmpty: {
            errorMessage: "email is required!",
        },
        isEmail: {
            errorMessage: "email should be an email",
        },
    },
    password: {
        notEmpty: {
            errorMessage: "password is required!",
        },
        isString: {
            errorMessage: "password should be a string",
        },
    },
    phone: {
        notEmpty: {
            errorMessage: "phone is required!",
        },
        isString: {
            errorMessage: "phone should be a string",
        },
    },
    jurisdiction: {
        notEmpty: {
            errorMessage: "jurisdiction is required!",
        },
        isString: {
            errorMessage: "jurisdiction should be a string",
        },
    },
    address: {
        notEmpty: {
            errorMessage: "address is required!",
        },
        isString: {
            errorMessage: "address should be a string",
        },
    },
    profile_picture: {
        notEmpty: {
            errorMessage: "profile_picture is required!",
        },
        isString: {
            errorMessage: "profile_picture should be a string",
        },
        isURL: {
            errorMessage: "profile_picture should be url",
        },
    },
};

// data.ssn, data.name, data.email, data.password, data.phone, data.jurisdiction, data.address, data.profile_picture
