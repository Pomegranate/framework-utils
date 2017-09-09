/**
 * @file prefixGenerator
 * @author Jim Bulkowski <jim.b@paperelectron.com>
 * @project pom-framework-utils
 * @license MIT {@link http://opensource.org/licenses/MIT}
 */

'use strict';
const _ = require('lodash')

/**
 * Generates prefixes
 * @module prefixGenerator
 */

module.exports = function(prefix, additionalPrefix) {
  let prefixes = [prefix]

  if(_.isString(additionalPrefix)){
    prefixes.push(additionalPrefix)
  }

  if(_.isArray(additionalPrefix)){
    [].push.apply(prefixes, additionalPrefix)
  }

  return prefixes
}