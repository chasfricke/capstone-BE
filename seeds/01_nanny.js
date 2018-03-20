
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('nanny_acct_info').del()
    .then(function () {
      console.log("1st function")
      // Inserts seed entries
      return knex('nanny_acct_info').insert([
        {id: 1, first_name: 'Kate', last_name: 'Johnson', background: 'I have led backpacking trips across the US for the last 5 years.', photo_url: 'https://randomuser.me/api/portraits/women/28.jpg'},
        {id: 2, first_name: 'Terry', last_name: 'Silva', background: 'I have worked as ski patrol and as a ski instructor at Loveland Ski Area for the last 3 season', photo_url: 'https://randomuser.me/api/portraits/men/59.jpg'},
        {id: 3, first_name: 'Alan', last_name: 'Carson', background: 'I placed 7th in 2012 London Olympics in whitewater kayaking.', photo_url: 'https://randomuser.me/api/portraits/men/75.jpg'}
      ]);
    })
    .then (() => {
      return knex.raw('ALTER SEQUENCE nanny_acct_info_id_seq RESTART WITH 4;')
    })
};
