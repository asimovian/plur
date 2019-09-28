/**
 * @copyright 2019 Asimovian LLC
 * @license MIT https://github.com/asimovian/plur/blob/master/LICENSE.txt
 * @module plur/config/Config
 */
'use strict';

import PlurObject from '../../plur/PlurObject.mjs';

/**
 * Maintains key/value configuration for a subject object, typically for a prototype.
 *
 * Schema options:
 *   __ Configures a {} record schema. Value is the schema record.
 *   _ Configures a property schema when used as a record. Value is default value (v) or else an expected class/type (t).
 *   t {Class} type Field is instanceof type.
 *   v {*} value Default value.
 *   r {boolean} required Field is required (true) or optional (false). The default is optional.
 *   p {RegExp} pattern Pattern to check strings against.
 *   g {Array<number>} range Valid numerical range where g[0] <= v <= g[1]
 *
 ** Example:
 * new Config(MyClass, {
 *     apps: [
 *         // schema below expects each record to have a required string namepath property and an optional
 *         // cmdlineOptions string
 *         {__:{ namepath: {_:String,r:true}, cmdlineOptions: String }} j
 *     ],
 *     bestNumber: 6,  // schema expects numbers, required, default value of 6
 *     secondNumber: {_:float,v:5},  // schema expects a float, default value of 5(.0)
 * };
 *
 * @final
 * @implements {Plurified}
 */
class Config {
    /**
     *
     * @param {Object} parentSchema
     * @param {Object} childSchema
     * @returns {Object} schema
     */
    static mergeSchema(parentSchema, childSchema) {

    };

    /**
     *
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
        this._configurableNamepath = configurable.namepath;
        this._schema = null;  // classes only
        this._config = null;

        if (!PlurObject.implementing(configurable, IConfigurable)) {
            throw new Error('Cannot configure for a non-configurable class. Implement IConfigurable.');
        }

        if (typeof configurable === 'Function') {  // it's a class
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
                this._config = Config.mergeConfig(classConfig, config);
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
