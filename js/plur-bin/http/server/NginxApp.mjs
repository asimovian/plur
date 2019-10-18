/**
 * @copyright 2019 Asimovian LLC
 * @license MIT https://github.com/asimovian/plur/blob/master/LICENSE.txt
 * @module plur-bin/http/server/NginxApp
 */
'use strict';

import fs from 'fs';
import PlurClass from '../../../plur/Class.mjs';
import HttpServerApp from '../../../plur-nodejs/http/server/App.mjs';
import Config from '../../../plur/config/Config.mjs';

export default class NginxHttpServerApp extends HttpServerApp {
    start() {
        const self = this;
        return super.start().then(() => {
            const getcfg = self.config().get;
            for (const key in getcfg) {
                const path = key;
                const output = getcfg[key];
                self.getExpress().get(path, (req,res) => { res.send(output); });
            }
        });
    };
}

PlurClass.plurify('plur-bin/http/server/NginxApp', NginxHttpServerApp);

/**
 * @typedef {Object} NginxHttpServerAppCfg plur-bin/http/server/NginxAppCfg
 *
 * @type {Config<NginxHttpServerAppCfg>}
 */
NginxHttpServerApp.DEFAULT_CONFIG = new Config(NginxHttpServerApp, /** @type {NginxHttpServerAppCfg} **/ {
    /** @type {obj<string path,string output>} **/
    get: {
        '/': fs.readFileSync('js/plur-browser-tests/unit/plur-browser/api/bootstrap/browserTest.html').toString()
    }
});
