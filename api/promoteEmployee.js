const router = require('express').Router();
const knex = require('../db/db');

module.exports = router;

//(c) Promote an existing employee
knex.promoteEmployee = function(employeeId, newTitle, newManagerId, newSalary) {
	_updateEmployeeTable()
		.then( () => {
			return _updateSalary()
		})
		.then(knex.closeDb)

	function _updateSalary() {
		return knex('payroll')
			.where('employee_id', '=', employeeId)
			.update({
				salary: newSalary
			})
	}

	function _updateEmployeeTable() {
		return knex('employee')
	  	.where('id', '=', employeeId)
	  	.update({
		    title: newTitle,
		    supervisor: newManagerId
		  })
	}
}

router.get('/promoteEmployee', function(req, res){
	knex.promoteEmployee()
		.then( (obj) => {
			console.log('employee successfully promoted')
			res.send(obj)
		})
		.catch((err) => { 
			console.log('error promoting employee', err)
		})
})

//other thoughts: this does not cascade to change who was reporting to the promoted employee because
// it is unclear what/if anything would happen

knex.promoteEmployee(4, 'Overlord', 'God', 100000000)

