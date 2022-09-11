const path = require('path')

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