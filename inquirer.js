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
            choices: ['View All Employees', 'Add Employee', 'Update Employee Role', 'View All Roles', 'Add Role', 'View All Departments', 'Add Department', 'Quit']

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
                default:
                    console.log('Bye bye')
                    process.exit()
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
            type : 'input',
            message: 'Enter manager Id',
            name: 'manId'
        }
    ])
    .then((data)=>{
        const sql = `INSERT INTO employees (first_name, last_name, role_id, Manager_id) VALUES ('${data.fName}', '${data.lName}', ${data.roleId},  ${data.manId})`
        db.query(sql,function (err, results) {
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
    .then((data)=>{
        const sql = `INSERT INTO roles (title, salary, department_id) VALUES ('${data.roleName}', ${data.salary},  ${data.depoId})`
        db.query(sql,function (err, results) {
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

function questionADepartment() {
    prompt([
        {
            type: 'input',
            message: 'Enter department name',
            name: 'depoName'
        }
    ])
    .then((data)=>{
        const sql = `INSERT INTO departments (names, last_name, role_id, Manager_id) VALUES ('${data.roleName}', , ${data.roleId},  ${data.manId})`
        db.query(sql,function (err, results) {
        console.table(results)
        console.log(`New Role '${data.fName}' ${data.lName}, added to ${data.depoId}, as ${data.roleId}`)
        db.query("SELECT * FROM employees;", function (err, results) {
            console.log('')
            console.table(results);
            questionOne()
        })
        })
        
   })
}


questionOne()

