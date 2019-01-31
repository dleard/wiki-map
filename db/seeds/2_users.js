exports.seed = function(knex, Promise) {
  return knex('users').del()
    .then(function () {
      return Promise.all([
        knex('users').insert({handle: 'Nick', password: 'password'}),
        knex('users').insert({handle: 'DemoDan', password: 'password'}),
        knex('users').insert({handle: 'Lindsey', password: 'password'}),
        knex('users').insert({handle: 'Yuhan', password: 'password'}),
        knex('users').insert({handle: 'Cartman', password: 'password'}),
        knex('users').insert({handle: 'Stan', password: 'password'}),
        knex('users').insert({handle: 'Kyle', password: 'password'}),
        knex('users').insert({handle: 'Kenny', password: 'password'}),
        knex('users').insert({handle: 'Dylan', password: 'password'}),
        knex('users').insert({handle: 'Ultron', password: 'visionsucks'})
      ]);
    });
};
