let Posts = require('../models/post');

exports.index = (req, res) => {
    Posts.all((err, docs) => {
        res.render('index', { 
            title: 'Post List',
            posts: docs 
        });
    });
};

exports.show = (req, res, next) => {
    Posts.detail(req.params.id, (err, docs) => {
        res.render('post', { 
            title: 'Post Detail',
            post: docs 
        });
    });
};
