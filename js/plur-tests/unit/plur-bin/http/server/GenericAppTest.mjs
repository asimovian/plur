/**
 * @copyright 2019 Asimovian LLC
 * @license MIT https://github.com/asimovian/plur/blob/master/LICENSE.txt
 * @module plur-tests/unit/plur-bin/http/server/GenericAppTest
 */
'use strict';

import PlurObject from '../../../../../plur/PlurObject.mjs';
import Test from '../../../../../plur/test/Test.mjs';
import GenericHttpApp from '../../../../../plur-bin/http/server/GenericApp.mjs';

/**
 * @tests plur-bin/http/server/GenericApp
 * @final
 */
export default class GenericHttpAppTest extends Test {
    constructor() {
        super();
    };

    /**
     * @tests plur-bin/http/server/GenericApp
     */
    test_constructor() {
    };

    fixtures = {

    };
};

PlurObject.plurify('plur-tests/unit/plur-bin/http/server/GenericAppTest', GenericHttpAppTest);

