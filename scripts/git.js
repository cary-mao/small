const shell = require('shelljs')
const inquirer = require('inquirer')
const {inquirer: inquirerUtils} = require('./utils')

exports.commit = function commit () {
  inquirer.prompt([
    {
      type: 'list',
      name: 'type',
      message: `Select the type of change that you're commiting:`,
      choices: [
        {
          name: 'feat: A new feature',
          value: 'feat'
        },
        {
          name: 'fix: A bug fix',
          value: 'fix'
        },
        {
          name: 'docs: Document only change',
          value: 'docs'
        },
        {
          name: 'chore: Other changes that don\'t modify src or test files',
          value: 'chore'
        },
        {
          name: 'refactor: A code change that neither fixes a bug nor adds a feature',
          value: 'refactor'
        },
        {
          name: 'ci: Changes to our CI configuration files and scripts',
          value: 'ci'
        }
      ]
    },
    {
      name: 'scope',
      message: 'What is the scope of this change (e.g. component or file name):',
      validate: inquirerUtils.notEmpty
    },
    {
      name: 'desc',
      message: 'Write a description of the change):',
      default (preAnswers) {
        return `${preAnswers.scope}`
      },
      validate: inquirerUtils.notEmpty
    }
  ]).then(({
    type, scope, desc
  }) => {
    shell.exec(`git commit -m ${type}(${scope}): ${desc}`)
  })
}