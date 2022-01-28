const Joi = require('@hapi/joi');

const registerValidation = (data) => {
 const schema = {
        name: Joi.string().min(4).required(),
        email: Joi.string().min(6).required().email(),
        paasword: Joi.string().min(6).required()
    };
    return Joi.Validate(data, schema);
};

module.exports.registerValidation = registerValidation;
