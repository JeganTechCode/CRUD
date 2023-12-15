const express = require('express');
const router = express.Router();

const userControllers = require('../userControllers/controller');
const Middleware = require('../middleware/UserAuth');


router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/api/v1/register', userControllers.Register);
router.post('/api/v1/login',  userControllers.Login);
router.post('/api/v1/update',  userControllers.update);
router.get('/api/v1/userDetails',  userControllers.userDetails);

module.exports = router;