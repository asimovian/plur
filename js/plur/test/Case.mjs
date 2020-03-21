/**
 * @copyright 2019 Asmov LLC
 * @license MIT https://github.com/asmov/plur/blob/master/LICENSE.txt
 * @module plur/test/TestCase
 */
'use strict';

import PlurClass from '../../plur/Class.mjs';
import Assert from '../../plur/test/Assert.mjs';

/**
 * Basic xUnit base class for unit, integration, and system tests.
 *
 * Any method that begins with 'test_' will be ran. Tests run sequentially, unless async is specified.
 *
 * The overridable setup() and teardown() methods are run before and after all tests have run, respectively.
 *
 * @abstract
 * @implements {IPlurified}
 */
export default class TestCase {
    constructor() {
        this.assert = new Assert();
    };

    /**
     * Initialize this test case.
     */
    setup() {};

    /**
     * Perform cleanup after the test case has been ran.
     */
    teardown() {};
};

PlurClass.plurify('plur/test/Case', TestCase);

