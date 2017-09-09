/**
 * @file frameworkOutput
 * @author Jim Bulkowski <jim.b@paperelectron.com>
 * @project pom-framework-utils
 * @license MIT {@link http://opensource.org/licenses/MIT}
 */

"use strict";

const tap = require('tap')
const frmMsg = require('../../lib/frameworkMessages')

tap.test('Right bar output length, colors disabled.', (t) => {
  let series = frmMsg()
  t.equal(series.rightBar('Hello', 'blue').length, 80, 'Should pad to 80.')
  t.equal(series.rightBar('Hello world').length, 80, 'Should pad to 80.')
  t.equal(series.rightBar('Hello world, this is long.').length, 80, 'Should pad to 80.')
  let eightytwo = 'eight eight eight eight eight eight eight eight eight eight eight eight eight two'
  t.equal(series.rightBar(eightytwo).length, 82, 'Should not pad over 80')
  t.end()
})

tap.test('Right bar output length, colors enabled.', (t) => {
  let series = frmMsg(true, true)

  let customSep = '\u001b[1m\u001b[32m********************************************************************************\u001b[39m\u001b[22m'
  let noMessage = '\u001b[1m\u001b[32m--------------------------------------------------------------------------------\u001b[39m\u001b[22m'
  t.equal(series.rightBar(false, 'green'), noMessage, 'Properly formats blank message.');
  t.equal(series.rightBar(false, 'green', '*'), customSep, 'Properly formats blank message, with custom separator.');

  let h = '\u001b[1m\u001b[35mHello --------------------------------------------------------------------------\u001b[39m\u001b[22m'
  let hblue = '\u001b[1m\u001b[34mHello --------------------------------------------------------------------------\u001b[39m\u001b[22m'
  t.equal(series.rightBar('Hello'), h, 'Correct output with default color formatting.')
  t.equal(series.rightBar('Hello', 'blue'), hblue, 'Correct output with blue formatting.')
  t.equal(series.rightBar('Hello').length, 99, 'Should have 99 chars with terminal color formatting.')

  let hw = '\u001b[1m\u001b[35mHello world --------------------------------------------------------------------\u001b[39m\u001b[22m'
  let hwblue = '\u001b[1m\u001b[34mHello world --------------------------------------------------------------------\u001b[39m\u001b[22m'
  t.equal(series.rightBar('Hello world'), hw, 'Correct output with default color formatting.')
  t.equal(series.rightBar('Hello world', 'blue'), hwblue, 'Correct output with blue formatting.')
  t.equal(series.rightBar('Hello world').length, 99, 'Should have 99 chars with terminal color formatting.')

  let hwl = '\u001b[1m\u001b[35mHello world, this is long. -----------------------------------------------------\u001b[39m\u001b[22m'
  let hwlblue = '\u001b[1m\u001b[34mHello world, this is long. -----------------------------------------------------\u001b[39m\u001b[22m'
  t.equal(series.rightBar('Hello world, this is long.'), hwl, 'Correct output with default color formatting.')
  t.equal(series.rightBar('Hello world, this is long.', 'blue'), hwlblue, 'Correct output with blue formatting.')
  t.equal(series.rightBar('Hello world, this is long.').length, 99, 'Should have 99 chars with terminal color formatting.')


  let eightytwo = 'eight eight eight eight eight eight eight eight eight eight eight eight eight two'
  t.equal(series.rightBar(eightytwo).length, 101, 'Should not pad over 80')
  t.end()
})

tap.test('Ttile announce. Wraps Right bar.', (t) => {
  let verboseOutputColor = frmMsg(true, true)
  let verboseColor = '\u001b[1m\u001b[35mhello --------------------------------------------------------------------------\u001b[39m\u001b[22m'
  t.equal(verboseOutputColor.titleAnnounce('hello'), verboseColor, 'Colored verbose title.');

  let verboseOutputPlain = frmMsg(false, true)
  let verbosePlain = 'hello --------------------------------------------------------------------------'
  t.equal(verboseOutputPlain.titleAnnounce('hello'), verbosePlain, 'Verbose plain title.');

  let minimalOutputColor = frmMsg(true, false)
  let minimalColor = '\u001b[1m\u001b[35mhello\u001b[39m\u001b[22m'
  t.equal(minimalOutputColor.titleAnnounce('hello'), minimalColor, 'Minimal color output.');

  let minimalOutputPlain = frmMsg(false, false)
  let minimalPlain = 'hello'
  t.equal(minimalOutputPlain.titleAnnounce('hello'), minimalPlain, 'Minimal plain output.');


  t.end()
})

tap.test('Error Iterator', (t) => {
  let series = frmMsg(true, true)
  let plugins = [
    {moduleName: 'pluginA', Errors: [new Error('This is broken'), new Error('Also in some other way')]},
    {moduleName: 'pluginB', Errors: [new Error('Just one error here.')]},
    {moduleName: 'pluginC', Errors: [new Error('You forgot metadata')]}
  ]
  let lines = series.iteratorError(null, plugins).split('\n')
  let expected = [ 'pluginA  has  2  error/s ',
    'This is broken',
    'Also in some other way',
    'pluginB  has  1  error/s ',
    'Just one error here.',
    'pluginC  has  1  error/s ',
    'You forgot metadata' ]

  t.end()
})

tap.test('Failed to load.', (t) => {
  let series = frmMsg(true, true)
  let lines = series.failedToLoad('/some/path', null).split('\n')
  let expected = 'Could not load /some/path'

  t.equal(lines[1], expected, 'Correctly formats the passed in path.');
  t.end()
})

tap.test('Dependency Name Conflict.', (t) => {
  let series = frmMsg(true, true)
  let conflicts = {
    depName: 'ModelA',
    conflicts: [
      'PluginA',
      'PluginB'
    ]
  }
  let lines = series.dependencyConflict(conflicts).split('\n')
  let expected = [
    'Plugins ',
    '\tPluginA,',
    '\tPluginB',
    '    are attempting to register dependency name',
    '    \tModelA' ]

  lines.forEach((v,i) => {
    t.equal(v, expected[i], `"line" ${i} should equal "expected" line ${i}`)
  })

  t.end()
})

tap.test('Plugin action complete.', (t) => {
  let series = frmMsg(true, true)
  let result = buildPluginAction()

  let lines = series.pluginActionComplete(result, 'Loaded', 'dependencies added to injector.')
  t.equal(lines, 'Loaded 4 plugins with 7 dependencies added to injector.', 'Has correct output with detail provided.')

  let linesNoDetail = series.pluginActionComplete(result, 'Loaded')
  t.equal(linesNoDetail, 'Loaded 4 plugins.', 'Has the correct output, with no detail string provided.')
  t.end()
})


function buildPluginAction(){
  return [
    {
      dependencies: ['a','b','c'],
      dependenciesAreArray: () => {
        return true
      }
    },
    {
      dependencies: ['d','e','f'],
      dependenciesAreArray: () => {
        return true
      }
    },
    {
      dependencies: true,
      dependenciesAreArray: () => {
        return false
      }
    },
    {
      dependencies: false,
      dependenciesAreArray: () => {
        return false
      }
    }
  ]
}