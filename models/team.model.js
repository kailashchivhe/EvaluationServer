const mongoose = require("mongoose");
const Schema = mongoose.Schema;

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
});

module.exports = mongoose.model('Team', Team);