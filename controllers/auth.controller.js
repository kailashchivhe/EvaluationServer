const db = require("../models");
const { expressjwt: jwt } = require('express-jwt');
const config = require("../config/auth.config");
var JWT = require("jsonwebtoken");
const jwksRsa = require('jwks-rsa');
var bcrypt = require("bcryptjs");

const Team = db.team;
const Examier = db.examier;
const ScoreBoard = db.scoreBoard;
const Admin = db.admin;

exports.checkJwt = jwt({
    secret: jwksRsa.expressJwtSecret({
        cache: true,
        rateLimit: true,
        jwksRequestsPerMinute: 5,
        jwksUri: `https://dev-o6v0gho7lgi46b6x.us.auth0.com/.well-known/jwks.json`
    }),
    audience: 'https://dev-o6v0gho7lgi46b6x.us.auth0.com/api/v2/',
    issuer: 'https://dev-o6v0gho7lgi46b6x.us.auth0.com/',
    algorithms: ['RS256']
});


exports.validate = (req, res) => {
    //email from req
    // check email from examiers
    //return success if found examier details

};

exports.addTeam = (req, res) => {
    const newTeam = new Team({
        name: req.query.name,
        memberCount: req.query.memberCount,
        department: req.query.department,
        topic: req.query.topic,
    });
    newTeam.save((err, user) => {
        if (err) {
          res.status(500).send({ message: err });
        } else {
          res.status(200).send({ message: "Team was registered successfully!" });
        }
    });
};

exports.addExamier = (req, res) => {
    const newExamier = new Examier({
        firstName: req.query.firstName,
        lastName: req.query.lastName,
        email: req.query.email,
        password: req.query.password,
        company: req.query.company,
        gender: req.query.gender,
    });
    newExamier.save((err, user) => {
        if (err) {
          res.status(500).send({ message: err });
        } else {
          res.status(200).send({ message: "Examier was registered successfully!" });
        }
    });
    
};

exports.getTeams = (req, res) => {
    Team.find({}, (err, teams) => {
        if (err) throw err;
        return res.status(200).send({ teams: teams });  
    });
};

exports.getExamiers = (req, res) => {
    Examier.find({}, (err, examier) => {
        if (err) throw err;
        return res.status(200).send({ examier: examier });  
    });
    
};

exports.getScores = (req, res) => {
    ScoreBoard.find({}, (err, scoreBoard) => {
        if (err) throw err;
        return res.status(200).send({ scoreBoard: scoreBoard });  
    });
};

exports.addScore = (req,res)=>{
    //find score of team
    //append to existing one
    //if not create new and then add

    const scoreBoard = new ScoreBoard({
        name: req.body.name,
        date: new Date().toISOString().slice(0, 10),
        score: req.body.score,
    });
    scoreBoard.save((err, user) => {
        if (err) {
          res.status(500).send({ message: err });
        } else {
          res.status(200).send({ message: "Team Score was registered successfully!" });
        }
    });
}

exports.login = (req, res) => {
    Admin.findOne({
        email: req.body.email,
    }).exec((err, admin) => {
        if (err) {
            res.status(500).send({ message: err });
            return;
        }

        if (!admin) {
            return res.status(404).send({
            id: null,
            message: "Admin not found.",
            });
        }

        var passwordIsValid = bcrypt.compareSync(req.body.password, admin.password);

        if (!passwordIsValid) {
            return res.status(401).send({
            accessToken: null,
            message: "Invalid Password.",
            });
        }
        let token = JWT.sign(
            { admin },
            config.secret
        );
        res.cookie('cookie',token, { maxAge: 900000, httpOnly: true });

        res.status(200).send({
            token: token
        });
    });
}

exports.signup = (req, res) => {
    const newUser = new Admin({
      email: req.body.email,
      password: bcrypt.hashSync(req.body.password, 8),
    });
    newUser.save((err, user) => {
      if (err) {
        res.status(500).send({ message: err });
      } else {
        res.status(200).send({ message: "Admin was registered successfully!" });
      }
    });
};

exports.logout = (req,res) =>{
    res.clearCookie("cookie");
    res.end();
    // goto login page
    // window.location.href="";
}