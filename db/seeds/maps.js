
exports.seed = (knex, Promise) => {
  // Deletes ALL existing entries
  return knex('maps').del()
    .then(() => {
      return Promise.all([
        // Inserts seed entries
        knex('maps').insert({id: 1, name: 'Places I Hate', startlat: 48.427, startlong: -123.367, likes: 60, type: 'custom', creatorid: 2}),
        knex('maps').insert({id: 2, name: 'Good Eats', startlat: 48.427, startlong: -123.367, likes: 20, type: 'food', creatorid: 2}),
        knex('maps').insert({id: 3, name: 'Fun Times', startlat: 48.427, startlong: -123.367, likes: 45, type: 'entertainment', creatorid: 2}),
      ]);
    });
};