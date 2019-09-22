/**
 * @copyright 2019 Asimovian LLC
 * @license MIT https://github.com/asimovian/plur/blob/master/LICENSE.txt
 * @module plur/api/Bootstrap
 */
 'use strict';

import PlurObject from '../../plur/PlurObject';
import API from '../../plur/API';

/**
 * Bootstrap
 *
 * @abstract
 */
class Bootstrap {
    constructor(apiName, platformType) {
        this._apiName = apiName;
        this._platformType = platformType;
        this._paths = {};
    };

    /**
     * @param {string} modulePrefix
     * @param {string} basePath
     */
    importPath(modulePrefix, basePath) {
        this._paths[modulePrefix] = basePath;
    };

    /**
     * @param {string} basePath
     */
    importPaths(modulePrefixToPathMap) {
        this._paths = modulePrefixToPathMap; // todo: append
    };

    /**
     * @returns {{string,string}}
     */
    getImportPaths() {
        return this._paths;
    };

    getPlatformType() {
        return this._platformType;
    };

    init: function() {
        API.get(this._apiName).bootstrap(this);
    };
}

PlurObject.plurify('plur/Bootstrap', Bootstrap);


export default Bootstrap;
