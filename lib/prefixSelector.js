/**
 * @file prefixSelector
 * @author Jim Bulkowski <jim.b@paperelectron.com>
 * @project pom-framework-utils
 * @license MIT {@link http://opensource.org/licenses/MIT}
 */

'use strict';
const _ = require('lodash')

/**
 * Selects the correct prefix for a plugin.
 * @module prefixSelector
 */

module.exports = function(availablePrefixes){
  return function(moduleName){
    let pendingPrefix = availablePrefixes[0]
    for(let i of availablePrefixes){
      if(_.startsWith(moduleName, i)) {
        pendingPrefix = i
        break
      }
    }
    return pendingPrefix
  }
}