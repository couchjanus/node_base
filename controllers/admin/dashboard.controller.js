const models = require("../../models");

let async = require('async');

exports.index = function(req, res) {

    async.parallel({
        post_count: function(callback) {
            models.Post.count(callback);
        },
        category_count: function(callback) {
            models.Category.count(callback);
        },
        image_count: function(callback) {
            models.Picture.count(callback);
        },
    }, function(err, results) {
        res.render('admin/index', { title: 'Janus Blog', error: err, data: results });
    });
};