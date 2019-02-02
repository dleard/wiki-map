exports.seed = async (knex, Promise) => {
  // Deletes ALL existing entries
  await knex('markers').del();
  await knex.raw('ALTER SEQUENCE markers_id_seq RESTART WITH 1');

  await knex('markers').insert({name: 'bad place', address: '123 Sucks Rd', lat: 48.427, long: -123.367, type: '', description: 'This place sucks so so much', imgsrc: '', contributorid: 2, mapid: 4});
  await knex('markers').insert({name: 'worse place', address: '456 Worse Rd', lat: 48.417, long: -123.347, type: '', description: 'This place is WORSE!', imgsrc: '', contributorid: 2, mapid: 4});
  await knex('markers').insert({name: 'tripped', address: '45 Ouch Pl', lat: 48.407, long: -123.387, type: '', description: 'I tripped here and fell in a hole', imgsrc: '', contributorid: 2, mapid: 4});
  await knex('markers').insert({name: 'birds suck', address: '5667 Cawcaw Rd', lat: 48.497, long: -123.357, type: '', description: 'A bird bit me here', imgsrc: '', contributorid: 1, mapid: 4});
  await knex('markers').insert({name: "Tony Stark's House", address: '1234 Rich Guy Ln', lat: 48.427, long: -123.367, type: '', description: 'Stupid Avengers kicked my face here', imgsrc: '', contributorid: 10, mapid: 4});



};