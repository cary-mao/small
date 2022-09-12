const shell = require('shelljs')

exports.goto = function goto (path) {
    shell.exec(`code --goto ${path}`)
}