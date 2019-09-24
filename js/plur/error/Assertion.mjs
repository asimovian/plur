/**
 * @copyright 2019 Asimovian LLC
 * @license MIT https://github.com/asimovian/plur/blob/master/LICENSE.txt
 * @module plur/error/Assertion
 */
'use strict';

import PlurObject from '../../plur/PlurObject.mjs';
import PlurError from '../../plur/error/Error.mjs';

/**
 * Errors thrown by assertions - typically in tests.
 *
 */
export default class AssertionError extends PlurError {
    constructor(message, data) {
        if (typeof message === 'object') {
            data = message;
            message = 'Assertion failed';
        } else if (typeof message === 'undefined') {
            message = 'Assertion failed';
        }

        super(message, data);
    }
};

PlurObject.plurify('plur/error/Assertion', AssertionError);

AssertionError.assert = function(result, errorConstructor, message) {
    if (!result) {
        throw new errorConstructor(message, message || 'Assertion failed');
    }
};
