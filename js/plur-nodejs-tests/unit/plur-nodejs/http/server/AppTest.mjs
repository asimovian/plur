/**
 * @copyright 2019 Asimovian LLC
 * @license MIT https://github.com/asimovian/plur/blob/master/LICENSE.txt
 * @module plur-nodejs-tests/unit/plur-nodejs/http/server/AppTest
 */
"use strict";

import http from 'http';
import PlurClass from '../../../../../plur/Class.mjs';
import TestCase from '../../../../../plur/test/Case.mjs';
import HttpServerApp from '../../../../../plur-nodejs/http/server/App.mjs';

/**
 * @tests plur/http/server/App
 * @final
 */
export default class HttpServerAppTest extends TestCase {
    /** @tests plur/http/server/App.constructor **/
    test_constructor() {
    };

    /** @tests HttpServerApp.prototype.start
        @tests HttpServerApp.prototype.stop **/
    async test_start_stop() {
        const self = this;
        const app = new HttpServerApp(null, {
            listenAddress: this.fixtures.listenAddress,
            listenPort: this.fixtures.listenPort,
        });

        return new Promise((resolve, reject) => {
            app.start().then((value) => {
                app.getExpress().get(self.fixtures.getpath, (req, res) => {
                    res.send(self.fixtures.response);
                });

                self._httpGet(this.fixtures.url).then((v) => {
                    self.assertEquals(v, self.fixtures.response);
                    resolve(v);
                }).catch((e) => {
                    reject(e);
                });
            }).catch((err) => {
                reject(err);
            });
        }).then(()=>{
            return app.stop();
        });
    };

    /**
     * @param {string} url
     * @return {Promise}
     */
    _httpGet(url) {
        return new Promise((resolve, reject) => {
            http.get(url, (res) => {
                if (res.statusCode !== 200) {
                    reject(new Error(`HTTP ${res.statusCode}: ` + res.statusMessage));
                }

                res.setEncoding("utf8");
                let rawData = "";
                res.on("data", (chunk) => {
                    rawData += chunk;
                });
                res.on("end", () => {
                    resolve(rawData);
                });
            }).on("error", (e) => {
                reject(e);
            });
        });
    };

    /** @todo ESnext instance class fields**/
    get fixtures() {
        return {
            getpath: "/" + this.namepath,
            response: "ALL OF THESE WORLDS ARE YOURS--EXCEPT EUROPA. ATTEMPT NO LANDING THERE.",
            url: "http://localhost:8081/" + this.namepath,
            listenAddress: "localhost",
            listenPort: "8081",
        };
    }
};

PlurClass.plurify("plur-nodejs-tests/unit/plur-nodejs/http/server/AppTest", HttpServerAppTest);

