/**
 * @copyright 2019 Asmov LLC
 * @license MIT https://github.com/asmov/plur/blob/master/LICENSE.txt
 * @module plur/file/system/API
 */
'use strict';

import PlurClass from '../../Class.mjs';
import Singleton from '../../design/singleton/ASingleton.mjs';

/**
 *
 */
export default class ApiFileSystem extends Singleton {
    constructor() {
        super();
    };
}

PlurClass.plurify('plur/file/system/API', ApiFileSystem);

const singleton = new ApiFileSystem();
export {singleton};
