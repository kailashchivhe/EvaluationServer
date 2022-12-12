const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const db = {};

db.mongoose = mongoose;

db.team = require("./team.model");
db.examier = require("./examier.model");
db.admin = require("./admin.model");
db.scoreBoard = require("./scoreBoard.model");

module.exports = db;