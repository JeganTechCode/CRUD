const express = require('express');
const router = express.Router();

const userControllers = require('../userControllers/controller');


/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});
// router.use('/uploads', express.static('uploads'));

router.post('/api/v1/register', userControllers.Register);

module.exports = router;