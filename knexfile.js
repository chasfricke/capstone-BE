module.exports = {

  development: {
    client: 'pg',
    connection: 'postgresql:///nannies'
  },

  production: {
    client: 'pg',
    connection: process.env.DATABASE_URL
  }
};
