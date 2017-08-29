const express = require('express');
const router = express.Router();
const controllers = require("../controllers");
const passport = require('passport');

router.get('/', controllers.home_controller.index);

router.get('/login', controllers.auth_controller.login_get);
router.post('/login', controllers.auth_controller.login_post);

router.get('/logout', controllers.auth_controller.logout_get);

router.get('/forgot', controllers.auth_controller.forgot_get);
router.post('/forgot', controllers.auth_controller.forgot_post);
router.get('/reset/:token', controllers.auth_controller.reset_get);
router.post('/reset/:token', controllers.auth_controller.reset_post);

router.get('/signup', controllers.auth_controller.signup_get);
router.post('/signup', controllers.auth_controller.signup_post);

router.get('/account', isAuthenticated, controllers.auth_controller.account_get);
router.post('/account/profile', isAuthenticated, controllers.auth_controller.update_profile_post);
router.post('/account/password', isAuthenticated, controllers.auth_controller.update_password_post);
router.post('/account/delete', isAuthenticated, controllers.auth_controller.delete_account_post);
router.get('/account/unlink/:provider', isAuthenticated, controllers.auth_controller.oauth_unlink_get);

router.get('/auth/facebook', passport.authenticate('facebook', { scope: ['email', 'public_profile'] }));
router.get('/auth/facebook/callback', passport.authenticate('facebook', { failureRedirect: '/login',
  successRedirect: '/account'
}));


router.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));
router.get('/auth/google/callback', passport.authenticate('google', {
  successRedirect: '/account',
  failureRedirect: '/',
}));

router.get('/auth/twitter', passport.authenticate('twitter'));
router.get('/auth/twitter/callback', passport.authenticate('twitter', {
  successRedirect: '/account',
  failureRedirect: '/',
}));


// Render post
// router.get('/blog', controllers.posts_controller.index);
// router.get('/blog/:id', controllers.posts_controller.show);



module.exports = router;

function isAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect('/login');
};


// function isLoggedIn(req, res, next) {
//   if (req.isAuthenticated())
//       return next();
//   res.redirect('/');
// }
