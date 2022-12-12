const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Examier = new Schema({
    firstName: {
        type: String
    },
    lastName: {
        type: String
    },
    email: {
        type: String
    },
    password:{
        type: String
    },
    company: {
        type: String
    },
    gender:{
        type: String
    },
});

module.exports = mongoose.model('Examier', Examier);