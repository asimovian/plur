/**
 * @copyright 2019 Asimovian LLC
 * @license MIT https://github.com/asimovian/plur/blob/master/LICENSE.txt
 * @module plur/error/State
 */
'use strict';

import PlurObject from '../../plur/Class.mjs';
import PlurError from '../../plur/error/Error.mjs';

/**
 * Errors thrown by assertions - typically in tests.
 *
 */
export default class StateError extends PlurError {
    constructor(message, data) {
        if (typeof message === 'object') {
            data = message;
            message = 'Invalid state';
        } else if (typeof message === 'undefined') {
            message = 'Invalid state';
        }

        super(message, data);
    }
};

PlurObject.plurify('plur/error/State', StateError);
