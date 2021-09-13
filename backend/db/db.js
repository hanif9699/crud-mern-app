const knex=require('knex');
const config = require('./knexfile');
const {Model}=require('objection');


function setupDB(){
    const db=knex(config.development);
    Model.knex(db)
    // console.log(Model)
}
// const connection = knex(config.development);

module.exports = setupDB