/**
 * @copyright 2019 Asimovian LLC
 * @license MIT https://github.com/asimovian/plur/blob/master/LICENSE.txt
 * @module plur-nodejs-tests/unit/plur-nodejs/http/server/GenericAppTest
 */
'use strict';

import http from 'http';
import PlurClass from '../../../../../plur/Class.mjs';
import Test from '../../../../../plur/test/Test.mjs';
import GenericHttpServerApp from '../../../../../plur-nodejs/http/server/GenericApp.mjs';
import HttpServerTestApp from '../../../../../plur-nodejs-tests/unit/plur-nodejs/http/server/TestApp.mjs';

/**
 * @tests plur-nodejs/http/server/GenericApp
 * @final
 */
export default class GenericHttpAppTest extends Test {
    /**
     * @tests plur-nodejs/http/server/GenericApp.constructor
     */
    test_constructor() {
    };

    /**
     * @tests plur-nodejs/http/server/GenericApp.prototype.start
     * @tests plur-nodejs/http/server/GenericApp.prototype.stop
     **/
    async test_start_stop() {
        const self = this;
        const app = new GenericHttpServerApp(null, {
            listenAddress: this.fixtures.listenAddress,
            listenPort: this.fixtures.listenPort,
            httpApps: ['plur-nodejs-tests/unit/plur-nodejs/http/server/TestApp']
        });

        return new Promise((resolve, reject) => {
            app.start().then(value => {
                const getcfg = HttpServerTestApp.getConfig().config().get;
                for (const key in getcfg) {
                    self._httpGet(this.fixtures.url + key).then(v => {
                        self.assertEquals(v, getcfg[key]);
                        resolve(v);
                    }).catch(e => {
                        reject(e);
                    });
                }
            }).catch(err => {
                reject(err);
            });
        }).then(()=>{
            return app.stop();
        });
    };

    _httpGet(url) {
        return new Promise((resolve, reject) => {
            http.get(url, res => {
                if (res.statusCode !== 200) {
                    reject(new Error(`HTTP ${res.statusCode}: ` + res.statusMessage));
                }

                res.setEncoding('utf8');
                let rawData = '';
                res.on('data', chunk => { rawData += chunk; });
                res.on('end', () => {
                    resolve(rawData);
                });
            }).on('error', e => {
                reject(e);
            });
        });
    };

    /** @todo ESnext instance class fields **/
    get fixtures() { return {
        listenAddress: 'localhost',
        listenPort: 8082,
        url: 'http://localhost:8082/'
    }; };
}

PlurClass.plurify('plur-nodejs-tests/unit/plur-nodejs/http/server/GenericAppTest', GenericHttpAppTest);
