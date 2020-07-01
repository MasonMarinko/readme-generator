//======= function that converts answers into markdown============//
const generateMarkdown = require('./utils/generateMarkdown.js');
const inquirer = require('inquirer');
const fs = require('fs');


//============ main function ========//
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


// ========== questions beginning===============//
const questions = [{
        type: 'input',
        name: 'title',
        message: 'What is the name of your project? (Required)',
        validate: titleInput => {
            if (titleInput) {
                return true;
            } else {
                console.log('Please provide the repository URL for your project!');
            }
        }
    },
    {
        type: 'input',
        name: 'repo',
        message: 'Please provide the live website URL for your project (Required)',
        validate: repoInput => {
            if (repoInput) {
                return true;
            } else {
                console.log('Please provide your projects live URL!');
            }
        }
    },
    {
        type: 'input',
        name: 'liveURL',
        message: 'Please provide the URL for your projects repository (Required)',
        validate: liveURLInput => {
            if (liveURLInput) {
                return true;
            } else {
                console.log('Please provide a description!');
            }
        }
    },
    {
        type: 'input',
        name: 'description',
        message: 'Please provide a description of your project (Required)',
        validate: descriptionInput => {
            if (descriptionInput) {
                return true;
            } else {
                console.log('Please provide a description!');
            }
        }
    },
    {
        type: 'input',
        name: 'installation',
        message: 'Provide instructions on how to install your project (Required)',
        validate: installationInput => {
            if (installationInput) {
                return true;
            } else {
                console.log('Please choose a license!');
            }
        }
    },
    {
        type: 'input',
        name: 'usage',
        message: 'Provide usage instructions and/or examples (Required)',
        validate: usageInput => {
            if (usageInput) {
                return true;
            } else {
                console.log('Please provide some information on the usage of your project!');
            }
        }
    },
    {
        type: 'confirm',
        name: 'confirmVideo',
        message: 'Do you have a video demo you would like to add to this README?',
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
        message: 'Which license applies to your project? (Required)',
        choices: ['Apache 2.0', 'GNU GPLv3', 'MIT', 'ISC'],
        validate: licenseInput => {
            if (licenseInput) {
                return true;
            } else {
                console.log('Please choose a license!');
            }
        }
    },
    {
        type: 'input',
        name: 'contributing',
        message: 'Provide contribution guidelines (Required)',
        validate: contributingInput => {
            if (contributingInput) {
                return true;
            } else {
                console.log('Please list any contributors to your project!');
            }
        }
    },
    {
        type: 'input',
        name: 'testing',
        message: 'Provide any testing instructions the user should know (Required)',
        validate: testingInput => {
            if (testingInput) {
                return true;
            } else {
                console.log('Please provide testing instructions for your project!');
            }
        }
    },
    {
        type: 'input',
        name: 'github',
        message: 'What is your GitHub Username? (Required)',
        validate: githubInput => {
            if (githubInput) {
                return true;
            } else {
                console.log('Please enter your GitHub username!');
            }
        }
    },
    {
        type: 'input',
        name: 'email',
        message: 'What is your email address? (Required)',
        validate: emailInput => {
            if (emailInput) {
                return true;
            } else {
                console.log('Please enter your email address!');
            }
        }
    }
];

// function to write README file
function writeToFile (fileName, markDown) {
    fs.writeFile('../Output/README.md', markDown, function (err) {
        if (err) {
            return console.log(err);
        }
    });

    return console.log('README created! Refer to Output folder to view, cut, or copy.');
};

//==================== start function =====================//
init(questions);