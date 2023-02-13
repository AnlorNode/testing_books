const Joi = require('joi');

const presence = { presence: 'required' };
const rexMongoId = /^[0-9a-fA-F]{24}$/;
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
    }, presence),

    updateBook: Joi.object({
        id: Joi.string()
            .pattern(rexMongoId)
            .required()
            .label('id is invalid'),
        title: Joi.string()
            .min(1)
            .max(300)
            .required(),
        author: Joi.string()
            .min(1)
            .max(300)
            .required(),
    }, presence),

    getBookDyId: Joi.string()
        .pattern(rexMongoId)
        .required()
        .label('id is invalid'),

    getbooksAll: Joi.object({
        pagination: Joi.number()
            .integer()
            .min(1)
            .max(999),
        limit: Joi.number()
            .integer()
            .min(1)
            .max(999),
    }, presence)

    ,

};

module.exports = schema;
