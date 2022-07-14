const errorList = {
    form: {
        invalid: "The $1 field can contain only letters and numbers.",
        length: "The $1 $2 length allowed is $3 symbols."
    },
    async: {

    }
};

export function handleFormErrors({ action, currentErrors }) {
    const formated = [];

    for (const { type, field, opt, value } of currentErrors) {
        let error = errorList.form[type]

        if (type === "invalid") {
            error = error.replace("$1", field);
        };

        if (type === "length") {
            error = error.replace("$1", opt)
                .replace("$2", field)
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