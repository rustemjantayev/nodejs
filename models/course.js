const Joi = require('joi')
const mongoose = require('mongoose');

const Course = mongoose.model('Course', {
    name: {
        type: String,
        validator: {
            validate: function() {
                return true;
            },
            message: "somithing happend"

        },
        required: true
    },
    category: {
        async: true,
        type: String,

        required: true,
    },
    author: {
        type: String,
        minlenght: 99,
        required: true
    },
    tags: {
        type: Array,
        require: true
    },
    isPublished: {
        type: Boolean,
        default: true
    },
    dateCreated: {
        type: Date,
        default: Date.now
    },
    price: {
        type: Number,
        require: true
    }
})

function validation(course) {
    const schema = {
        name: Joi.string().min(6).required(),
        author: Joi.string().min(20).required(),
        tags: Joi.array().items().min(1).required(),
        isPublished: Joi.boolean().default(false),
        dateCreate: Joi.date().required(),
        price: Joi.number().min(2).required(),
        category: Joi.string().required()
    }
    return Joi.validate(course, schema);
}

module.exports.Course = Course;
module.exports.validate = validation;