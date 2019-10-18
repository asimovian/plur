/**
 * @copyright 2019 Asimovian LLC
 * @license MIT https://github.com/asimovian/plur/blob/master/LICENSE.txt
 * @module plur/test/runner
 */
'use strict';

import PlurClass from '../../plur/Class.mjs';
import {singleton as SystemLog} from '../../plur/log/System.mjs';

/**
 * Imports the test classes specified and runs all valid test methods.
 *
 * @final
 * @implements {IPlurified}
 */
export default class TestRunner {
	constructor(testClassNamepaths) {
        this._log = SystemLog.get();
        this._testClassNamepaths = testClassNamepaths;
    };

    test() {
        const self = this;
        let promise = Promise.resolve();

        for (let i = 0; i < this._testClassNamepaths.length; ++i) {
            const testClass = this._testClassNamepaths[i];
            promise = promise.then(value => {
                return self.testClass(testClass);
            });
        }

        return promise;
    };

    testClass(namepath) {
        const self = this;
        const filepath = '../../' + namepath + '.mjs';

        this._log.info('Testing with ' + namepath + ' ...');

        const promise = import(filepath).then(module => {
            let currentPromise = Promise.resolve();  // the promise for this test case
            const testClass = module.default;
            const properties = Object.getOwnPropertyNames(testClass.prototype);

            // instantiate the test case and set it up
            const testObject = new testClass();
            testObject.setup();

            // run any method that begins with 'test_'.
            for (let i = 0; i < properties.length; ++i) {
                const property = properties[i];
                if (!/^test_/.test(property) || typeof testClass.prototype[property] !== 'function') {
                    continue;
                }

                // run each test method sequentially
                currentPromise = currentPromise.then(value => {
                    return self.testMethod(testObject, property);
                });
            }

            // teardown the test case after all test methods have completed.
            currentPromise.then(()=>{ testObject.teardown(); });

            return currentPromise;
        });

        return promise;
    };

    testMethod(testObject, methodName) {
        const self = this;

        const promise = new Promise(function(resolve, reject) {
            self._log.info('Testing method ' + methodName + '()');

            try {
                const retval = testObject[methodName]();
                if (retval instanceof Promise) {  // then resolve the test asynchronously
                    retval.then(value => { resolve(); }).catch(e => { reject(e); });
                } else {
                    resolve();
                }
            } catch (e) {
                reject(e);
            }
        });

        return promise;
    };
}

PlurClass.plurify('plur/test/Runner', TestRunner);
