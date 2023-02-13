const Joi = require('joi');

const schema = {
    addBook: Joi.object({
        title: Joi.string()
            .min(1)
            .max(300)
            .required(),
        author: Joi.string()
            .min(1)
            .max(300)
            .required(),

    }, { presence: 'required' }) };

module.exports = schema;
