/**
 * Created by sridhar on 16/3/21.
 */
const jwt = require('jsonwebtoken');
var dbConn = require('./../../config/db.config');
const authorize = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (authHeader) {
        const token = authHeader.split(' ')[1];
        jwt.verify(token, 'youraccesstokensecret', (err, user) => {
            if (err) {
                return res.status(403).send({ success: false,
                    message: "Unauthenticate"});
            }
            next();
        });
    } else {
        return  res.status(400).send({ success: false,
            message: "Unauthenticate"});
    }
};
module.exports = authorize;