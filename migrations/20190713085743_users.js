
exports.up = function(knex) {
    return knex.schema.hasTable('users').then((exsits)=>{
        if(!exsits){
            return knex.schema.createTable('users',(table)=>{
                table.increments();
                table.string('name').notNullable();
                table.string('email').notNullable();
                table.string('password').notNullable();
                table.string('logo').nullable();
                table.timestamps();
            });
        }
    });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('users');
};
