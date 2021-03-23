'use strict';
const User = require('../models/user.model');
const Token = require('../helpers/token');
const validator = require('../helpers/validate');
const jwt = require('jsonwebtoken');

exports.login = function(req, res) {
    const validationRule = {
        "email": "required|email",
    };
    validator(req.body, validationRule, {}, (err, status) => {
        if (!status) {
        res.status(412)
            .send({
                success: false,
                message: 'Validation failed',
                data: err
            });
    } else {
        const { email } = req.body;
        User.getUser(email, function(err, user) {
            if(err){
                res.status(412)
                    .send({
                        success: false,
                        message: 'User Name invalid',
                        data: err
                    });
            }
                
            if(user){
                const result = Object.values(JSON.parse(JSON.stringify(user)));
                console.log(result[0].id)
                console.log(Token.token)
                // Generate an access token
                const accessToken = jwt.sign({ id: result[0].id}, Token.token,{expiresIn: Token.expiry });
                res.status(412)
                    .send({
                        success: true,
                        message: 'Token',
                        data: accessToken
                    });
            }
        })
    }
});
};