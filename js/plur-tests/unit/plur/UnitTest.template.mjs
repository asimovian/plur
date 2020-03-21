/**
 * @copyright 2019 Asmov LLC
 * @license MIT https://github.com/asmov/plur/blob/master/LICENSE.txt
 * @module plur-tests/unit/plur/UnitTest
 */
'use strict';

import PlurClass from '../../../plur/Class.mjs';
import TestCase from '../../../plur/test/Case.mjs';

/**
 * @tests plur/Unit
 * @final
 */
export default class UnitTest extends TestCase {
    constructor() {
        super();
    };

    /** @tests plur/UnitTest.constructor  **/
    test_constructor() {
    };

    /** @todo ESnext instance class fields **/
    get fixtures() { return {

    }; }
};

PlurClass.plurify('plur-tests/unit/plur/UnitTest', UnitTest);

