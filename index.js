const { writeFile, copyFile } = require('./utils/generate-site.js');

const generatePage = require('./src/page-template');

const inquirer = require('inquirer'); 

const promptUser = () => {
    console.log(`
    ======================
    Let's make a README!
    ======================
    `);
    return inquirer.prompt([
        {
            type: 'input',
            name: 'name',
            message: 'What is your project name?',
            validate: nameInput => {
                if (nameInput) {
                    return true;
                } else {
                    console.log('Please enter your name!');
                }
            }
        }
    ]);
};

const promptProject = portfolioData => {
    // If there's no 'projects' array property, create one
    if (!portfolioData.projects) {
    portfolioData.projects = [];
    }
    return inquirer.prompt([
        {
            type: 'input',
            name: 'description',
            message: 'Provide a description of the project (Required)',
            validate: descriptionInput => {
                if (descriptionInput) {
                    return true;
                } else {
                    console.log('Please enter your name!');
                }
            }
        },
        {
            type: 'input',
            name: 'live',
            message: 'Please enter live website URL. (Required)',
            validate: liveInput => {
                if (liveInput) {
                    return true;
                } else {
                    console.log('Please enter your live website URL');
                }
            }
        },
        {
            type: 'input',
            name: 'link',
            message: 'Enter the GitHub link to your repository. (Required)',
            validate: linkInput => {
                if (linkInput) {
                    return true;
                } else {
                    console.log('Please enter your name!');
                }
            }
        },
        {
            type: 'input',
            name: 'install',
            message: 'What are the installation instructions? Leave blank for "None"',
        },
        {
            type: 'input',
            name: 'usage',
            message: 'What are the usage instructions? Leave blank for "None"',
        },
        {
            type: 'input',
            name: 'credits',
            message: 'Were there any collaborators? Leave blank for "None"',
        },
        {
            type: 'checkbox',
            name: 'license',
            message: 'Which license does this project fall under?',
            choices: []
        },
        {
            type: 'checkbox',
            name: 'languages',
            message: 'What did you do this project with? (Check all that apply',
            choices: ['JavaScript', 'HTML', 'CSS', 'ES6', 'jQuery', 'Bootstrap', 'Node']
        }
        // {
        //     type: 'confirm',
        //     name: 'feature',
        //     message: 'Would you like to feature this project?',
        //     default: false
        // },
        // {
        //     type: 'confirm',
        //     name: 'confirmAddProject',
        //     message: 'Would you like to enter another project?',
        //     default: false
        // }
    ])  .then(projectData => {
        portfolioData.projects.push(projectData);
        if (projectData.confirmAddProject) {
            return promptProject(portfolioData);
        } else {
            return portfolioData;
        }
    });
}

promptUser()
  .then(promptProject)
  .then(portfolioData => {
    return generatePage(portfolioData);
  })
  .then(pageHTML => {
    return writeFile(pageHTML);
  })
  .then(writeFileResponse => {
    console.log(writeFileResponse);
    return copyFile();
  })
  .then(copyFileResponse => {
    console.log(copyFileResponse);
  })
  .catch(err => {
    console.log(err);
  });