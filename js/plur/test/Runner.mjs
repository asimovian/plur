/**
 * @copyright 2019 Asmov LLC
 * @license MIT https://github.com/asmov/plur/blob/master/LICENSE.txt
 * @module plur/test/Runner
 */
'use strict';

import PlurClass from '../../plur/Class.mjs';
import Emitter from '../../plur/event/Emitter.mjs';
import {singleton as SystemLog} from '../../plur/log/System.mjs';

/**
 * Imports the test classes specified and runs all valid test methods.
 *
 * @final
 * @implements {IPlurified}
 */
export default class TestRunner {
	constructor(testClassNamepaths) {
        this._TOPIC = this.namepath + '.';
        this._RESULT_TOPIC = this.namepath + '.result';
        this._emitter = new Emitter();
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
        const filepath = '../../' + namepath + '.mjs';  //@todo use filesystem class

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

    /**
     * Fires an event to the test case emitter.
     *
     * @param {String} subtopic
     * @param {obj} data
     */
    _emit(subtopic, data) {
        this._emitter.emit(this._TOPIC + subtopic, data);
    };

    /**
     * Fires a test case result event to the emitter. Conforms to xUnit XML result format.
     *
     * @param {String} methodName The test method name.
     * @param {String} outcome 'Pass', 'Fail', 'Skip'
     * @param {number} time Elapsed time in milliseconds.
     */
    _emitResult(methodName, outcome, time) {
        // @todo this._emitter.emit(this._RESULT_TOPIC, new Result(methodName, outcome, time).model());
        this._emitter.emit(this._RESULT_TOPIC, {
            name: methodName.substr(5), // remove the prefixed test_
            type: this.namepath,
            method: methodName,
            time: time,
            result: outcome
        });
    };
}

PlurClass.plurify('plur/test/Runner', TestRunner);
