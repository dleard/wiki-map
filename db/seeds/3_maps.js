
exports.seed = async (knex, Promise) => {
  // Deletes ALL existing entries
  await knex('maps').del();
  await knex.raw('ALTER SEQUENCE maps_id_seq RESTART WITH 1');

  await knex('maps').insert({name: 'Neat Places', startlat: 48.427, startlong: -123.367, likes: 6, city: 'Victoria', type: 'entertainment', creatorid: 1});
  await knex('maps').insert({name: 'Cheap Dinners', startlat: 48.427, startlong: -123.367, likes: 65, city: 'Victoria', type: 'food', creatorid: 1});
  await knex('maps').insert({name: 'Good Sushi', startlat: 48.427, startlong: -123.367, likes: 60, city: 'Victoria', type: 'food', creatorid: 1});

  await knex('maps').insert({name: 'Places I Hate', startlat: 48.427, startlong: -123.367, likes: 60, city: 'Victoria', type: 'custom', creatorid: 2});
  await knex('maps').insert({name: 'Good Eats', startlat: 48.427, startlong: -123.367, likes: 20, city: 'Victoria', type: 'food', creatorid: 2});
  await knex('maps').insert({name: 'Fun Times', startlat: 48.427, startlong: -123.367, likes: 45, city: 'Victoria', type: 'entertainment', creatorid: 2});
  await knex('maps').insert({name: 'Great Hikes', startlat: 48.427, startlong: -123.367, likes: 60, city: 'Victoria', type: 'nature', creatorid: 2});
  await knex('maps').insert({name: 'Fancy Restaurants', startlat: 48.427, startlong: -123.367, city: 'Victoria', likes: 25, type: 'food', creatorid: 2});
  
  await knex('maps').insert({name: 'Fun Clubs', startlat: 48.427, startlong: -123.367, likes: 60, city: 'Victoria', type: 'entertainment', creatorid: 9});
  await knex('maps').insert({name: 'Dog Parks', startlat: 48.427, startlong: -123.367, likes: 90, city: 'Victoria', type: 'nature', creatorid: 9});
  await knex('maps').insert({name: 'Quiet Places', startlat: 48.427, startlong: -123.367, likes: 50, city: 'Victoria', type: 'custom', creatorid: 9});

  await knex('maps').insert({name: 'Creepy Houses', startlat: 48.427, startlong: -123.367, likes: 20, city: 'Victoria', type: 'custom', creatorid: 10});
  await knex('maps').insert({name: 'Avengers Hideouts', startlat: 48.427, startlong: -123.367, likes: 45, city: 'Victoria', type: 'custom', creatorid: 10});
};