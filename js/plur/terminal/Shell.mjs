/**
 * @copyright 2019 Asimovian LLC
 * @license MIT https://github.com/asimovian/plur/blob/master/LICENSE.txt
 * @module plur/user/terminal/Shell
 * @version 0.1.0
 */
'use strict';

import PlurObject from '../PlurObject.mjs';
import ITerminal from './ITerminal.mjs';

/**
 * Represents a means of interacting with a user/client via shell / console.
 *
 * @implements {IPlurified, ITerminal}
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

PlurObject.plurify('plur/user/terminal/Shell', ShellTerminal, [ITerminal]);
