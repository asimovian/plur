/**
 * @copyright 2019 Asimovian LLC
 * @license MIT https://github.com/asimovian/plur/blob/master/LICENSE.txt
 * @module plur/config/Config
 */
'use strict';

import PlurObject from '../../plur/PlurObject.mjs';

/**
 * Maintains nested key/value configuration for a subject class.
 *
 * Schema options:
 *   _s Configures the entire schema.
 *   Schema keys:
 *   c {Array<string>} class The [alias, namepath] of a custom schema parser to load.
 *                           Must implement IConfigParser.parseSchema().
 *
 *   _d Configures a {} data record schema. Value is the schema record.
 *   Record schema keys: none
 *   g See property schema.
 *
 *   _o Configures the encapsulating object or array.
 *   Scope schema keys:
 *   g See property schema.
 *
 *   _ Configures a property schema when used as a record. Value is default value (v) or else an expected class/type (t).
 *   Property schema keys:
 *   t {type} type The primitive type to expect (string, number, boolean, null, float}
 *   v {*} value Default value.
 *   r {boolean} required Field is required (true) or optional (false). The default is optional.
 *   p {RegExp} pattern Pattern to check strings against.
 *   g {Array<number>} range Valid numerical range where g[0] <= v <= g[1]. Length when applied to strings and arrays.
 *   c {string} Reference a previously declared schema parser by its alias.
 *
 ** Example:
 * new Config(MyClass, {
 *     {_s:{ c:['password','plur/config/parser/Password']}} // loads a schema parser and gives it the alias 'password'
 *     apps: [
 *         // the scope schema below makes 'apps' a required field and it must have at least 1 entry
 *         {_o g:[1,],r:true},
 *         // schema below expects each record to have a required string namepath property and an optional
 *         // cmdlineOptions string
 *         {_d:{ namepath: {_:string,r:true}, cmdlineOptions: String }} j
 *     ],
 *     bestNumber: 6,  // schema expects numbers, required, default value of 6
 *     secondNumber: {_:float,v:5},  // schema expects an optional float, default value of 5(.0)
 *     password: {_:string,c:password,g:[4,12],r:true}  // required 4-12 char string passed to custom 'password' parser
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
