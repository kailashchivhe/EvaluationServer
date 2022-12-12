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
const ScoreBoard = new Schema({
    name: {
        type: String
    },
    password: {
        type: String
    },
    scores: [Scores],
});

module.exports = mongoose.model('scoreBoard', ScoreBoard);