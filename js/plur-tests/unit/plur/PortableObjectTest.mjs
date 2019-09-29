/**
 * @copyright 2019 Asimovian LLC
 * @license MIT https://github.com/asimovian/plur/blob/master/LICENSE.txt
 * @module plur-tests/unit/plur/PortableObjectTest
 * @version 0.0.2
 */
'use strict';

import Test from '../../../plur/test/Test.mjs';
import PlurObject from '../../../plur/PlurObject.mjs';
import PortableObject from '../../../plur/PortableObject.mjs';

/**
 * @tests plur/PortableObject
 */
export default class PortableObjectTest extends Test {
    constructor() {
        super();
    }

    /**
     * @tests plur/Obj.isPortable
     */
    test_static_isPortable() {
        this.assert( PortableObject.isPortable('') === false, 'Blank is not a portable type' );
    };

    /**
     * @tests plur/Obj.isPrimitive
     */
    test_static_isPrimitive() {
        this.assert( PortableObject.isPrimitive('') === false, 'Blank is not a portable type' );
    };
}

PlurObject.plurify('plur-tests/unit/plur/PortableObjectTest', PortableObjectTest);

