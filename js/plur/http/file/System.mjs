/**
 * @copyright 2019 Asimovian LLC
 * @license MIT https://github.com/asimovian/plur/blob/master/LICENSE.txt
 * @module plur/http/file/System
 */
'use strict';

import PlurObject from '../../../plur/PlurObject.mjs';
import AFileSystem from '../../../plur/file/ASystem.mjs';

/**
 * Represents the underlying File System through Node.JS.
 *
 */
export default class HttpFileSystem extends AFileSystem {
    constructor(paths) {
        super('/', '/');

        this._paths = paths;
    };

    find(glob, pattern) {
        const promise = new Promise(function(resolve, reject) {
            resolve(this._paths.map(i => { if (i.matches(pattern)) { return i; } }));
        });

        return promise;
    };
};

PlurObject.plurify('plur/http/file/System', HttpFileSystem);
