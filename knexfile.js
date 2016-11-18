'use strict'

//createdb dev_test.

module.exports = {
  development: {
    client: 'pg',
	  connection: {database: 'dev_test'},
	  searchPath: 'knex,public'
  } 
};