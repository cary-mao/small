const fs = require('fs')
const projects = require('../projects.json')
const {source_dir, root} = require('../.smallrc')
const path = require('path')

console.log(root)

module.exports = function rebuild () {
    // rebuild index page
    const injectTag = '<!-- links -->'
    buildLinks('templates/index.html', injectTag, (name, text) => `<li><a href="${source_dir}/${name}/index.html">${text}</a></li>`, 'index.html')

    // rebuild readme
    buildLinks('templates/readme.md', injectTag, (name, text) => `- [${text}](https://github.com/cary-mao/small/tree/master/src/${name})\r\n`, 'README.md')
}

function buildLinks (templatePath, injectTag, genLinkFn, outputPath) {
    fs.readFile(path.resolve(root, templatePath), 'utf-8', (err, text) => {
        if (err) {
            throw err
        }
        let linksText = ''
        for (const [name, text] of Object.entries(projects)) {
            linksText += genLinkFn(name, text)
        }
        text = text.replace(injectTag, linksText)
        fs.writeFile(path.resolve(root, outputPath), text, () => {
            console.log('build finished!')
        })
    })
}