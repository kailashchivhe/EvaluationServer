const controller = require("../controllers/auth.controller");

module.exports = function(app) {
    app.use(function(req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-jwt-token, Origin, Content-Type, Accept"
        );
        next();
    });
    app.get("/login",controller.getLogin);
    app.get("/teams",controller.teams);
    app.get("/examier", controller.examier);
    app.get("/addTeam", controller.teamAdd);
    app.get("/addExamier", controller.examierAdd);
    app.get("/home", controller.home);
    app.get("/scoreBoard", controller.scoreBoard);


    app.get("/validate", controller.checkJwt, controller.validate);
    app.get("/allTeams", controller.verifyToken, controller.getTeams);
    app.get("/allExamier", controller.verifyToken, controller.getExamiers);
    app.get("/getScore", controller.verifyToken, controller.getScores);
    app.get("/logout", controller.verifyToken, controller.logout);
    
    app.post("/addScore", controller.addScore);
    app.post("/addTeam", controller.verifyToken, controller.addTeam);
    app.post("/addExamier", controller.verifyToken, controller.addExamier);
    app.post("/login", controller.login);
    app.post("/signup", controller.signup);
};