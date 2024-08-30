export const newUserValidator = {
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
    address: {
        notEmpty: {
            errorMessage: "address is required!",
        },
        isString: {
            errorMessage: "address should be a string",
        },
    },
    email: {
        notEmpty: {
            errorMessage: "name is required!",
        },
        isEmail: {
            errorMessage: "name should be an email",
        },
    },
    phone: {
        notEmpty: {
            errorMessage: "phone is required!",
        },
        isString: {
            errorMessage: "phone should be a string",
        },
        // isMobilePhone: {
        //     options: { locale: "any", strictMode: false }, //false: 555-123-4567
        //     errorMessage: "should be in (555)-123-4567 or +251-933-445-332",
        // },
    },
    city: {
        notEmpty: {
            errorMessage: "city is required!",
        },
        isString: {
            errorMessage: "city should be a string",
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

// data.ssn, data.name, data.email, data.phone, data.city, data.profile_picture
