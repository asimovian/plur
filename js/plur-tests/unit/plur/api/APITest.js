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
    constructor() {
        super();
    };

   testValues() {
       this.assertHas(API, 'name', 'plur');
       this.assertHas(API, 'version', '0.0.2');
       this.assertHas(API, 'scmUrl', 'git://github.com/asimovian/plur.git');
       this.assertHas(API, 'branch', 'roylaurie/unstable');
    };
}

PlurObject.plurify('plur-tests/unit/plur/api/APITest', APITest);


