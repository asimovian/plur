/**
 * @copyright 2019 Asimovian LLC
 * @license MIT https://github.com/asimovian/plur/blob/master/LICENSE.txt
 * @module plur/browser/file/System
 */
'use strict';

import PlurObject from '../../../plur/PlurObject.mjs';
import AFileSystem from '../../../plur/file/ASystem.mjs';

/**
 * Represents a
 *
 */
export default class NodeJsFileSystem extends AFileSystem {
    constructor() {
        super('/', fs.realpathSync('../'));
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

PlurObject.plurify('plur/nodejs/file/System', NodeJsFileSystem);
