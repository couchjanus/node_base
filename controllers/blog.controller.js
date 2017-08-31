const models = require("../models");

let async = require('async');

exports.blog_index = function(req, res, next) {

  models.Post.find()
    .sort([['title', 'ascending']])
    .exec(function (err, list_posts) {
      if (err) { return next(err); }
      res.render('blog/index', { title: 'post List', post_list:  list_posts});
  });

};

exports.blog_detail = function(req, res, next) {

    async.parallel({
        post: function(callback) {
            models.Post.findById(req.params.id)
              .populate('category')
              .exec(callback);
        },

    }, function(err, results) {

        if (err) { return next(err); }

        res.render('blog/detail', { title: 'Title', post:  results.post, user: req.isAuthenticated() ? req.user : null  } );
    });

};

exports.gallery_index = function(req, res, next) {

  models.Picture.find()
    .sort([['title', 'ascending']])
    .exec(function (err, list_images) {
      if (err) { return next(err); }
      res.render('gallery/index', { title: 'Janus Image Gallery', list_images:  list_images});
  });

};
