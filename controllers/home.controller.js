let Posts = require('../models/post');

exports.index = (req, res) => {
    Posts.recent((err, docs) => {
        res.render('index', { 
            title: 'Express Controller',
            posts: docs 
        });
    });
};
