const express = require('express');
const router = express.Router();
const controllers = require("../controllers/admin");

router.get('/categories', controllers.categories_controller.category_index);

router.get('/category/create', controllers.categories_controller.category_create_get);
router.post('/category/create', controllers.categories_controller.category_create_post);

router.get('/category/:id', controllers.categories_controller.category_detail);

router.get('/category/:id/delete', controllers.categories_controller.category_delete_get);
router.post('/category/:id/delete', controllers.categories_controller.category_delete_post);

router.get('/category/:id/update', controllers.categories_controller.category_update_get);
router.post('/category/:id/update', controllers.categories_controller.category_update_post);


// router.get('/', controllers.post_controller.index);

// router.get('/post/create', controllers.post_controller.post_create_get);

// router.post('/post/create', controllers.post_controller.post_create_post);

// router.get('/post/:id/delete', controllers.post_controller.post_delete_get);

// router.post('/post/:id/delete', controllers.post_controller.post_delete_post);

// router.get('/post/:id/update', controllers.post_controller.post_update_get);

// router.post('/post/:id/update', controllers.post_controller.post_update_post);

// router.get('/post/:id', controllers.post_controller.post_detail);

// router.get('/posts', controllers.post_controller.post_list);


module.exports = router;
