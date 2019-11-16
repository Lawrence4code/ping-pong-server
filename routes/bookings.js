const controller = require('../controllers/bookingController');
const validateToken = require('../utils').validateToken;

// validateToken
module.exports = (router) => {
  // route to book new slot
  router.route('/booking')
    .post(controller.createBooking);

  // get all booking to list and determine avaiablity
  router.route('/getBookings')
    .get(controller.getBookings);

  router.route('/booking')
    .delete(controller.cancelBooking);
};