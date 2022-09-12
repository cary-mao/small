const fs = require('fs')

// fs.readFile('./index.html', 'utf-8', (err, text) => {
//     const re = /<li>[\r\n\s]*<a\s*href="\.\/src\/(\w+?)\/index\.html"[\r\n\s]*>([\s\S]+?)<\/a[\r\n\s]*>[\r\n\s]*<\/li>/g
//     const projects = {}
//     let matched
//     while(matched = re.exec(text)) {
//         projects[matched[1]] = matched[2]
//         // console.log(matched[1], matched[2])
//     }
//     const json = JSON.stringify(projects, null, 2)
//     console.log(json)
//     // console.log(json)
//     fs.writeFile('./projects.json', json, () => {

//     })
// })

// fs.readFile('./index.html', 'utf-8', (err, text) => {
//     const re = new RegExp(`<li><a href="./src/d/index.html">打</a></li>`)
//     console.log(text.replace(re, ''), text)
// })

const projects = require('./projects.json')
const {source_dir} = require('./.smallrc')
fs.readFile('./templates/index.html', 'utf-8', (err, text) => {
    let linksText = ''
    for (const [name, text] of Object.entries(projects)) {
        linksText += `<li><a href="${source_dir}/${name}/index.html">${text}</a></li>`
    }
    text = text.replace('<!-- links -->', linksText)
    fs.writeFile('./index.html', text, () => {
        console.log('build finished!')
    })
})
