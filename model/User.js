const knex = require('../db/knex');

const tableName = 'users';

module.exports = {
    getAll(){
        return knex(tableName);
    },
    getOne(id){
        return knex(tableName).where('id',id).first()
    },
    getUserByEmail(email){
        return knex(tableName).where('email',email).first()
    },
    create(user){
        var data=Object.assign(user,{created_at:new Date(),updated_at:new Date()});
        return knex(tableName).insert(data);
    },
    update(id,user){
        return knex(tableName).where('id',id).update(user)
    },
    delete(id){
        return knex(tableName).where('id',id).del()
    }
};