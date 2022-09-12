const fs = require('fs')
const path = require('path')
const shell = require('shelljs')
const {root, source_dir} = require('../.smallrc')
const projects = require('../projects.json')

module.exports = function deleteFn (name) {
    if (!projects[name]) return

    console.log(projects[name])

    // delete link of index page
    fs.readFile(path.resolve(root, 'index.html'), 'utf-8', (err, text) => {
        const t = text.replace(`<li><a href="./src/${name}/index.html">${projects[name]}</a></li>`, '')
        fs.writeFile(path.resolve(root, 'index.html'), t, () => {})
    })

    // delete link of readme
    fs.readFile(path.resolve(root, 'README.md'), 'utf-8', (err, text) => {
        const t = text.replace(`- [${projects[name]}](https://github.com/cary-mao/small/tree/master/src/${name})\n`, '')
        fs.writeFile(path.resolve(root, 'README.md'), t, () => {})
    })

    // delete key of projects.json
    delete projects[name]
    fs.writeFile(path.resolve(root, 'projects.json'), JSON.stringify(projects, null, 2), () => {})

    // delete project folder
    shell.rm('-rf', path.resolve(root, source_dir, name))
}