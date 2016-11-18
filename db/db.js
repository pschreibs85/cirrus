'use strict'

let config = require('../knexfile');
let env = 'development';
let knex = require('knex')(config[env]);

module.exports = knex;

// knex.migrate.latest([config]); 

knex.ensureSchema = function () {
  return Promise.all([
    knex.schema.hasTable('employee').then(function (exists) {
      if (!exists) {
        knex.schema.createTable('employee', function (table) {
          table.increments('id').primary();
          table.string('title', 255);
          table.string('supervisor', 255);
        }).then(function (table) {
          console.log('Created employee table.');
        })
      }
      else {console.log('employee table already exists')}
    }),

    knex.schema.hasTable('personal').then(function (exists) {
      if (!exists) {
        knex.schema.createTable('personal', function (table) {
          table.increments('id').primary();
          table.integer('employee_id').references('id').inTable('employee');
          table.string('first_name', 255);
          table.string('last_name', 255);
        }).then(function (table) {
          console.log('Created personal table.');
        })
      }
      else {console.log('personal table already exists')}
    }),

    knex.schema.hasTable('payroll').then(function (exists) {
      if (!exists) {
        knex.schema.createTable('payroll', function (table) {
          table.increments('id').primary();
          table.integer('employee_id').references('id').inTable('employee');
          table.integer('salary', 255);
        }).then(function (table) {
          console.log('Created payroll table.');
        })
      }
      else {console.log('payroll table already exists')}
    }),

    knex.schema.hasTable('review').then(function (exists) {
      if (!exists) {
        knex.schema.createTable('review', function (table) {
          table.increments('id').primary();
          table.integer('employee_id').references('id').inTable('employee');
          table.string('quarter', 255);
          table.text('review', 'mediumtext');
        }).then(function (table) {
          console.log('Created review table.');
        })
      }
      else {console.log('review table already exists')}
    })

  ])
}


knex.dropAllTables = function(){
  Promise.all([
    knex.schema.dropTable('personal'),
    knex.schema.dropTable('payroll'),
    knex.schema.dropTable('review'),
    knex.schema.dropTable('employee')
  ])
}


knex.truncateTable = function (tableName) {
  return knex(tableName).truncate()
    .then(function () {
      console.log('Deleted '+ tableName)
  })
}

knex.closeDb = function () {
  knex.destroy().then(function () {
    console.log('Closed db connection')
  })
}


knex.insertIntoEmployeeTable = (employeeInfoObj) => {  
  let employeeObj = {
    id: employeeInfoObj.employee_id,
    title: employeeInfoObj.title,
    supervisor: employeeInfoObj.supervisor
  }
  console.log("inserting employee info into employee table:", employeeObj) 
  return knex('employee').insert(employeeObj)
}


knex.insertIntoPersonalTable = (employeeInfoObj) => {  
  let personalObj = {
    employee_id: employeeInfoObj.employee_id,
    first_name: employeeInfoObj.personalDetails.first_name,
    last_name: employeeInfoObj.personalDetails.last_name
  }
  console.log("inserting employee info into personal table:", personalObj) 
  return Promise.all([knex('personal').insert(personalObj)])
}


knex.insertIntoPayrollTable = (employeeInfoObj) => {  
  let payrollObj = {
    employee_id: employeeInfoObj.employee_id,
    salary: employeeInfoObj.payrollDetails.salary
  }
  console.log("inserting employee info into payroll table:", payrollObj) 
  return Promise.all([knex('payroll').insert(payrollObj)])
}


knex.insertIntoReviewTable = (employeeInfoObj) => {  
  let reviewObj = {
    employee_id: employeeInfoObj.employee_id,
    quarter: employeeInfoObj.performanceReviews[0].quarter,
    review: employeeInfoObj.performanceReviews[0].review
  }
  console.log("inserting employee info into review table:", reviewObj) 
  return Promise.all([knex('review').insert(reviewObj)])
}



