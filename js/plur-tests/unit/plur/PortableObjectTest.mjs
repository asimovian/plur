/**
 * @copyright 2019 Asimovian LLC
 * @license MIT https://github.com/asimovian/plur/blob/master/LICENSE.txt
 * @module plur-tests/unit/plur/PortableObjectTest
 * @version 0.0.2
 */
'use strict';

import PlurObject from '../../../plur/PlurObject.mjs';
import Test from '../../../plur/test/Test.mjs';
import PortableObject from '../../../plur/PortableObject.mjs';

/**
 * @tests plur/PortableObject
 */
export default class PortableObjectTest extends Test {
    constructor() {
        super();
    }

    /**
     * @tests plur/Obj.equal
     */
    test_static_equal() {
        this.assert(PortableObject.equal('a','a'), 'Simple strings should be equal')
        this.assert(PortableObject.equal(22,22), 'Simple numbers should be equal')
        this.assert(PortableObject.equal(false,false), 'Simple booleans should be equal')
        this.assert(PortableObject.equal(['a','b'],['a','b']), 'Simple arrays should be equal')
        this.assert(PortableObject.equal(this.fixtures.objF, this.fixtures.objF), 'Simple objects should be equal');
        this.assert(PortableObject.equal(this.fixtures.objA, this.fixtures.objCopyA), 'Complex objects should be equal');
        this.assert(!PortableObject.equal(this.fixtures.objA, this.fixtures.objNotA), 'Slightly different complex objects shouldn\'t be equal');
    };

    /**
     * @tests plur/Obj.copy
     */
    test_static_copy() {
        const objE2 = PortableObject.copy(this.fixtures.objE);
        this.assert(objE2 !== this.fixtures.objE, 'Should not be identity equal to copy');
        this.assert(PortableObject.equal(objE2, this.fixtures.objE), 'Should be equal to copy');

        const objA2 = PortableObject.copy(this.fixtures.objA);
        this.assert(objA2 !== this.fixtures.objA, 'Should not be identity equal to copy');
        this.assert(PortableObject.equal(objA2, this.fixtures.objA), 'Should be equal to copy');
        objA2.B.numb = 1971;
        this.assert(this.fixtures.objA.B.numb !== 1971, 'Original object property should not be changed')
    };

    /**
     * @tests plur/Obj.isPrimitive
     */
    test_static_isPrimitive() {
        this.assert( PortableObject.isPrimitive() === false, 'Undefined is not a portable type' );
        this.assert( PortableObject.isPrimitive('foo') === true, 'Simple string should be primitive' );
        this.assert( PortableObject.isPrimitive(32) === true, 'Simple number should be primitive' );
        this.assert( PortableObject.isPrimitive(false) === true, 'Simple boolean should be primitive' );

        this.assert( PortableObject.isPrimitive(null) === true, 'Simple null should be primitive' );

        this.assert( PortableObject.isPrimitive(['a',42]) === false, 'Simple array should be primitive' );
        this.assert( PortableObject.isPrimitive(this.fixtures.objE) === false, 'Simple object should be primitive' );
    };

    /**
     * @tests plur/Obj.isCompound
     */
    test_static_isCompound() {
        this.assert( PortableObject.isCompound() === false, 'Undefined is not a portable type' );
    };

    /**
     * @tests plur/Obj.isPortable
     */
    test_static_isPortable() {
        this.assert( PortableObject.isPortable() === false, 'Undefined is not a portable type' );
    };

    fixtures = {
        objA: {
            str: 'foo bar',
            num: 42,
            bool: true,
            arr: [ 'a', 'b', 'c' ],
            B: {
                strb: 'bar foo',
                numb: 0.33,
                boolb: false,
                arrb: [ 1, 2, 3],
                C: {
                    arrc: [
                        { strr: '', numbr: 0, boolr: false, D: {}, arrr: [] }
                    ]
                }
            }
        },
        objCopyA: {
            str: 'foo bar',
            num: 42,
            bool: true,
            arr: [ 'a', 'b', 'c' ],
            B: {
                strb: 'bar foo',
                numb: 0.33,
                boolb: false,
                arrb: [ 1, 2, 3],
                C: {
                    arrc: [
                        { strr: '', numbr: 0, boolr: false, D: {}, arrr: [] }
                    ]
                }
            }
        },
        objNotA: {
            str: 'foo bar',
            num: 42,
            bool: true,
            arr: [ 'a', 'b', 'c' ],
            B: {
                strb: 'bar foo',
                numb: 0.33,
                boolb: false,
                arrb: [ 1, 2, 3],
                C: {
                    arrc: [
                        { strr: '', numbr: 0, boolr: false, D: {}, arrr: ['wrong'] }
                    ]
                }
            }
        },
        objE: {
            str: 'fun bar',
            B: {
                numb: -5,
                C: {
                    append: 'appended?'
                }
            }
        },
        objF: {
            tree: 'fity'
        },
    };
}

PlurObject.plurify('plur-tests/unit/plur/PortableObjectTests', PortableObjectTest);
