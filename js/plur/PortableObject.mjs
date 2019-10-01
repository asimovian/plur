/**
 * @copyright 2019 Asimovian LLC
 * @license MIT https://github.com/asimovian/plur/blob/master/LICENSE.txt
 * @module plur/Obj
 * @version 0.0.2
 */
'use strict';

import PlurObject from '../plur/PlurObject.mjs';

/**
 * Utility for dealing with the concept of a plur "Obj". Objects with only basic primitives and non-function compounds.
 * CompoundTypes can only contain basic primitives or Obj compounds.
 * [ string, number, boolean, Array, object, null ]
 *
 * @implements {IPlurified}
 * @final
 */
export default class Obj {
    /**
     * @param {*} src
     * @param {*=} dest Optional destintion object / array to store result in. Not applicable to primitives.
     * @returns {*}
     */
    static copy(src, dest) {
        if (Obj.isPrimitiveType(src)) {
            return src;
        } else if (Array.isArray(src)) {
            const result = dest || [];

            for (let i = 0; i < src.length; ++i) {
                if (Obj.isPortableType(src[i])) {
                    result[i] = Obj.copy(src[i]);
                }
            }

            return result;
        } else if (typeof src === 'object') {
            const result = dest || {};

            for (const key in src) {
                if (Obj.isPortableType(src[key])) {
                    result[key] = Obj.copy(src[key]);
                }
            }

            return result;
        }

        throw new Error('Non-portable type: ' + typeof src);
    };

    /**
     *
     * @param {obj} a
     * @param {obj=} b
     * @returns {obj}
     */
    static merge(a, b) {
        const result = Obj.copy(a);
        if (typeof b === 'undefined') {
            return result;
        }

        Obj.copy(b, result);
        return result;
    }

    static equal(a, b) {
        if (Obj.isPrimitiveType(a)) {
           return ( a === b );
        } else if (Array.isArray(a)) {
           if (!Array.isArray(b) || a.length !== b.length) {
               return false;
           }

           for (let i = 0; i < a.length; ++i) {
               if (!Obj.equal(a[i], b[i])) {
                   return false;
               }
           }

           return true;
        } else if (typeof a === 'object') {
           if (typeof b !== 'object') {
               return false;
           }

           const aProps = Object.getOwnPropertyNames(a);
           if (aProps.length !== Object.getOwnPropertyNames(b).length) {
               return false;
           }

           for (let i = 0; i < aProps.length; ++i) {
               const prop = aProps[i];
               if (!Obj.equal(a[prop], b[prop])) {
                   return false;
               }
           }

           return true;
        }

        throw new Error('Non-portable type: ' + typeof a);
    };

    static isPrimitiveType(o) {
        switch (typeof o) {
        case 'string': case 'number': case 'boolean':
            return true;
        case 'object':
            return (o === null);
        }

        return false;
    };

    static isCompoundType(o) {
        return ( typeof o === 'object' && o !== null );
    }

    static isPortableType(o) {
        switch(typeof o) {
        case 'string': case 'number': case 'boolean': case 'object':
            return true;
        }

        return false;
    };

    constructor() {
        throw new Error('Cannot instantiate private constructor of PortableObject.');
    };
}

PlurObject.plurify('plur/PortableObject', Obj);
