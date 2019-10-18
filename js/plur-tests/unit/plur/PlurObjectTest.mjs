/**
 * @copyright 2019 Asimovian LLC
 * @license MIT https://github.com/asimovian/plur/blob/master/LICENSE.txt
 * @module plur-tests/unit/plur/PlurObjectTest
 */
'use strict';

import PlurObject from '../../../plur/Class.mjs';
import Test from '../../../plur/test/Test.mjs';

/**
 * @test plur/PlurObject
 */
export default class PlurObjectTest extends Test {
    constructor() {
        super();
    }

    /**
     * @test plur/PlurObject.implement
     * @test plur/PlurObject.implementing
     */
    test_implement() {
        let IAlpha = function() {};
        PlurObject.plurify('plur-tests/IAlpha', IAlpha);
        IAlpha.prototype.alpha = PlurObject.abstractMethod;

        let Alpha = function() {};
        PlurObject.plurify('plur-tests/Alpha', Alpha);
        PlurObject.implement(Alpha, IAlpha);

        this.assertHas(Alpha.prototype, 'alpha', IAlpha.prototype.alpha, 'Did not implement interface method');

        // test implementing
        this.assert(PlurObject.implementing(new Alpha(), IAlpha));
    };

    /**
     * @test plur/PlurObject.abstractMethod
     */
    test_pureVirtualFunction() {
        // this should throw an exception
        try {
            PlurObject.abstractMethod();
            // we should not get here ...
            this.fail('Abstract function did not throw exception.');
        } catch (e) {}
    };
};

PlurObject.plurify('plur-tests/unit/plur/PlurObjectTest', PlurObjectTest);

