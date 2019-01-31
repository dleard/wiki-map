exports.seed = function(knex, Promise) {
  return knex('users').del()
    .then(function () {
      return Promise.all([
        knex('users').insert({id: 1, handle: 'Nick', password: 'password'}),
        knex('users').insert({id: 2, handle: 'DemoDan', password: 'password'}),
        knex('users').insert({id: 3, handle: 'Lindsey', password: 'password'}),
        knex('users').insert({id: 4, handle: 'Yuhan', password: 'password'}),
        knex('users').insert({id: 5, handle: 'Cartman', password: 'password'}),
        knex('users').insert({id: 6, handle: 'Stan', password: 'password'}),
        knex('users').insert({id: 7, handle: 'Kyle', password: 'password'}),
        knex('users').insert({id: 8, handle: 'Kenny', password: 'password'}),
        knex('users').insert({id: 9, handle: 'Dylan', password: 'password'}),
        knex('users').insert({id: 10, handle: 'Ultron', password: 'visionsucks'})
      ]);
    });
};
