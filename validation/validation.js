const getErrorMessage = (req, schema) => {
    const keys = Object.keys(schema);
    let errorMessage = '';

    for (const key of keys) {
        const validationResult = schema[key].validate(req[key]);

        if (validationResult.error) {
            errorMessage += validationResult.error.details
                ? validationResult.error.details.map(d => d.message).join('. ')
                : validationResult.error.message + '. ';
        }
        req[key] = validationResult.value;
    }

    return { message: errorMessage.replace(/"/g, "'")}
}

const validate = (schema) => {
    return (req, _, next) => {
        const { message } = getErrorMessage(req, schema);
        if (message) return next({ status: 400, message })

        next();
    };
};

module.exports = {
    validate
};
