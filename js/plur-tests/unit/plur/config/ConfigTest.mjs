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
import PortableObject from '../../../../plur/PortableObject.mjs';

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
     * @tests plur/Config.constructor
     * @tests plur/Config.prototype.getNamepath
     * @tests plur/Config.prototype.config
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

    /**
     * @tests plur/Config.prototype.merge
     * @tests plur/Config.prototype.getNamepath
     * @tests plur/Config.prototype.config
     */
    test_merge() {
        const a = new this.fixtures.A();
        const configAfoo = new Config(a, this.fixtures.cfgFoo);

        const configAval = configAfoo.merge(this.fixtures.cfgZip, a);
        this.assert( configAval.getNamepath() === a.namepath, 'Should be configurable\'s namepath.' );
        this.assert( PortableObject.equal(configAval.config(), this.fixtures.cfgFooZip), 'Should match fixture');

        const configAnotherKey = configAfoo.merge(this.fixtures.cfgTar, a);
        this.assert( configAnotherKey.getNamepath() === a.namepath, 'Should be configurable\'s namepath.' );
        this.assert( PortableObject.equal(configAnotherKey.config(), this.fixtures.cfgFooTar), 'Should match fixture');
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
        cfgTar: {
            'foo': {
                'tar': 10
            }
        },
        cfgFooTar: {
            'foo': {
                'bar': 'text'
            }
        },
        cfgZip: {
            'foo': {
                'bar': 'zip'
            },
        },
        cfgFooZip: {
            'foo': {
                'bar': 'zip'
            }
        }
    };
};

PlurObject.plurify('plur-tests/unit/plur/ConfigTest', ConfigTest);

