const db = require("../models");
const { expressjwt: jwt } = require('express-jwt');
const jwksRsa = require('jwks-rsa');

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
    
};