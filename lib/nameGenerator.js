/**
 * @file nameGenerator
 * @author Jim Bulkowski <jim.b@paperelectron.com>
 * @project pom-framework-utils
 * @license MIT {@link http://opensource.org/licenses/MIT}
 */

'use strict';
const _ = require('lodash')

/**
 * Generates standardized plugin names from unstandardized input.
 * @module nameGenerator
 */

module.exports = function(prefix){
  return function(moduleName) {
    return _.upperFirst(_.camelCase(_.replace(moduleName, prefix, '')))
  }
}