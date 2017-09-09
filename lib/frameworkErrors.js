/**
 * @file frameworkErrors
 * @author Jim Bulkowski <jim.b@paperelectron.com>
 * @project pom-framework-utils
 * @license MIT {@link http://opensource.org/licenses/MIT}
 */

'use strict';
const util = require('util');

/**
 * Bespoke Pomegranate Error classes.
 * @module frameworkErrors
 */

module.exports = {
  InvalidPluginsError: InvalidPluginsError,
  IteratorRuntimeError: IteratorRuntimeError,
  OptionsError: OptionsError,
  HookTimeoutError: HookTimeoutError,
  PluginHookError: PluginHookError,
  PluginConstructionError: PluginConstructionError,
  PluginDependencyError: PluginDependencyError
};

function InvalidPluginsError(){
  let thisErr = Error.apply(this, arguments);
  thisErr.name = this.name = "InvalidPluginsError";
  this.message = thisErr.message;

  Error.captureStackTrace(this, this.constructor)

}
util.inherits(InvalidPluginsError, Error);

function IteratorRuntimeError(message, action){
  let thisErr = Error.apply(this, arguments);
  thisErr.name = this.name = "IteratorRuntimeError";
  this.message = thisErr.message;
  this.action = action || ''

  Error.captureStackTrace(this, this.constructor)

}
util.inherits(IteratorRuntimeError, Error);

function OptionsError(){
  let thisErr = Error.apply(this, arguments);
  thisErr.name = this.name = "OptionsError";
  this.message = thisErr.message;

  Error.captureStackTrace(this, this.constructor)

}
util.inherits(OptionsError, Error);

function HookTimeoutError(){
  let thisErr = Error.apply(this, arguments);
  thisErr.name = this.name = "HookTimeoutError";
  this.message = thisErr.message;

  Error.captureStackTrace(this, this.constructor)

}
util.inherits(HookTimeoutError, Error);


function PluginHookError(message, pluginName, hook){
  let thisErr = Error.apply(this, arguments);
  thisErr.name = this.name = "PluginHookError";
  this.message = thisErr.message;
  this.hook = hook || 'No hook name provided.';
  this.plugin = {configName: pluginName || 'Missing name'};

  Error.captureStackTrace(this, this.constructor)

}
util.inherits(PluginHookError, Error);

function PluginConstructionError(message, pluginName){
  let thisErr = Error.apply(this, arguments);
  thisErr.name = this.name = "PluginConstructionError";
  this.message = thisErr.message;
  this.plugin = {configName: pluginName || 'Missing name'};

  Error.captureStackTrace(this, this.constructor)

}
util.inherits(PluginConstructionError, Error);


function PluginDependencyError(message, pluginName, depName){
  let thisErr = Error.apply(this, arguments);
  thisErr.name = this.name = "PluginDependencyError";
  this.message = thisErr.message;
  this.plugin = {configName: pluginName || 'Missing name'};
  this.depName = depName || 'Missing dependency name.';

  Error.captureStackTrace(this, this.constructor)

}
util.inherits(PluginDependencyError, Error);