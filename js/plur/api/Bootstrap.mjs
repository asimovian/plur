/**
 * @copyright 2019 Asimovian LLC
 * @license MIT https://github.com/asimovian/plur/blob/master/LICENSE.txt
 * @module plur/api/Bootstrap
 */
 'use strict';

import PlurClass from '../../plur/Class.mjs';
import API from '../../plur/api/API.mjs';
import PlurAPI from '../../plur/api/PlurAPI.mjs';
import BUILD_META from '../../plur/build/current/build-meta.mjs';

/**
 * Bootstrap performs the entry point initializations necessary to properly construct and start the plur API.
 * Essentially, this acts as a builder for the API class. Mutators return this, allowing cascading method calls.
 *
 */
export default class Bootstrap {
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

    setOSType(os) {
        this._osType = os;
        return this;
    };

    getOSType() {
        return this._osType;
    };

    boot() {
        if (API.plur !== null) {
            throw new Error("Plur API has already initialized.");
        }

        // This will probably be generated at build time in later versions ...
        const plurApi = new PlurAPI(
            //BUILD_META.name,
            BUILD_META.version,
            BUILD_META.scmUrl,
            BUILD_META.branch,
            this._paths,
            //this._platformType,
            //this._osType,
            //this._browserType,
            true );

        API.api('plur', plurApi);
        API.plur.init();
    };
}

PlurClass.plurify('plur/Bootstrap', Bootstrap);
