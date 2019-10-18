/**
 * @copyright 2019 Asimovian LLC
 * @license MIT https://github.com/asimovian/plur/blob/master/LICENSE.txt
 * @module plur-browser/file/System
 */
'use strict';

import PlurClass from '../../plur/Class.mjs';
import AFileSystem from '../../plur/file/ASystem.mjs';

/**
 * Represents a
 *
 */
export default class BrowserFileSystem extends AFileSystem {
    constructor() {
        super('/', '/');
    };

    glob(pattern) {
        const promise = new Promise(function(resolve, reject) {
            glob(pattern, function(err, files) {
                if (err) {
                    reject(err);
                } else {
                    resolve(files);
                }
            })
        });
    };

};

PlurClass.plurify('plur-browser/file/System', BrowserFileSystem);
