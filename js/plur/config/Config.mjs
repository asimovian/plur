/**
 * @copyright 2019 Asimovian LLC
 * @license MIT https://github.com/asimovian/plur/blob/master/LICENSE.txt
 * @module plur/config/Config
 * @version 0.0.2
 */
'use strict';

import PlurObject from '../../plur/PlurObject.mjs';
import PortableObject from '../../plur/Obj.mjs';
import Schema from '../../plur/config/Schema.mjs';

/**
 * Maintains a layered configuration set for a class, backed by a read-only portable object.
 *
 * Schemas are unimplemented, but planned. See plur/config/Schema for draft.
 *
 * @final
 * @implements {IPlurified}
 */
class Config {
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
     * @param {object} parentConfig
     * @param {object} childConfig
     * @returns {object} configObj
     */
    static mergeConfig(schema, parentConfig, childConfig) {
        // for now: ignore schema. simple two-way merge.
        return PortableObject.merge(parentConfig, childConfig);
    };

    /**
     * Compiles a primitive data object into a valid primitive config object and schema for use with the Config class.
     * Where not specified, the schema is auto-generated based on values provided as defaults.
     *
     * @param {object} configObj
     * @param {object} options
     * @returns {Array<Object>} Returns a parsed [ configObj, schema ]
     * @throws {Error}  On invalid formatting
     */
    static compile(configObj, options) {
        // for now: a primitive deep copy
        return [ PortableObject.copy(configObj), new Schema() ];
    };

    /**
     * @param {!IConfigurable} configurable
     * @param {!Object|!Config} config
     */
    constructor(configurable, config) {
        /** @type {string} **/
        this._configurableNamepath = configurable.namepath;
        /** @type {Object<string,(string|number|boolean|Object|Array|null)>} **/
        this._schema = null;  // classes only
        /** @type {Object<string,(string|number|boolean|Object|Array|null)>} **/
        this._config = null;

        if (!PlurObject.implementing(configurable, IConfigurable)) {
            throw new Error('Cannot configure for a non-configurable class. Implement IConfigurable.');
        }

        if (typeof configurable === 'function') {  // it's a class
            const parentClass = Object.getPrototypeOf(configurable);

            if (PlurObject.implementing(parentClass, IConfigurable)) {  // it has a parent config. make a merge copy.
                const parentConfig = parentClass.getConfig();
                this._schema = Config.mergeSchema(parentConfig, config);
                this._config = Config.mergeConfig(this._schema, parentConfig, config);
            } else if (config instanceof Config) {  // no parent, with a Config. copy the Config.
                this._schema = config.getSchema();
                this._config = config.config();
            } else {   // no parent, primitive object. parse and validate.
               [ this._config, this._schema ] = Config.compile(config);
            }
        } else {  // it's an object. no schema.
            const objectClass = configurable.constructor;
            const classConfig = objectClass.getConfig();

            if (config instanceof Config) {  // no parent, with a Config. copy the Config.
                this._config = Config.mergeConfig(classConfig._schema, classConfig, config);
            } else {   // no parent, primitive object. parse and validate. throw error if they try a schema
                [ this._config ] = Config.compile(config, { errorSchema: true });
            }
        }
    };

    /**
     * Retrieves a primitive nested object containing raw configuration data.
     * @returns {Object<string,(string|number|boolean|Object|Array|null)>}
     */
    config() {
    };

    /**
     * Retrieves the configurable's namepath;
     * @returns {string}
     */
    getNamepath() {
        return this._configurableNamepath;
    };
}

PlurObject.plurify('plur/config/Config', Config);
