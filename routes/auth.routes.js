const controller = require("../controllers/auth.controller");

module.exports = function(app) {
    app.use(function(req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-jwt-token, Origin, Content-Type, Accept"
        );
        next();
    });
    app.get("/validate", controller.checkJwt, controller.validate);
    app.get("/allTeams", controller.getTeams);
    app.get("/allExamier", controller.getExamiers);
    app.get("/getScore", controller.getScores);
    app.get("/logout", controller.logout);
    app.post("/addScore", controller.addScore);
    app.post("/addTeam", controller.addTeam);
    app.post("/addExamier", controller.addExamier);
    app.post("/login", controller.login);
    app.post("/signup", controller.signup);
};