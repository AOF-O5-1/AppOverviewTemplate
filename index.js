const inquirer = require('inquirer');
const fs = require('fs');

// Function for AppOverview
//string is case sensitive
const prompts = [
    {
        type: 'input',
        name: 'title',
        message: 'What is the project title?',
    },
    {
        type: 'input',
        name: 'description',
        message: 'Describe the motivation and purpose of the project:',
    },
    {
        type: 'input',
        name: 'installation',
        message: 'List the steps required to install your project:',
    },
    {
        type: 'input',
        name: 'usage',
        message: 'Provide usage instructions:',
    },
    {
        type: 'input',
        name: 'credits',
        message: 'List collaborators, third-party assets, or tutorials used in the project:',
    },
    {
        type: 'input',
        name: 'tests',
        message: 'Provide test instructions:',
    },
    {
        type: 'input',
        name: 'contributing', 
        message: 'List ways the community can contribute:',
    },
    {
        type: 'list',
        name: 'license',
        message: 'Choose a license for your project:',
        choices: ['MIT', 'GNU GPLv3', 'Apache 2.0', 'GNU AGPLv3', 'GNU LGPLv3', 'Mozilla Public License 2.0', 'Boost Software License 1.0', 'The Unlicense', 'None'],
    },
    {
        type: 'input',
        name: 'github',
        message: 'Enter your GitHub username:',
    },
    {
        type: 'input',
        name: 'email',
        message: 'Enter your email address for questions:',
    },
];

// Custom prompt module (.prompt is not recognized)
const customPrompt = inquirer.createPromptModule();

// License function with badge and notice
function getLicense(license) {
    let badge = '';
    let notice = '';

    if (license === 'MIT') {
        badge = '[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)';
        notice = 'This application is licensed under the MIT license.';
    } else if (license === 'GNU GPLv3') {
        badge = '[![License: GPL v3](https://img.shields.io/badge/License-GPLv3-blue.svg)](https://www.gnu.org/licenses/gpl-3.0)';
        notice = 'This application is licensed under the GNU GPLv3 license.';
    } else if (license === 'Apache 2.0') {
        badge = '[![License](https://img.shields.io/badge/License-Apache_2.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)';
        notice = 'This application is licensed under the Apache 2.0 license.';
    } else if (license === 'GNU AGPLv3') {
        badge = '[![License: AGPL v3](https://img.shields.io/badge/License-AGPL_v3-blue.svg)](https://www.gnu.org/licenses/agpl-3.0)';
        notice = 'This application is licensed under the GNU AGPLv3 license.';
    } else if (license === 'GNU LGPLv3') {
        badge = '[![License: LGPL v3](https://img.shields.io/badge/License-LGPL_v3-blue.svg)](https://www.gnu.org/licenses/lgpl-3.0)';
        notice = 'This application is licensed under the GNU LGPLv3 license.';
    } else if (license === 'Mozilla Public License 2.0') {
        badge = '[![License: MPL 2.0](https://img.shields.io/badge/License-MPL_2.0-brightgreen.svg)](https://opensource.org/licenses/MPL-2.0)';
        notice = 'This application is licensed under the Mozilla Public License 2.0.';
    } else if (license === 'Boost Software License 1.0') {
        badge = '[![License](https://img.shields.io/badge/License-Boost_1_0-lightblue.svg)](https://www.boost.org/LICENSE_1_0.txt)';
        notice = 'This application is licensed under the Boost Software License 1.0.';
    } else if (license === 'The Unlicense') {
        badge = '[![License: Unlicense](https://img.shields.io/badge/license-Unlicense-blue.svg)](http://unlicense.org/)';
        notice = 'This application is licensed under The Unlicense.';
    } else {
        badge = '';
        notice = 'This application is not licensed.';
    }

    return { badge, notice };
}

// Function to create readme file
function createReadme(answers) {
    const { badge, notice } = getLicense(answers.license);

    return `
# ${answers.title}

${badge}

## Description
${answers.description}

## Table of Contents
- [Installation](#installation)
- [Usage](#usage)
- [License](#license)
- [Contributing](#contributing)
- [Tests](#tests)
- [Questions](#questions)

## Installation
\`\`\`
${answers.installation}
\`\`\`

## Usage
${answers.usage}

## License
${notice}

## Contributing
${answers.contributing}

## Tests
\`\`\`
${answers.tests}
\`\`\`

## Questions
If you have any questions, please reach out:

- GitHub: [${answers.github}](https://github.com/${answers.github})
- Email: [${answers.email}](mailto:${answers.email})
`;
}

// Prompt questions
customPrompt(prompts).then((answers) => {
    // Clean the title to create a valid file name
    const fileName = `${answers.title.replace(/\s+/g, '_').replace(/[^\w\-]/g, '')}.md`;
    const readmeContent = createReadme(answers);

    fs.writeFile(fileName, readmeContent, (error) => {
        if (error) throw error;
        console.log(`${fileName} has been created!`);
    });
});