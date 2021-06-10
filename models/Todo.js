const mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    User = require('./User');

const todoSchema = new Schema(
    {
        todo: {
            type: String,
            required: true
        },
        completed: {
            type: Boolean,
            default: false
        },
        author: {
            id: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User'
            }
        },
        createdAt: {
            type: Date,
            default: Date.now
        },
    }
);

module.exports = mongoose.model('Todo', todoSchema);