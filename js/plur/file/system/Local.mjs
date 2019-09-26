/**
 * @copyright 2019 Asimovian LLC
 * @license MIT https://github.com/asimovian/plur/blob/master/LICENSE.txt
 * @module plur/file/system/Local
 */
'use strict';

import PlurObject from '../../../plur/PlurObject.mjs';
import Singleton from '../../../plur/design/singleton/ASingleton.mjs';
import IFileSystem from '../../../plur/file/ISystem.mjs';

/**
 *
 */
export default class LocalFileSystem extends Singleton {
    constructor() {
        super();
    };
}

PlurObject.plurify('plur/file/system/Local', LocalFileSystem);

const singleton = new LocalFileSystem();
export {singleton};
