
exports.up = function(knex, Promise) {
  return knex.schema.createTable('nanny_acct_info', table => {
      table.increments('id').primary()
      table.string('first_name', 60)
      table.string('last_name', 60)
      table.string('background', 255)
      table.string('photo_url', 100)
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('nanny_acct_info')
};
