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
};