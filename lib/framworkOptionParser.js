/**
 * @file framworkOptionParser
 * @author Jim Bulkowski <jim.b@paperelectron.com>
 * @project pom-framework-utils
 * @license MIT {@link http://opensource.org/licenses/MIT}
 */

'use strict';
var _ = require('lodash');
var fs = require('fs');
var path = require('path');
var validators = require('./frameworkOptionValidator');

/**
 *
 * @module framworkOptionParser
 */

module.exports = function(lOpts, Errors){
  var pOpts = {};
  if(!lOpts) throw new TypeError('No Raw Config object provided.');
  if(!Errors) throw new TypeError('No Custom Errors provided.');
  if(!lOpts.prefix) throw new Errors.OptionsError('options.prefix not set.');
  if(!lOpts.logger) throw new Errors.OptionsError('options.logger not set.');
  pOpts.commandMode = !!lOpts.commandMode
  pOpts.prefix = lOpts.prefix;
  pOpts.additionalPrefix = lOpts.additionalPrefix || []
  pOpts.parentDirectory = validators.parentDirExits(lOpts.parentDirectory, Errors.OptionsError);
  pOpts.applicationDirectory = validators.applicationDirExists(lOpts.applicationDirectory, pOpts.parentDirectory, Errors.OptionsError);
  pOpts.pluginDirectory = validators.pluginDirExists(lOpts.pluginDirectory, Errors.OptionsError);
  pOpts.pluginSettingsDirectory = validators.findPluginSettings(lOpts.pluginSettingsDirectory);
  pOpts.timeout = lOpts.timeout || 2000;
  pOpts.logger = validators.inspectLogger(lOpts.logger, Errors.OptionsError);
  pOpts.verbose = validators.ForV(lOpts.verbose);
  pOpts.colors = validators.ForV(lOpts.colors);
  return pOpts
};