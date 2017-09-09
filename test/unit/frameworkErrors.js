/**
 * @file frameworkErrors
 * @author Jim Bulkowski <jim.b@paperelectron.com>
 * @project pom-framework-utils
 * @license MIT {@link http://opensource.org/licenses/MIT}
 */

"use strict";
const tap = require('tap')
const errs = require('../../index').frameworkErrors


tap.test('InvalidPluginsError', (t) => {
  t.plan(3)
  let err = new errs.InvalidPluginsError('Invalid plugins present.')
  equalValue(t, err, 'name', 'InvalidPluginsError')
  equalValue(t, err, 'message', 'Invalid plugins present.')
  t.throws(throwError(errs.InvalidPluginsError), errs.InvalidPluginsError)
})


tap.test('IteratorRuntimeError', (t) => {
  t.plan(4)
  let ec = errs.IteratorRuntimeError
  let err = new ec('Iterator Error', 'start')
  equalValue(t, err, 'name', 'IteratorRuntimeError', 'name => IteratorRuntimeError')
  equalValue(t, err, 'message', 'Iterator Error', 'message => ')
  equalValue(t, err, 'action', 'start')
  t.throws(throwError(ec), ec)
})

tap.test('OptionsError', (t) => {
  t.plan(3)
  let ec = errs.OptionsError
  let err = new ec('Options contain errors.')
  equalValue(t, err, 'name', 'OptionsError')
  equalValue(t, err, 'message', 'Options contain errors.')
  t.throws(throwError(ec), ec)
})

tap.test('HookTimeoutError', (t) => {
  t.plan(3)
  let ec = errs.HookTimeoutError
  let err = new ec('Hook Timed Out.')
  equalValue(t, err, 'name', 'HookTimeoutError')
  equalValue(t, err, 'message', 'Hook Timed Out.')
  t.throws(throwError(ec), ec)
})

tap.test('PluginHookError', (t) => {
  t.plan(3)
  let ec = errs.PluginHookError
  let err = new ec('Plugin Hook Error.')
  equalValue(t, err, 'name', 'PluginHookError')
  equalValue(t, err, 'message', 'Plugin Hook Error.')
  t.throws(throwError(ec), ec)
})

tap.test('PluginConstructionError', (t) => {
  t.plan(4)
  let ec = errs.PluginConstructionError
  let err = new ec('Plugin Construction Error.', 'ApplicationEnv')
  equalValue(t, err, 'name', 'PluginConstructionError')
  equalValue(t, err, 'message', 'Plugin Construction Error.')
  equalValue(t, err.plugin, 'configName', 'ApplicationEnv')
  t.throws(throwError(ec), ec)
})

tap.test('PluginDependencyError', (t) => {
  t.plan(5)
  let ec = errs.PluginDependencyError
  let err = new ec('Plugin Dependency Error.', 'ApplicationEnv', 'Env')
  equalValue(t, err, 'name', 'PluginDependencyError')
  equalValue(t, err, 'message', 'Plugin Dependency Error.')
  equalValue(t, err.plugin, 'configName', 'ApplicationEnv')
  equalValue(t, err, 'depName', 'Env')
  t.throws(throwError(ec), ec)
})

function equalValue(t, e, thing, equals){
  return t.equal(e[thing], equals, `${thing} => ${equals}`)
}

function throwError(e){
  return function(){
    throw new e()
  }
}