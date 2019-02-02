exports.seed = async function(knex, Promise) {
  await knex('users').del()
  await knex.raw('ALTER SEQUENCE users_id_seq RESTART WITH 1');
  await knex('users').insert({handle: 'Nick', password: 'password'});
  await knex('users').insert({handle: 'DemoDan', password: 'password'});
  await knex('users').insert({handle: 'Lindsey', password: 'password'});
  await knex('users').insert({handle: 'Yuhan', password: 'password'});
  await knex('users').insert({handle: 'Cartman', password: 'password'});
  await knex('users').insert({handle: 'Stan', password: 'password'});
  await knex('users').insert({handle: 'Kyle', password: 'password'});
  await knex('users').insert({handle: 'Kenny', password: 'password'});
  await knex('users').insert({handle: 'Dylan', password: 'password'});
  await knex('users').insert({handle: 'Ultron', password: 'visionsucks'});
};