// Route paths are prepended with /queries_family
const express = require('express');
const bcrypt = require('bcrypt');
const router = express.Router();

const User = require('../queries_family');

router.get('/', (req, res) => {
    res.json({
        message: 'route working'
    });
});

function validUser(user) {
    const validEmail = typeof user.email_address == 'string' && user.email_address.trim() != '';
    const validPassword = typeof user.password  == 'string' && user.password.trim() != '' && user.password.trim().length >= 6;

    return validEmail && validPassword;
    
}

router.post('/signup', (req, res, next) => {
    if (validUser(req.body)) {
        User
            .getOneByEmail(req.body.email_address)
            .then(user => {
                console.log('user', user);
                //if user not found
                if (!user) {
                    // this is a unique email
                    // hash password
                    bcrypt.hash(req.body.password, 10)
                    .then((hash) => {
                        // insert user into db
                        const user = {
                            email_address: req.body.email_address,
                            password: hash,
                            signup_date: new Date()
                        };
                        User
                            .create(user)
                            .then(id => {
                                res.json({
                                    id,
                                    message: 'valid user'
                                });
                            });

                        // redirect
                        
                    // Store hash in your password DB.
                    });
                    
                } else {
                    next(new Error('Email is in use.'))
                }
            });
    } else {
        next(new Error('Invalid user'));
    }
});

router.post('/login', (req, res, next) => {
    if (validUser(req.body)) {
        //check to see if in db
        User
            .getOneByEmail(req.body.email_address)
            .then(user => {
                console.log('user', user);
                if(user) {
                    // compare password with hashed password
                    bcrypt
                    .compare(req.body.password, user.password)
                    .then((result) => {
                    if (result) {
                        // setting the 'set-cookie' header 
                        const isSecure = req.app.get('env') != 'development';
                        res.cookie('user_id', user.id, {
                            httpOnly: true,
                            secure: isSecure,
                            signed: true
                        });
                        res.json({
                            message: 'Logged in!'
                        });
                    } else {
                        next(new Error('Invalid login'));
                    }
                });
            } else {
                next(new Error('Invalid login'));
            }
        });
    } else {
        next(new Error('Invalid login')); 
    }
});

module.exports = router;