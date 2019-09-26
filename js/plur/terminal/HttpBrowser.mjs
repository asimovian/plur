/**
 * @copyright 2019 Asimovian LLC
 * @license MIT https://github.com/asimovian/plur/blob/master/LICENSE.txt
 * @module plur/terminal/HttpBrowser
 * @version 0.1.0
 */
'use strict';

import PlurObject from '../PlurObject.mjs';
import ITerminal from './ITerminal.mjs';

/**
 * Represents a means of interacting with a user/client using a browser via HTTP.
 *
 * @implements {IPlurified, ITerminal}
 */
export default class HttpBrowserTerminal {

};

PlurObject.plurify('plur/terminal/HttpBrowser', HttpBrowserTerminal, [ITerminal]);
