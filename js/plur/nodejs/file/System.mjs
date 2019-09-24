/**
 * @copyright 2019 Asimovian LLC
 * @license MIT https://github.com/asimovian/plur/blob/master/LICENSE.txt
 * @module plur/nodejs/file/System
 */
'use strict';

import fs from 'fs';

import PlurObject from '../../../plur/PlurObject.mjs';
import FileSystem from '../../../plur/file/System.mjs';

/**
 * Represents the underlying File System through Node.JS.
 *
 */
export default class NodeJsFileSystem extends FileSystem {
    constructor() {
        super('/', fs.realpathSync('../'));
    };
};

PlurObject.plurify('plur/nodejs/file/System', NodeJsFileSystem);
