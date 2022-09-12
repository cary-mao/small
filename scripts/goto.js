const vscode = require('./vscode')
const { getProjects } = require('./utils')
const inquirer = require('inquirer')
const path = require('path')

module.exports = function goto(name, options) {
    if (name) {
        vscode.goto(path.resolve(__dirname, `../src/${name}/index.html`))
        return
    }

    if (options.select) {
        const projects = [].slice.call(getProjects())

        inquirer.prompt([
            {
                type: 'list',
                name: 'project',
                choices: projects
            }
        ]).then(({project}) => {
            vscode.goto(path.resolve(__dirname, `../src/${project}/index.html`))
        })
    }
}