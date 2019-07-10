const knex = require('../db/knex');

const tableName = 'stickers';

module.exports = {
    getAll(){
        return knex(tableName);
    },
    getOne(id){
        return knex(tableName).where('id',id).first()
    }
};