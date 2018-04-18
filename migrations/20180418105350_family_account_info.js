exports.up = function(knex, Promise) {
    return knex.schema.createTable('family_account_info', table => {
          table.increments('id').primary()
          table.string('username', 60)
          table.string('password', 60)
          table.string('first_name', 60)
          table.string('last_name', 60)
          table.string('phone_number')
          table.string('email_address')
          table.string('spouse_name')
          table.integer('number_of_kids')
          table.string('relation', 60)
          table.string('photo_url', 100)
          table.string('street', 60)
          table.string('city', 60)
          table.string('state', 60)
          table.date('signup_date')  
          table.float('rating')
    })
  };
  
  exports.down = function(knex, Promise) {
    return knex.schema.dropTableIfExists('family_account_info')
  };
  
