const errorList = {
    form: {
        invalid: "The $1 field can contain only letters and numbers.",
        length: "The $1 $2 length allowed is $3 symbols.",
        credentials: "Wrong username or password.",
        duplicate: "An account with this $1 already exists."
    },
    async: {
    }
};

export function handleFormErrors({ action, errors }) {
    const formated = [];

    for (const { type, name, opt, value } of errors) {
        let error = errorList.form[type]

        if (type === "invalid" || type === "duplicate") {
            error = error.replace("$1", name);
        };

        if (type === "length") {
            error = error.replace("$1", opt)
                .replace("$2", name)
                .replace("$3", value);
        };

        formated.push(error)
    };

    return formated;
};

export function catchErrors(errors) {
    
};

export function formatError(error) {
    console.log(error);
};

// function logError(error) {
    
// };

// function visualiseError(params) {
    
// };