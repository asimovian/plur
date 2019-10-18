/**
 * @copyright 2019 Asimovian LLC
 * @license MIT https://github.com/asimovian/plur/blob/master/LICENSE.txt
 * @module plur-test/unit/plur/api/APITest
 */
'use strict';

import PlurClass from '../../../../plur/Class.mjs';
import Test from '../../../../plur/test/Test.mjs';
import API from '../../../../plur/api/API.mjs';

/**
 * Test
 *
 * @tests plur/API
 */
export default class APITest extends Test {
   test_constructor() {
       const a = new API('testapi', '3.21.321', 'https://example.tld/git.git', 'master', [], true);

       this.assertHas(a, 'name', 'testapi');
       this.assertHas(a, 'version', '3.21.321');
       this.assertHas(a, 'scmUrl', 'https://example.tld/git.git');
       this.assertHas(a, 'branch', 'master');

       this.assertEquals(a.debug(), true, 'debug should be enabled')
    };

    test_debug() {
       const dbg = API.plur.debug();  // warning: temporarily altering api-wide setting ...

       API.plur.debug(true);
       this.assertEquals(API.plur.debug(), true, 'debug() should be enabled');
       API.plur.debug(false);
       this.assertEquals(API.plur.debug(), false, 'debug() should be disabled');

       API.plur.debug(dbg);  // restore
    };
}

PlurClass.plurify('plur-tests/unit/plur/api/APITest', APITest);


