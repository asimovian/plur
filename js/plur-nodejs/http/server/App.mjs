/**
 * @copyright 2019 Asmov LLC
 * @license MIT https://github.com/asmov/plur/blob/master/LICENSE.txt
 * @module plur-nodejs/http/server/App
 */
'use strict';

import express from 'express';
import PlurClass from '../../../plur/Class.mjs';
import IConfigurable from '../../../plur/config/IConfigurable.mjs';
import Config from '../../../plur/config/Config.mjs';
import IApplication from '../../../plur/app/IApplication.mjs';
import ITerminal from '../../../plur/terminal/ITerminal.mjs';
import { singleton as SystemLog } from '../../../plur/log/System.mjs';

/**
 * @implements {IPlurified}
 * @implements {IApplication}
 * @implements {IConfigurable}
 */
export default class HttpServerApp {
    /**
     * @override
     * @returns {!Config}
     */
    static getConfig() {
        return this.DEFAULT_CONFIG;
    };

    /**
     * @param {!ITerminal} terminal
     * @param {!obj=} cfg
     */
    constructor(terminal, cfg) {
        this._cfg = this.constructor.getConfig().merge(cfg);
        this._terminal = terminal;
        this._listenAddress = this._cfg.listenAddress;
        this._listenPort = this._cfg.listenPort;

        if (this._terminal instanceof HttpServerApp) {
            this._httpd = this._terminal.getExpress();
        } else {
            this._httpd = express();
        }
    };

    /**
     * @override
     * @returns {Promise}
     */
    async start() {
        if (this._terminal instanceof HttpServerApp) {
            return Promise.resolve();
        }

        const self = this;

        return new Promise(function(resolve, reject) {
            try {
                self._httpd.listen(self._listenPort, self._listenAddress, ()=>{ resolve(); });
            } catch(e) {
                reject(e);
            }
        });
    };

    /**
     * @override
     * @param {number=} exitCode
     * @returns {Promise}
     */
    async stop(exitCode) {
        if (!(this._terminal instanceof HttpServerApp)) {
            this._httpd = null; // gc
        }

        return Promise.resolve();
    };

    /**
     * @override
     * @returns {boolean}
     */
    heartbeat() {
        return true;
    };

    /**
     * @override
     * @returns {obj}
     */
    config() {
        return this._cfg;
    };

    getExpress() {
        return this._httpd;
    };
}

PlurClass.plurify('plur-nodejs/http/server/App', HttpServerApp, [IApplication, IConfigurable]);

/**
 * @typedef {Object} HttpServerAppCfg plur/http/server/AppCfg
 * @property {string} listenAddress '127.0.0.1'
 * @property {number} listenPort 8080
 *
 * @type {Config<GenericHttpServerAppCfg>}
 */
HttpServerApp.DEFAULT_CONFIG = new Config(HttpServerApp, /** @type {HttpServerAppCfg} **/ {
    listenAddress: '127.0.0.1',
    listenPort: 8080
});

