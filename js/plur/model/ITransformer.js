/**
 * @copyright 2019 Asimovian LLC
 * @license MIT https://github.com/asimovian/plur/blob/master/LICENSE.txt
 * @module plur/model/ITransformer
 */
'use strict';

import PlurObject from 'plur/Class.mjs';
import InterfaceError from 'plur/error/Interface';

/**
 * Transforms data objects to and from other formats (e.g., JSON, XML, ProtoBuff, etc.).
 *
 * @interface
 * @implements {plur/IPlurified}
 */
class IModelTransformer {
    constructor() {
        throw new InterfaceError(this);
    };
};

PlurObject.plurify('plur/model/ITransformer', IModelTransformer);

/**
 * Transforms a data model object into the subject format.
 *
 * @function plur/model/ITransformer.prototype.encode
 * @abstract
 * @param {!Object<string,(string|number|boolean|null)>} model Nested primitive JS object.
 * @returns {*}
 */
IModelTransformer.prototype.encode = PlurObject.abstractMethod;

/**
 * Transforms a subject format into a data model object.
 *
 * @function plur/model/Transformer.prototype.decode
 * @abstract
 * @param {*}
 * @returns {*}
 */
IModelTransformer.prototype.decode = PlurObject.abstractMethod;

export default IModelTransformer;
