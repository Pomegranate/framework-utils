/**
 * @file frameworkOptionValidator
 * @author Jim Bulkowski <jim.b@paperelectron.com>
 * @project pom-framework-utils
 * @license MIT {@link http://opensource.org/licenses/MIT}
 */

'use strict';
const _ = require('lodash');
const _fp = require('lodash/fp')
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
  ForV: ForV,
  ZnotF: ZeroNotFalse
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

const returnBasename = file => path.basename(file, '.js')

const filterDirs = dir => _fp.filter((file) => {
  return fs.statSync(path.join(dir, file)).isDirectory()
})

const filterFiles = dir => _fp.filter((file) => {
  return !fs.statSync(path.join(dir, file)).isDirectory()
})

const dirlist = dir => _fp.map((file) => {
  return {
    [file]: fs.readdirSync(path.join(dir, file))
  }
})

// const mergeDirObj = obj => (toMerge) => {
//   return _fp.merge(obj, ...toMerge)
// }

const mergeDirObj = to => (toMerge) => {
  return _fp.reduce((acc, obj) => {
    return _fp.merge(acc, obj)
  }, to, toMerge)
}

const flattenNsFiles = _fp.mapValues((val) => {
  return _fp.map(returnBasename, val)
})


function findPluginSettings(dir) {
  let getFiles = _fp.compose(_fp.map(returnBasename),filterFiles(dir))
  let getNsDirs = _fp.compose(flattenNsFiles,mergeDirObj({}),dirlist(dir),filterDirs(dir))

  let settingsPath = dirExists(dir)
  let files = false;
  let namespaces = false;
  if(settingsPath) {
    let dirList = fs.readdirSync(dir)
    let nsDirectories = filterDirs(dir)(dirList)
    files = getFiles(dirList)
    namespaces = nsDirectories.length ? getNsDirs(dirList) : false
  }
  return {
    path: settingsPath,
    files: files,
    namespaceConfigs: namespaces
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

function ZeroNotFalse(value, def){
  if(_.isNumber(value)){
    return value
  }
  return def
}