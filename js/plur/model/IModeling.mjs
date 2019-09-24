/**
 * @copyright 2019 Asimovian LLC
 * @license MIT https://github.com/asimovian/plur/blob/master/LICENSE.txt
 * @module plur/model/IModeling
 */
'use strict';

import PlurObject from '../../plur/PlurObject.mjs';
import InterfaceError from '../../plur/error/Interface.mjs';

/**
 * Implementing classes that uses plur/Config to maintain its configuration.
 * The implementing class must:
 *   - Maintain an immutable static plur/Config with a schema & default settings.
 *   - Maintain an immutable inherited (possibly modified) copy of the static plur/Config for each instance of the class.
 *   - Provide accessors for the static Config and the instance's Config->config()
 *
 * @interface
 * @implements {IPlurified}
 * @final
 */
export default class IModeling {
    constructor() {
        throw new InterfaceError(this);
    };
}

PlurObject.plurify('plur/model/IModeling', IModeling);

/**
 * Create an object of the implementing class using the data model provided. Data will be provided in a nested
 * primitive JS object. Static interface.
 *
 * @type {function}
 * @abstract
 * @param {!Object<string,(number|string|Object|null)>}model
 * @returns {Object}
 */
IModeling.fromModel = PlurObject.abstractMethod;

/**
 * Create a nested primitive JS object representing class data available to serialize.
 *
 * @type {function}
 * @abstract
 * @returns {!Object<string,(number|string|Object|null)>}
 */
IModeling.prototype.model = PlurObject.abstractMethod;
