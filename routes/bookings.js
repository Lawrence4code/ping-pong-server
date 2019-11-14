const controller = require('../controllers/bookingController');
const validateToken = require('../utils').validateToken;

// validateToken
module.exports = (router) => {
  // route to book new slot
  router.route('/book')
    .post(controller.book);

  // get all booking to list and determine avaiablity
  router.route('/getBookings')
    .get(controller.getBookings);

};