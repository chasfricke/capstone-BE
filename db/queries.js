const database = require('../database-connection')

module.exports = {
  list(nanny_acct_info) {
    return database('nanny_account_info').select()
  },
  read(nanny_account_info, id) {
    return database('nanny_account_info')
      .select('*')
      .where('id', id)
      .first()
  },
  create(nanny_account_info, item) {
    return database('nanny_account_info')
      .insert(item)
      .returning('*')
      .then(record => record[0])
  },
  update(nanny_account_info, id, nanny) {
    return database('nanny_account_info')
      .update(nanny)
      .where('id', id)
      .returning('*')
      .then(record => record[0])
  },
  delete(nanny_account_info, id) {
    return database('nanny_account_info')
      .delete()
      .where('id', id)
  }
}