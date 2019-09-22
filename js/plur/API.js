/**
 * @copyright 2019 Asimovian LLC
 * @license MIT https://github.com/asimovian/plur/blob/master/LICENSE.txt
 * @module plur/PlurAPI
 */
'use strict';

import PlurObject from 'plur/PlurObject';

/**
 * Plur Framework API information. Version, debugging, etc.
 *
 * @implements {IPlurified}
 * @final
 */
class API {
    /**
     * Retrieves an API object by name.
     *
     * @param {string} name
     * @returns {API}
     * @throws {Error} If name not found.
     */
    static api(name) {
        if (typeof name === 'undefined') {
            return API.plur;
        } else if (API._apis[name] instanceof API) {
            return API._apis[name];
        }

        throw new Error('Unknown API name: ' + name);
    };

    /**
     * @param {string} name In the format of "<org>/<name>". 24 chars max. alphanumeric and the - char.
     * @param {string} version
     * @param {string} scmUrl
     * @param {string} branch
     * @param {boolean|undefined} debug Enable framework-wide debugging.
     */
    constructor(name, version, scmUrl, branch, debug) {
        PlurObject.constProperty(this, 'name', name);
        PlurObject.constProperty(this, 'version', version);
        PlurObject.constProperty(this, 'scmUrl', scmUrl);
        PlurObject.constProperty(this, 'branch', branch);
        PlurObject.constProperty(this, 'debug', !!debug); // framework-wide debugging, overrides runtime debug

        this._debug = this.debug;
    };

    /**
     * Runtime debugging check and toggle. Framework-wide debugging overrides runtime.
     * @param {boolean=} toggle Enable (true) or (disable) debugging.
     * @returns {boolean} Whether the framework is in debugging mode (true) or not (false).
     */
    debug(toggle) {
        if (this.debug || API.plur.debug) { // framework-wide overrides everything
            return this.debug;
        } else if (typeof toggle === 'boolean') {
            this._debug = toggle;
        }

        return this._debug;
    };
}

PlurObject.plurify('plur/plurAPI', PlurAPI);

/** @type {Array<API>} **/
API._apis = [];

// This will probably be generated at build time in later versions ...
API.plur = new API(
    'plur',
    '0.0.1',
    'git://github.com/asimovian/plur.git',
    'roylaurie/unstable',
    true );

export default API;
