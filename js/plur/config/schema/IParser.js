/**
 * @copyright 2019 Asmov LLC
 * @license MIT https://github.com/asmov/plur/blob/master/LICENSE.txt
 * @module plur/config/schema/IParser
 * @version 0.0.2
 */
'use strict';

import PlurObject from '../../../plur/Class.mjs';
import InterfaceError from '../../../plur/error/Interface';

/**
 * Implements the ability to parse and/or validate Config schema data.
 *
 * @interface
 * @implements {IPlurified}
 */
export default class ISchemaParser {
    constructor() {
        throw new InterfaceError(this);
    };
}

PlurObject.plurify('plur/config/schema/Parser', ISchemaParser);

/**
 * Parses a schema record (global, scope, record, property) and validates data against it.
 * @type {function}
 * @abstract
 * @throws {Error} On failure
 */
ISchemaParser.prototype.parseGlobalSchema = PlurObject.abstractMethod;

/**
 * Parses a schema record (global, scope, record, property) and validates data against it.
 * @type {function}
 * @abstract
 * @throws {Error} On failure
 */
ISchemaParser.prototype.parseScopeSchema = PlurObject.abstractMethod;

/**
 * Parses a schema record (global, scope, record, property) and validates data against it.
 * @type {function}
 * @abstract
 * @throws {Error} On failure
 */
ISchemaParser.prototype.parseRecordSchema = PlurObject.abstractMethod;

/**
 * Parses a schema record (global, scope, record, property) and validates data against it.
 * @type {function}
 * @abstract
 * @throws {Error} On failure
 */
ISchemaParser.prototype.parsePropertySchema = PlurObject.abstractMethod;

