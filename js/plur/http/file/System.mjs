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
    constructor(host, paths) {
        super('/', '/');

        this._paths = paths;
    };

    find(dir, pattern) {
        const foundpaths = [];
        const paths = this._paths;

        for (let i = 0; i < paths.length; ++i) {
            if (paths[i].match(pattern)) {
                foundpaths.push(paths[i]);
            }
        }

        const promise = new Promise(function(resolve, reject) {
            resolve(foundpaths);
        });

        return promise;
    };
};

PlurObject.plurify('plur/http/file/System', HttpFileSystem);
