/**
 * @copyright 2019 Asimovian LLC
 * @license MIT https://github.com/asimovian/plur/blob/master/LICENSE.txt
 * @module plur-tests/unit/plur/ObjTest
 * @version 0.0.2
 */
'use strict';

import Test from '../../../plur/test/Test.mjs';
import PlurObject from '../../../plur/PlurObject.mjs';
import PortableObject from '../../../plur/PortableObject.mjs';

/**
 * @tests plur/Obj
 */
export default class PortableObjectTest extends Test {
    constructor() {
        super();
    }

    /**
     * @tests plur/Obj.isValidType
     */
    test_static_isValidType() {
        this.assert( PortableObject.isValidType('') === false, 'Blank is not a valid type' );
    };

    /**
     * @tests plur/Obj.isPrimitive
     */
    test_static_isPrimitive() {
        this.assert( PortableObject.isPrimitive('') === false, 'Blank is not a valid type' );
    };
}

PlurObject.plurify('plur-tests/unit/plur/PortableObjectTest', PortableObjectTest);

