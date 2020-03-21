/**
 * @copyright 2019 Asmov LLC
 * @license MIT https://github.com/asmov/plur/blob/master/LICENSE.txt
 * @module plur-tests/unit/plur/PlurClassTest
 */
'use strict';

import PlurClass from '../../../plur/Class.mjs';
import TestCase from '../../../plur/test/Case.mjs';

/**
 * @test plur/PlurClass
 */
export default class PlurClassTest extends TestCase {
    constructor() {
        super();
    }

    /**
     * @test plur/PlurClass.implement
     * @test plur/PlurClass.implementing
     */
    test_implement() {
        let IAlpha = function() {};
        PlurClass.plurify('plur-tests/IAlpha', IAlpha);
        IAlpha.prototype.alpha = PlurClass.abstractMethod;

        let Alpha = function() {};
        PlurClass.plurify('plur-tests/Alpha', Alpha);
        PlurClass.implement(Alpha, IAlpha);

        this.assertHas(Alpha.prototype, 'alpha', IAlpha.prototype.alpha, 'Did not implement interface method');

        // test implementing
        this.assert(PlurClass.implementing(new Alpha(), IAlpha));
    };

    /**
     * @test plur/PlurClass.abstractMethod
     */
    test_pureVirtualFunction() {
        // this should throw an exception
        try {
            PlurClass.abstractMethod();
            // we should not get here ...
            this.fail('Abstract function did not throw exception.');
        } catch (e) {}
    };
};

PlurClass.plurify('plur-tests/unit/plur/PlurClassTest', PlurClassTest);

