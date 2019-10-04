/**
 * @copyright 2019 Asimovian LLC
 * @license MIT https://github.com/asimovian/plur/blob/master/LICENSE.txt
 * @module plur-nodejs/file/System
 */
'use strict';

import fs from 'fs';
import find_files from 'file-regex';
import PlurObject from '../../plur/PlurObject.mjs';
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

PlurObject.plurify('plur-nodejs/file/System', NodeJsFileSystem);
