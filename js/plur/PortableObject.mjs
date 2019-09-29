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
 * Compounds can only contain basic primitives or Obj compounds.
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
        if (Obj.isPrimitive(src)) {
            return src;
        } else if (Array.isArray(src)) {
            const result = dest || [];

            for (let i = 0; i < src.length; ++i) {
                if (Obj.isPortable(src[i])) {
                    result[i] = Obj.copy(src[i]);
                }
            }

            return result;
        } else if (typeof src === 'object') {
            const result = dest || {};

            for (const key in src) {
                if (Obj.isPortable(src[key])) {
                    result[key] = Obj.copy(src[key]);
                }
            }
        }

        throw new Error(); // should not be here
    };

    static merge(a, b) {
        const result = Obj.copy(a);
        Obj.copy(b, result);
        return result;
    }

    static isPrimitive(o) {
        switch (typeof o) {
            case 'string': case 'number': case 'boolean':
                return true;
        }

        return false;
    };

    static isCompound(o) {
        return ( typeof o === 'object' );
    }

    static isPortable(o) {
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
