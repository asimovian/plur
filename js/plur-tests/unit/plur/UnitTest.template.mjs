/**
 * @copyright 2019 Asimovian LLC
 * @license MIT https://github.com/asimovian/plur/blob/master/LICENSE.txt
 * @module plur-tests/unit/plur/UnitTest
 */
'use strict';

import PlurObject from '../../../plur/PlurObject.mjs';
import Test from '../../../plur/test/Test.mjs';

/**
 * @tests plur/Unit
 * @final
 */
export default class UnitTest extends Test {
    constructor() {
        super();
    };

    /**
     * @tests plur/UnitTest.constructor
     */
    test_constructor() {
    };

    fixtures = {

    };
};

PlurObject.plurify('plur-tests/unit/plur/UnitTest', UnitTest);

