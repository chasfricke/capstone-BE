const database = require('./database-connection')

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
  create(family_account_info, item) {
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
}