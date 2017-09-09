/**
 * @file frameworkoptions
 * @author Jim Bulkowski <jim.b@paperelectron.com>
 * @project Pomegranate-loader
 * @license MIT {@link http://opensource.org/licenses/MIT}
 */

'use strict';

let tap = require('tap');
let path = require('path');
let Errors = require('../../index').frameworkErrors;
let OptsParser = require('../../index').frameworkOptionParser;


tap.test('Throws correct errors on missing or bad required params.', function(t) {
  t.plan(8)

  /*
   * Check Order
   * !options, !errors, !opts.prefix, !opts.layers, !opts.logger, !opts.parentDirectory
   */

  t.throws(function() {
    OptsParser()
  }, /No Raw Config object provided./, 'No Raw config provided.')

  t.throws(function() {
    OptsParser({})
  }, /No Custom Errors provided./, 'No Custom Errors object provided.')

  t.throws(function() {
    OptsParser({}, Errors)
  }, /options.prefix not set./, 'Options.prefix not provided.')

  t.throws(function() {
    OptsParser({prefix: 'magnum', layers: ['core'], parentDirectory: __dirname}, Errors)
  }, /options.logger not set./, 'Options.logger not provided.')

  t.throws(function() {
    OptsParser({prefix: 'magnum', layers: ['core'], logger: console}, Errors)
  }, /options.parentDirectory not set./, 'Options.parentDirectory not provided')

  t.throws(function() {
    OptsParser({prefix: 'magnum', layers: ['core'], logger: console, parentDirectory: '/doesnt/exist'}, Errors)
  }, /options.parentDirectory doesn't exist./, 'Options.parentDirectory doesnt exist.')

  t.throws(function() {
    OptsParser({prefix: 'magnum', logger: console, parentDirectory: __dirname, applicationDirectory: '/doesnt/exist'}, Errors)
  }, /options.applicationDirectory doesn't exist or is not a directory./, 'Options.applicationDirectory doesnt exist.')

  t.throws(function() {
    OptsParser({prefix: 'magnum', logger: console, parentDirectory: __dirname, applicationDirectory: __dirname + '/prefixSelector.js'}, Errors)
  }, /options.applicationDirectory doesn't exist or is not a directory./, 'Options.applicationDirectory doesnt exist.')
});

tap.test('Provided logger missing methods.', function(t) {
  t.plan(1)
  t.throws(function() {
    OptsParser({prefix: 'magnum', layers: ['core'], logger: {}, parentDirectory: __dirname}, Errors)
  }, /Logger object provided is missing log, error, info, warn methods./,'Options.logger missing methods.')
})

tap.test('Options.pluginDirectory not a directory', function(t) {
  t.plan(1)
  t.throws(function(){
    let BadOpts = OptsParser({
      prefix: 'magnum',
      parentDirectory: __dirname,
      pluginDirectory: __dirname + '/plugin.js',
      logger: console
    }, Errors)
  }, /options.pluginDirectory doesn't exist or is not a directory./)

});

tap.test('Parses Raw framework options correctly and sets defaults', function(t) {
  let GoodOpts = OptsParser({
    prefix: 'magnum',
    parentDirectory: __dirname,
    logger: console
  }, Errors)
  t.plan(6)
  t.equal(GoodOpts.prefix, 'magnum');
  t.equal(GoodOpts.parentDirectory, __dirname);
  t.equal(GoodOpts.applicationDirectory, __dirname);
  t.equal(GoodOpts.pluginDirectory, false);
  t.equal(GoodOpts.timeout, 2000);
  t.ok(GoodOpts.logger)
});

tap.test('Parses Raw framework options correctly explicit plugin dir', function(t) {
  let parentDir = path.join(__dirname,'../','mocks/_unit/frameworkoptions')
  let pluginDir = path.join(parentDir, 'plugins')
  let pluginSettingsDir = path.join(parentDir, 'pluginSettings')
  let setPluginDir = OptsParser({
    prefix: 'magnum',
    parentDirectory: parentDir,
    pluginDirectory: pluginDir,
    applicationDirectory: pluginDir,
    pluginSettingsDirectory: pluginSettingsDir,
    verbose: false,
    colors: false,
    logger: console
  }, Errors)

  let falseColorVerbose = OptsParser({
    prefix: 'magnum',
    parentDirectory: parentDir,
    verbose: false,
    colors: false,
    logger: console
  }, Errors)

  let trueColorVerbose = OptsParser({
    prefix: 'magnum',
    parentDirectory: parentDir,
    verbose: true,
    colors: true,
    logger: console
  }, Errors)
  t.plan(7)
  t.equal(setPluginDir.pluginDirectory, pluginDir, 'Sets pluginDirectory correctly')
  t.equal(setPluginDir.pluginSettingsDirectory.path, pluginSettingsDir, 'Sets pluginSettingsDirectory correctly')
  t.equal(setPluginDir.applicationDirectory, pluginDir, 'Sets applicationDirectory correctly')
  t.equal(falseColorVerbose.verbose, false, 'options.verbose: false');
  t.equal(falseColorVerbose.colors, false, 'options.colors: false');
  t.equal(trueColorVerbose.verbose, true, 'options.verbose: true');
  t.equal(trueColorVerbose.colors, true, 'options.colors: true');

});