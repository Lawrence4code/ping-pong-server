module.exports = {
  dev: {
    port: process.env.PORT || 8080,
    saltingRounds: 10
  },
  prod: {
    port: process.env.PORT || 8080,
    saltingRounds: 10
  }
}