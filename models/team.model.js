const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Scores = new Schema({
    examier: {
        type: String
    },
    date: {
        type: Date,
        default: Date.now()
    },
    score: {
        type: Number
    }
});

const Team = new Schema({
    name: {
        type: String
    },
    memberCount: {
        type: Number
    },
    department: {
        type: String
    },
    topic: {
        type: String
    },
    scores: [Scores],
});

module.exports = mongoose.model('Team', Team);