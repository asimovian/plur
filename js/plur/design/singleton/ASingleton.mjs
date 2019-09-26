/**
 * @copyright 2019 Asimovian LLC
 * @license MIT https://github.com/asimovian/plur/blob/master/LICENSE.txt
 * @module plur/design/singleton/ASingleton
 */
'use strict';

import PlurObject from '../../../plur/PlurObject.mjs';

/**
 * Acts as singleton wrapper for other prototypes.
 *
 * Intended for use in cases where parent prototype design should be separate from singleton implementation.
 *
 * For example; the SystemLog singleton is intended for use as a default logger whereas the Log prototype that it
 * wraps is intended for logging within any context, not just within the default "System" scope. While the design
 * of the SystemLog singleton is, obviously, singular, the design of the Log prototype is not.
 *
 * Other singleton patterns, such as the static singleton, are more appropriate when the design of the prototype
 * is intended for use with single concrete implementation.
 *
 * For example; the PlurAPI class is a single concrete implementation of API designed to only exist once, globally.
 *
 * @abstract
 */
export default class ASingleton {
    constructor(object) {
        this._object = !!object ? object : null;
    };
}

PlurObject.plurify('plur/design/ASingleton', ASingleton);

/**
 * Sets the singleton object.
 *
 * @param {} object
 * @throws plur/error/State If the singleton object has already bee initialized
 */
ASingleton.prototype.set = function(object) {
    if (this._object !== null) {
        throw new Error('Singleton for ' + this.namepath + ' has already been initialized');
    }

    this._object = object;
};

/**
 * Resets the singleton object.
 *
 * @function plur/design/ASingleton.prototype._reset
 * @param {} object
 * @throws plur/error/State If the singleton object has already bee initialized
 */
ASingleton.prototype._reset = function(object) {
    if (this._object !== null) {
        delete this._object;
        this._object = null;
    }

    this._object = object;
};

/**
 * Retrieves the singleton object.
 *
 * @returns {}
 * @throws plur/Error/State If uninitialized.
 */
ASingleton.prototype.get = function() {
    if (this._object === null) {
        throw new Error('Singleton for ' + this.namepath + ' has not been initialized');
    }

    return this._object;
};

