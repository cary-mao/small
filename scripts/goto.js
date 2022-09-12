const vscode = require('./vscode')
const { getProjects } = require('./utils')
const inquirer = require('inquirer')
const path = require('path')
const {source_dir} = require('../.smallrc')

module.exports = function goto(name, options) {
    if (name) {
        vscode.goto(path.resolve(__dirname, `../${source_dir}/${name}/index.html`))
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
            vscode.goto(path.resolve(__dirname, `../${source_dir}/${project}/index.html`))
        })
    }
}