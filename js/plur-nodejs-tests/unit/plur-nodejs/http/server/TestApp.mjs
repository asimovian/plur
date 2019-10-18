/**
 * @copyright 2019 Asimovian LLC
 * @license MIT https://github.com/asimovian/plur/blob/master/LICENSE.txt
 * @module plur-nodejs-tests/unit/plur-nodejs/http/server/TestApp
 */
'use strict';

import fs from 'fs';
import PlurObject from '../../../../../plur/Class.mjs';
import HttpServerApp from '../../../../../plur-nodejs/http/server/App.mjs';
import Config from '../../../../../plur/config/Config.mjs';

export default class HttpServerTestApp extends HttpServerApp {
  start() {
    const self = this;
    return super.start().then(() => {
      const getcfg = self.config().get;
      for (const key in getcfg) {
        const path = key;
        const output = getcfg[key];
        self.getExpress().get(path, (req, res) => {
          res.send(output);
        });
      }
    });
  };
}

PlurObject.plurify('plur-nodejs-tests/unit/plur-nodejs/http/server/TestApp', HttpServerTestApp);

/**
 * @typedef {Object} HttpServerTestAppCfg plur-nodejs/http/server/TestAppCfg
 *
 * @type {Config<HttpServerTestAppCfg>}
 */
HttpServerTestApp.DEFAULT_CONFIG = new Config(HttpServerTestApp, /** @type {HttpServerTestAppCfg} **/ {
  /** @type {obj<string path,string output>} **/
  get: {
    '/tar/gz': 'gzip',
    '/tar/xz': 'lzma',
    '/tar': 'tape',
    '/': fs.readFileSync('js/plur-browser-tests/unit/plur-browser/api/bootstrap/browserTest.html').toString(),
  },
});
