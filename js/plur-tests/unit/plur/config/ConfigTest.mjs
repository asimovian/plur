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
    };

    /**
     * @tests plur/Config.constructor
     * @tests plur/Config.prototype.getNamepath
     * @tests plur/Config.prototype.config
     */
    test_constructor() {
        const a = new LazyLoadConfigurable();

        this.assertCatch(()=>{ new Config(a); }, 'Should throw error if cfg not provided');

        const configEmpty = new Config(a, {});
        this.assert( configEmpty.getNamepath() === a.namepath, 'Should be configurable\'s namepath.' );
        this.assert( Object.getOwnPropertyNames(configEmpty.config()).length === 0, 'Should be empty.');

        // use case: for a baseclass
        // use case: from constructor
        const configAfoo = new Config(a, this.fixtures.cfgFoo);
        this.assert( configAfoo.getNamepath() === a.namepath, 'Should be configurable\'s namepath.' );
        this.assert( configAfoo.config().foo.bar === this.fixtures.cfgFoo.foo.bar, 'Cfg in baseclass should match fixture');

        // use case: for a child class with a configurable parent
        // use case: from constructor
        const llchild = new LazyLoadChildConfigurable();
        this.assert( PortableObject.equal(llchild.config(), this.fixtures.cfgLLchild), 'Cfg with parent should match fixture');

        // use case: for a child class without a configurable parent
        // use case: from constructor
        const parentno = new ParentNotConfigurable();
        this.assert( PortableObject.equal(parentno.config(), this.fixtures.cfgParentNo), 'Cfg without parent config should match fixture')

        // use case: for a configurable object being constructed in the wild
        // use case: from constructor
        const b = new LazyLoadChildConfigurable({
            tar: 'zip'
        });

        this.assert( PortableObject.equal(b.config(), this.fixtures.cfgb), 'Cfg being constructed should match fixture');
    };

    /**
     * @tests plur/Config.prototype.merge
     * @tests plur/Config.prototype.getNamepath
     * @tests plur/Config.prototype.config
     */
    test_merge() {
        const a = new LazyLoadConfigurable();
        const configAfoo = new Config(a, this.fixtures.cfgFoo);

        const configAval = configAfoo.merge(this.fixtures.cfgZip, a);
        this.assert( configAval.getNamepath() === a.namepath, 'Should be configurable\'s namepath.' );
        this.assert( PortableObject.equal(configAval.config(), this.fixtures.cfgFooZip), 'Should match fixture');

        const configAnotherKey = configAfoo.merge(this.fixtures.cfgTar, a);
        this.assert( configAnotherKey.getNamepath() === a.namepath, 'Should be configurable\'s namepath.' );
        this.assert( PortableObject.equal(configAnotherKey.config(), this.fixtures.cfgFooTar), 'Should match fixture');
    };

    /** @todo ESnext instance class fields**/
    get fixtures() { return {
        cfgLLchild: {
            foo: 'bar',
            tar: 'gz'
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
        },
        cfgParentNo: {
            'sing': 'song'
        },
        cfgb: {
            foo: 'bar',
            tar: 'zip'
        },
    }; }
};

PlurObject.plurify('plur-tests/unit/plur/ConfigTest', ConfigTest);

/**
 * Example of how to build an IConfigurable implementation that lazy loads its static Config.
 * @implements {IPlurified}
 * @implements {IConfigurable}
 */
class LazyLoadConfigurable {
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
        // use this construction pattern in base classes. child classes just pass their cfg to super.
        this._cfg = this.constructor.getConfig().merge(cfg);
    };

    /** @override **/
    config() {
        return this._cfg;
    };
}

PlurObject.plurify('plur-tests/unit/plur/config/ConfigTest__LazyLoadConfigurable', LazyLoadConfigurable, [IConfigurable]);

/**
 * Example of how to build an IConfigurable child class implementation that lazy loads its static Config merged from
 * its parent.
 * @implements {IPlurified}
 * @implements {IConfigurable}
 */
class LazyLoadChildConfigurable extends LazyLoadConfigurable {
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
        super(cfg);
    };
}

PlurObject.plurify('plur-tests/unit/plur/config/ConfigTest__LazyLoadChildConfigurable', LazyLoadChildConfigurable, [IConfigurable]);

class NotConfigurable {};

class ParentNotConfigurable extends NotConfigurable {
    /** @property {Config} _config **/
    /** @override **/
    static getConfig() {
        if (!this.hasOwnProperty('_config')) {  // lazy load via injection
            this._config = new Config(this, {
                sing: 'song'
            });
        }

        return this._config;
    };

    /** @param {obj=} cfg **/
    constructor(cfg) {
        super();

        this._cfg = this.constructor.getConfig().merge(cfg);
    };

    /** @override **/
    config() {
        return this._cfg;
    };
}

PlurObject.plurify('plur-tests/unit/plur/config/ConfigTest__ParentNotConfigurable', ParentNotConfigurable, [IConfigurable]);

