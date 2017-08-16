const models = require("../../models");

exports.category_index = (req, res, next) => {

  models.Category.find()
    .sort([['name', 'ascending']])
    .exec((err, list_categories) => {
      if (err) { return next(err); }
      res.render('admin/categories/index', { title: 'Category List', list_categories:  list_categories});
  });

};

exports.category_create_get = (req, res, next) => {
    res.render('admin/categories/form', { title: 'Create Category'});
};


exports.category_detail = (req, res, next) => {
      models.Category.findById(req.params.id)
        .exec((err, category) => {
        if (err) { return next(err); }
        res.render('admin/categories/detail', { title: 'Category Detail', category:category } );
  });

};


exports.category_create_post = (req, res, next) => {

    // req.checkBody('name', 'Category name required').notEmpty();
    // req.sanitize('name').escape();
    // req.sanitize('name').trim();

    // var errors = req.validationErrors();

    var category = new models.Category(
      { name: req.body.name }
    );

    category.save(function (err) {
           if (err) { return next(err); }
           console.log('save category: ');
           res.redirect(category.url);
    });

    // if (errors) {
    //     res.render('admin/categories/form', { title: 'Category Create', category: category, errors: errors});
    // return;
    // }
    // else {
    //     models.Category.findOne({ 'name': req.body.name })
    //         .exec( function(err, found_category) {
    //              console.log('found_category: '+ found_category);
    //              if (err) { return next(err); }

    //              if (found_category) {

    //                  // res.redirect(found_category.url);
    //              }
    //              else {

    //                  category.save(function (err) {
    //                    if (err) { return next(err); }
    //                    console.log('save category: ');
    //                    // res.redirect(category.url);
    //                  });
    //              }
    //          });
    // }
};


exports.category_delete_get = (req, res, next) => {
     models.Category.findById(req.params.id)
       .exec((err, category) => {
        if (err) { return next(err); }
        res.render('admin/categories/delete', { title: 'Delete Category', category: category } );
  });
};

exports.category_delete_post = (req, res, next) => {
    // req.checkBody('id', 'Category id must exist').notEmpty();

    
    models.Category.findById(req.params.id).exec((err, results) => {
        
        if (err) { 
          return next(err); 
        }
        
        models.Category.findByIdAndRemove(req.body.id, function deleteCat(err) {
        
        if (err) { return next(err); }
                res.redirect('/admin/categories');
            });
        });
};


exports.category_update_get = (req, res, next) => {

    // req.sanitize('id').escape();
    // req.sanitize('id').trim();
    models.Category.findById(req.params.id, (err, category) => {
        if (err) { return next(err); }
        res.render('admin/categories/form', { title: 'Update Category', category: category });
    });

};


exports.category_update_post = (req, res, next) => {
    // req.sanitize('id').escape();
    // req.sanitize('id').trim();

    // req.checkBody('name', 'Category name required').notEmpty();

    // req.sanitize('name').escape();
    // req.sanitize('name').trim();

    // var errors = req.validationErrors();

    var category = new models.Category(
      {
      name: req.body.name,
      _id: req.params.id
      }
    );

    // if (errors) {
    //     res.render('category_form', { title: 'Update Category', category: category, errors: errors});
    // return;
    // }
    // else {

        models.Category.findByIdAndUpdate(req.params.id, category, {},  (err,thecategory) => {
            if (err) { return next(err); }
               res.redirect(thecategory.url);
            });
    // }
};
