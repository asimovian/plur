/**
 * @copyright 2019 Asmov LLC
 * @license MIT https://github.com/asmov/plur/blob/master/LICENSE.txt
 * @module plur/error/State
 */
'use strict';

import PlurClass from '../../plur/Class.mjs';
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

PlurClass.plurify('plur/error/State', StateError);
