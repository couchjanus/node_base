let LocalStrategy = require('passport-local').Strategy;
let FacebookStrategy = require('passport-facebook').Strategy;
let TwitterStrategy = require('passport-twitter').Strategy;
let GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

const config = require('../config');

let User = require('../models/User');


module.exports = (passport) => {

  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => {
        done(err, user);
    });
  });

  passport.use('local-signup', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true,
  },
  (req, email, password, done) => {
    process.nextTick(() => {
      User.findOne({ 'local.email':  email }, (err, user) => {
        if (err)
            return done(err);
        if (user) {
          return done(null, false, req.flash('signupMessage', 'That email is already taken.'));
        } else {
          let newUser = new User();
          newUser.local.email = email;
          newUser.local.password = newUser.generateHash(password);
          newUser.save((err) => {
            if (err)
              throw err;
            return done(null, newUser);
          });
        }
      });
    });
  }));

  passport.use('local-login', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true,
  },
  function(req, email, password, done) {
    User.findOne({ 'local.email':  email }, function(err, user) {
      if (err){
                return done(err);
              }
      if (!user){
                return done(null, false, req.flash('loginMessage', 'No user found.'));
              }
      if (!user.validPassword(password)){
                return done(null, false, req.flash('loginMessage', 'Oops! Wrong password.'));
              }
      console.log("Login Success!");
      return done(null, user);
    });
  }));


  passport.use(new FacebookStrategy({
    clientID: config.get('facebookAuth:clientID'),
    clientSecret: config.get('facebookAuth:clientSecret'),
    callbackURL: config.get('facebookAuth:callbackURL'),
    profileFields: ['id', 'email', 'first_name', 'last_name'],
  },
  (token, refreshToken, profile, done) => {
    process.nextTick(() => {
      User.findOne({ 'facebook.id': profile.id }, (err, user) => {
        if (err)
          return done(err);
        if (user) {
          return done(null, user);
        } else {
          let newUser = new User();
          newUser.facebook.id = profile.id;
          newUser.facebook.token = token;
          newUser.facebook.name = profile.name.givenName + ' ' + profile.name.familyName;
          newUser.facebook.email = (profile.emails[0].value || '').toLowerCase();

          newUser.save((err) => {
            if (err)
              throw err;
            return done(null, newUser);
          });
        }
      });
    });
  }));



  passport.use(new TwitterStrategy({
    consumerKey: config.get('twitterAuth:consumerKey'),
    consumerSecret: config.get('twitterAuth:consumerSecret'),
    callbackURL: config.get('twitterAuth:callbackURL'),
  },
  (token, tokenSecret, profile, done) => {
    process.nextTick(() => {
      User.findOne({ 'twitter.id': profile.id }, (err, user) => {
        if (err)
          return done(err);
        if (user) {
          return done(null, user);
        } else {
          let newUser = new User();
          newUser.twitter.id          = profile.id;
          newUser.twitter.token       = token;
          newUser.twitter.username    = profile.username;
          newUser.twitter.displayName = profile.displayName;
          newUser.save((err) => {
            if (err)
             throw err;
            return done(null, newUser);
          });
        }
      });
    });
  }));



  passport.use(new GoogleStrategy({
    clientID: config.get('googleAuth:clientID'),
    clientSecret: config.get('googleAuth:clientSecret'),
    callbackURL: config.get('googleAuth:callbackURL'),
  },
    (token, refreshToken, profile, done) => {
      process.nextTick(() => {
        User.findOne({ 'google.id': profile.id }, (err, user) => {
          if (err)
            return done(err);
          if (user) {
            return done(null, user);
          } else {
            let newUser = new User();
            newUser.google.id = profile.id;
            newUser.google.token = token;
            newUser.google.name = profile.displayName;
            newUser.google.email = profile.emails[0].value;
            newUser.save((err) => {
              if (err)
                throw err;
              return done(null, newUser);
            });
          }
        });
      });
    }));

};
