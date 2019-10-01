/**
 * @copyright 2019 Asimovian LLC
 * @license MIT https://github.com/asimovian/plur/blob/master/LICENSE.txt
 * @module plur/error/Error
 */
'use strict';

import PlurObject from '../../plur/PlurObject.mjs';
import Model from '../../plur/model/Model.mjs';
import IPortable from '../../plur/model/IPortable.mjs';

/**
 * Base class for all plur framework error classes.
 *
 */
export default class PlurError extends Error {
    static throwIf(testResult, message, data) {
        if (testResult) {
            throw new PlurError(message, data);
        }
    };

    /**
     * @override
     * @param {!Object<string,(string|number|boolean|null)>} model
     * @returns {PlurError}
     */
    static fromObj(model) {
        return new PlurError(model.message, model.data);
    };

    static _stringifyReplacer(key, value) {
        switch (typeof value) {
            case 'undefined':
                return 'undefined';
            case 'function':
                return '[Function]';
            default:
                return value;
        };
    };

    /**
     * @param {string} message
     * @param {*=} data
     */
    constructor(message, data) {
        super();

        /** @type {string} Uses the error class's namepath as the name. **/
        this.name = this.namepath;
        /** @type {string=} **/
        this.message = message;
        /** @type {*} **/
        this.data = ( typeof data === 'undefined' ? null : data );

        Error.captureStackTrace(this, this.constructor);
    };

    /**
     * @returns {string}
     */
    toString() {
        if (this.data === null)
            return 'Error (' + this.name + '): ' + this.message;

        return 'Error (' + this.name + '): ' + this.message + ' ; ' + JSON.stringify(this.data, PlurError._stringifyReplacer);
    };

    /**
     * @override
     * @returns {{message: (string|undefined), data: (*)}}
     */
    toObj() {
        return {
            message: this.message,
            data: Model.model(this.data)
        };
    };
}

PlurObject.plurify('plur/error/Error', PlurError, [ IPortable ]);
