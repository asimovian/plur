/**
 * @copyright 2019 Asimovian LLC
 * @license MIT https://github.com/asimovian/plur/blob/master/LICENSE.txt
 * @module plur/config/Schema
 * @version 0.0.2
 */
'use strict';

import PlurObject from '../../plur/PlurObject.mjs';
import PortableObject from '../../plur/PortableObject.mjs';

/**
 * Represents a JS template and validation scheme for primitives-only objects and JSON.
 *
 * Not implemented yet.
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
 * @implements {IPlurified}
 */
export default class Schema {
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
     * @param {obj} cfg
     * @param {Schema} parentSchema
     */
    constructor(cfg, parentSchema) {

    };
}

PlurObject.plurify('plur/config/Schema', Schema);
