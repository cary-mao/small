const inquirer = require('inquirer')
const shell = require('shelljs')
const path = require('path')
const { source_dir } = require('../../.smallrc')
const prettier = require('prettier')
const { genPathRelativeFn, inquirer: inquirerUtils } = require('../utils')
const docs = require('../docs')
const gotoFn = require('../goto')

module.exports = function create (name, root = process.cwd()) {
  inquirer.prompt([
    {
      name: 'name',
      message: 'project name',
      default: name,
      validate (value) {
        inquirerUtils.notEmpty.call(this, value, function () {
          notProjectExsited.call(this, path.resolve(root, source_dir, value))
        });
      }
    },
    {
      type: 'confirm',
      name: 'hasStyles',
      message: 'need styles?(y/n)',
      default: 'y'
    },
    {
      type: 'confirm',
      name: 'hasScripts',
      message: 'need scripts?(y/n)',
      default: 'y'
    },
    {
      type: 'confirm',
      name: 'hasDocs',
      message: 'add docs?(y/n)',
      default: 'y'
    },
    {
      name: 'docsName',
      message: 'enter docs name',
      when ({hasDocs}) {
        return hasDocs
      },
      validate (value) {
        inquirerUtils.notEmpty.call(this, value);
      }
    }
  ]).then(answers => {
    const {name, hasStyles, hasScripts, hasDocs, docsName} = answers
    const pathRelativeName = genPathRelativeFn(path.resolve(root, source_dir, name))

    shell.mkdir(pathRelativeName())
    const htmlPath = pathRelativeName('index.html')
    const templatePath = path.resolve(root, 'scripts/create/template.html')
    shell.touch(htmlPath)
    const shellString = shell.cat(templatePath)
    let templateString = injectTitle(shellString.stdout, name)
    if (hasScripts) {
      const scriptsDir = pathRelativeName('scripts')
      shell.mkdir(scriptsDir)
      shell.touch(path.resolve(scriptsDir, 'index.js'))
      templateString = injectScripts(templateString)
    }
    if (hasStyles) {
      const stylesDir = pathRelativeName('styles')
      shell.mkdir(stylesDir)
      shell.touch(path.resolve(stylesDir, 'index.css'))
      templateString = injectStyles(templateString)
    }
    if (hasDocs) {
      docs(path.resolve(__dirname, '../..'), name, docsName)
    }

    templateString = prettier.format(templateString, {
      parser: 'html'
    })
    shell.ShellString(templateString).to(htmlPath)
    gotoFn(name)
  })
}

function notProjectExsited (path, cb) {
  const done = this.async()

  if (shell.test('-d', path)) {
    done(`the project ${path} have already existed.`)
  } else if (cb) {
    cb.call(this)
  } else {
    done(null, true)
  }
}

function injectTitle (string, name) {
  return string.replace(/<head>([\w\W]*)<\/head>/, `<head>$1<title>${name}</title></head>`)
}

function injectScripts (string) {
  return string.replace(/<body>([\w\W]*)<\/body>/, `<body>$1<script src="./scripts/index.js"></script></body>`)
}

function injectStyles (string) {
  return string.replace(/<head>([\w\W]*)<\/head>/, `<head>$1<link rel="stylesheet" href="./styles/index.css" /></head>`)
}