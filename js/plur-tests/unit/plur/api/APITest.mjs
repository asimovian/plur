/**
 * @copyright 2019 Asimovian LLC
 * @license MIT https://github.com/asimovian/plur/blob/master/LICENSE.txt
 * @module plur-test/unit/plur/api/APITest
 */
'use strict';

import PlurObject from '../../../../plur/PlurObject.mjs';
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
}

PlurObject.plurify('plur-tests/unit/plur/api/APITest', APITest);


