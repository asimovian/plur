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
        const objF2 = PortableObject.copy(this.fixtures.objF);
        this.assert(objF2 !== this.fixtures.objF, 'Should not be identity equal to copy');
        this.assert(PortableObject.equal(objF2, this.fixtures.objF), 'Should be equal to copy');

        const objA2 = PortableObject.copy(this.fixtures.objA);
        this.assert(objA2 !== this.fixtures.objA, 'Should not be identity equal to copy');
        this.assert(PortableObject.equal(objA2, this.fixtures.objA), 'Should be equal to copy');
        objA2.B.numb = 1971;
        this.assert(this.fixtures.objA.B.numb !== 1971, 'Original object property should not be changed')
    };

    /**
     * @tests plur/Obj.merge
     */
    test_static_merge() {
        const objFE = PortableObject.merge(this.fixtures.objF, this.fixtures.objE);
        this.assert(PortableObject.equal(objFE, this.fixtures.objFE), 'Result should match fixture');

        const objANotA = PortableObject.merge(this.fixtures.objA, this.fixtures.objNotA);
        this.assert(PortableObject.equal(objANotA, this.fixtures.objNotA), 'Complex result should match second fixture');

        const objNotAA = PortableObject.merge(this.fixtures.objNotA, this.fixtures.objA);
        this.assert(PortableObject.equal(objNotAA, this.fixtures.objA), 'Reverse complex result should match second fixture');
    };

    /**
     * @tests plur/Obj.isPrimitiveType
     */
    test_static_isPrimitiveType() {
        this.assert( PortableObject.isPrimitiveType() === false, 'Undefined should not a portable type' );
        this.assert( PortableObject.isPrimitiveType('foo') === true, 'String should be primitive' );
        this.assert( PortableObject.isPrimitiveType(32) === true, 'Number should be primitive' );
        this.assert( PortableObject.isPrimitiveType(false) === true, 'Boolean should be primitive' );
        this.assert( PortableObject.isPrimitiveType(null) === true, 'Null should be primitive' );

        this.assert( PortableObject.isPrimitiveType(['a',42]) === false, 'Simple array should not be primitive' );
        this.assert( PortableObject.isPrimitiveType(this.fixtures.objF) === false, 'Simple object should not be primitive' );
    };

    /**
     * @tests plur/Obj.isCompoundType
     */
    test_static_isCompoundType() {
        this.assert( PortableObject.isCompoundType() === false, 'Undefined should not be a compound' );
        this.assert( PortableObject.isCompoundType({}) === true, 'Simple object should be a compound' );
        this.assert( PortableObject.isCompoundType([]) === true, 'Simple array should be a compound' );
        this.assert( PortableObject.isCompoundType(null) === false, 'Null should not be a compound' );
        this.assert( PortableObject.isCompoundType('l') === false, 'String should not be a compound' );
        this.assert( PortableObject.isCompoundType(44) === false, 'Number should not be a compound' );
        this.assert( PortableObject.isCompoundType(true) === false, 'Boolean should not be a compound' );
    };

    /**
     * @tests plur/Obj.isPortableType
     */
    test_static_isPortableType() {
        this.assert( PortableObject.isPortableType() === false, 'Undefined should not be a portable type' );
        this.assert( PortableObject.isPortableType({}) === true, 'Simple object should be portable' );
        this.assert( PortableObject.isPortableType([]) === true, 'Simple array should be portable' );
        this.assert( PortableObject.isPortableType(null) === true, 'Null should be portable' );
        this.assert( PortableObject.isPortableType('l') === true, 'String should be portable' );
        this.assert( PortableObject.isPortableType(44) === true, 'Number should be portable' );
        this.assert( PortableObject.isPortableType(0.22) === true, 'Float number should be portable' );
        this.assert( PortableObject.isPortableType(true) === true, 'Boolean should be portable' );
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
        objFE: {
            str: 'fun bar',
            tree: 'fity',
            B: {
                numb: -5,
                C: {
                    append: 'appended?'
                }
            }
        },
    };
}

PlurObject.plurify('plur-tests/unit/plur/PortableObjectTests', PortableObjectTest);
