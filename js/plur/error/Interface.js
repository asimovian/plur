/**
 * @copyright 2019 Asimovian LLC
 * @license MIT https://github.com/asimovian/plur/blob/master/LICENSE.txt
 * @module plur/error/Interface
 */

import PlurObject from 'plur/PlurObject.mjs';
import PlurError from 'plur/error/Error';

/**
 * Thrown on an attempt to instantiate an interface prototype.
 *
 * @class InterfaceError
 * @alias {plur/error/Interface}
 * @extends {plur/error/Error}
 */
class InterfaceError extends PlurError {
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

PlurObject.plurify('plur/error/Interface', InterfaceError);

export default InterfaceError;
