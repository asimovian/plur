/**
 * @copyright 2019 Asimovian LLC
 * @license MIT https://github.com/asimovian/plur/blob/master/LICENSE.txt
 * @module plur/config
 */
'use strict';

import { PlurObject } from 'plur/PlurObject';
import { InterfaceError } from 'plur/error/Interface';

/**
 * Interface for any configurable prototype.
 *
 * @interface
 */
class IConfigurable {
    constructor() {
        throw new InterfaceError(this);
    };
}

PlurObject.plurify('plur/config/IConfigurable', IConfigurable);

/**
 * Returns an immutable copy of the config data as a primitive nested JS object.
 * @returns {{(string):(*)}}
 */
IConfigurable.prototype.config = PlurObject.abstractMethod;


export default IConfigurable;
