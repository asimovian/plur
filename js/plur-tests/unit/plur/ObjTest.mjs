/**
 * @copyright 2019 Asimovian LLC
 * @license MIT https://github.com/asimovian/plur/blob/master/LICENSE.txt
 * @module plur-tests/unit/plur/ObjTest
 * @version 0.0.2
 */
'use strict';

import Test from '../../../plur/test/Test.mjs';
import PlurObject from '../../../plur/PlurObject.mjs';
import Obj from '../../../plur/Obj.mjs';

/**
 * @tests plur/Obj
 */
export default class ObjTest extends Test {
    constructor() {
        super();
    }

    /**
     * @tests plur/Obj.isValidType
     */
    test_static_isValidType() {
        this.assert( Obj.isValidType('') === false, 'Blank is not a valid type' );
    };

    /**
     * @tests plur/Obj.isPrimitive
     */
    test_static_isPrimitive() {
        this.assert( Obj.isPrimitive('') === false, 'Blank is not a valid type' );
    };
}

PlurObject.plurify('plur-tests/unit/plur/ObjTest', ObjTest);

