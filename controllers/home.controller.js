const models = require("../models");
let async = require('async');

exports.index = function(req, res) {

    async.parallel({
        post_count: function(callback) {
            models.Post.count(callback);
        },
        category_count: function(callback) {
            models.Category.count(callback);
        },
    }, (err, results) => {
        res.render('index', { title: 'Janus Blog', error: err, posts: results });
    });
};
