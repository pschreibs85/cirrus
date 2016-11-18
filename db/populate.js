const knex  = require('./db')

function createArrayOfEmployeeObjects(){

  const roles = ['CEO', 'VP', 'Director', 'Manager', 'Contributor']
  let nextEmployeeId = 0
  const employeesArray = []
  
  function buildEmployeesArray(rolesArrayIndex, directSupervisorId){

    nextEmployeeId++
    let employeeId = nextEmployeeId
    
    let currentEmployee = {
      employee_id: employeeId,
      title: roles[rolesArrayIndex],
      supervisor: directSupervisorId,
      personalDetails: {
        first_name: 'Employee',
        last_name: 'Number' + employeeId
      },
      payrollDetails: {
        salary: 100000
      },
      performanceReviews: [{
        quarter: '16Q3',
        review: 'Review yet to be completed'
      }]
    }
    
    //base case
    //end of index
    if(rolesArrayIndex >= roles.length-1){
      return currentEmployee
    }
    //recursive case
    else{
      employeesArray.push(currentEmployee)
      for(let i = 0; i < 3; i++){
        employeesArray.push(
          buildEmployeesArray(rolesArrayIndex+1, employeeId)
        )
      }
    }

  }
  
  buildEmployeesArray(0)
  
  return employeesArray.filter( (val) => val !== undefined)

}

let employees = createArrayOfEmployeeObjects();

function populateTable(insertCallback, insertTable) {
  return Promise.all(employees
    .map( (employeeObj) => {
      return insertCallback(employeeObj)
    }))
    .then( () => {
      console.log("Inserted all " + employees.length + " objects into " + insertTable)
    })
    .catch( (error) => {
      console.log("There was an error inserting all " + employees.length + " objects into " + insertTable, error)
    })
}

function chainedInserts() {
  populateTable(knex.insertIntoEmployeeTable, 'employee')
    .then( () => {
      populateTable(knex.insertIntoPersonalTable, 'personal')
    })
    .then( () => {
      populateTable(knex.insertIntoPayrollTable, 'payroll')
    })
    .then( () => {
      populateTable(knex.insertIntoReviewTable, 'review')
    })
    .then(knex.closeDb)
}




chainedInserts()

