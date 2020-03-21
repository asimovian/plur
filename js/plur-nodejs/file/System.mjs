/**
 * @copyright 2019 Asmov LLC
 * @license MIT https://github.com/asmov/plur/blob/master/LICENSE.txt
 * @module plur-nodejs/file/System
 */
'use strict';

import fs from 'fs';
import find_files from 'file-regex';
import PlurClass from '../../plur/Class.mjs';
import AFileSystem from '../../plur/file/ASystem.mjs';

/**
 * Represents the underlying File System through Node.JS.
 *
 */
export default class NodeJsFileSystem extends AFileSystem {
    constructor() {
        super('/', fs.realpathSync('../'));
    };

    async find(dir, pattern) {
        if (!pattern.global) {
            pattern = new RegExp(pattern, 'g');
        }

        const promise = new Promise(function(resolve, reject) {
           find_files(dir, pattern, 32)
           .catch(err => { reject(err); })
           .then(value => {
               const filepaths = value.map(i => { return i.dir + '/' + i.file });
               resolve(filepaths);
           });
        });

        return promise;
    };
};

PlurClass.plurify('plur-nodejs/file/System', NodeJsFileSystem);
