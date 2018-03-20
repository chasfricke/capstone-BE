const database = require('./database-connection')

module.exports = {
  list(nanny_acct_info) {
    return database('nanny_acct_info').select()
  },
  read(nanny_acct_info, id) {
    return database('nanny_acct_info')
      .select('*')
      .where('id', id)
      .first()
  },
  create(nanny_acct_info, item) {
    return database('nanny_acct_info')
      .insert(item)
      .returning('*')
      .then(record => record[0])
  },
  update(nanny_acct_info, id, nanny) {
    return database('nanny_acct_info')
      .update(nanny)
      .where('id', id)
      .returning('*')
      .then(record => record[0])
  },
  delete(nanny_acct_info, id) {
    return database('nanny_acct_info')
      .delete()
      .where('id', id)
  }
}