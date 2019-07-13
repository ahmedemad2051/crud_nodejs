const User = require('../../model/User');
const {body, validationResult} = require('express-validator');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.validate = (method) => {
    switch (method) {
        case 'create': {
            return [
                body('name', 'name required').exists(),
                body('email').exists().withMessage('email required')
                    .isEmail().withMessage('invalid email')
                    .custom(async email => {
                        await User.getUserByEmail(email).then(user => {
                            if (user) {
                                return Promise.reject('E-mail already in use');
                            }
                        })
                    }),
                body('password', 'password required').exists().isLength({min:6,max:12}),
                body('passwordConfirmation').custom((value, { req }) => {
                    if (value !== req.body.password) {
                        throw new Error('Password confirmation does not match password');
                    }
                    return true;
                })
                // body('logo', 'logo required').exists(),
            ]
        }
        default: {
            return [];
        }
    }
};

exports.getAll = (req, res) => {

    User.getAll().then((users) => {
        res.json(users);
    });

};

exports.show = (req, res) => {
    User.getOne(req.params.id).then((user) => {
        res.json(user);
    });
};

exports.store =  (req, res, next) => {
    try {
        const errors = validationResult(req); // Finds the validation errors in this request and wraps them in an object with handy functions

        if (!errors.isEmpty()) {
            res.status(422).json({errors: errors.array()});
            return;
        }
        bcrypt.hash(req.body.password, 10, function(err, hash) {
             User.create({name:req.body.name,email:req.body.email,password:hash}).then(user => {
                res.json(user);
            });
        });

    } catch (err) {
        return next(err)
    }
};

exports.login =  (req, res, next) => {

     User.getUserByEmail(req.body.email).then(user => {
        if(!user){
            res.status(401).json('Auth failed');
        }
        bcrypt.compare(req.body.password, user.password, function(err, result) {
            if(result){
                 jwt.sign({id:user.id,email:user.email,name:user.name}, 'secret',{expiresIn: '1h'}, function(err, token) {
                    res.status(200).json({
                        message:'Auth successful',
                        token:token
                    });
                });

            }else {
                res.status(401).json('Auth failed');
            }
        });

    });

};

exports.update = (req, res, next) => {
    User.update(req.params.id, req.body).then(user => {
        res.json(user);
    });

};

exports.destroy = (req, res) => {
    User.delete(req.params.id).then(() => {
        res.json({
            'deleted': true
        });
    });
};