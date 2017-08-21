const express = require('express');
const router = express.Router();
const controllers = require("../controllers");
const passport = require('passport');

router.get('/', controllers.home_controller.index);
router.get('/login', controllers.auth_controller.login_get);

router.post('/login', passport.authenticate('local-login', {
  successRedirect: '/profile',
  failureRedirect: '/login',
  failureFlash: true,
}));

router.post('/register', passport.authenticate('local-signup', {
  successRedirect: '/profile',
  failureRedirect: '/register',
  failureFlash: true,
}));

router.get('/profile', isLoggedIn, function(req, res) {
  res.render('users/profile', { user: req.user });
});


router.get('/logout', controllers.auth_controller.logout_get);

router.get('/register', controllers.auth_controller.register_get);
// router.post('/register', controllers.auth_controller.register_post);


router.get('/auth/facebook', passport.authenticate('facebook', { scope: 'email' }));

router.get('/auth/facebook/callback', passport.authenticate('facebook', {
  successRedirect: '/profile',
  failureRedirect: '/',
}));

router.get('/auth/twitter', passport.authenticate('twitter'));

router.get('/auth/twitter/callback', passport.authenticate('twitter', {
  successRedirect: '/profile',
  failureRedirect: '/',
}));

router.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

router.get('/auth/google/callback', passport.authenticate('google', {
  successRedirect: '/profile',
  failureRedirect: '/',
}));



// Render post
// router.get('/blog', controllers.posts_controller.index);
// router.get('/blog/:id', controllers.posts_controller.show);



module.exports = router;

function isLoggedIn(req, res, next) {
  if (req.isAuthenticated())
      return next();
  res.redirect('/');
}
