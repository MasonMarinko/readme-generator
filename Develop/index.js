//======= function that converts answers into markdown============//
const generateMarkdown = require('./utils/generateMarkdown.js');
const inquirer = require('inquirer');
const fs = require('fs');
// ========== questions beginning===============//
const questions = [{
        type: 'input',
        name: 'title',
        message: 'What is the name of your project?',
        validate: titleInput => {
            if (titleInput) {
                return true;
            } else {
                console.log('REQUIRED:');
                return false;
            }
        }
    },
    {
        type: 'input',
        name: 'description',
        message: 'Describe your project:',
        validate: descInput => {
            if (descInput) {
                return true;
            } else {
                console.log('REQUIRED:');
                return false;
            }
        }
    },
    {
        type: 'input',
        name: 'installation',
        message: 'Provide a description of how to install your project:',
        validate: installInput => {
            if (installInput) {
                return true;
            } else {
                console.log('REQUIRED:');
                return false;
            }
        }
    },
    {
        type: 'input',
        name: 'usage',
        message: 'Provide usage instructions and/or examples:',
        validate: usageInput => {
            if (usageInput) {
                return true;
            } else {
                console.log('REQUIRED:');
                return false;
            }
        }
    },
    {
        type: 'confirm',
        name: 'confirmVideo',
        message: 'Would you like to add a video demo link in the usage section?',
        default: false
    },
    {
        type: 'input',
        name: 'video',
        message: 'Enter the video URL:',
        when: ({ confirmVideo }) => confirmVideo
    },
    {
        type: 'list',
        name: 'license',
        message: 'Choose a license:',
        choices: ['Apache 2.0', 'GNU GPLv3', 'MIT', 'ISC'],
        validate: licenseInput => {
            if (licenseInput) {
                return true;
            } else {
                console.log('REQUIRED:');
                return false;
            }
        }
    },
    {
        type: 'input',
        name: 'contributing',
        message: 'Provide contribution guidelines:',
        validate: contInput => {
            if (contInput) {
                return true;
            } else {
                console.log('REQUIRED:');
                return false;
            }
        }
    },
    {
        type: 'input',
        name: 'testing',
        message: 'Provide project testing instructions:',
        validate: testInput => {
            if (testInput) {
                return true;
            } else {
                console.log('REQUIRED:');
                return false;
            }
        }
    },
    {
        type: 'input',
        name: 'github',
        message: 'What is your GitHub Username?',
        validate: githubInput => {
            if (githubInput) {
                return true;
            } else {
                console.log('REQUIRED:');
                return false;
            }
        }
    },
    {
        type: 'input',
        name: 'email',
        message: 'What is your email address?',
        validate: emailInput => {
            if (emailInput) {
                return true;
            } else {
                console.log('REQUIRED:');
                return false;
            }
        }
    }
];

// function to write README file
function writeToFile (fileName, markDown) {
    fs.writeFile('../Output/' + fileName + ' README.md', markDown, function (err) {
        if (err) {
            return console.log(err);
        }
    });

    return console.log('README created! View it in the Output folder.');
};

// function to begin program
function init(questionsArr) {
    console.log(`
  ====================
  Let's Make a README!
  ====================
    `);
    return inquirer.prompt(questionsArr)
        .then(answers => {
            return generateMarkdown(answers)
        })
        .then(markDown => {
            const fileName = markDown
                .toLowerCase()
                .split('# ')[1]
                .split('!')[0]
                .replace(/\s+/g, '');
            writeToFile(fileName, markDown)
        }).catch(err => {
            console.log(err);
        });
};

// function call to initialize program
init(questions);