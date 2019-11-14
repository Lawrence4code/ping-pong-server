const users = require('./users');
const bookings = require('./bookings');

module.exports = (router) => {
  users(router);
  bookings(router);
  return router;
};