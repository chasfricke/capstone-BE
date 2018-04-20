exports.up = function(knex, Promise) {
    return knex.schema.createTable('family_account_info', table => {
          table.increments('id').primary()
          table.string('username')
          table.string('password')
          table.string('first_name')
          table.string('last_name')
          table.string('phone_number')
          table.string('email_address')
          table.string('spouse_name')
          table.integer('number_of_kids')
          table.string('relation')
          table.string('photo_url')
          table.string('street')
          table.string('city')
          table.string('state')
          table.date('signup_date')  
          table.float('rating')
    })
  };
  
  exports.down = function(knex, Promise) {
    return knex.schema.dropTableIfExists('family_account_info')
  };
  
