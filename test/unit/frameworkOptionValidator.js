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