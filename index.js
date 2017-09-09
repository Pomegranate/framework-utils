/**
 * @file index
 * @author Jim Bulkowski <jim.b@paperelectron.com>
 * @project pom-framework-utils
 * @license MIT {@link http://opensource.org/licenses/MIT}
 */

'use strict';

/**
 *
 * @module index
 */

// Re-export external modules to control downstream dependencies.
exports.bluebird =require('bluebird')
exports.debug = require('debug')
exports.lodash = require('lodash')
exports.fsExtra = require('fs-extra')

exports.frameworkErrors = require('./lib/frameworkErrors')
exports.frameworkMessages = require('./lib/frameworkMessages')
exports.frameworkOptionValidator = require('./lib/frameworkOptionValidator')
exports.frameworkOptionParser = require('./lib/framworkOptionParser')
exports.loggerFactory = require('./lib/LoggerFactory')
exports.nameGenerator = require('./lib/nameGenerator')
exports.prefixGenerator = require('./lib/prefixGenerator')
exports.prefixSelector = require('./lib/prefixSelector')
