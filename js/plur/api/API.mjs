/**
 * @copyright 2019 Asmov LLC
 * @license MIT https://github.com/asmov/plur/blob/master/LICENSE.txt
 * @module plur/api/API
 */
'use strict';

import PlurClass from '../../plur/Class.mjs';

/**
 * Plur Framework API information. Version, debugging, etc.
 *
 * @implements {IPlurified}
 */
export default class API {
    /**
     * Retrieves an API object by name. Without parameters, retrieves plur. With an API object, registers the API.
     *
     * @param {string=} name
     * @param {!API=} api
     * @returns {!API}
     * @throws {Error} If name not found or unable to register.
     */
    static api(name, api) {
        if (typeof name === 'undefined') { // no parameters: retrieve plur
            return API.plur;
        } else if (api instanceof API) { // if api provided: attempt to register
            if (API._apis[name] instanceof API) {
                throw Error('API ' + name + ' is already registered.');
            }

            API._apis[name] = api;
            if (name === 'plur') { // plur gets its own public static member variable
                API.plur = api;
            }

            return api;
        } else if (API._apis[name] instanceof API) { // return the specified api
            return API._apis[name];
        }

        throw new Error('Unknown API name: ' + name);
    };

    /**
     * @param {string} name In the format of "<org>/<name>". 24 chars max. alphanumeric and the - char.
     * @param {string} version
     * @param {string} scmUrl
     * @param {string} branch
     * @param {Object<string,string>} importPathMap
     * @param {boolean=} debug Enable framework-wide debugging.
     */
    constructor(name, version, scmUrl, branch, importPathMap, debug) {
        PlurClass.constProperty(this, 'name', name);
        PlurClass.constProperty(this, 'version', version);
        PlurClass.constProperty(this, 'scmUrl', scmUrl);
        PlurClass.constProperty(this, 'branch', branch);

        this._debug = !!debug;
        this._importPathMap = importPathMap || {};
    };

    /**
     * Runtime debugging check and toggle. Framework-wide debugging overrides runtime.
     * @param {boolean=} toggle Enable (true) or (disable) debugging.
     * @returns {boolean} Whether the framework is in debugging mode (true) or not (false).
     */
    debug(toggle) {
        if (typeof toggle === 'boolean') {
            this._debug = toggle;
        }

        return this._debug;
    };

    getImportPaths() {
        return PlurClass.values(this._importPathMap);
    };

    getImportPathMap() {
        return this._importPathMap;
    };

    init() {

    };
}

PlurClass.plurify('plur/api/API', API);

API.PlatformType = {
    NodeJS: 'nodejs',
    Browser: 'browser',
    Other: 'other'
};

API.OSType = {
    Linux: 'linux',
    OSX: 'osx',
    Windows: 'windows',
    Other: 'other'
};

API.BrowserType = {
    Chrome: 'chrome',
    Safari: 'safari',
    Edge: 'edge',
    Other: 'other'
};

/** @type {Array<API>} **/
API._apis = [];
/** @type {API} **/
API.plur = null;
