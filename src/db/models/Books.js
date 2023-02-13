const { Schema, model } = require('mongoose');

const TagSchema = new Schema({
    title: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
    },
    author: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
    },

});

TagSchema.methods = {
    toJSON() {
        const { _id: id, __v, ...rest } = this.toObject();

        return {
            id,
            ...rest,
        };
    },
};

module.exports = model('Books', TagSchema);
