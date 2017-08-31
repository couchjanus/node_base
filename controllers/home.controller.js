const models = require("../models");
let async = require('async');

exports.index = function(req, res) {

    models.Post.find()
        .sort([['title', 'ascending']])
        .exec(function (err, list_posts) {
          if (err) { return next(err); }
          res.render('index', { title: 'Janus Blog', posts:  list_posts});
      });
    
};
