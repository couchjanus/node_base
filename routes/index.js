const express = require('express');
const router = express.Router();
// const controllers = require("../controllers");

// router.get('/', controllers.home_controller.index);

/* GET home page. */

router.get('/', (req, res, next) => {
  res.render('index', { 
    title: 'Express' 
  });
});

/* GET about page. */
router.get('/about', (req, res, next) => {
  res.render('about', {
    title: 'About'
  });
});

/* GET contact page. */
router.get('/contact', (req, res, next) => {
  res.render('contact', {
    title: 'Contact'
  });
});

/* GET contact page. */
router.get('/test', (req, res, next) => {
  res.render('test', {
    title: 'Test PUG'
  });
});

module.exports = router;
