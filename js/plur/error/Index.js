/**
 * @copyright 2015 Asmov LLC
 * @license MIT https://github.com/asmov/plur/blob/master/LICENSE.txt
 * @requires plur/PlurObject plur/error/Error
 */
define([
    'plur/PlurObject',
    'plur/error/Error' ],
function(
    PlurObject,
    PlurError ) {

/**
 * Errors thrown by assertions - typically in tests.
 *
 * @constructor plur/error/Index
 * @extends plur/error/Error
 **
 * @params {string} message
 * @params {=} data
 */
var IndexError = function(message, data) {
    if (typeof message === 'object') {
        data = message;
        message = 'Unexpected data type';
    } else if (typeof message === 'undefined') {
        message = 'Unexpected data type';
    }

    PlurError.call(this, message, data);
};

IndexError.prototype = PlurObject.create('plur/error/Index', IndexError, PlurError);

return IndexError;
});