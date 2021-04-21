const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");
const chalk = require ("chalk");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");


let employeeArray = [];

const initialQuestion = () => {
    inquirer.prompt([
        {
            type: 'list',
            message: 'What type of employee would you like to add?',
            name: 'employeeType',
            choices: [Manager, Engineer, Intern]
        },
    ])
        .then(answer => {

            if (answer.employeeType === 'Manager') {
                managerQuestions();
            } else if
                (answer.employeeType === 'Engineer') {
                engineerQuestions();
            } else if
                (answer.employeeType === 'Intern') {
                internQuestions();
            }
            else {
                console.log('Done!');
                return;
            }
        })
}

initialQuestion();

const internQuestions = () => {
    inquirer.prompt([

        {
            type: 'input',
            message: "What is the intern's name?",
            name: 'internName'
        },
        {
            type: 'input',
            message: "What is the intern's employee ID?",
            name: 'id',
        },
        {
            type: 'input',
            message: "What is the intern's email?",
            name: 'email',
        },
        {
            type: 'input',
            message: "What is the intern's school",
            name: 'school',
        },
        {
            type: 'confirm',
            message: 'Do you want to enter another employee?',
            name: 'addCheck',
        },

    ])
        .then(answers => {
            const intern = new Intern(answers.internName, answers.id, answers.email, answers.school);
            employeeArray.push(intern);

            console.log(employeeArray);

            if (answers.addCheck) {
                initialQuestion();
            } else {
                let data = render(employeeArray);
                fs.writeFile(outputPath, data, (err) => {
                    if (err) throw err;
                    console.log(chalk.green('Your file has been saved!'));
                });
            }
        })
}

const engineerQuestions = () => {
    inquirer.prompt([

        {
            type: 'input',
            message: "What is the engineer's name?",
            name: 'engineerName'
        },
        {
            type: 'input',
            message: "What is the engineer's employee ID?",
            name: 'id',
        },
        {
            type: 'input',
            message: "What is the engineer's email?",
            name: 'email',
        },
        {
            type: 'input',
            message: "What is the engineer's GitHub username?",
            name: 'github',
        },
        {
            type: 'confirm',
            message: 'Do you want to enter another employee?',
            name: 'addCheck',
        },

    ])
        .then(answers => {
            const engineer = new Engineer(answers.engineerName, answers.id, answers.email, answers.github);
            employeeArray.push(engineer);

            console.log(employeeArray);

            if (answers.addCheck) {
                initialQuestion();
            } else {
                let data = render(employeeArray);
                fs.writeFile(outputPath, data, (err) => {
                    if (err) throw err;
                    console.log(chalk.green('Your file has been saved!'));
                });
            }
        })
}

const managerQuestions = () => {
    inquirer.prompt([

        {
            type: 'input',
            message: 'What is the managers name?',
            name: 'managerName'
        },
        {
            type: 'input',
            message: 'What is the managers id?',
            name: 'id',
        },
        {
            type: 'input',
            message: 'What is the managers email?',
            name: 'email',
        },
        {
            type: 'input',
            message: 'What is the managers office number?',
            name: 'officeNumber',
        },
        {
            type: 'confirm',
            message: 'Do you want to enter another employee?',
            name: 'addCheck',
        },

    ])
        .then(answers => {
            const manager = new Manager(answers.managerName, answers.id, answers.email, answers.officeNumber);
            employeeArray.push(manager);

            console.log(employeeArray);

            if (answers.addCheck) {
                initialQuestion();
            } else {
                let data = render(employeeArray);
                fs.writeFile(outputPath, data, (err) => {
                    if (err) throw err;
                    console.log(chalk.green('Your file has been saved!'));
                });
            }

        })
}