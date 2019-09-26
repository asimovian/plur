/**
 * @copyright 2019 Asimovian LLC
 * @license MIT https://github.com/asimovian/plur/blob/master/LICENSE.txt
 * @module plur/user/ITerminal
 * @version 0.1.0
 */
'use strict';

import PlurObject from '../../plur/PlurObject.mjs';

/**
 * Represents a means of interacting with a user/client.
 *
 * @interface
 * @implements {IPlurified}
 */
export default class ITerminal {

};

PlurObject.plurify('plur/user/ITerminal', ITerminal);

/**
 *
 * @type {function}
 * @abstract
 * @returns {Array<string>}
 */
ITerminal.prototype.getParameters = PlurObject.abstractMethod;

