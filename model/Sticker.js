const knex = require('../db/knex');

const tableName = 'stickers';

module.exports = {
    getAll(){
        return knex(tableName);
    },
    getOne(id){
        return knex(tableName).where('id',id).first()
    },
    create(sticker){
        return knex(tableName).insert(sticker);
    },
    update(id,sticker){
        return knex(tableName).where('id',id).update(sticker)
    },
    delete(id){
        return knex(tableName).where('id',id).del()
    }
};