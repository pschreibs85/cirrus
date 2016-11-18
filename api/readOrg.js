const router = require('express').Router();
const knex = require('../db/db');

module.exports = router;

knex.readOrg = function() {
  return knex.select('*').from('employee')
      .leftJoin('personal', 'employee.id', 'personal.employee_id')
      .leftJoin('payroll', 'employee.id', 'payroll.employee_id')
    .then( (data) => {
      //this is just to show the output
      console.log(data)
    })
    .then(knex.closeDb)
}

router.get('/readOrg', function(req, res){
	knex.readOrg()
		.then( (obj) => {
			console.log(obj)
			return res.send(obj)
		})
		.catch((err) => { 
			console.log('error reading org', err)
		})
})

console.log(knex.readOrg())