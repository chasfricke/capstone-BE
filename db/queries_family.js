const database = require('../database-connection')

module.exports = {
  list(family_acct_info) {
    return database('family_account_info').select()
  },
  read(family_account_info, id) {
    return database('family_account_info')
      .select('*')
      .where('id', id)
      .first()
  },
  create(item) {
    return database('family_account_info')
      .insert(item)
      .returning('*')
      .then(record => record[0])
  },
  update(family_account_info, id, family) {
    return database('family_account_info')
      .update(family)
      .where('id', id)
      .returning('*')
      .then(record => record[0])
  },
  delete(family_account_info, id) {
    return database('family_account_info')
      .delete()
      .where('id', id)
  }
  //*** auth logic (user.js) ***
  // getOne: function (id) {
  //   return knex('family_account_info').where('id', id).first();
  // },
  // getOneByEmail: function (email) {
  //   return knex('family_account_info').where('email', email).first();
  // },
  // create: function(user) {
  //   return knex('family_account_info').insert(user, 'id').then(ids => {
  //     return ids[0];
  //   });
  // }
}