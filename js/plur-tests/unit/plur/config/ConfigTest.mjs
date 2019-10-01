/**
 * @copyright 2019 Asimovian LLC
 * @license MIT https://github.com/asimovian/plur/blob/master/LICENSE.txt
 * @module plur-tests/unit/plur/config/ConfigTest
 */
'use strict';

import PlurObject from '../../../../plur/PlurObject.mjs';
import Test from '../../../../plur/test/Test.mjs';
import IConfigurable from '../../../../plur/config/IConfigurable.mjs';
import Config from '../../../../plur/config/Config.mjs';

/**
 * @tests plur/config/Config
 * @final
 */
export default class ConfigTest extends Test {
    constructor() {
        super();

        // finalize fixtures
        PlurObject.plurify('plur-tests/unit/plur/config/ConfigTest__A', this.fixtures.A, [IConfigurable]);
    };

    /**
     * @tests plur/ConfigTest.constructor
     */
    test_constructor() {
        const a = new this.fixtures.A();
        const configA = new Config(a, { foo: 'bar' });
    };

    fixtures = {
        A: class A {
            static getConfig() {
                if (typeof this._config === 'undefined') {  // lazy load via injection
                    this._config = new Config(this, {
                        foo: 'star'
                    });
                }

                return this._config;
            };

            /** @param {obj} cfg **/
            constructor(cfg) {
                this._cfg = this.constructor.getConfig().merge(cfg).config();
            };


            config() {
                return this._cfg;
            };
        }
    };
};

PlurObject.plurify('plur-tests/unit/plur/ConfigTest', ConfigTest);

