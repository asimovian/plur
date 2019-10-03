/**
 * @copyright 2019 Asimovian LLC
 * @license MIT https://github.com/asimovian/plur/blob/master/LICENSE.txt
 * @module plur-tests/unit/plur/http/server/AppTest
 */
'use strict';

import http from 'http';
import PlurObject from '../../../../../plur/PlurObject.mjs';
import Test from '../../../../../plur/test/Test.mjs';
import HttpServerApp from '../../../../../plur/http/server/App.mjs';

/**
 * @tests plur/http/server/App
 * @final
 */
export default class HttpServerAppTest extends Test {
    constructor() {
        super();
    };

    /** @tests plur/http/server/App.constructor **/
    test_constructor() {
    };

    /** @tests HttpServerApp.prototype.start
        @tests HttpServerApp.prototype.stop **/
    async test_start_stop() {
        const self = this;
        const app = new HttpServerApp(null, {});

        const promise = new Promise((resolve, reject) => {
            app.start().then(value => {
                app.getExpress().get(self.fixtures.getpath, (req, res) => {
                    res.send(self.fixtures.response)
                });

                self._httpGet(this.fixtures.url).then(v => {
                    self.assertEquals(v, self.fixtures.response);
                    resolve(v);
                }).catch(e => { reject(e); });
            }).catch(err => {
                reject(err);
            });
        }).then(()=>{
            return app.stop();
        });

        return promise;
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

    /** @todo ESnext instance class fields**/
    get fixtures() { return {
        getpath: '/' + this.namepath,
        response: 'ALL OF THESE WORLDS ARE YOURS--EXCEPT EUROPA. ATTEMPT NO LANDING THERE.',
        url: 'http://localhost:8080/' + this.namepath
    }; }
};

PlurObject.plurify('plur-tests/unit/plur/http/server/AppTest', HttpServerAppTest);

