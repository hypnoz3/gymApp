const mongoose = require('mongoose');

const excerciseSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    reps: {
        type: Number,
        required: true
    },
    weight: {
        type: String,
        required: true
    },
    sets: {
        type: Number,
        required: true
    }
})

module.exports = mongoose.model('Excercises', excerciseSchema)