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
class PlurAPI {
    /**
     * @param {string} version
     * @param {string} scmUrl
     * @param {string} branch
     * @param {boolean|undefined} debug Enable framework-wide debugging.
     */
    constructor(version, scmUrl, branch, debug) {
        if (typeof PlurAPI.api !== 'undefined') {
            throw new Error('PlurAPI singleton already exists.');
        }

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
        if (this.debug) { // framework-wide overrides everything
            return this.debug;
        } else if (typeof toggle === 'boolean') {
            this._debug = toggle;
        }

        return this._debug;
    };
}

PlurObject.plurify('plur/plurAPI', PlurAPI);

// This will probably be generated at build time in later versions ...
PlurAPI.api = new PlurAPI(
    '0.0.1',
    'git://github.com/asimovian/plur.git',
    'roylaurie/unstable',
    true );

export default PlurAPI;
