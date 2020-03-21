/**
 * @copyright 2019 Asmov LLC
 * @license MIT https://github.com/asmov/plur/blob/master/LICENSE.txt
 * @module plur-nodejs/terminal/Shell
 * @version 0.0.2
 */
'use strict';

import PlurClass from '../../plur/Class.mjs';
import ITerminal from '../../plur/terminal/ITerminal.mjs';

/**
 * Represents a means of interacting with a user/client via shell / console.
 *
 * @implements {IPlurified}
 * @implements {ITerminal}
 */
export default class ShellTerminal {
    constructor() {
        this._parameters = [];

        // store process arguments as parameters
        let start = 2;
        for (let i = start; i < process.argv.length; ++i) {
            this._parameters.push(process.argv[i]);
        }
    };

    getParameters() {
        return this._parameters;
    };
};

PlurClass.plurify('plur/terminal/Shell', ShellTerminal, [ ITerminal ]);
