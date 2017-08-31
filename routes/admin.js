const express = require('express');
const router = express.Router();
const controllers = require("../controllers/admin");

const multer = require('multer');
const gallery = multer({dest: 'public/media/gallery/'});

router.get('/', controllers.dashboard_controller.index);

router.get('/categories', controllers.categories_controller.category_index);

router.get('/category/create', controllers.categories_controller.category_create_get);
router.post('/category/create', controllers.categories_controller.category_create_post);

router.get('/category/:id', controllers.categories_controller.category_detail);

router.get('/category/:id/delete', controllers.categories_controller.category_delete_get);
router.post('/category/:id/delete', controllers.categories_controller.category_delete_post);

router.get('/category/:id/update', controllers.categories_controller.category_update_get);
router.post('/category/:id/update', controllers.categories_controller.category_update_post);


router.get('/post/create', controllers.posts_controller.post_create_get);

router.post('/post/create', controllers.posts_controller.post_create_post);

router.get('/post/:id/delete', controllers.posts_controller.post_delete_get);

router.post('/post/:id/delete', controllers.posts_controller.post_delete_post);

router.get('/post/:id/update', controllers.posts_controller.post_update_get);

router.post('/post/:id/update', controllers.posts_controller.post_update_post);

router.get('/post/:id', controllers.posts_controller.post_detail);

router.get('/posts', controllers.posts_controller.get_index);


router.get('/gallery', controllers.images_controller.images_index);

router.get('/gallery/create', controllers.images_controller.image_create_get);
router.post('/gallery/create', gallery.single('urlfile'), controllers.images_controller.image_create_post);
router.get('/gallery/:id', controllers.images_controller.image_detail);

router.get('/gallery/:id/delete', controllers.images_controller.image_delete_get);

router.post('/gallery/:id/delete', controllers.images_controller.image_delete_post);

router.get('/gallery/:id/update', controllers.images_controller.image_update_get);

router.post('/gallery/:id/update', gallery.single('urlfile'), controllers.images_controller.image_update_post);

module.exports = router;
