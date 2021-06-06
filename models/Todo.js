const mongoose = require('mongoose'),
    Schema = mongoose.Schema;

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
        createdAt: {
            type: Date,
            default: Date.now
        }
    }
);

module.exports = mongoose.model('Todo', todoSchema);