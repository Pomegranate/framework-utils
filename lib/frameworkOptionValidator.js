/**
 * @file frameworkOptionValidator
 * @author Jim Bulkowski <jim.b@paperelectron.com>
 * @project pom-framework-utils
 * @license MIT {@link http://opensource.org/licenses/MIT}
 */

'use strict';
const _ = require('lodash');
const path = require('path');
const fs = require('fs');

/**
 * Validates and normalizes file provided framework options.
 * @module frameworkOptionValidator
 */

module.exports = {
  parentDirExits: parentDirExits,
  applicationDirExists: applicationDirExists,
  pluginDirExists: pluginDirExists,
  dirExists: dirExists,
  findPluginSettings: findPluginSettings,
  inspectLogger: inspectLogger,
  ForV: ForV
}

function parentDirExits(dir, Err) {
  if(!dir) throw new Err('options.parentDirectory not set.');
  let d = dirExists(dir);
  if(d) return d;

  throw new Err('options.parentDirectory doesn\'t exist.')
}

function applicationDirExists(dir, defaultAppDir, Err) {
  if(!dir) return defaultAppDir;
  let d = dirExists(dir);
  if(d) return d;

  throw new Err('options.applicationDirectory doesn\'t exist or is not a directory.')
}

function pluginDirExists(dir, Err) {
  if(!dir) return false;
  let d = dirExists(dir);
  if(d) return d;

  throw new Err('options.pluginDirectory doesn\'t exist or is not a directory.')
}

function dirExists(directory) {
  let stats
  try {
    stats = fs.statSync(directory)
  }
  catch (e) {
    return false
  }
  if(stats.isDirectory()) {
    return directory
  }
  return false
}

function findPluginSettings(dir) {
  let settingsPath = dirExists(dir)
  let files = false;
  if(settingsPath) {
    files = _.map(fs.readdirSync(dir), function(file) {
      return path.basename(file, '.js')
    })
  }
  return {
    path: settingsPath,
    files: files
  }

}

function inspectLogger(loggerObj, Err) {
  let missing = [];
  let valid = _.chain(['log', 'error', 'info', 'warn'])
    .map(function(v) {
      let fn = _.isFunction(loggerObj[v]);
      if(!fn) {
        missing.push(v)
      }
      return fn
    })
    .every(Boolean)
    .value();
  if(valid) {
    return loggerObj
  }

  throw new Err('Logger object provided is missing ' + missing.join(', ') + ' methods.');
}

function ForV(bool){
  if(_.isBoolean(bool)){
    if(bool === false){
      return false
    }
    return true
  }
  return true
}