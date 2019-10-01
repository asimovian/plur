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

        this.assertCatch(()=>{ new Config(a); }, 'Should throw error if cfg not provided');

        const configEmpty = new Config(a, {});
        this.assert( configEmpty.getNamepath() === a.namepath, 'Should be configurable\'s namepath.' );
        this.assert( Object.getOwnPropertyNames(configEmpty.config()).length === 0, 'Should be empty.');

        const configAfoo = new Config(a, this.fixtures.cfgFoo);
        this.assert( configAfoo.getNamepath() === a.namepath, 'Should be configurable\'s namepath.' );
        this.assert( configAfoo.config().foo.bar === this.fixtures.cfgFoo.foo.bar, 'Should mirror provided config.');
    };

    test_merge() {
        const a = new this.fixtures.A();
        const configAfoo = new Config(a, this.fixtures.cfgFoo);

        const configAnewKey = configAfoo.merge(this.fixtures.cfgZip, a);
        this.assert( configAnewKey.getNamepath() === a.namepath, 'Should be configurable\'s namepath.' );
        this.assert( configAnewKey.config().foo.bar === this.fixtures.cfgFoo.foo.bar, 'Should include original config.');
        this.assert( configAnewKey.config().zip.tar === this.fixtures.cfgZip.zip.tar, 'Should include new config.');

        const configAnotherKey = configAfoo.merge(this.fixtures.cfgFooTar, a);
        this.assert( configAnotherKey.getNamepath() === a.namepath, 'Should be configurable\'s namepath.' );
        console.log(configAnotherKey);
        this.assert( configAnotherKey.config().foo.bar === this.fixtures.cfgFoo.foo.bar, 'Should include original config.');
        this.assert( configAnotherKey.config().foo.tar === this.fixtures.cfgFoo.foo.tar, 'Should include new config.');
    };

    fixtures = {
        /** @implements {IConfigurable} **/
        A: class A {
            static getConfig() {
                if (typeof this._config === 'undefined') {  // lazy load via injection
                    this._config = new Config(this, {
                        foo: 'star'
                    });
                }

                return this._config;
            };

            /** @param {obj=} cfg **/
            constructor(cfg) {
                this._cfg = this.constructor.getConfig().merge(cfg);
            };


            config() {
                return this._cfg;
            };
        },
        cfgFoo: {
           'foo': {
               'bar': 'text'
           }
        },
        cfgFooTar: {
            'foo': {
                'tar': true
            }
        },
        cfgZip: {
            'zip': {
                'tar': 33
            }
        },
    };
};

PlurObject.plurify('plur-tests/unit/plur/ConfigTest', ConfigTest);

