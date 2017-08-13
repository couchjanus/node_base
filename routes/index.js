const express = require('express');
const router = express.Router();
const controllers = require("../controllers");

router.get('/', controllers.home_controller.index);

// Render post
router.get('/blog', controllers.posts_controller.index);
router.get('/blog/:id', controllers.posts_controller.show);

module.exports = router;
