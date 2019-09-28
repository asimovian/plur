/**
 * @copyright 2019 Asimovian LLC
 * @license MIT https://github.com/asimovian/plur/blob/master/LICENSE.txt
 * @module plur/config/Config
 */
'use strict';

import PlurObject from '../../plur/PlurObject.mjs';
import Schema from '../../plur/config/Schema.mjs';

/**
 * Maintains nested key/value configuration for a subject class.
 * See plur/config/Schema for usage.
 *
 * @final
 * @implements {IPlurified}
 */
class Config {
    /**
     * @param {Schema} parentSchema
     * @param {Schema} childSchema
     * @returns {Schema} schema
     */
    static mergeSchema(parentSchema, childSchema) {
        return Schema.merge(parentSchema, childSchema);
    };

    /**
     * @param {Object} schema
     * @param {Object} parentConfig
     * @param {object} childConfig
     * @returns {Object} primitiveConfig
     */
    static mergeConfig(schema, parentConfig, childConfig) {

    };

    /**
     * Compiles a primitive data object into a valid primitive config object and schema for use with the Config class.
     * Where not specified, the schema is auto-generated based on values provided as defaults.
     *
     * @param {Object<string,(string|number|boolean|Object|Array|null)>} primitiveConfig
     * @param {Object<string,(string|number|boolean)>} options
     * @returns {Array<Object>} Returns a parsed [ primitive config, schema ]
     * @throws {Error}  On invalid formatting
     */
    static compile(primitiveConfig, options) {

    }

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
