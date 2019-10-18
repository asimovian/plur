/**
 * @copyright 2019 Asimovian LLC
 * @license MIT https://github.com/asimovian/plur/blob/master/LICENSE.txt
 * @module plur/config/Schema
 * @version 0.0.2
 */
'use strict';

import PlurClass from '../../plur/Class.mjs';
import PortableObject from '../../plur/PortableObject.mjs';

/**
 * Represents a JS template and validation scheme for primitives-only objects and JSON.
 * Not implemented yet.
 * The current idea is to use JSDoc with @typedef tags to generate the validation schema.
 *
 * Not implemented yet.
 * @final
 * @implements {IPlurified}
 */
export default class Schema {
    /**
     * Not implemented.
     * @param {obj} packedCfg
     * @param {obj} schemaObj
     */
    static split(packedCfg, schemaObj, schemaKey) {
    };

    /**
     * Not implemented.
     *
     * @param {Schema} parentSchema
     * @param {Schema} childSchema
     * @returns {Schema} schema
     */
    static merge(parentSchema, childSchema) {
        return new Schema(); // todo
    };

    /**
     * Not implemented.
     * @param {obj} cfg
     * @param {Schema} parentSchema
     */
    constructor(cfg, parentSchema) {
    };

}

PlurClass.plurify('plur/config/Schema', Schema);

