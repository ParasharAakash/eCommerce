const Joi = require('@hapi/joi');

module.exports = {
    validateBody: (schema) => {
        return (req, res, next) => {
            const result = Joi.validate(req.body, schema);
            if(result.error) {
                return res.status(400).send(result.error.details[0].message);
            }

            if(!req.value) { req.value = {} }
            req.value['body'] = result.value;
            next();
        }
    },

    schemas:{
        authSchema: Joi.object().keys({
            email: Joi.string()
                .email()
                .required(),
            password: Joi.string()
                .required()
                .min(8)
                .regex(/(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/) //must contain one number and special character
        })
    }
}