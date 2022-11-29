const { prompt } = require("inquirer");
const mysql = require('mysql2');
require('dotenv').config()

// consts for tables
const employeeTable = ''
const roleTable = ''
const departmentTable = ''

const db = mysql.createConnection(
    {
        host: 'localhost',
        database: process.env.DB_NAME,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD
    },
);

function questionOne() {
    //inquirer
    prompt([
        {
            type: 'list',
            message: 'What would you like to do?',
            name: 'Question1',
            choices: ['View All Employees', 'Add Employee', 'Update Employee', 'View All Roles', 'Add Role', 'Update Role', 'View All Departments', 'Add Department', 'Update Department', 'Quit']

        }
    ])
        .then((data) => {
            //const table = JSON.stringafy(db.query("SELECT * FROM employees;"))

            switch (`${data.Question1}`) {
                //Shows employee table
                case 'View All Employees':

                    db.query("SELECT * FROM employees;", function (err, results) {
                        console.log('')
                        console.table(results);
                        questionOne()
                    })


                    break;
                case 'Add Employee':
                    // db.query("INSERT INTO employees")
                    questionAEmployee()
                    break;

                case 'Update Employee':
                    questionUEmployee()
                    break;
                // Shows Role table
                case 'View All Roles':

                    db.query("SELECT * FROM roles;", function (err, results) {
                        console.log('')
                        console.table(results);
                        questionOne()
                    })
                    break;

                case 'Add Role':
                    questionARole()
                    break;

                case 'Update Role':
                    questionURole()
                    break;
                // Show Department tables
                case 'View All Departments':

                    db.query("SELECT * FROM departments;", function (err, results) {
                        console.log('')
                        console.table(results);
                        questionOne()
                    })
                    break;

                case 'Add Department':
                    questionADepartment()
                    break;

                case 'Update Department':
                    questionUDepartment()
                    break;
                case 'Quit':
                    console.log('Bye bye')
                    process.exit()
                    break;
                default:
                    console.log('Functionality not yet realized!')
                    questionOne()
                    break;
            }

            // if (data = 'View All Employees') {
            //     console.table()
            //     questionOne()
            // } else {
            //     console.log('no functionality yet...')
            // }
        })
    // .then((data) => {
    //     questionOne
    // })

}

function questionAEmployee() {
    prompt([
        {
            type: 'input',
            message: 'Enter first name',
            name: 'fName'
        },
        {
            type: 'input',
            message: 'Enter last name',
            name: 'lName'
        },
        {
            type: 'input',
            message: 'Enter role Id',
            name: 'roleId'
        },
        {
            type: 'input',
            message: 'Enter manager Id',
            name: 'manId'
        }
    ])
        .then((data) => {
            const sql = `INSERT INTO employees (first_name, last_name, role_id, Manager_id) VALUES ('${data.fName}', '${data.lName}', ${data.roleId},  ${data.manId})`
            db.query(sql, function (err, results) {
                console.table(results)
                console.log(`New Employee ${data.fName} ${data.lName}, added to ${data.depoId}, as ${data.roleId}`)
                db.query("SELECT * FROM employees;", function (err, results) {
                    console.log('')
                    console.table(results);
                    questionOne()
                })
            })

        })
}

function questionUEmployee() {
    prompt([
        {
            type: 'input',
            message: 'Who would you like to Update (Enter Id)',
            name: 'id'
        },
        {
            type: 'input',
            message: 'Input new or correct First Name',
            name: 'updateFName'
        },
        {
            type: 'input',
            message: 'Input new or correct Last Name',
            name: 'updateLName'
        },
        {
            type: 'input',
            message: 'Input new or correct Role Id',
            name: 'updateRoleId'
        },
        {
            type: 'input',
            message: 'Input new or correct Manager id',
            name: 'updateManId'
        }
    ])
        .then((data) => {
            const sql = `UPDATE employees SET first_name = '${data.updateFName}', last_name = '${data.updateLName}', role_id = ${data.updateRoleId}, Manager_id = ${data.updateManId} WHERE id = ${data.id} `
            db.query(sql, function (err, results) {
                console.log(`Updated Employee ${data.fName} ${data.lName}`)
                db.query("SELECT * FROM employees;", function (err, results) {
                    console.log('')
                    console.table(results);
                    questionOne()
                })
            })
        })


}

function questionARole() {
    prompt([
        {
            type: 'input',
            message: 'Enter the role title',
            name: 'roleName'
        },
        {
            type: 'input',
            message: 'Enter the salary',
            name: 'salary'
        },
        {
            type: 'input',
            message: 'Enter department Id',
            name: 'depoId'
        }
    ])
        .then((data) => {
            const sql = `INSERT INTO roles (title, salary, department_id) VALUES ('${data.roleName}', ${data.salary},  ${data.depoId})`
            db.query(sql, function (err, results) {
                console.table(results)
                console.log(`New Role '${data.roleName}' ${data.salary}, added to ${data.depoId}`)
                db.query("SELECT * FROM roles;", function (err, results) {
                    console.log('')
                    console.table(results);
                    questionOne()
                })
            })

        })
}
function questionURole() {
    prompt([
        {
            type: 'input',
            message: 'What role would you like to Update (Enter Id)',
            name: 'roleId'
        },
        {
            type: 'input',
            message: 'Input new or correct Role Name',
            name: 'updateTitle'
        },
        {
            type: 'input',
            message: 'Input new or correct Salary',
            name: 'updateSalary'
        },
        {
            type: 'input',
            message: 'Input new or correct Department Id',
            name: 'updateDepoId'
        },
    ])
        .then((data) => {
            const sql2 = `UPDATE roles SET title = '${data.updateTitle}', salary = ${data.updateSalary}, department_id = ${data.updateDepoId} WHERE id = ${data.roleId}; `
            db.query(sql2, function (err, results) {
                console.log(err)
                console.log(results)
                console.log(`Updated Role ${data.updateTitle}`)
                db.query("SELECT * FROM roles;", function () {
                    console.log(data)
                    questionOne()
                })
            })
        })


}


function questionADepartment() {
    prompt([
        {
            type: 'input',
            message: 'Enter department name',
            name: 'depoName'
        }
    ])
        .then((data) => {
            const sql = `INSERT INTO departments (names) VALUES ('${data.depoName}')`
            db.query(sql, function (err, results) {
                console.table(results)
                db.query("SELECT * FROM departments;", function (err, results) {
                    console.log('')
                    questionOne()
                })
                console.log('')
                console.log(`New Department, '${data.depoName}', added`)
            })

        })
}

function questionUDepartment() {
    prompt([
        {
            type: 'input',
            message: 'What Department would you like to Update (Enter Id)',
            name: 'depoId'
        },
        {
            type: 'input',
            message: 'Input new or correct Department Name',
            name: 'updateTitle'
        }
    ])
    .then((data) => {
            db.query(`Update departments SET names = '${data.updateTitle}' WHERE id = ${data.depoId}`)
            db.query("SELECT * FROM departments;", function () {
                console.log('')
                questionOne()
            })
    })

}

questionOne()

