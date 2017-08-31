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
    }, function(err, results) {
        res.render('admin/index', { title: 'Janus Blog', error: err, data: results });
    });
};


exports.get_index = function(req, res, next) {

  models.Post.find()
    .sort([['title', 'ascending']])
    .exec(function (err, list_posts) {
      if (err) { return next(err); }
      res.render('admin/posts/index', { title: 'post List', post_list:  list_posts});
  });

};

exports.post_detail = function(req, res, next) {

    async.parallel({
        post: function(callback) {
            models.Post.findById(req.params.id)
              .populate('category')
              .exec(callback);
        },
    }, function(err, results) {
        if (err) { return next(err); }
        res.render('admin/posts/detail', { title: 'Title', post:  results.post } );
    });

};

exports.post_create_get = function(req, res, next) {

    async.parallel({
        categories: function(callback) {
            models.Category.find(callback);
        },
    }, function(err, results) {
        if (err) { return next(err); }
        res.render('admin/posts/form', { title: 'Create post', categories:results.categories });
    });

};

exports.post_create_post = function(req, res, next) {
    req.checkBody('title', 'Title must not be empty.').notEmpty();
    req.checkBody('content', 'Content must not be empty').notEmpty();
    req.sanitize('title').escape();
    req.sanitize('content').escape();
    req.sanitize('title').trim();
    req.sanitize('content').trim();
    req.sanitize('category').escape();

    var post = new models.Post(
      { title: req.body.title,
        content: req.body.content,
        category: (typeof req.body.category==='undefined') ? [] : req.body.category.split(",")
       });

    console.log('post: '+post);

    var errors = req.validationErrors();
    if (errors) {
        console.log('category: '+req.body.category);

        console.log('ERRORS: '+errors);

        async.parallel({
            categories: function(callback) {
                models.Category.find(callback);
            },
        }, function(err, results) {
            if (err) { return next(err); }

            for (i = 0; i < results.categories.length; i++) {
                if (post.category.indexOf(results.categories[i]._id) > -1) {
                    results.categories[i].checked='true';
                }
            }

            res.render('admin/posts/form', { title: 'Create Post', categories:results.categories, post: post, errors: errors });
        });

    }
    else {
        post.save(function (err) {
            if (err) { return next(err); }
               res.redirect(post.url);
            });
    }

};

exports.post_delete_get = function(req, res, next) {

    async.parallel({
        post: function(callback) {
            models.Post.findById(req.params.id).populate('category').exec(callback);
        },
    }, function(err, results) {
        if (err) { return next(err); }
        res.render('admin/posts/delete', { title: 'Delete post', post: results.post } );
    });

};

exports.post_delete_post = function(req, res, next) {

    async.parallel({
        post: function(callback) {
            models.Post.findById(req.params.id).populate('category').exec(callback);
        },
    }, function(err, results) {
        if (err) { return next(err); }

            models.Post.findByIdAndRemove(req.body.id, function deletePost(err) {
                if (err) { return next(err); }
                res.redirect('/admin/posts');
            });
    });

};

exports.post_update_get = function(req, res, next) {

    req.sanitize('id').escape();
    req.sanitize('id').trim();

    async.parallel({
        post: function(callback) {
            models.Post.findById(req.params.id).populate('category').exec(callback);
        },
        categories: function(callback) {
            models.Category.find(callback);
        },
        }, function(err, results) {
            if (err) { return next(err); }

            for (var all_g_iter = 0; all_g_iter < results.categories.length; all_g_iter++) {
                for (var post_g_iter = 0; post_g_iter < results.post.category.length; post_g_iter++) {
                    if (results.categories[all_g_iter]._id.toString()==results.post.category[post_g_iter]._id.toString()) {
                        results.categories[all_g_iter].checked='true';
                    }
                }
            }
            // console.log("results.post ", results.post);
            res.render('admin/posts/form', { title: 'Update post', categories:results.categories, post: results.post });
        });

};

exports.post_update_post = function(req, res, next) {

    req.sanitize('id').escape();
    req.sanitize('id').trim();

    req.checkBody('title', 'Title must not be empty.').notEmpty();
    req.checkBody('content', 'Summary must not be empty').notEmpty();

    req.sanitize('title').escape();
    req.sanitize('content').escape();
    req.sanitize('title').trim();
    req.sanitize('content').trim();
    req.sanitize('category').escape();

    var post = new models.Post(
      { title: req.body.title,
        content: req.body.content,
        category: (typeof req.body.category==='undefined') ? [] : req.body.category.split(","),
        _id:req.params.id
       });

    var errors = req.validationErrors();
    if (errors) {
        async.parallel({
            categories: function(callback) {
                models.Category.find(callback);
            },
        }, function(err, results) {
            if (err) { return next(err); }

            for (i = 0; i < results.categories.length; i++) {
                if (post.category.indexOf(results.categories[i]._id) > -1) {
                    results.categories[i].checked='true';
                }
            }
            res.render('admin/posts/form', { title: 'Update post',categories:results.categories, post: post, errors: errors });
        });

    }
    else {
        models.Post.findByIdAndUpdate(req.params.id, post, {}, function (err,thepost) {
            if (err) { return next(err); }
               res.redirect(thepost.url);
            });
    }

};
