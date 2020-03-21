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
 * @constructor plur/error/Unknown
 * @extends plur/error/Error
 **
 * @params {string} message
 * @params {=} data
 */
var UnknownError = function(message, data) {
    if (typeof message === 'object') {
        data = message;
        message = 'Unexpected data type';
    } else if (typeof message === 'undefined') {
        message = 'Unexpected data type';
    }

    PlurError.call(this, message, data);
};

UnknownError.prototype = PlurObject.create('plur/error/Unknown', UnknownError, PlurError);

return UnknownError;
});