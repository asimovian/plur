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
        PlurObject.plurify('plur-tests/unit/plur/config/ConfigTest__LazyLoadConfigurable', this.fixtures.LazyLoadConfigurable, [IConfigurable]);
        PlurObject.plurify('plur-tests/unit/plur/config/ConfigTest__LazyLoadChildConfigurable', this.fixtures.LazyLoadChildConfigurable, [IConfigurable]);
    };

    /**
     * @tests plur/Config.constructor
     * @tests plur/Config.prototype.getNamepath
     * @tests plur/Config.prototype.config
     */
    test_constructor() {
        const a = new this.fixtures.LazyLoadConfigurable();

        this.assertCatch(()=>{ new Config(a); }, 'Should throw error if cfg not provided');

        const configEmpty = new Config(a, {});
        this.assert( configEmpty.getNamepath() === a.namepath, 'Should be configurable\'s namepath.' );
        this.assert( Object.getOwnPropertyNames(configEmpty.config()).length === 0, 'Should be empty.');

        // use case: for a baseclass
        const configAfoo = new Config(a, this.fixtures.cfgFoo);
        this.assert( configAfoo.getNamepath() === a.namepath, 'Should be configurable\'s namepath.' );
        this.assert( configAfoo.config().foo.bar === this.fixtures.cfgFoo.foo.bar, 'Should mirror provided config.');

        // use case: for a child class with a configurable parent
        /**
         * @implements {IPlurified}
         * @implements {IConfigurable}
         */
        class A {
            /** @override **/
            static getConfig() {
                if (!this.hasOwnProperty('_config')) {  // lazy load via injection
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
        }

        PlurObject.plurify('plur-tests/unit/plur/config/ConfigTest__A', A, [IConfigurable]);

        //A._config = new Config(A, {
        //    foo: 'star'
        //});

        const a2 = new A();

        class AA extends A {
            static getConfig() {
                if (!this.hasOwnProperty('_config')) {  // lazy load via injection
                    this._config = new Config(this, {
                        zip: 'tar'
                    });
                }

                return this._config;
            };

            constructor(cfg) {
               super(cfg);
            };
        }

        const aa = new AA();

        // use case: for a child class without a configurable parent

        // use case: from constructor

        // use case: against object in wild

    };

    /**
     * @tests plur/Config.prototype.merge
     * @tests plur/Config.prototype.getNamepath
     * @tests plur/Config.prototype.config
     */
    test_merge() {
        const a = new this.fixtures.LazyLoadConfigurable();
        const configAfoo = new Config(a, this.fixtures.cfgFoo);

        const configAval = configAfoo.merge(this.fixtures.cfgZip, a);
        this.assert( configAval.getNamepath() === a.namepath, 'Should be configurable\'s namepath.' );
        this.assert( PortableObject.equal(configAval.config(), this.fixtures.cfgFooZip), 'Should match fixture');

        const configAnotherKey = configAfoo.merge(this.fixtures.cfgTar, a);
        this.assert( configAnotherKey.getNamepath() === a.namepath, 'Should be configurable\'s namepath.' );
        this.assert( PortableObject.equal(configAnotherKey.config(), this.fixtures.cfgFooTar), 'Should match fixture');
    };

    fixtures = {
        /**
         * Example of how to build an IConfigurable implementation that lazy loads its static Config.
         * @implements {IPlurified}
         * @implements {IConfigurable}
         */
        LazyLoadConfigurable:
        class {
            /** @property {Config} _config **/
            /** @override **/
            static getConfig() {
                if (!this.hasOwnProperty('_config')) {  // lazy load via injection
                    this._config = new Config(this, {
                        foo: 'bar'
                    });
                }

                return this._config;
            };

            /** @param {obj=} cfg **/
            constructor(cfg) {
                this._cfg = this.constructor.getConfig().merge(cfg);
            };

            /** @override **/
            config() {
                return this._cfg;
            };
        },
        /**
         * Example of how to build an IConfigurable implementation that lazy loads its static Config.
         * @implements {IPlurified}
         * @implements {IConfigurable}
         */
        LazyLoadChildConfigurable:
        class {
            /** @property {Config} _config **/
            /** @override **/
            static getConfig() {
                if (!this.hasOwnProperty('_config')) {  // lazy load via injection
                    this._config = new Config(this, {
                        tar: 'gz'
                    });
                }

                return this._config;
            };

            /** @param {obj=} cfg **/
            constructor(cfg) {
                this._cfg = this.constructor.getConfig().merge(cfg);
            };

            /** @override **/
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

