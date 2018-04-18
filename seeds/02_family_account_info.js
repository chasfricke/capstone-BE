
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('family_account_info').del()
    .then(function () {
      // Inserts seed entries
      return knex('family_account_info').insert([
        {
          username: 'Schwartzies',
          password: 'password123',
          first_name: 'Ben',
          last_name: 'Schwartz',
          phone_number: '720-231-4567',
          email_address: 'garys@gmail.com',
          spouse_name: 'Julie Schwartz',
          number_of_kids: '2',
          relation: 'Father',
          photo_url: 'https://randomuser.me/api/portraits/men/31.jpg',
          street: '123 Main Street',
          city: 'Denver',
          state: 'CO',
          signup_date: '01/12/18',
          rating: 3.6
        },
        {
          username: 'AlvarezClan',
          password: 'alvarez123',
          first_name: 'Andrea',
          last_name: 'Alvarez',
          phone_number: '303-264-1987',
          email_address: 'aalvarez23@comcast.net',
          spouse_name: '',
          number_of_kids: '1',
          relation: 'Mother',
          photo_url: 'https://randomuser.me/api/portraits/women/23.jpg',
          street: '3976 Maple Street',
          city: 'Denver',
          state: 'CO',
          signup_date: '02/24/18',
          rating: 5
        },
      ]);
    })
    .then (() => {
      return knex.raw('ALTER SEQUENCE family_account_info_id_seq RESTART WITH 3;')
    })

};
