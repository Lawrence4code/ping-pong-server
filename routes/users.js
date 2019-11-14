const controller = require('../controllers/userController');
const validateToken = require('../utils').validateToken;

module.exports = (router) => {
  // user register route
  router.route('/register')
    .post(controller.register)

  // user logic route
  router.route('/login')
    .post(controller.login);
};