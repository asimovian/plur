/**
 * @copyright 2019 Asimovian LLC
 * @license MIT https://github.com/asimovian/plur/blob/master/LICENSE.txt
 * @module plur/api/Bootstrap
 */
 'use strict';

import PlurObject from '../../plur/PlurObject';
import API from "../../plur/API";
import BUILD_META from "../../plur/api/build.meta";

/**
 * Bootstrap performs the entry point initializations necessary to properly construct and start the plur API.
 * Essentially, this acts as a builder for the API class. Mutators return this, allowing cascading method calls.
 */
class Bootstrap {
    constructor() {
        this._platformType = null;
        this._osType = null;
        this._browserType = null;
        this._paths = {};
    };

    /**
     * @param {string} basePath
     */
    importPath(modulePrefixToPathMap) {
        this._paths = modulePrefixToPathMap; // todo: append
        return this;
    };

    /**
     * @returns {{string,string}}
     */
    getImportPaths() {
        return this._paths;
    };

    setPlatformType(platform) {
        this._platformType = platform;
        return this;
    };

    getPlatformType() {
        return this._platformType;
    };

    boot() {
        if (typeof API.plur !== 'undefined') {
            throw new Error("Plur API has already initialized.");
        }

        // This will probably be generated at build time in later versions ...
        API.plur = new API(
            BUILD_META.name,
            BUILD_META.version,
            BUILD_META.scmUrl,
            BUILD_META.branch,
            this._platformType,
            this._osType,
            this._browserType,
            true );

        API.plur.init();
    };
}

PlurObject.plurify('plur/Bootstrap', Bootstrap);

export default Bootstrap;
