/**
 * @copyright 2019 Asimovian LLC
 * @license MIT https://github.com/asimovian/plur/blob/master/LICENSE.txt
 * @module plur/http/server/App
 */
'use strict';

import express from 'express';
import PlurObject from '../../../plur/PlurObject.mjs';
import API from '../../../plur/api/API.mjs';
import IConfigurable from '../../../plur/config/IConfigurable.mjs';
import Config from '../../../plur/config/Config.mjs';
import IApplication from '../../../plur/app/IApplication.mjs';
import HttpServerApp from '../../../plur/http/server/App.mjs';
import ITerminal from '../../../plur/terminal/ITerminal.mjs';
import Tester from '../../../plur/test/Tester.mjs';
import { singleton as ApiFileSystem } from '../../../plur/file/system/API.mjs';
import { singleton as SystemLog } from '../../../plur/log/System.mjs';

/**
 * @implements {IPlurified}
 * @implements {IApplication}
 * @implements {IConfigurable}
 */
export default class GenericHttpServerApp extends HttpServerApp {
    /**
     * @override
     * @returns {!Config}
     */
    static getConfig() {
        return GenericHttpServerApp.DEFAULT_CONFIG;
    };

    /**
     * @param {!ITerminal} terminal
     * @param {!config=} config
     */
    constructor(terminal, config) {
        super(terminal, config)

        this._apps = [];
    };

    /**
     * @override
     */
    async start() {
        const self = this;
        const promise = super.start().then(() => {
            const promises = [];

            for (let i = 0; i < self._config.apps.length; ++i) {
                let promise = self._importClass(self._config.apps[i].namepath, self._config.apps[i].config);
                promises.push(promise);
            }

            return Promise.all(promises);
        });

        return promise;
    };

    async _importClass(namepath) {
        const self = this;

        const promise = import(namepath).then(module => {
            const appClass = module.default;
            if (!(appClass instanceof HttpServerApp)) {
                throw new Error('Specified HTTP app ' + namepath + ' is not instanceof HttpServerApp');
            }

            self._app = new appClass(self);
            return self._app.start();
        });

        return promise;
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
