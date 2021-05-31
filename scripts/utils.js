const path = require('path')

exports.genPathRelativeFn = function genPathRelativeFn (pathPrefix) {
  return (p = '') => {
    return path.resolve(pathPrefix, p)
  }
}