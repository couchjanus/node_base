const express = require('express');
const router = express.Router();
const controllers = require("../controllers");

router.get('/', controllers.contact_controller.index);

router.post('/send', controllers.contact_controller.send);

router.get('/success', (req, res, next) => {
  res.render('contact/success');
});

module.exports = router;
