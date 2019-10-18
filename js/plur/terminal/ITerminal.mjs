/**
 * @copyright 2019 Asimovian LLC
 * @license MIT https://github.com/asimovian/plur/blob/master/LICENSE.txt
 * @module plur/user/ITerminal
 * @version 0.1.0
 */
'use strict';

import PlurClass from '../../plur/Class.mjs';

/**
 * Represents a means of interacting with a user/client.
 *
 * @interface
 * @implements {IPlurified}
 */
export default class ITerminal {

};

PlurClass.plurify('plur/user/ITerminal', ITerminal);

/**
 *
 * @type {Function}
 * @abstract
 * @returns {Array<string>}
 */
ITerminal.prototype.getParameters = PlurClass.abstractMethod;

