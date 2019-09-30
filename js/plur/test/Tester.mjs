/**
 * @copyright 2019 Asimovian LLC
 * @license MIT https://github.com/asimovian/plur/blob/master/LICENSE.txt
 * @module plur/test/Tester
 */
'use strict';

import PlurObject from '../../plur/PlurObject.mjs';
import {singleton as SystemLog} from '../../plur/log/System.mjs';

/**
 * Imports the test classes specified and runs all valid test methods.
 *
 * @final
 */
export default class Tester {
	constructor(testTargets) {
        this._log = SystemLog.get();
        this._testClasses = testTargets;
    };

    test() {
        const self = this;
        let promise = Promise.resolve();

        for (let i = 0; i < this._testClasses.length; ++i) {
            const testClass = this._testClasses[i];
            promise = promise.then(value => {
                promise = self.testClass(testClass);
                return promise;
            });
        }

        return promise;
    };

    testClass(namepath) {
        const self = this;
        const filepath = '../../' + namepath + '.mjs';

        this._log.info('Testing with ' + namepath + ' ...');

        const promise = import(filepath).then(module => {
            const testClass = module.default;
            const properties = Object.getOwnPropertyNames(testClass.prototype);
            const methodTestPromises = [];

            for (let i = 0; i < properties.length; ++i) {
                const property = properties[i];
                if (!/^test_/.test(property) || typeof testClass.prototype[property] !== 'function') {
                    continue;
                }


                const testObject = new testClass();
                const methodTestPromise = self.testMethod(testObject, property);
                methodTestPromises.push(methodTestPromise);
            }

            return Promise.all(methodTestPromises);
        });

        return promise;
    };

    testMethod(testObject, methodName) {
        const self = this;

        const promise = new Promise(function(resolve, reject) {
            self._log.info('Testing method ' + methodName + '()');

            try {
                testObject[methodName]();
                resolve();
            } catch (e) {
                reject(e);
            }
        });

        return promise;
    };
}

PlurObject.plurify('plur/test/Tester', Tester);
