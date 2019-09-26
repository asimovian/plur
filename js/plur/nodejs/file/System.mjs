/**
 * @copyright 2019 Asimovian LLC
 * @license MIT https://github.com/asimovian/plur/blob/master/LICENSE.txt
 * @module plur/nodejs/file/System
 */
'use strict';

import fs from 'fs';
import glob from 'glob';
import PlurObject from '../../../plur/PlurObject.mjs';
import AFileSystem from '../../../plur/file/ASystem.mjs';

/**
 * Represents the underlying File System through Node.JS.
 *
 */
export default class NodeJsFileSystem extends AFileSystem {
    constructor() {
        super('/', fs.realpathSync('../'));
    };

    find(pattern) {
        const promise = new Promise(function(resolve, reject) {
            glob(pattern, function(err, files) {
                if (err) {
                    reject(err);
                } else {
                    resolve(files);
                }
            })
        });

        return promise;
    };
};

PlurObject.plurify('plur/nodejs/file/System', NodeJsFileSystem);
