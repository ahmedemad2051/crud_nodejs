exports.up = function (knex) {
    return knex.schema.hasTable('stickers').then(function(exists) {
        if (!exists) {
            return knex.schema.createTable('stickers', function(table) {
                table.increments();
                table.text('title');
                table.text('description');
                table.text('rating');
                table.text('url');
                table.timestamps();
            });
        }
    });
};

exports.down = function (knex) {
    return knex.schema.dropTableIfExists('stickers');

};
