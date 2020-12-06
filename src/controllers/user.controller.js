'use strict';
const User = require('../models/user.model');
const validator = require('../helpers/validate');
exports.findAll = function(req, res) {
    User.findAll(function(err, user) {
        console.log('controller')
        if (err)
            res.send(err);
        console.log('res', user);
        res.send(user);
    }); 
};
exports.create = function(req, res) {
    const validationRule = {
        "name": "required|string",
        "email": "required|email",
        "password": "required|string|min:6|confirmed"
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
            const new_user = new User(req.body);
            User.create(new_user, function(err, user) {
                if (err)
                    res.send(err);
                res.json({error:false,message:"User added successfully!",data:user});
            })
        }
    });
};
exports.findById = function(req, res) {
    User.findById(req.params.id, function(err, user) {
        if (err)
            res.send(err);
        res.json(user);
    });
};
exports.update = function(req, res) {
    const validationRule = {
        "name": "required|string",
        "email": "required|email"
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
            User.update(req.params.id, new User(req.body), function(err, employee) {
                console.log(err)
                console.log("HAI")
                if (err)
                    res.send(err);
                res.json({ error:false, message: 'User successfully updated' });
            });
        }
    });
};
exports.delete = function(req, res) {
    User.delete( req.params.id, function(err, user) {

        if (err)
            res.send(err);
        res.json({ error:false, message: 'User successfully deleted' });
    });
};