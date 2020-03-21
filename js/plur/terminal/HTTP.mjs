/**
 * @copyright 2019 Asmov LLC
 * @license MIT https://github.com/asmov/plur/blob/master/LICENSE.txt
 * @module plur/terminal/HTTP
 * @version 0.0.2
 */
'use strict';

import PlurClass from '../../plur/Class.mjs';
import ITerminal from '../../plur/terminal/ITerminal.mjs';

/**
 * Represents a means of interacting with a user/client using a browser via HTTP.
 *
 * @implements {IPlurified}
 * @implements {ITerminal}
 */
export default class HttpTerminal {
    constructor() {
    };
}

PlurClass.plurify('plur/terminal/HTTP', HttpTerminal, [ITerminal]);
