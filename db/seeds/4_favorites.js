exports.seed = async (knex, Promise) => {
  // Deletes ALL existing entries
  await knex('favorites').del();
  await knex.raw('ALTER SEQUENCE favorites_id_seq RESTART WITH 1');

  await knex('favorites').insert({mapid: 4, userid: 2});
  await knex('favorites').insert({mapid: 1, userid: 2});
  await knex('favorites').insert({mapid: 2, userid: 2});
  await knex('favorites').insert({mapid: 3, userid: 2});

  await knex('favorites').insert({mapid: 4, userid: 1});
  await knex('favorites').insert({mapid: 6, userid: 2});
  
  await knex('favorites').insert({mapid: 4, userid: 9});
  await knex('favorites').insert({mapid: 1, userid: 4});
  await knex('favorites').insert({mapid: 4, userid: 10});
};