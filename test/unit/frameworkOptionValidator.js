/**
 * @file frameworkOptionValidator
 * @author Jim Bulkowski <jim.b@paperelectron.com>
 * @project pom-framework-utils
 * @license MIT {@link http://opensource.org/licenses/MIT}
 */

"use strict";

const tap = require('tap')
const path = require('path')
const frmVal = require('../../lib/frameworkOptionValidator')

tap.test('Directory Existance', (t) => {
  let dir = __dirname
  let file = path.join(__dirname, 'frameworkOptionValidator.js')
  let missing = path.join(__dirname, 'missing.js')

  t.ok(frmVal.dirExists(dir), 'Returns true for directories.')
  t.notOk(frmVal.dirExists(file), 'Returns false for files')
  t.notOk(frmVal.dirExists(missing), 'Returns false for missing file/directory')
  t.end()
})

tap.test('Zero not false', (t) => {
  t.equal(frmVal.ZnotF(0, 2), 0, 'Returns numerical value 0 if present')
  t.equal(frmVal.ZnotF(null, 2), 2, 'Returns default value if not a number - null.')
  t.equal(frmVal.ZnotF({}, 2), 2, 'Returns default value if not a number - object.')
  t.equal(frmVal.ZnotF([], 2), 2, 'Returns default value if not a number - array.')
  t.equal(frmVal.ZnotF('hello', 2), 2, 'Returns default value if not a number - string.')
  t.end()
})