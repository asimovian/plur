/**
 * @copyright 2019 Asimovian LLC
 * @license MIT https://github.com/asimovian/plur/blob/master/LICENSE.txt
 * @module plur-bin/http/server/GenericApp
 */
'use strict';

import PlurObject from '../../../plur/Class.mjs';
import IConfigurable from '../../../plur/config/IConfigurable.mjs';
import Config from '../../../plur/config/Config.mjs';
import HttpServerApp from '../../../plur-nodejs/http/server/App.mjs';

/**
 * @final
 */
export default class GenericHttpServerApp extends HttpServerApp {
    /**
     * @override
     */
    async start() {
        const self = this;
        return super.start().then(() => {
            const promises = [];

            for (let i = 0; i < self.config().httpApps.length; ++i) {
                const promise = self._importClass(self.config().httpApps[i]);
                promises.push(promise);
            }

            return Promise.all(promises);
        });
    };

    /**
     * @param {string} namepath
     * @returns {Promise}
     */
    async _importClass(namepath) {
        const self = this;
        const relpath = '../../../';

        return import(relpath + namepath + '.mjs').then(module => {
            const appClass = module.default;
            if (!(Object.getPrototypeOf(appClass.prototype).constructor === HttpServerApp)) {
                throw new Error(`Specified HTTP app '${namepath}' is not instanceof HttpServerApp`);
            }

            self._app = new appClass(self);
            return self._app.start();
        });
    };
}

PlurObject.plurify('plur-bin/http/server/GenericApp', GenericHttpServerApp, [IConfigurable]);

/**
 * @typedef {Object} GenericHttpServerAppCfg plur-bin/http/server/GenericAppCfg
 * @property {Array<HttpServerAppCfg>} httpApps
 *
 * @type {Config<GenericHttpServerAppCfg>}
 */
GenericHttpServerApp.DEFAULT_CONFIG = new Config(GenericHttpServerApp, /** @type {GenericHttpServerAppCfg} **/ {
    // Connection properties will be ignored for the http apps.
    httpApps: [
    ]
});

