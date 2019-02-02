exports.seed = async function(knex, Promise) {
  await knex('users').del()
  await knex.raw('ALTER SEQUENCE users_id_seq RESTART WITH 1');
  await knex('users').insert({handle: 'Nick', password: 'password', avatar: 'https://vanillicon.com/v2/4f97319b308ed6bd3f0c195c176bbd77.svg'},);
  await knex('users').insert({handle: 'DemoDan', password: 'password', avatar: 'https://vanillicon.com/v2/18126e7bd3f84b3f3e4df094def5b7de.svg'});
  await knex('users').insert({handle: 'Lindsey', password: 'password', avatar: 'https://vanillicon.com/v2/6a01bfa30172639e770a6aacb78a3ed4.svg'});
  await knex('users').insert({handle: 'Yuhan', password: 'password', avatar: 'https://vanillicon.com/v2/955b4144ca4bad34d49882e1ef1517cf.svg'});
  await knex('users').insert({handle: 'Cartman', password: 'password', avatar: 'https://vanillicon.com/v2/8277e0910d750195b448797616e091ad.svg'});
  await knex('users').insert({handle: 'Stan', password: 'password', avatar: 'https://vanillicon.com/v2/7815696ecbf1c96e6894b779456d330e.svg'});
  await knex('users').insert({handle: 'Kyle', password: 'password', avatar: 'https://vanillicon.com/v2/32d7508fe69220cb40af28441ef746d9.svg'});
  await knex('users').insert({handle: 'Kenny', password: 'password', avatar: 'https://vanillicon.com/v2/6c059e4ababe8b4b3eb9df0742c8d879.svg'});
  await knex('users').insert({handle: 'Dylan', password: 'password', avatar: 'https://vanillicon.com/v2/ece926d8c0356205276a45266d361161.svg'});
  await knex('users').insert({handle: 'Ultron', password: 'visionsucks', avatar: 'https://vanillicon.com/v2/87b7cb79481f317bde90c116cf36084b.svg'});
};