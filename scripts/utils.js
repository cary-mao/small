const path = require('path')
const shell = require('shelljs')
const {source_dir} = require('../.smallrc')

exports.genPathRelativeFn = function genPathRelativeFn (pathPrefix) {
  return (p = '') => {
    return path.resolve(pathPrefix, p)
  }
}

exports.inquirer = {
  notEmpty (value, cb) {
    const done = this.async()
  
    if (value === '') {
      done(`value can't empty.`)
    } else if (typeof cb === 'function') {
      cb.call(this)
    } else {
      done(null, true)
    }
  }
}

exports.getProjects = function getProjects () {
  return shell.ls(path.resolve(__dirname, `../${source_dir}`))
}