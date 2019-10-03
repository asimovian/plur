/**
 * @copyright 2019 Asimovian LLC
 * @license MIT https://github.com/asimovian/plur/blob/master/LICENSE.txt
 * @module plur/config/Config
 * @version 0.0.2
 */
'use strict';

import PlurObject from '../../plur/PlurObject.mjs';
import PortableObject from '../../plur/PortableObject.mjs';
import IConfigurable from '../../plur/config/IConfigurable.mjs';
import Schema from '../../plur/config/Schema.mjs';

/**
 * Maintains a layered configuration set for a class, backed by a read-only portable object.
 *
 * Schemas are unimplemented, but planned. See plur/config/Schema for draft.
 *
 * @final
 * @implements {IPlurified}
 */
export default class Config {
    /**
     * Not implemented yet.
     *
     * @param {Schema} parentSchema
     * @param {Schema} childSchema
     * @returns {Schema} schema
     */
    static mergeSchema(parentSchema, childSchema) {
        return Schema.merge(parentSchema, childSchema);
    };

    /**
     * @param {Schema} schema The schema to validate against after merge is complete. This is not implemented yet.
     * @param {obj} parentConfig
     * @param {obj} childConfig
     * @param {boolean=} extend If TRUE, do not fill-only when merging. Will probably go away when Schema is done.
     * @returns {obj} configObj
     */
    static mergeConfig(schema, parentConfig, childConfig, extend) {
        return PortableObject.merge(parentConfig, childConfig, !extend);
    };

    /**
     * Compiles a primitive data object into a valid primitive config object and schema for use with the Config class.
     * Where not specified, the schema is auto-generated based on values provided as defaults.
     *
     * @param {obj} configObj
     * @param {Schema=} schema
     * @returns {Array<Object>} Returns a parsed [ configObj, schema ]
     * @throws {Error}  On invalid formatting
     */
    static compile(configObj, schema) {
        return [ PortableObject.copy(configObj), new Schema(configObj, schema) ];
    };

    /**
     * @param {!IConfigurable} configurable
     * @param {!obj} cfg
     */
    constructor(configurable, cfg) {
        /** @type {string} **/
        this._cfgurableNamepath = configurable.namepath;
        /** @type {IConfigurable} configurable **/
        this._cfgurable = configurable;
        /** @type {Schema} **/
        this._schema = null;  // classes only
        /** @type {obj} **/
        this._cfg = null;

        if (!PlurObject.implementing(configurable, IConfigurable)) {
            throw new Error('Cannot configure for a non-configurable class. Implement IConfigurable.');
        }

        if (typeof configurable === 'function') {  // it's a class
            const parentClass = Object.getPrototypeOf(configurable);

            if (PlurObject.implementing(parentClass, IConfigurable)) {  // it has a parent config. make a merge copy.
                const parentConfig = parentClass.getConfig();
                this._schema = new Schema(cfg, parentConfig.getSchema());
                this._cfg = Config.mergeConfig(this._schema, parentConfig.config(), cfg, true);
            } else {   // no parent, primitive object. parse and validate.
               [ this._cfg, this._schema ] = Config.compile(cfg);
            }
        } else {  // it's an object
            const objectClass = configurable.constructor;
            [ this._cfg, this._schema ] = Config.compile(cfg);
        }
    };

    /**
     * Retrieves a primitive nested object containing raw configuration data.
     * @returns {Object<string,(string|number|boolean|Object|Array|null)>}
     */
    config() {
        return this._cfg;
    };

    /**
     * @returns {Schema}
     */
    getSchema() {
        return this._schema;
    };

    /**
     * Retrieves the configurable's namepath;
     * @returns {string}
     */
    getNamepath() {
        return this._cfgurableNamepath;
    };

    /**
     * @param {obj} rh
     * @param {IConfigurable=} configurable
     * @returns {obj|Config} Returns obj if configurable is omitted, Config if provided.
     */
    merge(rh, configurable) {
        if (!!configurable) {
            return new Config(configurable, Config.mergeConfig(this._schema, this._cfg, rh));
        } else {
            return Config.mergeConfig(this._schema, this._cfg, rh);
        }
    };
}

PlurObject.plurify('plur/config/Config', Config);
