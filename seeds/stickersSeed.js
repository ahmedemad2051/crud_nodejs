const stickers=require('../stickers');
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('stickers').del()
    .then(function () {
      // Inserts seed entries
      return knex('stickers').insert(stickers);
    });
};
