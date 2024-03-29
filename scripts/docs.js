const shell = require('shelljs')
const prettier = require('prettier')
const { genPathRelativeFn } = require('./utils')
const {source_dir} = require('../.smallrc')
const projects = require('../projects.json')

module.exports = function docs (root, name, text) {
  const pathFromRoot = genPathRelativeFn(root)
  const homePath = pathFromRoot('index.html')
  const readmePath = pathFromRoot('README.md')
  const projectPath = pathFromRoot('projects.json')

  let homeString = shell.cat(homePath).stdout
  let re = new RegExp('<section id="menu">[\\w\\W]*?<ul>([\\W\\w]*)?</ul>')
  homeString = homeString.replace(re, `<section id="menu"><h1>Small Project</h1><ul>$1<li><a href="./${source_dir}/${name}/index.html">${text}</a></li></ul>`)
  homeString = prettier.format(homeString, { parser: 'html' })

  let readmeString = shell.cat(readmePath).stdout
  let scriptTitleIndex = readmeString.indexOf('\n# 本地使用')
  readmeString = readmeString.substring(0, scriptTitleIndex) + `- [${text}](https://github.com/cary-mao/small/tree/master/${source_dir}/${name})\n` + readmeString.substring(scriptTitleIndex+1)
  readmeString = prettier.format(readmeString, { parser: 'markdown' })

  projects[name] = text

  shell.ShellString(homeString).to(homePath)
  shell.ShellString(readmeString).to(readmePath)
  shell.ShellString(JSON.stringify(projects, null, 2)).to(projectPath)
}

