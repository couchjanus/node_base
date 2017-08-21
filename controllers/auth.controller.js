const models = require("../models");

const bcrypt   = require('bcrypt-nodejs');

exports.logout_get = (req, res, next) => {
    req.logout();
    req.session.save((err) => {
        if (err) {
            return next(err);
        }
        res.redirect('/');
    });
};

exports.login_get = (req, res) => {
    res.render('users/login_form', { user : req.user, error : req.flash('error')});
};

// exports.login_post = (req, res, next) => {
//     req.session.save((err) => {
//         if (err) {
//             return next(err);
//         }
//         res.redirect('/');
//     });
// };



exports.register_get = (req, res, next) => {
    res.render('users/register_form', { title: 'Sign Up'});
};

function hash(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
}


exports.register_post = (req, res, next) => {
    let user = {
        username: req.body.username,
        email: req.body.email,
        password: hash(req.body.password)
    };
    console.log(user.username,  user.email, user.password);
    return new models.User(user).save();
}

// exports.register_post = (req, res, next) => {
    // console.log(req.body.username,  req.body.email, req.body.password);
    // models.User.register(new models.User({ username : req.body.username, email : req.body.email, password: req.body.password}), (err, user) => {
    //     if (err) {
    //         console.log(err.message);
    //       return res.render('users/register_form', { error : err.message });
    //     }
    //    console.log(req.body.username);
    //     // passport.authenticate('local')(req, res, () => {
    //     //     req.session.save((err) => {
    //     //         if (err) {
    //     //             return next(err);
    //     //         }
    //     //         res.redirect('/');
    //     //     });
    //     // });
    // });
// };
