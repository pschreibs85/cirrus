const router = require('express').Router();
const knex = require('../db/db');

module.exports = router;

// (b) Write (add) a new employee
knex.addEmployee = function(employeeInfoObj) {
  knex.insertIntoEmployeeTable(employeeInfoObj)
    .then( () => {
      return knex.insertIntoPersonalTable(employeeInfoObj)
    })
    .then( () => {
      return knex.insertIntoPayrollTable(employeeInfoObj)
    })
    .then(knex.closeDb)
}

router.get('/addEmployee', function(req, res){
	knex.addEmployee()
		.then( (obj) => {
			console.log('new employee successfully added')
			res.send(obj)
		})
		.catch((err) => { 
			console.log("error adding new employee", err)
		})
})


let test = { 
		employee_id: 605,
    title: 'Full Stack Software Developer',
    supervisor: 10,
    personalDetails: { first_name: 'Paul-Michael', last_name: 'Schreiber' },
    payrollDetails: { salary: 1000000 }
  }

knex.addEmployee(test)
