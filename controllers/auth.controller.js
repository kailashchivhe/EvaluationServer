const db = require("../models");
const { expressjwt: jwt } = require('express-jwt');
const config = require("../config/auth.config");
var JWT = require("jsonwebtoken");
const jwksRsa = require('jwks-rsa');
var bcrypt = require("bcryptjs");
const path = require('path');

const Team = db.team;
const Examier = db.examier;
const Admin = db.admin;
var jwt1 = require("jsonwebtoken");

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

exports.verifyToken = (req, res, next) => { 
    let token = req.headers["authorization"];
  
    if (!token) {
      return res.status(403).send({ message: "No token provided!" });
    }
  
    jwt1.verify(token, config.secret, (err, decoded) => {
      if (err) {
        return res.status(401).send({ message: "Unauthorized!" });
      }
      next();
    });
};

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
    Team.find({}, (err, team) => {
        if (err) throw err;
        return res.status(200).send({ scoreBoard: team });  
    });
};

exports.addScore = (req,res)=>{
    //find score of team
    //append to existing one
    //if not create new and then add
    var teamID = req.body.teamID;
    var score = req.body.score;
    var examier = req.body.examierName;
    console.log(examier);
    var date = new Date().toISOString().slice(0, 10);

    Team.findOne({ _id: teamID}, (err, team) => {
        
        Team.updateOne(
          { _id: team._id },
          { $push: { scores: { examier, date, score } } },
          { safe: true, new: true },
          (err, team) => {
            if (err) {
              return res.status(500).send(err);
            } else {
              res
                .status(200)
                .send({ message: "Evaluation was successfully added!" });
            }
          }
        );
      });
}

exports.login = (req, res) => {
    Admin.findOne({
        email: req.query.email,
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

        var passwordIsValid = bcrypt.compareSync(req.query.password, admin.password);

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
    localStorage.clear();
}

exports.getLogin = (req,res) =>{
    res.sendFile(path.join(__dirname+'/login/login.html'));
}

exports.teams = (req,res) =>{
    res.sendFile(path.join(__dirname+'/all_teams/allTeams.html'));
}

exports.examier = (req,res) =>{
    res.sendFile(path.join(__dirname+'/all_examiers/allExamiers.html'));
}

exports.teamAdd = (req,res) => {
    res.sendFile(path.join(__dirname+'/add_team/add_team.html'));
}

exports.examierAdd = (req,res) => {
    res.sendFile(path.join(__dirname+'/add_examier/add_examier.html'));
}

exports.home = (req,res) => {
    res.sendFile(path.join(__dirname+'/home/home.html'));
}

exports.scoreBoard = (req,res) => {
    res.sendFile(path.join(__dirname+'/score_board/scoreBoard.html'));
}