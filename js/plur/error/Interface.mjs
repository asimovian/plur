/**
 * @copyright 2019 Asmov LLC
 * @license MIT https://github.com/asmov/plur/blob/master/LICENSE.txt
 * @module plur/error/Interface
 */
'use strict';

import PlurClass from '../../plur/Class.mjs';
import PlurError from '../../plur/error/Error.mjs';

/**
 * Thrown on an attempt to instantiate an interface prototype.
 */
export default class InterfaceError extends PlurError {
    /**
     * @param {string=} message
     * @param {*=} data
     */
    constructor(message, data) {
        if (typeof message === 'object') {
            data = message;
            message = 'Cannot instantiate an interface prototype.';
        } else if (typeof message === 'undefined') {
            message = 'Cannot instantiate an interface prototype.';
        }

        super(message, data);
    };
}

PlurClass.plurify('plur/error/Interface', InterfaceError);
