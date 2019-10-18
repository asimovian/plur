/**
 * @copyright 2019 Asimovian LLC
 * @license MIT https://github.com/asimovian/plur/blob/master/LICENSE.txt
 * @module plur-tests/unit/plur/UnitTest
 */
'use strict';

import PlurClass from '../../../plur/Class.mjs';
import Test from '../../../plur/test/Test.mjs';

/**
 * @tests plur/Unit
 * @final
 */
export default class UnitTest extends Test {
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

