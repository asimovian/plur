/**
 * @copyright 2019 Asimovian LLC
 * @license MIT https://github.com/asimovian/plur/blob/master/LICENSE.txt
 * @module plur/event/Event
 */
'use strict';

import PlurObject from '../../plur/Class.mjs';
import TypeError from '../../plur/error/Type.mjs';

/**
 * Basic Event
 *
 */
export default class Event {
    constructor(type, data) {
        if (typeof type !== 'string') {
            throw new TypeError('Invalid event type.', {type: type});
        }

        this._type = type;
        this._data = (data || {});
        this._timestamp = new Date().getTime();
    }
};

PlurObject.plurify('plur/event/Event', Event);

/**
 * Retrieves the event type.
 *
 * @returns string type
 */
Event.prototype.type = function() {
    return this._type;
};

/**
 * Retrieves additional data concerning the event.
 *
 * @returns {} data
 */
Event.prototype.data = function() {
    return this._data;
};

/**
 * Retrieves the timestamp of when the event was first emitted.
 *
 * @returns int timestamp
 */
Event.prototype.timestamp = function() {
    return this._timestamp;
};
