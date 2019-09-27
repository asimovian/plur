/**
 * @copyright 2019 Asimovian LLC
 * @license MIT https://github.com/asimovian/plur/blob/master/LICENSE.txt
 * @module plur/http/server/App
 */
'use strict';

import express from 'express';
import PlurObject from '../../../plur/PlurObject.mjs';
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
        return HttpServerApp.DEFAULT_CONFIG;
    };

    /**
     * @param {!ITerminal} terminal
     * @param {!config=} config
     */
    constructor(terminal, config) {
        this._terminal = terminal;
        this._config = HttpServerApp.getConfig().merge(config).config();
        this._listenAddress = this._config.listenAddress;
        this._listenPort = this._config.listenPort;

        if (this._terminal instanceof HttpServerApp) {
            this._httpd = this._terminal.getExpress();
        } else {
            this._httpd = express.express();
        }
    };

    /**
     * @override
     */
    async start() {
        // initial message ... the blinkies
        SystemLog.get().info('(-(-_-(-_(-_(-_-)_-)-_-)_-)_-)-)');

        return new Promise(function(resolve, reject) {
            this._httpd.listen(this._listenPort, this._listenAddress, ()=>{ resolve(); });
        });
    };

    /**
     * @override
     * @param success
     */
    async stop(success) {
        if (!(this._terminal instanceof HttpServerApp)) {
            this._httpd.close();
            this._httpd = null; // gc

            process.exit(success ? 0 : 1);
        }
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
     *
     */
    config() {
        return this._config;
    };

    getExpress() {
        return this._httpd;
    };
}

HttpServerApp.DEFAULT_CONFIG = new Config(HttpServerApp, {
    listenAddress: '127.0.0.1',
    listenPort: 8080
});

PlurObject.plurify('plur/http/server/App', HttpServerApp, [IApplication, IConfigurable]);

